"use client";

import { useState, useRef, useCallback } from "react";
import Scene from "./Scene";
import { Upload, Download, Scan, Image as ImageIcon } from "lucide-react";
import { Slider } from "./ui/Slider";
import { ColorPicker } from "./ui/ColorPicker";

export default function Visualizer() {
    const [fileUrl, setFileUrl] = useState<string | null>("/logo.svg"); // Default to Hoffby logo
    const [fileType, setFileType] = useState<"svg" | "png" | null>("svg"); // Default type

    // Scene Settings
    const [showGrid, setShowGrid] = useState(true);
    const [autoRotate, setAutoRotate] = useState(false);
    const [transparentImg, setTransparentImg] = useState(false);

    const [materialProps, setMaterialProps] = useState({
        color: "#ffffff",
        metalness: 0.9,
        roughness: 0.1,
        intensity: 1.0,
        depth: 2, // New depth property
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modelRef = useRef<any>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Revoke old URL to avoid memory leaks if it was a blob
        if (fileUrl && fileUrl.startsWith("blob:")) URL.revokeObjectURL(fileUrl);

        const url = URL.createObjectURL(file);
        setFileUrl(url);

        if (file.type === "image/svg+xml") {
            setFileType("svg");
        } else if (file.type === "image/png") {
            setFileType("png");
        } else {
            alert("Please upload SVG or PNG");
        }
    };

    const updateMaterial = (key: keyof typeof materialProps, value: string | number) => {
        setMaterialProps((prev) => ({ ...prev, [key]: value }));
    };

    const handleExportPNG = useCallback(() => {
        if (canvasRef.current) {
            // The canvas ref from R3F might point to the wrapper div or the canvas element depending on version
            // Actually, we forwarded the ref to the Canvas component.
            // Let's ensure we get the canvas DOM element.
            // Simple trick: triggering a download with the data URL
            const link = document.createElement("a");
            link.setAttribute("download", "logo-3d.png");
            link.setAttribute("href", canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.click();
        }
    }, []);

    const handleExportGLTF = useCallback(() => {
        import("three/examples/jsm/exporters/GLTFExporter.js").then(({ GLTFExporter }) => {
            const exporter = new GLTFExporter();
            if (modelRef.current) {
                exporter.parse(
                    modelRef.current,
                    (gltf) => {
                        const output = JSON.stringify(gltf, null, 2);
                        const blob = new Blob([output], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.style.display = "none";
                        link.href = url;
                        link.download = "logo-3d.gltf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    },
                    (error) => {
                        console.error("An error happened during GLTF export:", error);
                        alert("Error exporting GLTF. Check console.");
                    },
                    { binary: false } // Export as .gltf (text) vs .glb (binary) - user requested .gltf
                );
            } else {
                alert("No 3D model found to export.");
            }
        });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6 p-6">
            {/* Controls sidebar content... */}
            <div className="w-full lg:w-1/4 flex flex-col gap-6 bg-neutral-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 overflow-y-auto">
                {/* Header and Upload... */}
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-2">3D Logoizer</h2>
                    <p className="text-neutral-400 text-sm">Turn SVG logos into 3D metal art.</p>
                </div>

                {/* Upload Zone */}
                <div className="relative group cursor-pointer border-2 border-dashed border-white/20 hover:border-blue-500/50 rounded-xl p-8 transition-all bg-black/20 hover:bg-black/40">
                    <input
                        type="file"
                        accept=".svg"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2 text-neutral-400 group-hover:text-white transition-colors">
                        <Upload className="w-8 h-8" />
                        <span className="text-sm font-medium">Drop SVG File</span>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest">SVG Only</span>
                    </div>
                </div>

                {/* Material Controls */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider border-b border-white/10 pb-2">Material</h3>

                    <ColorPicker
                        label="Surface Color"
                        color={materialProps.color}
                        onChange={(val) => updateMaterial("color", val)}
                    />

                    <Slider
                        label="Metalness"
                        value={materialProps.metalness}
                        min={0}
                        max={1}
                        step={0.05}
                        onChange={(e) => updateMaterial("metalness", parseFloat(e.target.value))}
                        valueDisplay={`${Math.round(materialProps.metalness * 100)}%`}
                    />

                    <Slider
                        label="Roughness"
                        value={materialProps.roughness}
                        min={0}
                        max={1}
                        step={0.05}
                        onChange={(e) => updateMaterial("roughness", parseFloat(e.target.value))}
                        valueDisplay={`${Math.round(materialProps.roughness * 100)}%`}
                    />

                    <Slider
                        label="Reflection Intensity"
                        value={materialProps.intensity}
                        min={0}
                        max={5}
                        step={0.1}
                        onChange={(e) => updateMaterial("intensity", parseFloat(e.target.value))}
                        valueDisplay={materialProps.intensity.toFixed(1)}
                    />

                    <Slider
                        label="Depth (Thickness)"
                        value={materialProps.depth}
                        min={0.1}
                        max={100} // Increased max depth as requested
                        step={0.1}
                        onChange={(e) => updateMaterial("depth", parseFloat(e.target.value))}
                        valueDisplay={materialProps.depth.toFixed(1)}
                    />
                </div>

                {/* Scene Controls */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Scene Controls</h3>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Show Floor/Grid</span>
                        <button
                            onClick={() => setShowGrid(!showGrid)}
                            className={`w-10 h-5 rounded-full relative transition-colors ${showGrid ? "bg-blue-600" : "bg-neutral-700"}`}
                        >
                            <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${showGrid ? "translate-x-5" : ""}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Auto Rotate</span>
                        <button
                            onClick={() => setAutoRotate(!autoRotate)}
                            className={`w-10 h-5 rounded-full relative transition-colors ${autoRotate ? "bg-blue-600" : "bg-neutral-700"}`}
                        >
                            <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${autoRotate ? "translate-x-5" : ""}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Transparent Background</span>
                        <button
                            onClick={() => setTransparentImg(!transparentImg)}
                            className={`w-10 h-5 rounded-full relative transition-colors ${transparentImg ? "bg-blue-600" : "bg-neutral-700"}`}
                        >
                            <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${transparentImg ? "translate-x-5" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
                    <button
                        onClick={handleExportPNG}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                        <ImageIcon className="w-4 h-4" />
                        Export PNG
                    </button>
                    <button
                        onClick={handleExportGLTF}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export 3D (.gltf)
                    </button>
                </div>
            </div>

            {/* 3D Viewport */}
            <div className={`flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative ${transparentImg ? "bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2nk5eWdZnwcGDAyMjLAAFAUDOAzh8GgAAgE/8/Ozv4/b968/xgYBgAA//8AAP//h20CgQAAAABJRU5ErkJggg==')] bg-repeat" : "bg-black"}`}>
                {!fileUrl && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="text-center">
                            <Scan className="w-12 h-12 text-white/20 mx-auto mb-4 animate-pulse" />
                            <p className="text-white/40 font-light">Upload a logo to begin</p>
                        </div>
                    </div>
                )}
                <Scene
                    ref={canvasRef}
                    modelRef={modelRef}
                    fileUrl={fileUrl}
                    fileType="svg" // Always SVG now
                    materialProps={materialProps}
                    showGrid={showGrid}
                    autoRotate={autoRotate}
                    transparentImg={transparentImg}
                />
            </div>
        </div>
    );
}


