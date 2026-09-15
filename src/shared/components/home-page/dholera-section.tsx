'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plane,
  Cpu,
  Train,
  CheckCircle2,
} from 'lucide-react';

const DHOLERA_METRICS = [
  { value: '₹11 Lakhs', label: 'Starting Plot Price', sub: 'Affordable Entry' },
  { value: '920 sq.km', label: 'Total Planned Region', sub: '2x Size of Delhi' },
  { value: '44 Villages', label: 'Dholera + Lothal Covered', sub: 'TP 1 to TP 6 Schemes' },
  { value: 'Tata Fab', label: 'Semiconductor Hub', sub: '₹91,000 Cr Investment' },
];

const HIGHLIGHTS = [
  { icon: <Cpu className="w-4 h-4 text-[#FEDC00]" />, text: 'Tata Electronics Semiconductor Fab' },
  { icon: <Plane className="w-4 h-4 text-[#34D399]" />, text: 'Dholera International Cargo Airport' },
  { icon: <Train className="w-4 h-4 text-[#60A5FA]" />, text: 'Ahmedabad-Dholera Expressway & Monorail' },
  { icon: <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />, text: '100% Clear Title NA & NOC Approved' },
];

export function DholeraSection() {
  return (
    <section
      style={{
        padding: '70px 0',
        background: 'linear-gradient(135deg, #0F0524 0%, #1E0B45 50%, #341270 100%)',
        position: 'relative',
        overflow: 'hidden',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254, 220, 0, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(82, 42, 176, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Info & Highlights */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(254, 220, 0, 0.15)',
                border: '1.5px solid rgba(254, 220, 0, 0.4)',
                color: '#FEDC00',
                padding: '5px 14px',
                borderRadius: '999px',
                fontSize: '11.5px',
                fontWeight: 850,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '16px',
                boxShadow: '0 0 16px rgba(254, 220, 0, 0.25)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> DHOLERA SPECIAL INVESTMENT REGION (SIR)
            </div>

            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 800,
                lineHeight: 1.25,
                color: '#FFFFFF',
                margin: '0 0 14px 0',
                letterSpacing: '-0.5px',
              }}
            >
              India&apos;s First Greenfield Smart City,{' '}
              <span style={{ color: '#FEDC00', textDecoration: 'underline', textDecorationColor: 'rgba(254, 220, 0, 0.5)' }}>
                Plot by Plot
              </span>
            </h2>

            <p
              style={{
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.82)',
                lineHeight: 1.6,
                margin: '0 0 24px 0',
                maxWidth: '560px',
              }}
            >
              Buy verified NA and NOC cleared plots inside the Activation Zone, Expressway corridor, and TP schemes. Surrounded by Tata Semiconductor Fab, greenfield international airport, and high-speed monorail.
            </p>

            {/* Feature Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
                marginBottom: '28px',
              }}
            >
              {HIGHLIGHTS.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    fontWeight: 650,
                    color: '#E2E8F0',
                  }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/dholera-sir"
                style={{
                  background: '#FEDC00',
                  color: '#1C0A3F',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '14.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(254, 220, 0, 0.4)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <span>Explore Dholera Plots</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?subject=Dholera+Site+Visit"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '12px 22px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span>Book Free Site Visit</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Key Metrics Card Grid */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '28px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px 0' }}>
                  Smart City Growth Highlights
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                  Official Dholera SIR Investment Region Data
                </p>
              </div>
              <div
                style={{
                  background: 'rgba(52, 211, 153, 0.2)',
                  color: '#34D399',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> High ROI Zone
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
              }}
            >
              {DHOLERA_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    padding: '18px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '22px', fontWeight: 900, color: '#FEDC00', lineHeight: 1.2 }}>
                    {metric.value}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 750, color: '#FFFFFF', marginTop: '4px' }}>
                    {metric.label}
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                    {metric.sub}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '18px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12.5px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              <span>📌 Includes Activation Area &amp; TP 1-6</span>
              <Link
                href="/dholera-sir"
                style={{ color: '#FEDC00', fontWeight: 750, textDecoration: 'none' }}
              >
                View Full Master Plan &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DholeraSection;
