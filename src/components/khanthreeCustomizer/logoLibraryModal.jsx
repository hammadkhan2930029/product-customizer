import React, { useState, useMemo } from 'react';
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import logo3 from '../../assets/logo3.png';
import logo4 from '../../assets/logo4.png';
export default function LogoLibraryModal({ show, onClose, onSelectLogo }) {
  const [search, setSearch] = useState('');

  // Preloaded logos grouped by category
  const preloadedLogos = useMemo(() => ({
    Fun: [
      logo1,
      logo2,
    ],
    Sports: [
      logo1,
      logo2,
      logo3,
      logo4,
    ],
    Brands: [
      logo1,
      logo3,
      logo4,
    ]
  }), []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    }}>
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '10px',
        maxHeight: '80vh',
        overflowY: 'auto',
        width: '80%',
        maxWidth: '600px'
      }}>
        <h3>Select a Logo</h3>
        <input
          type="text"
          placeholder="Type to search logos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        {Object.entries(preloadedLogos).map(([category, logos]) => {
          // Filter logos by search
          const filtered = logos.filter(logo =>
            logo.toLowerCase().includes(search.toLowerCase())
          );

          if (filtered.length === 0) return null;

          return (
            <div key={category} style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>{category}</h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '10px'
              }}>
                {filtered.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    style={{ width: '100%', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ddd' }}
                    onClick={() => {
                      onSelectLogo(logo);
                      onClose();
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}

        <button
          onClick={onClose}
          style={{
            marginTop: '10px',
            padding: '10px 15px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
