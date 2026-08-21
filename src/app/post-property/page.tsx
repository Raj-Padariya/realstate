'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/shared/context/PropertyContext';

const CITIES = ['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Delhi NCR', 'Ahmedabad', 'Dholera SIR', 'Surat', 'Vadodara', 'Rajkot'];

const AD_TYPES: Record<string, string[]> = {
  residential: ['Rent', 'Resale', 'PG / Hostel', 'Flatmates'],
  commercial: ['Rent', 'Sale', 'Lease', 'Coworking Desk'],
  land: ['Sale', 'Lease', 'Joint Venture'],
};

const SUB_PROPERTY_TYPES: Record<string, { label: string; icon: string }[]> = {
  residential: [
    { label: 'Apartment / Flat', icon: '🏢' },
    { label: 'Independent Villa / House', icon: '🏡' },
    { label: 'Gated Community Villa', icon: '🏰' },
    { label: 'Builder Floor', icon: '🏠' },
  ],
  commercial: [
    { label: 'Office Space', icon: '🏢' },
    { label: 'Shop & Showroom', icon: '🏬' },
    { label: 'Warehouse / Godown', icon: '🏭' },
    { label: 'Industrial Shed / Building', icon: '⚙️' },
    { label: 'Coworking Space', icon: '💻' },
  ],
  land: [
    { label: 'Residential Plot (NA Approved)', icon: '📐' },
    { label: 'Agricultural Land', icon: '🌾' },
    { label: 'Commercial Land', icon: '🏗️' },
    { label: 'Industrial Plot', icon: '🏭' },
    { label: 'Dholera SIR Investment Region', icon: '🌟' },
  ],
};

