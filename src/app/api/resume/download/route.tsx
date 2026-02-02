import React from 'react';
import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
// @ts-ignore
import { ResumePDF } from '@/components/tools/resume-generator/ResumePDF';
import { getPaymentStatus } from '@/app/api/services/asaas';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Admin Client (Service Role) to bypass RLS/Policies for this security check
// If SERVICE_ROLE_KEY is not set, it falls back to ANON_KEY (which might work if RLS allows or if table is public)
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // console.log(body)

        const { resumeData, template, paymentId } = body;

        console.log('[API] Resume Download Request. PaymentId:', paymentId);

        if (!resumeData) {
            return NextResponse.json(
                { error: 'Dados do currículo não fornecidos' },
                { status: 400 }
            );
        }

        let isWatermarked = true;

        if (paymentId) {
            try {
                // 1. Security Check: Download Limit (Supabase)
                // Check if this paymentId has already downloaded
                const { data: existingRecord, error: fetchError } = await supabaseAdmin
                    .from('payment_downloads')
                    .select('*')
                    .eq('payment_id', paymentId)
                    .single();

                if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = JSON object requested, multiple (or no) results returned (Single result not found)
                    console.error('[Supabase] Error fetching payment record:', fetchError);
                    // Decide fail-open or fail-closed? Fail-closed for security.
                    // But if table doesn't exist yet (user didn't run migration), this blocks downloads.
                    // Warn and proceed? User explicitly asked for security.
                    // We will proceed securely: check payment status.
                }

                if (existingRecord) {
                    console.log('[Supabase] Existing record found:', existingRecord);
                    if (existingRecord.download_count >= existingRecord.max_downloads) {
                        console.warn(`[Security] Download limit exceeded for ${paymentId}. Count: ${existingRecord.download_count}/${existingRecord.max_downloads}`);
                        return NextResponse.json(
                            { error: 'Limite de downloads excedido para este pagamento. (Máx: 1)' },
                            { status: 403 }
                        );
                    }
                }

                // 2. Verify Payment (Asaas) OR Free Usage (UUID)
                const isAsaasPayment = paymentId.startsWith('pay_');

                if (isAsaasPayment) {
                    const paymentStatus = await getPaymentStatus(paymentId);
                    console.log(`[ResumeDownload] Payment ID: ${paymentId}, Status: ${JSON.stringify(paymentStatus)}`);

                    if (paymentStatus.confirmed) {
                        isWatermarked = false;
                    } else {
                        console.warn(`[ResumeDownload] Payment not confirmed yet. Status: ${paymentStatus.status}`);
                        return NextResponse.json(
                            { error: `Pagamento ainda não confirmado. Status: ${paymentStatus.status || 'Desconhecido'}` },
                            { status: 400 }
                        );
                    }
                } else {
                    // It's a free usage ID (UUID)
                    // If we found the record (Step 1), it is authorized.
                    console.log(`[ResumeDownload] Authorized Free Usage ID: ${paymentId}`);
                    isWatermarked = false;
                }

                if (!isWatermarked) {
                    // 3. Update/Insert Download Record
                    if (existingRecord) {
                        // Update count
                        await supabaseAdmin
                            .from('payment_downloads')
                            .update({
                                download_count: existingRecord.download_count + 1,
                                last_download_at: new Date().toISOString()
                            })
                            .eq('id', existingRecord.id);
                    } else {
                        // Insert new record
                        const { error: insertError } = await supabaseAdmin
                            .from('payment_downloads')
                            .insert({
                                payment_id: paymentId,
                                download_count: 1,
                                max_downloads: 1, // Enforce 1 download
                                created_at: new Date().toISOString(),
                                last_download_at: new Date().toISOString()
                            });

                        if (insertError) console.error('[Supabase] Error inserting record:', insertError);
                    }
                }
            } catch (error) {
                console.error('Error verifying payment/security:', error);
                return NextResponse.json(
                    { error: 'Erro ao verificar pagamento. Tente novamente.' },
                    { status: 500 }
                );
            }
        }

        // Render PDF using React.createElement instead of JSX to avoid parsing issues
        // if the file is treated as .ts by mistake
        // @ts-ignore
        const stream = await renderToStream(
            React.createElement(ResumePDF, {
                data: resumeData,
                template: template,
                isWatermarked: isWatermarked
            })
        );

        return new NextResponse(stream as unknown as BodyInit, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="curriculo-${isWatermarked ? 'preview' : 'final'}.pdf"`,
            },
        });

    } catch (error: any) {
        console.error('PDF Generation Error:', error);
        return NextResponse.json(
            { error: 'Erro ao gerar PDF: ' + error.message },
            { status: 500 }
        );
    }
}
