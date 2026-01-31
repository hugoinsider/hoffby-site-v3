import { ResumeGenerator } from "@/components/tools/resume-generator/ResumeGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gerador de Currículo Tech Grátis | Hoffby Tools",
    description: "Crie um currículo profissional focado em tecnologia e programação. Modelos gratuitos, sem cadastro, exportação PDF e JSON. Ideal para desenvolvedores Front-end, Back-end e Full-stack.",
    keywords: ["gerador de currículo", "currículo tech", "currículo desenvolvedor", "tecnologia", "programador", "frontend", "backend", "grátis", "pdf", "json"],
    openGraph: {
        title: "Gerador de Currículo Tech Grátis",
        description: "A ferramenta definitiva para criar currículos de tecnologia. Design minimalista e focado em resultados.",
        type: "website",
        locale: "pt_BR",
    }
};

export default function ResumeGeneratorPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <ResumeGenerator />
        </div>
    );
}
