import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, CanvasTexture, LinearFilter } from 'three';
import { PivotControls, useTexture } from '@react-three/drei';
import React, { useState } from 'react';

// logoScale ab props se aa raha hai
export default function ShirtModel({ color, text, textColor, textSize, logo, logoScale }) {
    const baseTexture = useLoader(TextureLoader, '/mug.png');

    // Rule fix: Hook hamesha top par
    const uploadedLogo = useTexture(logo || '/mug.png');

    const planeWidth = 5;
    // const planeHeight = planeWidth * (640 / 512);
    const planeHeight = planeWidth * (209 / 216);


    const textTexture = useMemo(() => {
        if (!text) return null;
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1024, 1024);

        ctx.font = `bold ${textSize * 2}px Arial`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 512, 512);

        const texture = new CanvasTexture(canvas);
        texture.minFilter = LinearFilter;
        texture.needsUpdate = true;
        return texture;
    }, [text, textColor, textSize]);

    return (
        <group>
            {/* Shirt Base */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[planeWidth, planeHeight]} />
                <meshBasicMaterial map={baseTexture} color={color} transparent />
            </mesh>

            {/* Logo Display - LogoScale yahan apply ho raha hai */}
            {logo && (
                <PivotControls activeAxes={[true, true, false]} depthTest={false} disableRotations={true} visible={false}>
                    <mesh position={[0, 0, 0.05]}>
                        <planeGeometry args={[logoScale, logoScale]} />
                        <meshBasicMaterial map={uploadedLogo} transparent />
                    </mesh>
                </PivotControls>
            )}

            {/* Text Overlay */}
            {textTexture && (
                <PivotControls activeAxes={[true, true, false]} depthTest={false} disableRotations={true} visible={false}>
                    <mesh position={[0, 0, 0.1]}>
                        <planeGeometry args={[planeWidth, planeHeight]} />
                        <meshBasicMaterial map={textTexture} transparent />
                    </mesh>
                </PivotControls>
            )}
        </group>
    );
}