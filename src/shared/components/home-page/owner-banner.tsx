'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ArrowRight, Zap, ShieldCheck, Clock, UserCheck } from 'lucide-react';

const OWNER_BENEFITS = [
  'Direct enquiries on WhatsApp & Call from authentic buyers/tenants',
  '₹0 listing fee, ₹0 commission, ₹0 renewal fee — 100% Free',
  'Upload 7/12 papers once to earn a Verified Owner Badge',
  'Privacy protection: Your contact is never shared with brokerage agents',
];

const OWNER_STATS = [
  { value: '3,450+', label: 'Owners Listed This Month', icon: <UserCheck className="w-4 h-4 text-[#FEDC00]" /> },
  { value: '24-48 Hrs', label: 'Median Time to 1st Genuine Lead', icon: <Clock className="w-4 h-4 text-[#34D399]" /> },
  { value: '₹0 Fee', label: 'Charged to Owners, Ever', icon: <Zap className="w-4 h-4 text-[#FEDC00]" /> },
  { value: '4.9 / 5', label: 'From 14,800+ Owner Reviews', icon: <Sparkles className="w-4 h-4 text-[#A78BFA]" /> },
];

export function OwnerBanner() {
  return (
    <section
      style={{
        padding: '60px 0',
        background: '#FFFFFF',
      }}
    >
      <div className="wrap">
        <div
          style={{
            background: 'linear-gradient(135deg, #1A073D 0%, #2D0F66 50%, #44178F 100%)',
            borderRadius: '28px',
            padding: '44px 40px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(45, 15, 102, 0.25)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {/* Subtle Ambient Light */}
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              right: '-80px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(254, 220, 0, 0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left Col */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(254, 220, 0, 0.15)',
                  border: '1px solid rgba(254, 220, 0, 0.4)',
                  color: '#FEDC00',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 850,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '14px',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" /> FOR PROPERTY OWNERS &amp; BUILDERS
              </div>

              <h2
                style={{
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0 0 12px 0',
                  lineHeight: 1.25,
                }}
              >
                Sell or Rent Out Faster at{' '}
                <span style={{ color: '#FEDC00' }}>Zero Brokerage</span>
              </h2>

              <p style={{ fontSize: '14.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, margin: '0 0 22px 0' }}>
                Post in just 3 minutes. Authentic buyers and tenants contact you directly without middleman nuisance.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {OWNER_BENEFITS.map((b, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 style={{ width: 18, height: 18, color: '#34D399', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#F1F5F9', fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href="/post-property"
                  style={{
                    background: '#FEDC00',
                    color: '#1C0A3F',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontWeight: 850,
                    fontSize: '14.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(254, 220, 0, 0.4)',
                  }}
                >
                  <span>Post Free Property</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tenant-plans?tab=owner"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <span>Owner Plans</span>
                </Link>
              </div>
            </div>

            {/* Right Col: 4 Stats Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
              }}
            >
              {OWNER_STATS.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1.5px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '18px',
                    padding: '20px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                      {s.value}
                    </span>
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {s.icon}
                    </div>
                  </div>
                  <span style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.35, fontWeight: 550 }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OwnerBanner;

