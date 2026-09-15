'use client';

import React from 'react';
import { Star, Sparkles, CheckCircle2, Quote } from 'lucide-react';

const REVIEWS = [
  {
    quote: 'Bought a 3 BHK in Wakad directly from the owner. Saved ₹2,40,000 in broker commission which completely covered our registration and stamp duty!',
    name: 'Rajesh Sharma',
    role: 'Software Architect',
    location: 'Pune',
    avatar: 'RS',
    avatarBg: '#522AB0',
    saved: 'Saved ₹2.4 Lakhs',
    deal: 'Purchased 3 BHK',
  },
  {
    quote: 'Listed my 2 BHK flat on Tuesday, received direct WhatsApp messages from genuine families, and signed the e-stamped rent agreement by Friday. No agent spam at all.',
    name: 'Pooja Mehta',
    role: 'Property Owner',
    location: 'Ahmedabad',
    avatar: 'PM',
    avatarBg: '#059669',
    saved: 'Saved ₹36,000 Brokerage',
    deal: 'Rented in 4 Days',
  },
  {
    quote: 'Invested in a 4,500 sq.ft plot in Dholera SIR TP-2. The legal title verification checked the 7/12 records and zoning clearance thoroughly before we paid the token.',
    name: 'Amit Patel',
    role: 'NRI Investor',
    location: 'Dholera SIR / Surat',
    avatar: 'AP',
    avatarBg: '#D97706',
    saved: 'Clear Title Verified',
    deal: 'Dholera SIR Plot Deal',
  },
];

export function TestimonialsSection() {
  return (
    <section style={{ padding: '60px 0', background: '#FFFFFF', borderTop: '1px solid #F1F5F9' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
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
              <Sparkles style={{ width: 13, height: 13 }} /> GENUINE CUSTOMER EXPERIENCES
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 800, color: '#111827', margin: '4px 0 0 0' }}>
              What Buyers, Tenants &amp; Owners Say
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', margin: '6px 0 0 0' }}>
              Real stories from users who saved thousands in broker commission with 100% peace of mind.
            </p>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FEF3C7',
              border: '1px solid #FDE68A',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 750,
              color: '#92400E',
            }}
          >
            <span style={{ color: '#F59E0B' }}>★★★★★</span>
            <span>4.9/5 from 14,000+ Deals</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {REVIEWS.map((r, idx) => (
            <div
              key={idx}
              style={{
                background: '#FAF9FD',
                border: '1.5px solid #EBE6F7',
                borderRadius: '20px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#C4B5FD';
                e.currentTarget.style.boxShadow = '0 14px 28px rgba(82, 42, 176, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#EBE6F7';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} style={{ width: 16, height: 16, fill: '#FEDC00', color: '#EAB308' }} />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#059669',
                      background: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      padding: '3px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    ✓ {r.saved}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.65', margin: '0 0 20px 0', fontStyle: 'italic' }}>
                  "{r.quote}"
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid #E2E8F0',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: r.avatarBg,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  {r.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{r.name}</span>
                    <CheckCircle2 style={{ width: 14, height: 14, color: '#10B981' }} />
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {r.role} • {r.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

