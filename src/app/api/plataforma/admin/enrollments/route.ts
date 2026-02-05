import { createClient } from '@/lib/supabase-server';
import { createAdminClient } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

// Forced update to clear build cache
export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { action, studentId, courseId } = json;

        if (!studentId || !courseId) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

        // Use Admin Client to bypass RLS policies
        const adminSupabase = createAdminClient();

        if (action === 'enroll') {
            const { error } = await adminSupabase
                .from('enrollments')
                .insert({ user_id: studentId, course_id: courseId });

            if (error) {
                if (error.code === '23505') { // Unique violation
                    return NextResponse.json({ message: 'Already enrolled (Idempotent success)' }, { status: 200 });
                }
                throw error;
            }
            return NextResponse.json({ success: true });
        }

        if (action === 'unenroll') {
            const { error } = await adminSupabase
                .from('enrollments')
                .delete()
                .eq('user_id', studentId)
                .eq('course_id', courseId);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (err: any) {
        console.error("Enrollment API Error:", err);
        return NextResponse.json({
            error: err.message || "Unknown error occurred",
            details: JSON.stringify(err)
        }, { status: 500 });
    }
}
