'use client';

import React from 'react';
import { UserCheck, IndianRupee, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: <UserCheck style={{ width: 26, height: 26, color: '#522AB0' }} />,
    iconBg: '#F1ECFB',
    title: '100% Direct Owners',
    desc: 'Every single listing is directly posted by verified property owners. Zero agent reposts or duplicate spam.',
    highlight: 'Direct WhatsApp & Call',
  },
  {
    icon: <IndianRupee style={{ width: 26, height: 26, color: '#16A34A' }} />,
    iconBg: '#DCFCE7',
    title: '0% Brokerage Charged',
    desc: 'Pay zero commission on rental deals and property purchases. Save up to ₹50,000 to ₹5 Lakhs on every deal.',
    highlight: 'Keep 100% of Your Money',
  },
  {
    icon: <ShieldCheck style={{ width: 26, height: 26, color: '#D97706' }} />,
    iconBg: '#FEF3C7',
    title: 'Verified 7/12 & Legal Title',
    desc: 'Clear title, NA & NOC certifications verified by registered legal advocates before token payment.',
    highlight: 'Safe & Dispute-Free',
  },
  {
    icon: <KeyRound style={{ width: 26, height: 26, color: '#0284C7' }} />,
    iconBg: '#E0F2FE',
    title: 'Ready To Move Homes',
    desc: 'Filter directly for possession-ready flats, independent villas, and commercial spaces ready for immediate move-in.',
    highlight: 'Instant Handover',
  },
];

export function TrustSection() {
  return (
    <section style={{ padding: '40px 0', background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {TRUST_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                background: '#FAF9FD',
                border: '1px solid #EBE6F7',
                borderRadius: '16px',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(82, 42, 176, 0.08)';
                e.currentTarget.style.borderColor = '#C4B5FD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#EBE6F7';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: pillar.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {pillar.icon}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 750,
                    color: '#522AB0',
                    background: '#FFFFFF',
                    border: '1px solid #E2D9F3',
                    padding: '3px 9px',
                    borderRadius: '999px',
                  }}
                >
                  {pillar.highlight}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;

