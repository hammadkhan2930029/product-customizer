// import { useMemo } from 'react';
// import { useLoader } from '@react-three/fiber';
// import { TextureLoader, CanvasTexture, LinearFilter } from 'three';
// import { PivotControls, useTexture } from '@react-three/drei';
// import React, { useState, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';


// export default function ShirtModel({ color, text, textColor, textSize, logo, logoScale, zoom }) {
//     const baseTexture = useLoader(TextureLoader, '/mug.png');
//     const mugRef = useRef();

//     useFrame(() => {
//         if (mugRef.current) {
//             mugRef.current.scale.x += (zoom - mugRef.current.scale.x) * 0.1;
//             mugRef.current.scale.y += (zoom - mugRef.current.scale.y) * 0.1;
//         }
//     });
//     const uploadedLogo = useTexture(logo || '/mug.png');

//     const planeWidth = 5;
//     const planeHeight = planeWidth * (209 / 216);


//     const textTexture = useMemo(() => {
//         if (!text) return null;
//         const canvas = document.createElement('canvas');
//         canvas.width = 1024;
//         canvas.height = 1024;
//         const ctx = canvas.getContext('2d');
//         ctx.clearRect(0, 0, 1024, 1024);

//         ctx.font = `bold ${textSize * 2}px Arial`;
//         ctx.fillStyle = textColor;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText(text, 512, 512);

//         const texture = new CanvasTexture(canvas);
//         texture.minFilter = LinearFilter;
//         texture.needsUpdate = true;
//         return texture;
//     }, [text, textColor, textSize]);

//     return (
//         <group>
//             {/* Shirt Base */}
//             <mesh ref={mugRef}
//                 onWheel={(e) => {
//                     e.stopPropagation();
//                     setZoom(z => Math.min(Math.max(z - e.deltaY * 0.001, 0.6), 2.5));
//                 }}>
//                 <planeGeometry args={[planeWidth, planeHeight]} />
//                 <meshBasicMaterial map={baseTexture} color={color} transparent />
//             </mesh>

//             {/* Logo Display - LogoScale yahan apply ho raha hai */}
//             {logo && (
//                 <PivotControls activeAxes={[true, true, false]} depthTest={false} disableRotations={true} visible={isEditing}>
//                     <mesh position={[0, 0, 0.05]}>
//                         <planeGeometry args={[logoScale, logoScale]} />
//                         <meshBasicMaterial map={uploadedLogo} transparent />
//                     </mesh>
//                 </PivotControls>
//             )}

//             {/* Text Overlay */}
//             {textTexture && (
//                 <PivotControls activeAxes={[true, true, false]} depthTest={false} disableRotations={true} visible={isEditing}>
//                     <mesh position={[0, 0, 0.1]}>
//                         <planeGeometry args={[planeWidth, planeHeight]} />
//                         <meshBasicMaterial map={textTexture} transparent />
//                     </mesh>
//                 </PivotControls>
//             )}
//         </group>
//     );
// }

import { useMemo, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, CanvasTexture, LinearFilter } from 'three';
import { PivotControls, useTexture } from '@react-three/drei';

export default function ShirtModel({
    color, text, textColor, textSize, logo, logoScale, zoom,
    isEditing
}) {


    const emptyTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL();
    }, []);

    const baseTexture = useLoader(TextureLoader, '/shirt.png');
    const uploadedLogo = useTexture(logo || emptyTexture);



    const mugRef = useRef();

    useFrame(() => {
        if (mugRef.current) {
            mugRef.current.scale.x += (zoom - mugRef.current.scale.x) * 0.1;
            mugRef.current.scale.y += (zoom - mugRef.current.scale.y) * 0.1;
        }
    });
   


    const planeWidth = 5;
    const planeHeight = planeWidth * (209 / 216);

    const textTexture = useMemo(() => {
        if (!text) return null;
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 1024, 1024);
        ctx.font = `bold ${Math.max(textSize * 2, 1)}px Arial`;

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
        <group >
            {/* Mug Base (STATIC) */}
            <mesh ref={mugRef}  >
                <planeGeometry args={[planeWidth, planeHeight]} />
                <meshBasicMaterial map={baseTexture} color={color} transparent />
            </mesh>
            


            {/* Logo */}
            {logo && uploadedLogo && (
                <PivotControls
                    activeAxes={[true, true, false]}
                    disableRotations
                    depthTest={false}
                    visible={isEditing}
                >
                    <mesh position={[0, 0, 0.05]}>
                        <planeGeometry args={[logoScale, logoScale]} />
                        <meshBasicMaterial map={uploadedLogo} transparent />
                    </mesh>
                </PivotControls>
            )}


            {/* Text */}
            {textTexture && (
                <PivotControls
                    activeAxes={[true, true, false]}
                    disableRotations
                    depthTest={false}
                    visible={isEditing}
                >
                    <mesh position={[0, 0, 0.1]}>
                        <planeGeometry args={[planeWidth, planeHeight]} />
                        <meshBasicMaterial map={textTexture} transparent />
                    </mesh>
                </PivotControls>
            )}
        </group>
    );
}
