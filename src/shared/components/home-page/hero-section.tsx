'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Building2,
  KeyRound,
  Building,
  Ruler,
  Sparkles,
  Zap,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const CITIES = [
  'Pune',
  'Mumbai',
  'Ahmedabad',
  'Dholera SIR',
  'Bengaluru',
  'Hyderabad',
  'Delhi NCR',
  'Surat',
  'Vadodara',
  'Rajkot',
];

const SEARCH_TABS = [
  { id: 'sale', label: 'Buy', icon: <Building2 className="w-4 h-4" /> },
  { id: 'rent', label: 'Rent', icon: <KeyRound className="w-4 h-4" /> },
  { id: 'commercial', label: 'Commercial', icon: <Building className="w-4 h-4" /> },
  { id: 'plot', label: 'Plots & Land', icon: <Ruler className="w-4 h-4" /> },
  { id: 'dholera', label: 'Dholera SIR', icon: <Zap className="w-4 h-4" />, highlight: true },
  { id: 'project', label: 'New Projects', icon: <Sparkles className="w-4 h-4" /> },
];

const POPULAR_SEARCHES = [
  { label: 'Baner, Pune', href: '/properties?deal=sale&city=pune&q=baner' },
  { label: 'Wakad 2 BHK', href: '/properties?deal=sale&city=pune&q=wakad' },
  { label: 'SG Highway, Ahmedabad', href: '/properties?deal=sale&city=ahmedabad&q=sg-highway' },
  { label: 'Dholera SIR TP 2 Plots', href: '/dholera-sir' },
  { label: 'GIFT City Commercial', href: '/properties?deal=commercial&city=ahmedabad&q=gift-city' },
  { label: 'Rent in Hinjewadi', href: '/properties?deal=rent&city=pune&q=hinjewadi' },
];