export default function PostPropertyLandingPage() {
  const router = useRouter();
  const { properties } = useProperties();

  const [selectedCity, setSelectedCity] = useState<string>('Pune');
  const [activeCategory, setActiveCategory] = useState<'residential' | 'commercial' | 'land'>('residential');
  const [selectedAdType, setSelectedAdType] = useState<string>('Rent');
  const [selectedSubtype, setSelectedSubtype] = useState<string>('Apartment / Flat');
  const [whatsappUpdates, setWhatsappUpdates] = useState<boolean>(true);

  const handleStartPosting = () => {
    const sub = encodeURIComponent(selectedSubtype);
    const city = encodeURIComponent(selectedCity);
    const type = encodeURIComponent(selectedAdType);

    if (activeCategory === 'land') {
      router.push(`/post-property/land?city=${city}&type=${type}&subtype=${sub}`);
    } else if (activeCategory === 'commercial') {
      router.push(`/post-property/commercial?city=${city}&type=${type}&subtype=${sub}`);
    } else if (selectedAdType.toLowerCase() === 'rent' || selectedAdType.toLowerCase().includes('pg') || selectedAdType.toLowerCase().includes('flatmate')) {
      router.push(`/post-property/rent?city=${city}&type=${type}&subtype=${sub}`);
    } else {
      router.push(`/post-property/resale?city=${city}&type=${type}&subtype=${sub}`);
    }
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px', fontFamily: "'Open Sans', Arial, sans-serif" }}>
      
      {/* Top Banner */}
      <div style={{ background: 'var(--brand-dk)', color: '#D5C9F0', fontSize: '13px', padding: '8px 20px', textAlign: 'center' }}>
        <span><b>100% Owner Properties</b> &nbsp;|&nbsp; Zero Brokerage &nbsp;|&nbsp; 28 States, 380+ Cities</span>
      </div>

      {/* Header bar pill link */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--brand)' }}>
            Post Property on GujjuProperty
          </div>
          <Link
            href="/properties"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: '999px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--body)',
            }}
          >
            🔍 <span>Looking for a property?</span> <u style={{ color: 'var(--brand)' }}>Click here</u>
          </Link>
        </div>
      </div>

      {/* Main Section */}
      <section style={{ padding: '36px 0 60px' }}>
        <div className="wrap" style={{ maxWidth: '1200px' }}>
          
          <div style={{ marginBottom: '22px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--ink)' }}>
              Sell or Rent your Property For Free
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '14.5px', marginTop: '4px' }}>
              Post your property for rent, resale, PG or flatmates — free on GujjuProperty. Zero brokerage, faster tenants & buyers.
            </p>
          </div>

          {/* Grid Container */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: 'var(--sh)',
            }}
          >
            
            {/* Aside Why Post */}
            <aside style={{ background: 'var(--bg)', padding: '28px 24px', borderRight: '1px solid var(--line)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '18px', color: 'var(--ink)' }}>
                Why post through us?
              </h4>
              
              <ul style={{ listStyle: 'none', margin: '0 0 26px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', fontWeight: 600, color: 'var(--body)' }}>
                  <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'var(--brand-lt)', color: 'var(--brand)', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 'bold' }}>
                    🏠
                  </span>
                  Zero brokerage
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', fontWeight: 600, color: 'var(--body)' }}>
                  <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'var(--brand-lt)', color: 'var(--brand)', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 'bold' }}>
                    ⚡
                  </span>
                  Faster tenants & buyers
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', fontWeight: 600, color: 'var(--body)' }}>
                  <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'var(--brand-lt)', color: 'var(--brand)', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 'bold' }}>
                    👥
                  </span>
                  10 Lac+ tenant & buyer connections
                </li>
              </ul>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>30 Lac+ Home Owners Trust Us</h4>
                <p style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: '1.6', margin: '0 0 10px' }}>
                  "After posting my property ad, GujjuProperty made it easy to rent out my apartment — otherwise it was very difficult for me. They found the right tenants I could trust!"
                </p>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand)' }}>
                  Anil K. <span style={{ color: 'var(--muted)', fontWeight: 400 }}>| Mumbai</span>
                </div>
              </div>

              {/* Direct Quick Links */}
              <div style={{ borderTop: '1px solid var(--line)', marginTop: '24px', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
                  Direct Form Wizards
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                  <Link href="/post-property/rent" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
                    📝 Rental Post Property Form →
                  </Link>
                  <Link href="/post-property/resale" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
                    🏠 Resale / Sale Post Form →
                  </Link>
                  <Link href="/post-property/commercial" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
                    🏢 Commercial Space Post Form →
                  </Link>
                  <Link href="/post-property/land" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
                    🌐 Land & Plot Post Form →
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Widget */}
            <div style={{ padding: '34px 30px', textAlign: 'center' }}>
              
              <p style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--body)', marginBottom: '20px' }}>
                You have already posted <b>{properties.length}</b> properties on GujjuProperty —{' '}
                <Link href="/properties" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>
                  view all
                </Link>
              </p>

              {/* Select City */}
              <div style={{ maxWidth: '360px', margin: '0 auto 18px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px', textAlign: 'left' }}>
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1.5px solid var(--line)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* WhatsApp Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', fontSize: '13.5px', fontWeight: 600, color: 'var(--body)', marginBottom: '26px' }}>
                <span>Get updates on</span>
                <span style={{ color: '#25D366', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M4 20l1.3-3.9A8 8 0 1 1 8.6 19z"/></svg> WhatsApp
                </span>
                <button
                  type="button"
                  onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                  style={{
                    width: '38px',
                    height: '22px',
                    borderRadius: '999px',
                    background: whatsappUpdates ? '#1EA672' : 'var(--line)',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: whatsappUpdates ? '18px' : '2px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#fff',
                      transition: 'left 0.2s',
                    }}
                  />
                </button>
              </div>

              {/* Property Type Tabs */}
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
                Property type
              </span>
              
              <div style={{ display: 'flex', borderBottom: '1.5px solid var(--line)', marginBottom: '22px', maxWidth: '520px', margin: '0 auto 22px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('residential');
                    setSelectedAdType('Rent');
                    setSelectedSubtype('Apartment / Flat');
                  }}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    padding: '12px 8px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    color: activeCategory === 'residential' ? 'var(--brand)' : 'var(--muted)',
                    borderBottom: activeCategory === 'residential' ? '3px solid var(--brand)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Residential
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('commercial');
                    setSelectedAdType('Rent');
                    setSelectedSubtype('Office Space');
                  }}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    padding: '12px 8px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    color: activeCategory === 'commercial' ? 'var(--brand)' : 'var(--muted)',
                    borderBottom: activeCategory === 'commercial' ? '3px solid var(--brand)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Commercial
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('land');
                    setSelectedAdType('Sale');
                    setSelectedSubtype('Residential Plot (NA Approved)');
                  }}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    padding: '12px 8px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    color: activeCategory === 'land' ? 'var(--brand)' : 'var(--muted)',
                    borderBottom: activeCategory === 'land' ? '3px solid var(--brand)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Land / Plot <span style={{ background: 'var(--brand)', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '1px 5px', borderRadius: '999px', marginLeft: '4px' }}>New</span>
                </button>
              </div>

              {/* Select Ad Type Box */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px 20px', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
                  Select property ad type
                </span>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', marginBottom: '18px' }}>
                  {AD_TYPES[activeCategory].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedAdType(t)}
                      style={{
                        background: selectedAdType === t ? 'var(--brand)' : '#fff',
                        borderColor: selectedAdType === t ? 'var(--brand)' : 'var(--line)',
                        color: selectedAdType === t ? '#fff' : 'var(--body)',
                        borderWidth: '1.5px',
                        borderStyle: 'solid',
                        borderRadius: '9px',
                        padding: '13px 8px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: selectedAdType === t ? '0 2px 8px rgba(82,42,176,0.2)' : 'none',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Sub Property Type Choice */}
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
                  Select {activeCategory === 'commercial' ? 'commercial space type' : activeCategory === 'land' ? 'plot & land category' : 'property type'}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {SUB_PROPERTY_TYPES[activeCategory].map((sub) => {
                    const isSelected = selectedSubtype === sub.label;
                    return (
                      <button
                        key={sub.label}
                        type="button"
                        onClick={() => setSelectedSubtype(sub.label)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '999px',
                          border: isSelected ? '1.5px solid var(--brand)' : '1px solid var(--line)',
                          background: isSelected ? 'var(--brand-lt)' : '#fff',
                          color: isSelected ? 'var(--brand)' : 'var(--body)',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span>{sub.icon}</span>
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Start Posting Button */}
              <button
                type="button"
                onClick={handleStartPosting}
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  padding: '15px 24px',
                  fontSize: '16px',
                  fontWeight: 800,
                  borderRadius: '9px',
                  background: 'var(--brand)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--sh)',
                }}
              >
                Start posting your {selectedAdType.toLowerCase()} ad for free →
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* Missed Call Help Banner */}
      <div style={{ background: '#FFF3D6', borderTop: '1px solid #F3E28A', padding: '13px 20px', textAlign: 'center', fontSize: '14px', color: '#6B5400', fontWeight: 600 }}>
        📞 Give a missed call to <b>+91 86XXX-XXXXX</b> to get instant support with your property listing
      </div>

    </div>
  );
}
