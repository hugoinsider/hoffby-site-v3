"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Center, Stage } from "@react-three/drei";
import LogoModel from "./LogoModel";
import { forwardRef } from "react";

interface SceneProps {
    fileUrl: string | null;
    fileType: "svg" | "png" | null;
    materialProps: {
        color: string;
        metalness: number;
        roughness: number;
        intensity: number;
        depth: number;
    };
    showGrid: boolean;
    autoRotate: boolean;
    transparentImg: boolean;
}

// Forward ref to allow parent to access the canvas (for screenshots)
// Added modelRef prop for GLTF export
const Scene = forwardRef<HTMLCanvasElement, SceneProps & { modelRef: React.RefObject<any> }>(({ fileUrl, fileType, materialProps, modelRef, showGrid, autoRotate, transparentImg }, ref) => {
    return (
        <Canvas
            ref={ref}
            shadows
            gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
            camera={{ position: [0, 10, 20], fov: 45 }}
            className={`w-full h-full rounded-xl ${transparentImg ? '' : 'bg-neutral-900/50'}`}
        >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

            <Center top>
                <group ref={modelRef}>
                    <LogoModel
                        fileUrl={fileUrl}
                        fileType={fileType}
                        {...materialProps}
                    />
                </group>
            </Center>

            {/* 3D Backdrop Floor - Conditionally rendered */}
            {showGrid && !transparentImg && (
                <>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                        <planeGeometry args={[100, 100]} />
                        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.8} />
                    </mesh>
                    <gridHelper args={[100, 100, 0x444444, 0x111111]} position={[0, -0.09, 0]} />
                </>
            )}

            {/* Environment: Background prop controls visibility of the HDRI background */}
            <Environment preset="city" background={!transparentImg} blur={0.8} />
            {/* Free movement enabled (removed polar limits), added autoRotate */}
            <OrbitControls makeDefault autoRotate={autoRotate} />
        </Canvas>
    );
});

Scene.displayName = "Scene";

export default Scene;
