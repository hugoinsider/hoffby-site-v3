import React, { useEffect, useState } from 'react';
import { Modal } from '../../Modal';
import { QrCode, Copy, Check, Loader2, AlertCircle, ShieldCheck, Lock, Ticket, Tag } from 'lucide-react';
import { ResumeData } from './ResumeGenerator';
import { cleanCPF, formatCPF, isValidCPF } from '@/lib/cpf';

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy', err);
        return false;
    }
};

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (paymentId?: string) => void;
    data: ResumeData;
}

interface PaymentState {
    step: 'cpf' | 'loading' | 'payment' | 'success';
    error: string | null;
    qrCodeImage: string | null;
    qrCodePayload: string | null;
    paymentId: string | null;
}

interface CouponState {
    code: string;
    valid: boolean;
    discountPercent: number;
    message: string | null;
    isValidating: boolean;
}

export function PaymentModal({ isOpen, onClose, onSuccess, data }: PaymentModalProps) {
    const [state, setState] = useState<PaymentState>({
        step: 'cpf',
        error: null,
        qrCodeImage: null,
        qrCodePayload: null,
        paymentId: null
    });
    const [cpf, setCpf] = useState('');
    const [copied, setCopied] = useState(false);

    // Coupon State
    const [coupon, setCoupon] = useState<CouponState>({
        code: '',
        valid: false,
        discountPercent: 0,
        message: null,
        isValidating: false
    });

    // Calculate price (Moved up for access in handlers)
    const basePrice = 10.00;
    const finalPrice = coupon.valid ? (basePrice * (1 - coupon.discountPercent / 100)) : basePrice;

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setState({
                step: 'cpf',
                error: null,
                qrCodeImage: null,
                qrCodePayload: null,
                paymentId: null
            });
            setCpf('');
            setCoupon({
                code: '',
                valid: false,
                discountPercent: 0,
                message: null,
                isValidating: false
            });
        }
    }, [isOpen]);

    // Polling for Status
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isOpen && state.step === 'payment' && state.paymentId) {
            interval = setInterval(checkStatus, 3000);
        }

        return () => clearInterval(interval);
    }, [isOpen, state.step, state.paymentId]);

    const handleValidateCoupon = async () => {
        if (!coupon.code) return;

        setCoupon(prev => ({ ...prev, isValidating: true, message: null, error: null })); // clear previous msg

        try {
            const response = await fetch('/api/payment/validate-coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: coupon.code })
            });
            const result = await response.json();

            if (result.valid) {
                setCoupon(prev => ({
                    ...prev,
                    valid: true,
                    discountPercent: result.discountPercent,
                    message: `Cupom aplicado! ${result.discountPercent}% OFF`,
                    isValidating: false
                }));
            } else {
                setCoupon(prev => ({
                    ...prev,
                    valid: false,
                    discountPercent: 0,
                    message: result.message || 'Cupom inválido',
                    isValidating: false
                }));
            }
        } catch (error) {
            setCoupon(prev => ({
                ...prev,
                valid: false,
                discountPercent: 0,
                message: 'Erro ao validar cupom',
                isValidating: false
            }));
        }
    };

    const handleCreatePayment = async () => {
        // 100% Discount Flow OR Low Value Flow (Asaas min is R$ 5.00)
        // Check if fully free
        if (coupon.valid && (coupon.discountPercent === 100 || finalPrice === 0)) {
            setState(prev => ({ ...prev, step: 'loading', error: null }));
            try {
                // Register Usage
                const response = await fetch('/api/payment/register-usage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: coupon.code })
                });

                if (response.ok) {
                    const result = await response.json();
                    setState(prev => ({ ...prev, step: 'success' }));
                    setTimeout(() => {
                        onSuccess(result.paymentId); // Gratis / Cupom com ID de uso
                        onClose();
                    }, 1500);
                } else {
                    setState(prev => ({ ...prev, step: 'cpf', error: 'Erro ao registrar download gratuito.' }));
                }
            } catch (error) {
                setState(prev => ({ ...prev, step: 'cpf', error: 'Erro ao processar cupom.' }));
            }
            return;
        }

        if (!isValidCPF(cpf)) {
            setState(prev => ({ ...prev, error: 'CPF inválido. Verifique os números.' }));
            return;
        }

        // Min Value Validation (Asaas Rule)
        if (finalPrice > 0 && finalPrice < 5.00) {
            setState(prev => ({ ...prev, error: 'O valor com desconto não pode ser menor que R$ 5,00 (Regra do Banco).' }));
            return;
        }

        // Normal Flow (Partial or No Discount)
        try {
            setState(prev => ({ ...prev, step: 'loading', error: null }));

            const response = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.personal.fullName || 'Cliente Hoffby',
                    email: data.personal.email || 'email@exemplo.com',
                    cpf: cleanCPF(cpf),
                    coupon: coupon.valid ? coupon.code : undefined
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Erro ao criar cobrança');
            }

            setState(prev => ({
                ...prev,
                step: 'payment',
                paymentId: result.paymentId,
                qrCodeImage: result.encodedImage,
                qrCodePayload: result.payload
            }));

        } catch (err: any) {
            setState(prev => ({ ...prev, step: 'cpf', error: err.message }));
        }
    };

    const checkStatus = async () => {
        if (!state.paymentId) return;

        try {
            const response = await fetch(`/api/payment/status?id=${state.paymentId}`);
            const result = await response.json();

            if (result.confirmed) {
                setState(prev => ({ ...prev, step: 'success' }));
                setTimeout(() => {
                    onSuccess(state.paymentId!);
                    onClose();
                }, 2000); // Wait 2s to show success message
            }
        } catch (error) {
            console.error('Status check error', error);
        }
    };

    const handleCopy = () => {
        if (state.qrCodePayload) {
            copyToClipboard(state.qrCodePayload);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Calculate final price display
    // MOVED TOP

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Pagamento Seguro"
            icon={<Lock size={20} className="text-emerald-400" />}
            maxWidth="max-w-md"
        >
            {state.step === 'cpf' && (
                <div className="space-y-4">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex gap-3">
                        <ShieldCheck className="shrink-0 text-emerald-400" size={24} />
                        <div>
                            <p className="text-emerald-100 font-bold mb-1">Liberação Imediata</p>
                            <p className="text-emerald-200/70 text-sm">
                                Para baixar seu currículo profissional em PDF de alta qualidade, é necessário uma taxa única de R$ 10,00.
                            </p>
                        </div>
                    </div>

                    {/* Coupon Input - Moved to Top */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-2">
                            <Tag size={12} /> Cupom de Desconto
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                className={`flex-1 bg-[#050505] border rounded-xl px-4 py-3 text-white focus:outline-none font-mono tracking-wider uppercase text-sm ${coupon.valid ? 'border-emerald-500/50 text-emerald-400' : 'border-white/10'}`}
                                placeholder="CÓDIGO"
                                value={coupon.code}
                                onChange={(e) => setCoupon(prev => ({ ...prev, code: e.target.value.toUpperCase(), valid: false, message: null }))}
                                disabled={coupon.valid && coupon.discountPercent === 100}
                            />
                            <button
                                onClick={handleValidateCoupon}
                                disabled={!coupon.code || coupon.isValidating || (coupon.valid && coupon.discountPercent === 100)}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 font-bold text-xs disabled:opacity-50 transition-colors"
                            >
                                {coupon.isValidating ? <Loader2 size={16} className="animate-spin" /> : 'Aplicar'}
                            </button>
                        </div>
                        {coupon.message && (
                            <p className={`text-xs flex items-center gap-1 mb-4 ${coupon.valid ? 'text-emerald-400' : 'text-red-400'}`}>
                                {coupon.valid ? <Check size={12} /> : <AlertCircle size={12} />} {coupon.message}
                            </p>
                        )}
                    </div>

                    {/* CPF Input - Only shown if not 100% free */}
                    {!(coupon.valid && coupon.discountPercent === 100) && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Informe seu CPF (Para o Pix)</label>
                            <input
                                type="text"
                                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono tracking-wider mb-4"
                                placeholder="000.000.000-00"
                                value={cpf}
                                maxLength={14}
                                onChange={(e) => setCpf(formatCPF(e.target.value))}
                            />
                            {state.error && <p className="text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} /> {state.error}</p>}
                        </div>
                    )}

                    <div className="py-4 border-t border-white/5 flex justify-between items-center text-sm">
                        <span className="text-slate-400">Total a pagar:</span>
                        <div className="text-right">
                            {coupon.valid && coupon.discountPercent > 0 && (
                                <span className="block text-xs text-slate-500 line-through">R$ {basePrice.toFixed(2).replace('.', ',')}</span>
                            )}
                            <span className={`font-bold text-lg ${finalPrice === 0 ? 'text-emerald-400' : 'text-white'}`}>
                                {finalPrice === 0 ? 'GRÁTIS' : `R$ ${finalPrice.toFixed(2).replace('.', ',')}`}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleCreatePayment}
                        className={`w-full py-3 font-bold rounded-xl transition-all shadow-lg text-black ${finalPrice === 0 ? 'bg-emerald-400 hover:bg-emerald-500 shadow-emerald-900/20' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                    >
                        {finalPrice === 0 ? 'Baixar Grátis Agora' : `Gerar Pix de R$ ${finalPrice.toFixed(2).replace('.', ',')}`}
                    </button>
                </div>
            )}

            {state.step === 'loading' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <Loader2 size={48} className="text-emerald-500 animate-spin" />
                    <p className="text-slate-400">Gerando cobrança...</p>
                </div>
            )}

            {state.step === 'payment' && (
                <div className="space-y-6 text-center">
                    <p className="text-slate-300 text-sm">
                        Escaneie o QR Code abaixo ou copie o código Pix para pagar.
                        <br />
                        A liberação é automática após o pagamento.
                    </p>

                    {state.qrCodeImage && (
                        <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                            <img src={`data:image/png;base64,${state.qrCodeImage}`} alt="Pix QR Code" className="w-48 h-48" />
                        </div>
                    )}

                    <div className="relative">
                        <input
                            readOnly
                            value={state.qrCodePayload || ''}
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-slate-400 text-xs pr-12 truncate font-mono"
                        />
                        <button
                            onClick={handleCopy}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg text-emerald-500 transition-colors"
                            title="Copiar"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 animate-pulse">
                        <Loader2 size={12} className="animate-spin" />
                        Aguardando pagamento...
                    </div>
                </div>
            )}

            {state.step === 'success' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-2">
                        <Check size={32} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Pagamento Confirmado!</h3>
                    <p className="text-slate-400">Seu download iniciará em instantes.</p>
                </div>
            )}
        </Modal>
    );
}
