'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, FileCheck, PhoneCall, ArrowRight, Tag } from 'lucide-react';

export function OffersSection() {
  const deals = [
    {
      badge: '0% BROKERAGE GUARANTEE',
      title: 'Direct Verified Owners',
      desc: 'Connect with authentic owners & save up to ₹50,000 in broker commission fees across India.',
      icon: <ShieldCheck className="w-8 h-8 text-[#522AB0]" />,
      cta: 'Explore Direct Properties',
      href: '/properties',
      color: '#F59E0B',
    },
    {
      badge: 'DHOLERA SIR SPECIAL',
      title: 'Smart City Land & Plots',
      desc: 'Clear title NA+NOC plots inside Gujarat Dholera SIR Investment Region starting from ₹11 Lakhs.',
      icon: <MapPin className="w-8 h-8 text-[#10B981]" />,
      cta: 'View Dholera Deals',
      href: '/dholera-sir',
      color: '#10B981',
    },
    {
      badge: 'FREE RENTAL AGREEMENT',
      title: 'E-Stamped Legal Paperwork',
      desc: 'Get your official rent agreement drafted and delivered directly to your doorstep with Relax Plan.',
      icon: <FileCheck className="w-8 h-8 text-[#6D28D9]" />,
      cta: 'Get Rent Agreement',
      href: '/rent-agreement',
      color: '#6D28D9',
    },
    {
      badge: 'INSTANT PHONE NUMBERS',
      title: 'Unlock Direct Contacts',
      desc: 'Get unlimited direct owner mobile numbers & schedule site visits instantly without middlemen.',
      icon: <PhoneCall className="w-8 h-8 text-[#EC4899]" />,
      cta: 'Unlock Contacts Now',
      href: '/tenant-plans',
      color: '#EC4899',
    },
  ];

  return (
    <section className="redbus-offers-section">
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#6D28D9', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag className="w-4 h-4 text-[#6D28D9]" /> EXCLUSIVE DEALS & ADVANTAGES
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: '4px 0 0 0' }}>
              Why Property Seekers Trust GujjuProperty
            </h2>
          </div>
          <Link href="/buyer-plans" style={{ fontSize: '14px', fontWeight: 700, color: '#522AB0', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All Plans & Offers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {deals.map((deal, idx) => (
            <div key={idx} className="redbus-offer-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="redbus-offer-badge">{deal.badge}</span>
                  <div style={{ background: '#FAF9FD', padding: '8px', borderRadius: '12px' }}>
                    {deal.icon}
                  </div>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px 0' }}>
                  {deal.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: '1.5', margin: '0 0 16px 0' }}>
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
