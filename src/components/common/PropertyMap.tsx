'use client';

import React, { useState, useEffect } from 'react';

interface PropertyMapProps {
  address: string;
  buildingName?: string;
  societyName?: string;
  height?: string;
  className?: string;
  zoom?: number;
  showTitleBadge?: boolean;
}

export default function PropertyMap({
  address,
  buildingName,
  societyName,
  height = '320px',
  className = '',
  zoom = 15,
  showTitleBadge = false,
}: PropertyMapProps) {
  const [loading, setLoading] = useState<boolean>(true);

  // Combine building/society name with locality address for exact location pin
  const fullBuilding = buildingName || societyName || '';
  const displayAddress = fullBuilding
    ? (address?.toLowerCase().includes(fullBuilding.toLowerCase()) ? address : `${fullBuilding}, ${address || ''}`)
    : (address?.trim() || 'Ahmedabad, Gujarat');

  // Clean address for Google Maps embed URL
  const encodedAddress = encodeURIComponent(displayAddress);
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  useEffect(() => {
    setLoading(true);
  }, [address]);

  return (
    <div
      className={`property-map-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        background: '#f4f5f8',
        border: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* MAP HEADER BADGE */}
      {showTitleBadge && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            pointerEvents: 'none',
          }}
        >
          {/* LOCATION BADGE */}
          <div
            style={{
              pointerEvents: 'auto',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: '999px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              maxWidth: 'calc(100% - 130px)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#ff3b30',
                color: '#fff',
                flexShrink: 0,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: '12px', height: '12px', fill: 'currentColor' }}
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </span>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#1c1f23',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {displayAddress}
            </span>
          </div>

          {/* EXTERNAL LINK BUTTON */}
          <a
            href={externalMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: 'auto',
              background: '#0d6efd',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(13, 110, 253, 0.3)',
              transition: 'transform 0.15s ease, background 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#0b5ed7';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#0d6efd';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Open Maps</span>
            <svg
              viewBox="0 0 24 24"
              style={{
                width: '12px',
                height: '12px',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 2.5,
              }}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(244, 245, 248, 0.9)',
            backdropFilter: 'blur(4px)',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid rgba(13, 110, 253, 0.2)',
              borderTopColor: '#0d6efd',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#6c757d' }}>
            Pinpointing location...
          </span>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* MAP IFRAME */}
      <iframe
        title={`Map of ${displayAddress}`}
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
