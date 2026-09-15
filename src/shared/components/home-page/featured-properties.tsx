'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  KeyRound,
  ShieldCheck,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import mockCmsData from '@/shared/data/mockCmsData.json';

type FeaturedListing = (typeof mockCmsData.featuredProperties.listings)[number];

const data = mockCmsData.featuredProperties;
const listings: FeaturedListing[] = data.listings;

export function FeaturedProperties() {
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section style={{ padding: '64px 0', background: '#F8FAFC', borderTop: '1px solid #EEF2F6', borderBottom: '1px solid #EEF2F6' }}>
      <div className="wrap">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                color: '#522AB0',
                background: '#EDE9FE',
                padding: '5px 14px',
                borderRadius: '999px',
                fontSize: '11.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '10px',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> FEATURED VERIFIED LISTINGS
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 800, color: '#111827', margin: '4px 0 0 0', letterSpacing: '-0.3px' }}>
              Owner Listings Worth a Visit
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', margin: '6px 0 0 0' }}>
              Handpicked verified owner properties with clear titles, premium amenities and immediate possession.
            </p>
          </div>
          <Link
            href={data.seeAllHref}
            style={{
              fontSize: '14.5px',
              fontWeight: 750,
              color: '#522AB0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              background: '#FFFFFF',
              border: '1.5px solid #E2D9F3',
              padding: '10px 18px',
              borderRadius: '12px',
              transition: 'all 0.2s ease',
            }}
          >
            <span>All 248 in Pune</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Luxury Property Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '26px',
          }}
        >
          {listings.map((p) => {
            const isSaved = !!savedIds[p.id];

            return (
              <article
                key={p.id}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(82, 42, 176, 0.12)';
                  e.currentTarget.style.borderColor = '#C4B5FD';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {/* Image Container */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    background: '#EDE9FE',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                  />

                  {/* Gradient Vignette Overlay at bottom of image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '60px',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, transparent 100%)',
                    }}
                  />

                  {/* Top-Left: Direct Owner Verified Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      color: '#059669',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      padding: '5px 10px',
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }}
                  >
                    <Check style={{ width: 13, height: 13, strokeWidth: 3 }} />
                    {p.badgeText}
                  </span>

                  {/* Top-Right: Heart Save Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleSave(p.id, e)}
                    aria-label="Save Property"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      transition: 'transform 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Heart
                      style={{
                        width: 17,
                        height: 17,
                        color: isSaved ? '#E11D48' : '#4B5563',
                        fill: isSaved ? '#E11D48' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    />
                  </button>

                  {/* Bottom Image Floating Price Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      color: '#FFFFFF',
                    }}
                  >
                    <span style={{ fontSize: '22px', fontWeight: 900, textShadow: '0 2px 6px rgba(0,0,0,0.6)', letterSpacing: '-0.3px' }}>
                      {p.price}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 650, color: '#FEDC00', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                      {p.pricePerSqFt}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                  <div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: 800, color: '#0F172A', lineHeight: 1.35 }}>
                      {p.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin style={{ width: 14, height: 14, color: '#522AB0', flexShrink: 0 }} />
                      <span>{p.address}</span>
                    </p>
                  </div>

                  {/* Sleek Integrated Specs Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#F8FAFC',
                      border: '1px solid #EEF2F6',
                      borderRadius: '12px',
                      padding: '10px 14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', fontWeight: 750, color: '#334155' }}>
                      <BedDouble style={{ width: 15, height: 15, color: '#522AB0' }} />
                      <span>{p.bhk}</span>
                    </div>

                    <div style={{ width: '1px', height: '18px', background: '#E2E8F0' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', fontWeight: 750, color: '#334155' }}>
                      <Maximize2 style={{ width: 14, height: 14, color: '#522AB0' }} />
                      <span>{p.areaSqFt}</span>
                    </div>

                    <div style={{ width: '1px', height: '18px', background: '#E2E8F0' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', fontWeight: 750, color: '#334155' }}>
                      <Bath style={{ width: 14, height: 14, color: '#522AB0' }} />
                      <span>2 Bath</span>
                    </div>

                    <div style={{ width: '1px', height: '18px', background: '#E2E8F0' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 800, color: '#059669' }}>
                      <KeyRound style={{ width: 13, height: 13 }} />
                      <span>Ready</span>
                    </div>
                  </div>

                  {/* Card Footer: 0% Brokerage + CTA Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '6px',
                      marginTop: 'auto',
                    }}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', color: '#059669', fontWeight: 800 }}>
                      <ShieldCheck style={{ width: 16, height: 16 }} />
                      <span>₹0 Brokerage</span>
                    </div>

                    <Link
                      href={`/properties?id=${p.id}`}
                      style={{
                        background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
                        color: '#FFFFFF',
                        padding: '9px 18px',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: 750,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(82, 42, 176, 0.25)',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(82, 42, 176, 0.4)';
                        e.currentTarget.style.transform = 'translateX(2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(82, 42, 176, 0.25)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>Get Owner Details</span>
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProperties;