'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, FileCheck, PhoneCall, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const DEALS = [
  {
    badge: '0% BROKERAGE GUARANTEE',
    title: 'Direct Verified Owners',
    desc: 'Connect directly with authentic property owners across Gujarat & Pune. Save up to ₹50,000+ in agent fees.',
    icon: <ShieldCheck style={{ width: 24, height: 24, color: '#16A34A' }} />,
    iconBg: '#DCFCE7',
    tag: 'Save ₹50,000+',
    cta: 'Explore Direct Properties',
    href: '/properties',
    borderColor: '#BBF7D0',
    hoverBorder: '#16A34A',
  },
  {
    badge: 'DHOLERA SIR SPECIAL',
    title: 'Smart City Land Plots',
    desc: 'Clear title NA+NOC plots inside Gujarat Dholera SIR Investment Region starting from ₹11 Lakhs with high ROI.',
    icon: <MapPin style={{ width: 24, height: 24, color: '#522AB0' }} />,
    iconBg: '#EDE9FE',
    tag: 'From ₹11 Lakhs',
    cta: 'View Dholera Deals',
    href: '/dholera-sir',
    borderColor: '#DDD6FE',
    hoverBorder: '#522AB0',
  },
  {
    badge: 'DOORSTEP RENTAL AGREEMENT',
    title: 'E-Stamped Legal Paperwork',
    desc: 'Official Govt. e-stamped rent agreement drafted with biometric doorstep verification delivered in 24 hours.',
    icon: <FileCheck style={{ width: 24, height: 24, color: '#D97706' }} />,
    iconBg: '#FEF3C7',
    tag: '24 Hr Doorstep Delivery',
    cta: 'Get Rent Agreement',
    href: '/rent-agreement',
    borderColor: '#FDE68A',
    hoverBorder: '#D97706',
  },
  {
    badge: 'INSTANT PHONE NUMBERS',
    title: 'Unlock Direct Contacts',
    desc: 'Get direct mobile numbers of verified owners & schedule site visits instantly without broker interference.',
    icon: <PhoneCall style={{ width: 24, height: 24, color: '#0284C7' }} />,
    iconBg: '#E0F2FE',
    tag: 'Instant Mobile & WhatsApp',
    cta: 'Unlock Contacts Now',
    href: '/tenant-plans',
    borderColor: '#BAE6FD',
    hoverBorder: '#0284C7',
  },
];

export function OffersSection() {
  return (
    <section style={{ padding: '64px 0', background: '#FFFFFF', borderBottom: '1px solid #EEF2F6' }}>
      <div className="wrap">
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#522AB0',
                background: '#F1ECFB',
                border: '1px solid #E2D9F3',
                padding: '5px 14px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '10px',
              }}
            >
              <Sparkles style={{ width: 13, height: 13, color: '#522AB0' }} /> EXCLUSIVE ADVANTAGES &amp; DEALS
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 800, color: '#111827', margin: '4px 0 0 0', letterSpacing: '-0.3px' }}>
              Why Property Seekers Trust GujjuProperty
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', margin: '6px 0 0 0' }}>
              Zero brokerage, 100% verified owners, and complete legal support across Gujarat &amp; Maharashtra.
            </p>
          </div>

          <Link
            href="/buyer-plans"
            style={{
              fontSize: '14.5px',
              fontWeight: 750,
              color: '#522AB0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#F5F3FF',
              border: '1.5px solid #DDD6FE',
              padding: '10px 20px',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>View All Plans &amp; Offers</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>

        {/* 4 Modern Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '22px',
          }}
        >
          {DEALS.map((deal, idx) => (
            <div
              key={idx}
              style={{
                background: '#FAF9FD',
                border: `1.5px solid ${deal.borderColor}`,
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = deal.hoverBorder;
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(82, 42, 176, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = deal.borderColor;
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.03)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: deal.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {deal.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#4B5563',
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {deal.tag}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 850,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#522AB0',
                    marginBottom: '4px',
                  }}
                >
                  {deal.badge}
                </div>

                <h3 style={{ fontSize: '17.5px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                  {deal.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: '1.55', margin: '0 0 20px 0' }}>
                  {deal.desc}
                </p>
              </div>

              <Link
                href={deal.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13.5px',
                  fontWeight: 750,
                  color: '#522AB0',
                  textDecoration: 'none',
                  paddingTop: '12px',
                  borderTop: '1px solid #F1F5F9',
                }}
              >
                <span>{deal.cta}</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OffersSection;

