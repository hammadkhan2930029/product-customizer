import React, { useState } from 'react';
import ShirtModel from './ShirtModel';

export default function SceneUI() {
    const [zoom, setZoom] = useState(1);

    return (
        <>
            {/* Slider UI */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '10px 16px',
                    borderRadius: 10,
                }}
            >
                <input
                    type="range"
                    min="0.6"
                    max="2.5"
                    step="0.01"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                />
            </div>

            <ShirtModel zoom={zoom} />
        </>
    );
}
