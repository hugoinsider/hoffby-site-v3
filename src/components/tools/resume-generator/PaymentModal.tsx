import React, { useEffect, useState } from 'react';
import { Modal } from '../../Modal';
import { QrCode, Copy, Check, Loader2, AlertCircle, ShieldCheck, Lock } from 'lucide-react';
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
    onSuccess: () => void;
    data: ResumeData;
}

interface PaymentState {
    step: 'cpf' | 'loading' | 'payment' | 'success';
    error: string | null;
    qrCodeImage: string | null;
    qrCodePayload: string | null;
    paymentId: string | null;
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

    const handleCreatePayment = async () => {
        if (!isValidCPF(cpf)) {
            setState(prev => ({ ...prev, error: 'CPF inválido. Verifique os números.' }));
            return;
        }

        try {
            setState(prev => ({ ...prev, step: 'loading', error: null }));

            const response = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.personal.fullName || 'Cliente Hoffby',
                    email: data.personal.email || 'email@exemplo.com',
                    cpf: cleanCPF(cpf)
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
                    onSuccess();
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
                                Para baixar seu currículo profissional em PDF de alta qualidade, é necessário uma taxa única de <strong className="text-white">R$ 5,00</strong>.
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Informe seu CPF (Para o Pix)</label>
                        <input
                            type="text"
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono tracking-wider"
                            placeholder="000.000.000-00"
                            value={cpf}
                            maxLength={14}
                            onChange={(e) => setCpf(formatCPF(e.target.value))}
                        />
                        {state.error && <p className="text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} /> {state.error}</p>}
                    </div>

                    <button
                        onClick={handleCreatePayment}
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all"
                    >
                        Gerar Pix de R$ 5,00
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
