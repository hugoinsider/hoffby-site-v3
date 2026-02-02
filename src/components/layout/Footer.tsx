import Link from 'next/link';
import { Scale, Diamond, Shield, User } from 'lucide-react';

export const Footer = () => {
  const items = [
    { title: "Fundador", icon: User, href: "/founder", desc: "Hugo Alves." },
    { title: "Privacidade", icon: Shield, href: "/privacidade", desc: "Como protegemos seus dados." },
    { title: "Termos de Uso", icon: Scale, href: "/termos", desc: "Regras e acordos comerciais." },
    { title: "Valores", icon: Diamond, href: "/valores", desc: "Nosso manifesto ético." },
  ];

  return (
    <footer className="py-20 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <Scale className="w-5 h-5 text-[#A451FF]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A451FF]">Compliance & Cultura</span>
            </div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Transparência</h2>
            <p className="mt-4 text-xs text-slate-600">
              © {new Date().getFullYear()} Hoffby Tecnologia Ltda. Todos os direitos reservados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full md:w-auto">
            {items.map((item) => (
              <Link key={item.title} href={item.href} className="group bg-[#0E0E0E] border border-white/5 p-6 rounded-2xl hover:border-[#00F26B]/30 transition-all flex items-center gap-4 min-w-[200px]">
                <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full bg-[#00F26B]/10 flex items-center justify-center text-[#00F26B] group-hover:bg-[#00F26B] group-hover:text-black transition-colors shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
