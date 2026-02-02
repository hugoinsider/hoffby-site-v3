'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, PieChart as PieIcon, Calculator, Plus, Trash2, TrendingUp, TrendingDown, Info, QrCode, Copy } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Logo } from '@/components/Logo';

interface Expense {
    id: string;
    name: string;
    value: number;
    type: 'fixed' | 'variable' | 'tax' | 'labor';
    mode: 'currency' | 'percent';
    quantity: number;
}

const EXPENSE_TYPES = [
    { label: 'Custos Fixos', value: 'fixed', color: '#A451FF' },
    { label: 'Custos Variáveis', value: 'variable', color: '#FFD700' },
    { label: 'Impostos / Taxas', value: 'tax', color: '#FF5555' },
    { label: 'Mão de Obra', value: 'labor', color: '#00F26B' },
];

const PRESET_EXPENSES = [
    "Aluguel", "Energia", "Água", "Internet", "Contador",
    "Simples Nacional", "ICMS", "Taxa Maquininha", "Comissão Venda",
    "Prolabore", "Salários", "Embalagem", "Frete"
];

export default function FinancialCalculatorPage() {
    // Mode: 'dre' (Monthly Result) or 'pricing' (Product Margin)
    const [mode, setMode] = useState<'dre' | 'pricing'>('dre');

    // DRE States
    const [revenue, setRevenue] = useState<number>(0);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    // Expense Input State
    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseValue, setNewExpenseValue] = useState('');
    const [newExpenseType, setNewExpenseType] = useState<Expense['type']>('fixed');
    const [newExpenseMode, setNewExpenseMode] = useState<'currency' | 'percent'>('currency');
    const [newExpenseQty, setNewExpenseQty] = useState('1');

    // Pricing States
    const [productCost, setProductCost] = useState<number>(0);
    const [desiredMargin, setDesiredMargin] = useState<number>(20); // %

    // Results
    interface Results {
        totalRevenue?: number;
        totalExpenses?: number;
        netProfit?: number;
        margin: string | number;
        isPositive: boolean;
        salePrice?: number;
        profit?: number;
        markup?: string | number;
    }

    const [results, setResults] = useState<Results | null>(null);
    const [showDonation, setShowDonation] = useState(false);

    // --- LOGIC ---
    const calculateDRE = React.useCallback(() => {
        let totalAbsoluteExpenses = 0;
        let totalPercentage = 0;

        // Separate fixed values (R$) from percentages (%)
        expenses.forEach(e => {
            if (e.mode === 'currency') {
                totalAbsoluteExpenses += (e.value * e.quantity);
            } else {
                totalPercentage += e.value; // Sum of % rates
            }
        });

        if (mode === 'dre') {
            // DRE: Revenue is known
            // Cost = (Fixed R$ * Qty) + (Revenue * Sum(%))
            const expensesFromPercent = revenue * (totalPercentage / 100);
            const totalExpenses = totalAbsoluteExpenses + expensesFromPercent;

            const netProfit = revenue - totalExpenses;
            const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

            setResults({
                totalRevenue: revenue,
                totalExpenses,
                netProfit,
                margin: margin.toFixed(2),
                isPositive: netProfit >= 0
            });
        } else {
            // Pricing Logic
            // Price = (ProductCost + TotalAbsoluteExpenses) / (1 - (TotalPercentage + DesiredMargin)/100)

            const totalDivisorRate = (totalPercentage + desiredMargin) / 100;

            // Safety check against infinity
            if (totalDivisorRate >= 1) {
                setResults({
                    salePrice: 0,
                    profit: 0,
                    markup: 0,
                    margin: desiredMargin,
                    isPositive: false
                });
                return;
            }

            const totalFixedBase = productCost + totalAbsoluteExpenses;
            const salePrice = totalFixedBase / (1 - totalDivisorRate);

            // Profit is what's left after paying ProductCost + AbsoluteExpenses + PercentageExpenses
            const totalExpensesVal = totalAbsoluteExpenses + (salePrice * (totalPercentage / 100));
            const profit = salePrice - productCost - totalExpensesVal;

            const calculatedMarkup = productCost > 0 ? ((salePrice - productCost) / productCost) * 100 : 0;

            setResults({
                salePrice,
                profit,
                markup: calculatedMarkup.toFixed(2),
                margin: desiredMargin,
                isPositive: true
            });
        }
    }, [expenses, mode, revenue, productCost, desiredMargin]);

    useEffect(() => {
        calculateDRE();
    }, [calculateDRE]);

    const addExpense = () => {
        if (!newExpenseName || !newExpenseValue) return;
        const newItem: Expense = {
            id: Math.random().toString(36).substr(2, 9),
            name: newExpenseName,
            value: Number(newExpenseValue),
            type: newExpenseType,
            mode: newExpenseMode,
            quantity: Number(newExpenseQty) || 1
        };
        setExpenses([...expenses, newItem]);
        setNewExpenseName('');
        setNewExpenseValue('');
        setNewExpenseQty('1');
    };

    const removeExpense = (id: string) => {
        setExpenses(expenses.filter(e => e.id !== id));
    };

    const chartData = EXPENSE_TYPES.map(type => {
        const typeExpenses = expenses.filter(e => e.type === type.value);
        let totalVal = 0;

        typeExpenses.forEach(e => {
            if (e.mode === 'currency') {
                totalVal += (e.value * e.quantity);
            } else {
                // For the chart, we estimate the % value based on the current context
                const base = mode === 'dre' ? revenue : (results?.salePrice || 0);
                totalVal += (base * (e.value / 100));
            }
        });

        return {
            name: type.label.split(' ')[0],
            value: totalVal,
            color: type.color
        };
    }).filter(d => d.value > 0);

    const copyToClipboard = () => {
        const data = {
            mode,
            input: mode === 'dre' ? { revenue } : { productCost, desiredMargin },
            expenses: expenses.map(e => ({
                name: e.name,
                value: e.value,
                type: e.type,
                mode: e.mode,
                quantity: e.quantity,
                total: e.mode === 'currency' ? e.value * e.quantity : `${e.value}%`
            })),
            results
        };

        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert('Dados copiados para a área de transferência!');
    };

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#00F26B]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#A451FF]/5 blur-[150px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-7xl w-full relative z-10 my-8 md:my-12">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <Link href="/ferramentas" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors mb-4 block">
                        ← Voltar para Ferramentas
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 mb-6 backdrop-blur-md">
                        <DollarSign size={12} className="text-yellow-500" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-500">Finance Pro</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2">
                        Calculadora de <span className="text-yellow-500">Margem.</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Controle financeiro mensal (DRE) e precificação inteligente de produtos.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* INPUT SECTION */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* MODE SELECTOR */}
                        <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-2 flex">
                            <button
                                onClick={() => setMode('dre')}
                                className={`flex-1 py-3 rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-normal md:tracking-widest transition-all ${mode === 'dre' ? 'bg-[#00F26B] text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
                            >
                                Gestão Mensal (DRE)
                            </button>
                            <button
                                onClick={() => setMode('pricing')}
                                className={`flex-1 py-3 rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-normal md:tracking-widest transition-all ${mode === 'pricing' ? 'bg-[#A451FF] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                            >
                                Precificação
                            </button>
                        </div>

                        {/* REVENUE INPUT */}
                        <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-8 shadow-xl">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                <TrendingUp size={14} className="text-[#00F26B]" />
                                {mode === 'dre' ? 'Faturamento Bruto' : 'Custo do Produto'}
                            </h3>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                                <input
                                    type="number"
                                    value={mode === 'dre' ? revenue : productCost}
                                    onChange={(e) => mode === 'dre' ? setRevenue(Number(e.target.value)) : setProductCost(Number(e.target.value))}
                                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white font-mono text-lg focus:border-[#00F26B] outline-none transition-colors"
                                    placeholder="0.00"
                                />
                            </div>

                            {mode === 'pricing' && (
                                <div className="mt-6">
                                    <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                        Margem Desejada (%)
                                    </h3>
                                    <input
                                        type="range" min="1" max="100"
                                        value={desiredMargin}
                                        onChange={(e) => setDesiredMargin(Number(e.target.value))}
                                        className="w-full accent-[#A451FF] h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between mt-2 text-xs font-mono text-slate-500">
                                        <span>1%</span>
                                        <span className="text-[#A451FF] font-bold">{desiredMargin}%</span>
                                        <span>100%</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* EXPENSE LIST */}
                        <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-8 shadow-xl">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                <TrendingDown size={14} className="text-red-500" />
                                {mode === 'dre' ? 'Despesas & Custos' : 'Custos Adicionais (Un)'}
                            </h3>

                            {/* Add New */}
                            <div className="space-y-6 mb-8 pb-8 border-b border-white/5">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-12">
                                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block tracking-widest">Descrição do Custo</label>
                                        <input
                                            list="preset-expenses"
                                            value={newExpenseName}
                                            onChange={(e) => setNewExpenseName(e.target.value)}
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-[#00F26B] outline-none transition-all placeholder:text-slate-700"
                                            placeholder="Ex: Aluguel do Escritório"
                                        />
                                        <datalist id="preset-expenses">
                                            {PRESET_EXPENSES.map(e => <option key={e} value={e} />)}
                                        </datalist>
                                    </div>

                                    <div className="col-span-6 md:col-span-3">
                                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block tracking-widest">Valor</label>
                                        <input
                                            type="number"
                                            value={newExpenseValue}
                                            onChange={(e) => setNewExpenseValue(e.target.value)}
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-[#00F26B] outline-none transition-all placeholder:text-slate-700 font-mono"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="col-span-6 md:col-span-3">
                                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block tracking-widest">Tipo</label>
                                        <div className="flex bg-[#050505] rounded-xl border border-white/10 overflow-hidden h-[54px]">
                                            <button
                                                onClick={() => setNewExpenseMode('currency')}
                                                className={`flex-1 text-xs font-bold transition-all ${newExpenseMode === 'currency' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
                                            >R$</button>
                                            <div className="w-px bg-white/10 my-2"></div>
                                            <button
                                                onClick={() => setNewExpenseMode('percent')}
                                                className={`flex-1 text-xs font-bold transition-all ${newExpenseMode === 'percent' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
                                            >%</button>
                                        </div>
                                    </div>

                                    <div className="col-span-6 md:col-span-2">
                                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block tracking-widest">Qtd</label>
                                        <input
                                            type="number"
                                            value={newExpenseQty}
                                            onChange={(e) => setNewExpenseQty(e.target.value)}
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-[#00F26B] outline-none transition-all placeholder:text-slate-700 font-mono text-center"
                                            placeholder="1"
                                        />
                                    </div>

                                    <div className="col-span-6 md:col-span-4">
                                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block tracking-widest">Categoria</label>
                                        <select
                                            value={newExpenseType}
                                            onChange={(e) => setNewExpenseType(e.target.value as Expense['type'])}
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-slate-400 text-xs outline-none h-[54px] appearance-none"
                                        >
                                            {EXPENSE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label.split(' ')[0]}</option>)}
                                        </select>
                                    </div>

                                    <div className="col-span-12">
                                        <button onClick={addExpense} className="w-full py-4 bg-[#00F26B] hover:bg-[#00c957] rounded-xl text-black font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00F26B]/10">
                                            <Plus size={16} /> Adicionar Lançamento
                                        </button>
                                    </div>

                                </div>
                            </div>

                            {/* List */}
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {expenses.length === 0 && (
                                    <div className="text-center py-8 text-slate-600 text-xs uppercase tracking-widest">
                                        Nenhum gasto lançado
                                    </div>
                                )}
                                {expenses.map(expense => (
                                    <div key={expense.id} className="flex items-center justify-between text-sm bg-white/5 rounded-lg p-3 group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: EXPENSE_TYPES.find(t => t.value === expense.type)?.color }} />
                                            <div>
                                                <span className="text-white block">{expense.name}</span>
                                                <span className="text-[10px] text-slate-500">{expense.mode === 'currency' ? `${expense.quantity}x unidades` : 'Percentual'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono text-slate-300">
                                                {expense.mode === 'percent'
                                                    ? `${expense.value}%`
                                                    : `R$ ${(expense.value * expense.quantity).toFixed(2)}`
                                                }
                                            </span>
                                            <button onClick={() => removeExpense(expense.id)} className="text-slate-600 hover:text-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RESULTS SECTION */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">

                            {/* RESULTS DISPLAY */}
                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">
                                        {mode === 'dre' ? 'Lucro Líquido' : 'Preço de Venda'}
                                    </div>
                                    <div className={`text-3xl md:text-5xl font-black font-mono tracking-tight ${results?.isPositive || mode === 'pricing' ? 'text-[#00F26B]' : 'text-red-500'}`}>
                                        R$ {mode === 'dre' ? (results?.netProfit || 0).toFixed(2) : (results?.salePrice || 0).toFixed(2)}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">
                                        {mode === 'dre' ? 'Margem Líquida' : 'Lucro Real'}
                                    </div>
                                    <div className="text-2xl md:text-3xl font-black font-mono text-white tracking-tight">
                                        {mode === 'dre' ? `${results?.margin || 0}%` : `R$ ${(results?.profit || 0).toFixed(2)}`}
                                    </div>
                                </div>
                            </div>

                            {/* CHART */}
                            <div className="flex-1 min-h-[300px] relative">
                                {expenses.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                contentStyle={{ backgroundColor: '#050505', borderColor: '#333', borderRadius: '12px' }}
                                                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                            />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs uppercase tracking-widest border-2 border-dashed border-white/5 rounded-2xl">
                                        Adicione gastos para ver o gráfico
                                    </div>
                                )}
                            </div>

                            {/* DONATION CTA */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
                                        <Info size={20} />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Ferramenta Gratuita</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">Inove no seu controle financeiro</div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={copyToClipboard}
                                        className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center gap-2"
                                    >
                                        <Copy size={14} /> JSON
                                    </button>
                                    <button
                                        onClick={() => setShowDonation(true)}
                                        className="px-6 py-3 bg-[#A451FF] hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg"
                                    >
                                        Apoie o Projeto
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* DONATION MODAL */}
                {showDonation && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                        <div className="bg-[#0E0E0E] w-full max-w-md rounded-[30px] border border-white/10 shadow-2xl p-8 relative overflow-hidden text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A451FF] to-[#00F26B]" />

                            <h3 className="text-2xl font-black uppercase italic text-white mb-2">Muito Obrigado!</h3>
                            <p className="text-slate-400 text-sm mb-8">Sua contribuição ajuda a manter estas ferramentas gratuitas e sem anúncios.</p>

                            <div className="bg-white p-4 rounded-xl inline-block mb-6">
                                <QrCode size={150} className="text-black" />
                            </div>

                            <div className="bg-black/20 p-4 rounded-xl border border-white/5 mb-8">
                                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Chave PIX (CNPJ)</div>
                                <div className="font-mono text-[#00F26B] text-lg select-all">44.532.586/0001-00</div>
                            </div>

                            <button onClick={() => setShowDonation(false)} className="text-xs font-bold uppercase text-slate-500 hover:text-white transition-colors">
                                Fechar Janela
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
