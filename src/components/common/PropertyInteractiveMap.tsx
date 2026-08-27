'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PropertyListingItem } from '@/shared/types/cms';

interface PropertyInteractiveMapProps {
  listings: PropertyListingItem[];
  address?: string;
  height?: string;
  className?: string;
  activePinIndex?: number | null;
  onPinClick?: (index: number) => void;
}

// Locality & City precise coordinate lookup table
const CITY_LOCALITY_COORDS: Record<string, [number, number]> = {
  // Pune & Localities
  'baner': [18.559, 73.786],
  'wakad': [18.598, 73.763],
  'hinjewadi': [18.591, 73.738],
  'kharadi': [18.551, 73.945],
  'viman nagar': [18.567, 73.914],
  'kothrud': [18.507, 73.807],
  'aundh': [18.56, 73.807],
  'pune': [18.520, 73.856],

  // Ahmedabad & Localities
  'iskcon': [23.027, 72.507],
  'iscon': [23.027, 72.507],
  'prahlad nagar': [23.013, 72.512],
  'prahladnagar': [23.013, 72.512],
  'satellite': [23.026, 72.518],
  'bodakdev': [23.037, 72.512],
  'bopal': [23.033, 72.464],
  'south bopal': [23.022, 72.458],
  'thaltej': [23.05, 72.508],
  'vastrapur': [23.035, 72.529],
  'gota': [23.106, 72.544],
  'chandkheda': [23.11, 72.585],
  'sg highway': [23.027, 72.507],
  'ahmedabad': [23.022, 72.571],

  // Surat & Localities
  'vesu': [21.144, 72.771],
  'adajan': [21.196, 72.795],
  'pal': [21.178, 72.775],
  'vip road': [21.148, 72.774],
  'surat': [21.170, 72.831],

  // Vadodara
  'alkapuri': [22.31, 73.173],
  'gotri': [22.324, 73.136],
  'bhayli': [22.285, 73.132],
  'vadodara': [22.307, 73.181],

  // Rajkot
  'kalawad road': [22.282, 70.768],
  '150 feet ring road': [22.288, 70.772],
  'rajkot': [22.303, 70.802],

  // Mumbai & Localities
  'andheri': [19.119, 72.846],
  'bandra': [19.059, 72.829],
  'powai': [19.117, 72.905],
  'juhu': [19.107, 72.826],
  'borivali': [19.23, 72.856],
  'mumbai': [19.076, 72.877],

  // Bengaluru
  'whitefield': [12.969, 77.749],
  'indiranagar': [12.978, 77.640],
  'koramangala': [12.935, 77.624],
  'hsr layout': [12.912, 77.644],
  'bengaluru': [12.971, 77.594],

  // Hyderabad
  'gachibowli': [17.44, 78.348],
  'hitech city': [17.448, 78.38],
  'hyderabad': [17.385, 78.486],

  // Delhi NCR
  'gurugram': [28.459, 77.026],
  'noida': [28.535, 77.391],
  'delhi': [28.613, 77.209],

  // Dholera SIR
  'dholera': [22.251, 72.193],
};

function getCoordsFromAddress(addressStr?: string): [number, number] {
  if (!addressStr) return CITY_LOCALITY_COORDS.pune;
  const lower = addressStr.toLowerCase();

  for (const [key, coords] of Object.entries(CITY_LOCALITY_COORDS)) {
    if (lower.includes(key)) {
      return coords;
    }
  }
  return CITY_LOCALITY_COORDS.pune;
}

