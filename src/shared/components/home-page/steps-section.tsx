'use client';

import React from 'react';
import { Search, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: <Search style={{ width: 24, height: 24, color: '#522AB0' }} />,
    bg: '#F1ECFB',
    title: 'Search & Shortlist Directly',
    desc: 'Filter properties by verified owner status, locality, BHK, and price without wading through fake duplicate broker ads.',
    tag: '100% Genuine Listings',
  },
  {
    num: '02',
    icon: <PhoneCall style={{ width: 24, height: 24, color: '#16A34A' }} />,
    bg: '#DCFCE7',
    title: 'Connect Directly on WhatsApp / Call',
    desc: 'Get direct mobile numbers. Fix personal site visits directly with the real owner when convenient for you.',
    tag: 'Zero Middlemen',
  },
  {
    num: '03',
    icon: <ShieldCheck style={{ width: 24, height: 24, color: '#D97706' }} />,
    bg: '#FEF3C7',
    title: 'Verify Papers & Close at ₹0 Brokerage',
    desc: 'Verify 7/12 land records and title certificates with a legal advocate, get e-stamped rent agreements, and close peacefully.',
    tag: 'Legal Protection & ₹0 Fee',
  },
];

export function StepsSection() {
  return (
    <section style={{ padding: '60px 0', background: '#F8FAFC', borderTop: '1px solid #EEF2F6', borderBottom: '1px solid #EEF2F6' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#522AB0',
              background: '#EDE9FE',
              padding: '5px 14px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '10px',
            }}
          >
            <Sparkles style={{ width: 13, height: 13 }} /> SIMPLE &amp; TRANSPARENT PROCESS
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 800, color: '#111827', margin: '4px 0 8px 0' }}>
            How a Deal Closes in 3 Simple Steps
          </h2>
          <p style={{ fontSize: '15px', color: '#64748B', margin: 0 }}>
            No agents, no hidden commissions, and complete legal transparency from search to handover.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            position: 'relative',
          }}
        >
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '20px',
                padding: '30px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#522AB0';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(82, 42, 176, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.03)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '14px',
                      background: s.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '24px',
                      fontWeight: 900,
                      color: '#CBD5E1',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    {s.num}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 10px 0', lineHeight: 1.35 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                  {s.desc}
                </p>
              </div>

              <div
                style={{
                  paddingTop: '14px',
                  borderTop: '1px solid #F1F5F9',
                }}
              >
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 750,
                    color: '#522AB0',
                    background: '#F5F3FF',
                    border: '1px solid #EDE9FE',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    display: 'inline-block',
                  }}
                >
                  ✓ {s.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StepsSection;

