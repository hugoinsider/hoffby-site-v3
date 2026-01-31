"use client";

import { useLoader } from "@react-three/fiber";
// @ts-ignore
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { TextureLoader } from "three";
import { useMemo } from "react";
import * as THREE from "three";

interface LogoModelProps {
    fileUrl: string | null;
    fileType: "svg" | "png" | null;
    color: string;
    metalness: number;
    roughness: number;
    intensity: number;
    depth: number;
}

// Sub-component for SVG - ensures hook is called effectively unconditionally within this component
function SvgLogo({ url, material, depth }: { url: string; material: THREE.Material, depth: number }) {
    const svgData = useLoader(SVGLoader, url);

    const shapes = useMemo(() => {
        return svgData.paths.flatMap((path: any) =>
            path.toShapes(true).map((shape: any) => ({ shape, color: path.color }))
        );
    }, [svgData]);

    return (
        <group scale={0.01} rotation={[Math.PI, 0, 0]}>
            {/* Center the group roughly */}
            <group position={[-50, -50, 0]}>
                {shapes.map((item: any, index: number) => (
                    <mesh key={index} material={material} position={[0, 0, 0]}>
                        <extrudeGeometry
                            args={[
                                item.shape,
                                {
                                    depth: depth, // Dynamic depth
                                    bevelEnabled: true,
                                    bevelThickness: 0.5,
                                    bevelSize: 0.5,
                                    bevelSegments: 10,
                                },
                            ]}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

// Sub-component for PNG
function PngLogo({ url, color, metalness, roughness, intensity, depth }: { url: string; color: string; metalness: number; roughness: number; intensity: number; depth: number }) {
    const texture = useLoader(TextureLoader, url);
    // Calculate aspect ratio
    const aspect = texture.image.width / texture.image.height;
    // Base size
    const width = 3;
    const height = width / aspect;

    // Create a specific material for PNG
    const pngMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        map: texture,
        color: color,
        metalness: metalness,
        roughness: roughness,
        envMapIntensity: intensity,
        transparent: true,
        side: THREE.DoubleSide,
    }), [texture, color, metalness, roughness, intensity]);

    return (
        <mesh material={pngMaterial}>
            {/* Box with dynamic depth */}
            <boxGeometry args={[width, height, depth * 0.1]} />
        </mesh>
    );
}

export default function LogoModel({
    fileUrl,
    fileType,
    color,
    metalness,
    roughness,
    intensity,
    depth = 2, // Default depth
}: LogoModelProps) {
    // Shared material for generic shapes or SVG fallback
    const sharedMaterial = useMemo(
        () =>
            new THREE.MeshPhysicalMaterial({
                color: color,
                metalness: metalness,
                roughness: roughness,
                envMapIntensity: intensity,
                clearcoat: 1,
                clearcoatRoughness: 0.1,
            }),
        [color, metalness, roughness, intensity]
    );

    if (fileType === "svg" && fileUrl) {
        return <SvgLogo url={fileUrl} material={sharedMaterial} depth={depth} />;
    }

    if (fileType === "png" && fileUrl) {
        return <PngLogo url={fileUrl} color={color} metalness={metalness} roughness={roughness} intensity={intensity} depth={depth} />;
    }

    // Fallback / Placeholder
    return (
        <mesh material={sharedMaterial}>
        </mesh>
    );
}
