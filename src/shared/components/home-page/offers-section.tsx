'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, FileCheck, PhoneCall, ArrowRight, Tag } from 'lucide-react';

export function OffersSection() {
  const deals = [
    {
      badge: '0% BROKERAGE GUARANTEE',
      title: 'Direct Verified Owners',
      desc: 'Connect directly with verified owners & save up to ₹50,000 in broker commission fees.',
      icon: <ShieldCheck className="w-7 h-7 text-[#522AB0]" />,
      cta: 'Explore Direct Props',
      href: '/properties',
      badgeBg: 'rgba(254, 220, 0, 0.2)',
      badgeColor: '#B45309',
    },
    {
      badge: 'DHOLERA SIR SPECIAL',
      title: 'Smart City Plots',
      desc: 'Clear title NA+NOC plots inside Gujarat Dholera SIR Region starting from ₹11 Lakhs.',
      icon: <MapPin className="w-7 h-7 text-[#059669]" />,
      cta: 'View Dholera Deals',
      href: '/dholera-sir',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeColor: '#047857',
    },
    {
      badge: 'FREE RENTAL AGREEMENT',
      title: 'E-Stamped Paperwork',
      desc: 'Get your official rent agreement drafted & delivered to your doorstep with Relax Plan.',
      icon: <FileCheck className="w-7 h-7 text-[#6D28D9]" />,
      cta: 'Get Rent Agreement',
      href: '/rent-agreement',
      badgeBg: 'rgba(124, 58, 237, 0.15)',
      badgeColor: '#6D28D9',
    },
    {
      badge: 'INSTANT PHONE NUMBERS',
      title: 'Unlock Direct Contacts',
      desc: 'Get direct mobile numbers of verified owners & schedule site visits without brokers.',
      icon: <PhoneCall className="w-7 h-7 text-[#DB2777]" />,
      cta: 'Unlock Contacts Now',
      href: '/tenant-plans',
      badgeBg: 'rgba(219, 39, 119, 0.15)',
      badgeColor: '#BE185D',
    },
  ];

  return (
    <section
      style={{
        padding: '54px 0',
        background: 'linear-gradient(135deg, #1A0B3B 0%, #2D1466 50%, #41208C 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Soft Ambient Radial Light */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254, 220, 0, 0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: '#FEDC00',
                background: 'rgba(254, 220, 0, 0.15)',
                border: '1px solid rgba(254, 220, 0, 0.3)',
                padding: '4px 12px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}
            >
              <Tag className="w-3.5 h-3.5" /> EXCLUSIVE DEALS &amp; ADVANTAGES
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>
              Why Property Seekers Trust GujjuProperty
            </h2>
          </div>
          <Link
            href="/buyer-plans"
            style={{
              fontSize: '14px',
              fontWeight: 750,
              color: '#FEDC00',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.2s ease',
            }}
          >
            View All Plans &amp; Offers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {deals.map((deal, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '22px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.25)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span
                    style={{
                      background: deal.badgeBg,
                      color: deal.badgeColor,
                      fontSize: '11px',
                      fontWeight: 850,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {deal.badge}
                  </span>
                  <div style={{ background: '#FAF9FD', padding: '8px', borderRadius: '12px' }}>
                    {deal.icon}
                  </div>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1F2937', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                  {deal.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: '1.5', margin: '0 0 18px 0' }}>
                  {deal.desc}
                </p>
              </div>

              <Link
                href={deal.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: 750,
                  color: '#522AB0',
                  marginTop: 'auto',
                }}
              >
                <span>{deal.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OffersSection;
