import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ShirtModel from './ShirtModel';
import Controls from './Controls';

export default function Customizer2D() {
    // 1. SARE HOOKS TOP PAR RAKHEIN (Koi bhi return inke niche hoga)
    const [shirtColor, setShirtColor] = useState('#ffffff');
    const [shirtText, setShirtText] = useState('');
    const [shirtTextColor, setShirtTextColor] = useState('#000000');
    const [textSize, setTextSize] = useState(20);
    const [logoTexture, setLogoTexture] = useState(null);
    const [logoScale, setLogoScale] = useState(1.5);
    const [finalImage, setFinalImage] = useState(null);
    const [zoom, setZoom] = useState(1);

    // 2. Functions
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setLogoTexture(event.target.result);
            reader.readAsDataURL(file);
        }
    };
    //-----------------------------------------------


    const saveDesign = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            setFinalImage(dataUrl);
        }
    };
    //-----------------------------------------------
    const handleWheelZoom = (e) => {
        e.preventDefault();
        setZoom(z =>
            Math.min(Math.max(z - e.deltaY * 0.001, 0.6), 2.5)
        );
    };


    // 3. CONDITION WALA RETURN HOOKS KE BAAD RAKHEIN
    if (finalImage) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
                <h2 style={{ marginBottom: '20px' }}>Your Custom Design</h2>
                <div style={{ border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', background: '#fff' }}>
                    <img src={finalImage} alt="Design Preview" style={{ width: '100%', maxHeight: '70vh', display: 'block' }} />
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => setFinalImage(null)} style={{ padding: '10px 20px', cursor: 'pointer' }}>Back to Edit</button>
                    <a href={finalImage} download="shirt-design.png" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Download Image</a>
                </div>
            </div>
        );
    }

    // 4. MAIN RENDER
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Arial' }}>
            <div style={{ flex: 1, backgroundColor: '#f0f0f0', position: 'relative' }}>
                <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 0, 10], fov: 45 }} onWheel={handleWheelZoom}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 2, 5]} intensity={0.5} />

                    <Suspense fallback={null}>
                        <ShirtModel
                            logo={logoTexture}
                            logoScale={logoScale}
                            color={shirtColor}
                            text={shirtText}
                            textColor={shirtTextColor}
                            textSize={textSize}
                            zoom={zoom}
                        />
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        enableRotate={false}
                        enablePan={false}
                        enableZoom={false} />
                </Canvas>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#fff', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
                <Controls
                    color={shirtColor} setColor={setShirtColor}
                    text={shirtText} setText={setShirtText}
                    textColor={shirtTextColor} setTextColor={setShirtTextColor}
                    textSize={textSize} setTextSize={setTextSize}
                    logoScale={logoScale} setLogoScale={setLogoScale}
                    handleImageUpload={handleImageUpload}
                />
                <button onClick={saveDesign} style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Generate Preview
                </button>
            </div>
        </div>
    );
}