export function HeroSection() {
  const router = useRouter();
  const [deal, setDeal] = useState('sale');
  const [city, setCity] = useState('Pune');
  const [locality, setLocality] = useState('');
  const [budget, setBudget] = useState('Any');
  const [propertyType, setPropertyType] = useState('All');

  function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (deal === 'dholera') {
      router.push('/dholera-sir');
      return;
    }
    const c = city.toLowerCase().replace(/\s+/g, '-');
    const q = locality.trim();
    const params = new URLSearchParams();
    params.set('deal', deal);
    params.set('city', c);
    if (q) params.set('q', q);
    if (budget !== 'Any') params.set('budget', budget);
    if (propertyType !== 'All') params.set('type', propertyType);

    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section
      style={{
        background: `linear-gradient(135deg, rgba(15, 5, 36, 0.92) 0%, rgba(36, 13, 85, 0.86) 50%, rgba(62, 27, 133, 0.80) 100%), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85') center/cover no-repeat`,
        color: '#ffffff',
        padding: '54px 20px 64px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Background Ambient Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(82, 42, 176, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          right: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254, 220, 0, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* TOP HERO HEADER - CENTER ALIGNED */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 36px' }}>
          
          {/* Top Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '18px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            <span
              style={{
                background: '#FEDC00',
                color: '#1C0A3F',
                fontSize: '10.5px',
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: '999px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Zap style={{ width: 11, height: 11, fill: '#1C0A3F' }} /> 0% BROKERAGE
            </span>
            <span>Direct Verified Owners Across India</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              margin: '0 0 14px',
              color: '#ffffff',
            }}
          >
            Buy, Rent &amp; Sell Property{' '}
            <span
              style={{
                color: '#FEDC00',
                background: 'linear-gradient(180deg, transparent 65%, rgba(254, 220, 0, 0.3) 65%)',
                padding: '0 4px',
                borderRadius: '4px',
              }}
            >
              Without A Broker
            </span>{' '}
            In Between.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.82)',
              lineHeight: 1.6,
              margin: '0 auto 20px',
              maxWidth: '680px',
            }}
          >
            Connect directly with verified owners, inspect genuine 7/12 title papers, and close deals without paying 2% commission.
          </p>

          {/* 3 Quick Value Badges */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              fontSize: '13px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck style={{ width: 16, height: 16, color: '#FEDC00' }} /> Verified 7/12 Title
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: '#FEDC00' }} /> e-Stamped Agreement
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp style={{ width: 16, height: 16, color: '#FEDC00' }} /> ₹120+ Cr Brokerage Saved
            </span>
          </div>

        </div>

        {/* UNIVERSAL FLOATING SEARCH CARD (CENTER ALIGNED & CLEAN) */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            color: '#1c1f23',
            marginBottom: '0px',
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '14px',
              marginBottom: '16px',
              borderBottom: '1px solid #EEF2F6',
              scrollbarWidth: 'none',
            }}
          >
            {SEARCH_TABS.map((tab) => {
              const active = deal === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDeal(tab.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontSize: '13.5px',
                    fontWeight: active ? 800 : 600,
                    cursor: 'pointer',
                    border: 'none',
                    background: active
                      ? '#522AB0'
                      : tab.highlight
                      ? '#FFF9DB'
                      : '#F3F4F6',
                    color: active
                      ? '#ffffff'
                      : tab.highlight
                      ? '#41208C'
                      : '#4B5563',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    boxShadow: active ? '0 4px 12px rgba(82, 42, 176, 0.25)' : 'none',
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.highlight && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 900,
                        background: '#FEDC00',
                        color: '#1C0A3F',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        marginLeft: '3px',
                      }}
                    >
                      HOT
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Modern Unified Search Capsule Bar */}
          <form onSubmit={handleSearch}>
            <div
              className="hero-search-capsule"
              style={{
                background: '#FAF9FD',
                border: '1.5px solid #E2D9F3',
                borderRadius: '16px',
                padding: '8px 10px 8px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 4px 16px rgba(82, 42, 176, 0.06)',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Field 1: City */}
              <div style={{ minWidth: '130px', flexShrink: 0 }}>
                <label style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                  <MapPin style={{ width: 12, height: 12, color: '#522AB0' }} /> City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    fontWeight: 750,
                    color: '#111827',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vertical Divider */}
              <div className="search-divider" style={{ width: '1px', height: '36px', background: '#E2E8F0', flexShrink: 0 }} />

              {/* Field 2: Locality / Project (Flex-1 Expanded) */}
              <div style={{ flex: 1, minWidth: '180px' }}>
                <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px' }}>
                  Locality, Landmark or Project
                </label>
                <input
                  type="text"
                  placeholder="e.g. Baner, SG Highway, Kharadi..."
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#111827',
                    outline: 'none',
                    padding: 0,
                  }}
                />
              </div>

              {/* Vertical Divider */}
              <div className="search-divider" style={{ width: '1px', height: '36px', background: '#E2E8F0', flexShrink: 0 }} />

              {/* Field 3: BHK / Property Type */}
              <div style={{ minWidth: '130px', flexShrink: 0 }}>
                <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px' }}>
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    fontWeight: 750,
                    color: '#111827',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <option value="All">All Types</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4+ BHK">4+ BHK</option>
                  <option value="Villa">Villa / House</option>
                  <option value="Plot">Land / Plot</option>
                </select>
              </div>

              {/* Vertical Divider */}
              <div className="search-divider" style={{ width: '1px', height: '36px', background: '#E2E8F0', flexShrink: 0 }} />

              {/* Field 4: Budget */}
              <div style={{ minWidth: '130px', flexShrink: 0 }}>
                <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px' }}>
                  Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    fontWeight: 750,
                    color: '#111827',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <option value="Any">Any Budget</option>
                  <option value="Under ₹30 L">Under ₹30 L</option>
                  <option value="₹30 L - ₹60 L">₹30 L - ₹60 L</option>
                  <option value="₹60 L - ₹1.2 Cr">₹60 L - ₹1.2 Cr</option>
                  <option value="₹1.2 Cr - ₹2.5 Cr">₹1.2 Cr - ₹2.5 Cr</option>
                  <option value="Above ₹2.5 Cr">Above ₹2.5 Cr</option>
                </select>
              </div>

              {/* Field 5: Integrated Circular Search Action Button */}
              <div style={{ flexShrink: 0, paddingLeft: '4px' }}>
                <button
                  type="submit"
                  id="goSearch"
                  aria-label="Search Properties"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FEDC00 0%, #F59E0B 100%)',
                    color: '#1C0A3F',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 18px rgba(245, 158, 11, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.06)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(245, 158, 11, 0.4)';
                  }}
                >
                  <Search style={{ width: 22, height: 22, strokeWidth: 2.8 }} />
                </button>
              </div>
            </div>
          </form>

          {/* Popular Hotspots Bar */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              fontSize: '12.5px',
              color: '#64748B',
            }}
          >
            <span style={{ fontWeight: 800, color: '#522AB0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp style={{ width: 14, height: 14 }} /> Popular Hotspots:
            </span>
            {POPULAR_SEARCHES.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                style={{
                  background: '#F1F5F9',
                  color: '#334155',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#EFE9FB';
                  e.currentTarget.style.color = '#522AB0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F1F5F9';
                  e.currentTarget.style.color = '#334155';
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;
