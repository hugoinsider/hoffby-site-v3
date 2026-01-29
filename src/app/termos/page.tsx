import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-[#A451FF] selection:text-white">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#A451FF] hover:text-white transition-colors mb-12">
                    <ArrowLeft size={16} /> Voltar para Home
                </Link>

                <header className="mb-16">
                    <div className="w-12 h-12 rounded-xl bg-[#00F26B]/10 flex items-center justify-center text-[#00F26B] mb-6">
                        <FileText size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-4">
                        Termos de <span className="text-[#A451FF]">Uso</span>
                    </h1>
                    <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">Vigente desde: Janeiro 2026</p>
                </header>

                <article className="prose prose-invert prose-lg max-w-none">
                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">1. Termos</h3>
                    <p>
                        Ao acessar ao site Hoffby, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
                    </p>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">2. Uso de Licença</h3>
                    <p>
                        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Hoffby , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-400">
                        <li>modificar ou copiar os materiais;</li>
                        <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                        <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Hoffby;</li>
                        <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
                        <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
                    </ul>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">3. Isenção de responsabilidade</h3>
                    <p>
                        Os materiais no site da Hoffby são fornecidos 'como estão'. Hoffby não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
                    </p>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">4. Limitações</h3>
                    <p>
                        Em nenhum caso o Hoffby ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Hoffby, mesmo que Hoffby ou um representante autorizado da Hoffby tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
                    </p>
                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">5. Parcerias e Compliance (B2B)</h3>
                    <p>
                        Aceitamos propostas de parceria exclusivamente de <strong>empresas (PJ)</strong>. Todo processo de admissão de parceiros passa por um rigoroso <em>compliance</em> interno, análise completa de viabilidade e reputação, seguido de negociação e formalização contratual.
                    </p>
                    <p className="mt-4">
                        <strong>Não realizamos parcerias baseadas em permuta ou redução de custos</strong> em troca de promessas de lucros futuros. Nossas parcerias têm foco estrito na indicação qualificada de clientes, com remuneração por êxito devidamente estipulada em contrato firmado entre as partes.
                    </p>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">6. Funcionamento e Agendamentos</h3>
                    <p>
                        Nosso horário de atendimento é de <strong>segunda a sexta-feira, das 08:00 às 18:00</strong>.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-400 mt-4">
                        <li><strong>Agendamento:</strong> Todas as reuniões devem ser solicitadas com no mínimo <strong>24 horas de antecedência</strong>. Não realizamos reuniões de última hora.</li>
                        <li><strong>Cancelamento:</strong> Impedimentos devem ser comunicados com até <strong>4 horas de antecedência</strong>. O não comparecimento ou cancelamento fora deste prazo está sujeito a multa conforme contrato.</li>
                        <li><strong>Igualdade:</strong> Valorizamos todos os clientes igualmente. Jamais desmarcamos compromissos com um cliente para priorizar outro, independentemente do valor do contrato.</li>
                    </ul>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">7. Conduta e Seleção de Clientes</h3>
                    <p>
                        Selecionamos nossos clientes criteriosamente. Prezamos por uma relação de respeito mútuo, elegância e profissionalismo. Reservamo-nos o direito de recusar projetos ou encerrar contratos caso a postura do cliente não esteja alinhada com nossos princípios éticos e de tratamento humano. Atuamos remotamente e, devido à alta demanda e à natureza detalhada do nosso trabalho, podemos operar com <strong>lista de espera</strong>.
                    </p>

                    <h3 className="text-white font-bold uppercase tracking-tight mt-10 mb-4">8. Filosofia de Trabalho</h3>
                    <p>
                        Nosso trabalho é quase artesanal: feito com extremo cuidado, esmero e dedicação técnica. Não negociamos nossos valores e princípios por retorno financeiro. A qualidade da entrega e a integridade do processo são inegociáveis.
                    </p>
                </article>

                <footer className="mt-20 pt-10 border-t border-white/5 text-center text-slate-600 text-sm">
                    <p>© 2026 Hoffby Tecnologia Ltda. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
}
