'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Landmark,
  Truck,
  UserCheck,
  Camera,
  Receipt,
  CalendarCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const SERVICES = [
  {
    h: '/rent-agreement',
    ic: <FileText style={{ width: 22, height: 22, color: '#522AB0' }} />,
    bg: '#F1ECFB',
    t: 'Doorstep Rent Agreement',
    d: 'Govt. e-stamped legal draft with doorstep biometric verification done inside 24 hours.',
    badge: 'Popular',
  },
  {
    h: '/services/title-check',
    ic: <ShieldCheck style={{ width: 22, height: 22, color: '#D97706' }} />,
    bg: '#FEF3C7',
    t: 'Title & 7/12 Legal Check',
    d: 'Certified high court advocate inspects ownership chain, encumbrance & mutation entries.',
    badge: 'Must Have',
  },
  {
    h: '/services/home-loan',
    ic: <Landmark style={{ width: 22, height: 22, color: '#16A34A' }} />,
    bg: '#DCFCE7',
    t: 'Instant Home Loan Pre-Approval',
    d: 'Lowest interest rates from SBI, HDFC, ICICI, and Axis Bank with zero processing hassle.',
    badge: 'Lowest ROI',
  },
  {
    h: '/services/packers-movers',
    ic: <Truck style={{ width: 22, height: 22, color: '#0284C7' }} />,
    bg: '#E0F2FE',
    t: 'Verified Packers & Movers',
    d: 'Top-rated moving crews with zero-damage guarantee and fixed upfront transparent pricing.',
    badge: 'Guaranteed',
  },
  {
    h: '/services/tenant-verification',
    ic: <UserCheck style={{ width: 22, height: 22, color: '#9333EA' }} />,
    bg: '#F3E8FF',
    t: 'Police & Tenant Verification',
    d: 'Police-format background check, Aadhaar verification, and employment confirmation.',
    badge: 'Fast Track',
  },
  {
    h: '/services/photography',
    ic: <Camera style={{ width: 22, height: 22, color: '#E11D48' }} />,
    bg: '#FFE4E6',
    t: 'Pro HDR Photography',
    d: 'Professional real estate photographer shoots HD photos. Properties with HD photos get 5x calls.',
    badge: '5x Leads',
  },
  {
    h: '/rent-receipts',
    ic: <Receipt style={{ width: 22, height: 22, color: '#0D9488' }} />,
    bg: '#CCFBF1',
    t: 'Instant HRA Rent Receipts',
    d: 'Generate 12-month HRA-compliant rent receipts with revenue stamps instantly for tax filing.',
    badge: 'Free Tool',
  },
  {
    h: '/services/site-visit',
    ic: <CalendarCheck style={{ width: 22, height: 22, color: '#EA580C' }} />,
    bg: '#FFEDD5',
    t: 'Direct Site Visit Booking',
    d: 'Schedule private site visits directly with verified owners at mutually convenient times.',
    badge: 'Direct Connect',
  },
];

export function ServicesSection() {
  return (
    <section style={{ padding: '60px 0', background: '#FAF9FD', borderTop: '1px solid #EEF2F6', borderBottom: '1px solid #EEF2F6' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#522AB0',
                background: '#EDE9FE',
                padding: '5px 12px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '10px',
              }}
            >
              <Sparkles style={{ width: 13, height: 13 }} /> ALL-IN-ONE REAL ESTATE SERVICES
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 800, color: '#111827', margin: '4px 0 0 0' }}>
              Everything You Need to Close Smoothly
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', margin: '6px 0 0 0' }}>
              Legal checks, rent agreements, home loans, and movers — all at zero broker markups.
            </p>
          </div>
          <Link
            href="/services"
            style={{
              fontSize: '14.5px',
              fontWeight: 750,
              color: '#522AB0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            <span>Explore all services</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {SERVICES.map((s, idx) => (
            <Link
              key={idx}
              href={s.h}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #EBE6F7',
                borderRadius: '16px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#522AB0';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(82, 42, 176, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#EBE6F7';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.03)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: s.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.ic}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#522AB0',
                      background: '#F5F3FF',
                      border: '1px solid #EDE9FE',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0', lineHeight: 1.35 }}>
                  {s.t}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                  {s.d}
                </p>
              </div>

              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12.5px',
                  fontWeight: 750,
                  color: '#522AB0',
                }}
              >
                <span>Avail service</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

