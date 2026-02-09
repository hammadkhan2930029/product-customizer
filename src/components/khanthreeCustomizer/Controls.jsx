import React, { useState } from 'react';
import LogoLibraryModal from './logoLibraryModal';

export default function Controls({
    color,
    setColor,
    text,
    setText,
    textColor,
    setTextColor,
    textSize,
    setTextSize,
    handleImageUpload,
    logoScale,
    setLogoScale,
    // showLogoModal,
    // setShowLogoModal,
    setLogoTexture,
    logoError
}) {
    const [showLogoModal, setShowLogoModal] = useState(false);
    return (
        <div style={{
           
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px',
            alignItems: 'end'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Shirt Color</label>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: '100%', height: '35px', cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Text Label</label>
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type here..."
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Text Color</label>
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={{ width: '100%', height: '35px', cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Text Size ({textSize}px)</label>
                <input
                    type="range" min="10" max="250"
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {/* Upload Section - Isay full width dene ke liye grid column use kiya hai */}
            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1', marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Upload Icon / Logo</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                        fontSize: '13px',
                        padding: '10px',
                        background: '#f8f9fa',
                        border: '1px dashed #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                />
                <button type="button" onClick={() => setShowLogoModal(true)}>
                    Select from Library
                </button>
                <LogoLibraryModal
                    show={showLogoModal}
                    onClose={() => setShowLogoModal(false)}
                    onSelectLogo={setLogoTexture}
                />
                {logoError && (
                    <span style={{ color: 'red', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                        {logoError}
                    </span>
                )}

            </div>

            {/* Logo Size Slider */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
                    Logo Size ({logoScale.toFixed(1)})
                </label>
                <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={logoScale}
                    onChange={(e) => setLogoScale(Number(e.target.value))}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
}