export default function PropertyInteractiveMap({
  listings = [],
  address = 'Baner, Pune',
  height = '520px',
  className = '',
  activePinIndex = null,
  onPinClick,
}: PropertyInteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [leafletLoaded, setLeafletLoaded] = useState<boolean>(false);
  const [useFallbackEmbed, setUseFallbackEmbed] = useState<boolean>(false);

  // Load Leaflet CSS, Custom Pin CSS, and Leaflet JS dynamically
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById('leaflet-custom-css')) {
      const style = document.createElement('style');
      style.id = 'leaflet-custom-css';
      style.innerHTML = `
        .leaflet-price-pin {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          padding: 4px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18) !important;
        }
      `;
      document.head.appendChild(style);
    }

    if ((window as any).L) {
      setLeafletLoaded(true);
    } else {
      let script = document.getElementById('leaflet-js') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        document.body.appendChild(script);
      }
      script.onload = () => setLeafletLoaded(true);
      script.onerror = () => setUseFallbackEmbed(true);
    }
  }, []);

  // Initialize and update Leaflet Map instance & Markers
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    const mainCenterCoords = getCoordsFromAddress(address);

    // Initialize Map if not created
    if (!mapInstanceRef.current) {
      try {
        const map = L.map(mapContainerRef.current, {
          center: mainCenterCoords,
          zoom: 14,
          scrollWheelZoom: true,
        });

        // OpenStreetMap Standard & Fast CDN Tile Layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
      } catch (e) {
        console.warn('Map init error:', e);
      }
    } else {
      try {
        mapInstanceRef.current.setView(mainCenterCoords, 14, { animate: true });
      } catch (e) {}
    }

    const map = mapInstanceRef.current;

    // Trigger invalidateSize and ResizeObserver to eliminate any gray tile gaps
    if (map && mapContainerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        try {
          map.invalidateSize();
        } catch (e) {}
      });
      resizeObserver.observe(mapContainerRef.current);

      const resizeTimes = [50, 150, 300, 600, 1200];
      resizeTimes.forEach((delay) => {
        setTimeout(() => {
          try {
            map.invalidateSize();
          } catch (e) {}
        }, delay);
      });
    }

    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => {
      try {
        m.remove();
      } catch (e) {}
    });
    markersRef.current = [];

    const boundsPoints: [number, number][] = [];

    // Add native synchronized price markers (L.divIcon)
    listings.forEach((item, idx) => {
      const itemBaseCoords = getCoordsFromAddress(item.address || address);
      const lat = itemBaseCoords[0] + ((idx % 3) - 1) * 0.0018 + Math.floor(idx / 3) * 0.0012;
      const lng = itemBaseCoords[1] + (((idx * 2) % 3) - 1) * 0.0022;

      boundsPoints.push([lat, lng]);

      const isSelected = activePinIndex === idx;

      // Custom native HTML Leaflet price pin icon
      const customIcon = L.divIcon({
        className: 'leaflet-price-pin',
        html: `
          <div style="
            background: ${isSelected ? '#522ab0' : '#ffffff'};
            color: ${isSelected ? '#ffffff' : '#1c1f23'};
            padding: 6px 12px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 800;
            white-space: nowrap;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
            border: 2px solid ${isSelected ? '#FEDC00' : '#522ab0'};
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
            transition: all 0.2s ease;
          ">
            <span style="color: #ff3b30; font-size: 11px;">📍</span>
            <span>${item.price}</span>
          </div>
        `,
        iconSize: [90, 32],
        iconAnchor: [45, 16],
      });

      // Popup HTML content
      const popupHtml = `
        <div style="width: 220px; font-family: system-ui, sans-serif; padding: 4px;">
          <img src="${item.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'}" style="width:100%; height:110px; object-fit:cover; border-radius:8px; margin-bottom:8px;" alt="${item.title}" />
          <div style="font-size: 13px; font-weight: 800; color: #1c1f23; line-height: 1.3; margin-bottom: 4px;">${item.title}</div>
          <div style="font-size: 11px; color: #6c757d; margin-bottom: 8px;">📍 ${item.address}</div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 14px; font-weight: 900; color: #522ab0;">${item.price}</span>
            <a href="/property/${item.id}" style="background:#522ab0; color:#fff; text-decoration:none; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:700;">View Details</a>
          </div>
        </div>
      `;

      try {
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(popupHtml);

        marker.on('click', () => {
          if (onPinClick) onPinClick(idx);
        });

        markersRef.current.push(marker);
      } catch (e) {}
    });

    // Auto-fit map bounds if markers are present
    if (boundsPoints.length > 0) {
      try {
        const bounds = L.latLngBounds(boundsPoints);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      } catch (err) {}
    }
  }, [leafletLoaded, listings, address, activePinIndex]);

  // Window resize handler to invalidate map size automatically
  useEffect(() => {
    const handleWindowResize = () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.invalidateSize();
        } catch (e) {}
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const displayAddr = address || 'Ahmedabad, Gujarat';
  const encodedAddress = encodeURIComponent(displayAddr);
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className={`property-interactive-map ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height,
        minHeight: '520px',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#e5e3df',
      }}
    >
      {!leafletLoaded && !useFallbackEmbed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f4f5f8',
            color: '#522ab0',
            fontWeight: 700,
            fontSize: '13px',
          }}
        >
          Loading Google Maps Engine…
        </div>
      )}

      {useFallbackEmbed ? (
        <iframe
          title={`Map of ${displayAddr}`}
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '520px' }}
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div
          ref={mapContainerRef}
          style={{ width: '100%', height: '100%', minHeight: '520px' }}
        />
      )}
    </div>
  );
}
