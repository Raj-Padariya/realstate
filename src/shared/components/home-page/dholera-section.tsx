'use client';

import React from 'react';
import Link from 'next/link';

export function DholeraSection() {
  return (
    <section className="dh">
      <div className="wrap">
        <div>
          <span className="dh-k">Dholera SIR</span>
          <h2>India's first greenfield smart city, plot by plot</h2>
          <p>
            NA and NOC cleared plots inside the activation zone, with the semiconductor fab, the expressway and the international airport all under construction around them.
          </p>
          <div className="dh-facts">
            <div className="dh-fact">
              <b>₹11 L</b>
              <span>Entry plot price</span>
            </div>
            <div className="dh-fact">
              <b>920 sq.km</b>
              <span>Planned region</span>
            </div>
            <div className="dh-fact">
              <b>NA + NOC</b>
              <span>Title status on every listing</span>
            </div>
          </div>
          <div className="band-cta">
            <Link className="btn btn-y" href="/dholera-sir">
              Read the Dholera guide
            </Link>
            <Link className="btn btn-w" href="/contact?subject=Dholera+SIR+Visit">
              Book a site visit
            </Link>
          </div>
        </div>

        <div className="dh-art">
          <svg viewBox="0 0 420 300" role="img" aria-label="Dholera SIR activation-zone site plan">
            <rect width="420" height="300" fill="#4a2699" />
            <path d="M0 96 L420 60" stroke="#FEDC00" strokeWidth="5" opacity=".85" />
            <path d="M0 112 L420 76" stroke="#6b45c9" strokeWidth="12" />
            <path d="M0 96 L420 60" stroke="#FEDC00" strokeWidth="2" strokeDasharray="10 12" />
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3, 4].map((c) => {
                const x = 26 + c * 76;
                const y = 140 + r * 36;
                const isYellow = (r + c) % 4 === 0;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={x}
                    y={y}
                    width="62"
                    height="26"
                    rx="3"
                    fill={isYellow ? '#FEDC00' : '#5E33C4'}
                    opacity={isYellow ? '.9' : '.72'}
                  />
                );
              })
            )}
            <rect x="26" y="126" width="366" height="2" fill="#8f74e0" />
            <text x="26" y="46" fill="#FEDC00" fontFamily="Open Sans, sans-serif" fontSize="13" fontWeight="700">
              EXPRESSWAY
            </text>
            <text x="26" y="290" fill="#cfc2ee" fontFamily="Open Sans, sans-serif" fontSize="12">
              TP 2 · Activation area · illustrative layout
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default DholeraSection;
