'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, FileCheck, PhoneCall, ArrowRight, Tag, Sparkles } from 'lucide-react';

export function OffersSection() {
  const deals = [
    {
      badge: '0% BROKERAGE GUARANTEE',
      title: 'Direct Verified Owners',
      desc: 'Connect directly with authentic property owners & save up to ₹50,000 in broker commission fees.',
      icon: <ShieldCheck className="w-7 h-7 text-[#FEDC00]" />,
      cta: 'Explore Direct Props',
      href: '/properties',
      badgeBg: 'rgba(254, 220, 0, 0.2)',
      badgeColor: '#FEDC00',
    },
    {
      badge: 'DHOLERA SIR SPECIAL',
      title: 'Smart City Land Plots',
      desc: 'Clear title NA+NOC plots inside Gujarat Dholera SIR Investment Region starting from ₹11 Lakhs.',
      icon: <MapPin className="w-7 h-7 text-[#34D399]" />,
      cta: 'View Dholera Deals',
      href: '/dholera-sir',
      badgeBg: 'rgba(52, 211, 153, 0.2)',
      badgeColor: '#34D399',
    },
    {
      badge: 'FREE RENTAL AGREEMENT',
      title: 'E-Stamped Paperwork',
      desc: 'Get your official rent agreement drafted & delivered to your doorstep with the Relax Owner Plan.',
      icon: <FileCheck className="w-7 h-7 text-[#A78BFA]" />,
      cta: 'Get Rent Agreement',
      href: '/rent-agreement',
      badgeBg: 'rgba(167, 139, 250, 0.2)',
      badgeColor: '#A78BFA',
    },
    {
      badge: 'INSTANT PHONE NUMBERS',
      title: 'Unlock Direct Contacts',
      desc: 'Get direct mobile numbers of verified owners & schedule site visits instantly without middlemen.',
      icon: <PhoneCall className="w-7 h-7 text-[#F472B6]" />,
      cta: 'Unlock Contacts Now',
      href: '/tenant-plans',
      badgeBg: 'rgba(244, 114, 182, 0.2)',
      badgeColor: '#F472B6',
    },
  ];

  return (
    <section
      style={{
        padding: '64px 0',
        background: 'linear-gradient(135deg, #12062B 0%, #240F52 45%, #3C1A83 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Floating Ambient Glass Orbs */}
      <div className="glowing-orb-purple" style={{ top: '-120px', right: '-120px', width: '380px', height: '380px' }} />
      <div className="glowing-orb-gold" style={{ bottom: '-140px', left: '-100px', width: '420px', height: '420px' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#FEDC00',
                background: 'rgba(254, 220, 0, 0.12)',
                border: '1.5px solid rgba(254, 220, 0, 0.3)',
                padding: '5px 14px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '10px',
                boxShadow: '0 0 16px rgba(254, 220, 0, 0.2)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FEDC00]" /> EXCLUSIVE DEALS &amp; ADVANTAGES
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>
              Why Property Seekers Trust GujjuProperty
            </h2>
            <p style={{ fontSize: '14.5px', color: '#D1D5DB', margin: '6px 0 0 0', fontWeight: 400 }}>
              Zero brokerage, 100% verified owners, and legal e-stamped support in Gujarat
            </p>
          </div>

          <Link
            href="/buyer-plans"
            style={{
              fontSize: '14px',
              fontWeight: 750,
              color: '#FEDC00',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              padding: '10px 20px',
              borderRadius: '24px',
              border: '1.5px solid rgba(254, 220, 0, 0.3)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>View All Plans &amp; Offers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Frosted Glass Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '22px' }}>
          {deals.map((deal, idx) => (
            <div key={idx} className="glass-card-dark" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span
                      style={{
                        background: deal.badgeBg,
                        color: deal.badgeColor,
                        border: `1px solid ${deal.badgeColor}44`,
                        fontSize: '11px',
                        fontWeight: 850,
                        padding: '5px 12px',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        boxShadow: `0 0 12px ${deal.badgeColor}33`,
                      }}
                    >
                      {deal.badge}
                    </span>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(12px)',
                        padding: '10px',
                        borderRadius: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      {deal.icon}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                    {deal.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#D1D5DB', lineHeight: '1.55', margin: '0 0 20px 0', fontWeight: 400 }}>
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
                    color: '#FEDC00',
                    marginTop: 'auto',
                  }}
                >
                  <span>{deal.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OffersSection;
