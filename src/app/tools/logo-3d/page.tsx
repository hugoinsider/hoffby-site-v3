import Visualizer from "@/components/tools/logo-3d/Visualizer";

export const metadata = {
    title: "3D Logo Visualizer | HOFFBY Tools",
    description: "Convert your 2D SVG/PNG logos into 3D metallic elements.",
};

export default function Logo3DPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-[1920px] mx-auto">
                <Visualizer />
            </div>
        </div>
    );
}
