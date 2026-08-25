'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Home, Building2, Landmark, Store, Hotel, Trees } from 'lucide-react';

export interface CategoryItem {
  id: string;
  title: string;
  count: string;
  tagline: string;
  href: string;
  icon: React.ReactNode;
  bgGradient: string;
  accentColor: string;
  imageSvg: React.ReactNode;
}

export function PopularCategoriesShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: CategoryItem[] = [
    {
      id: 'plots',
      title: 'Residential Land & Plots',
      count: '880+ Properties',
      tagline: 'Clear Title, NA + NOC Investment Plots',
      href: '/properties?category=Plots',
      icon: <Landmark className="w-6 h-6 text-[#FEDC00]" />,
      bgGradient: 'linear-gradient(180deg, rgba(254, 220, 0, 0.15) 0%, rgba(20, 10, 45, 0.9) 100%)',
      accentColor: '#FEDC00',
      imageSvg: (
        <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 160L70 90L150 130L230 70L300 160H0Z" fill="#10B981" opacity="0.25" />
          <path d="M40 160L120 80L200 120L300 60V160H40Z" fill="#059669" opacity="0.35" />
          <rect x="90" y="110" width="30" height="50" rx="3" fill="#FEDC00" opacity="0.6" />
          <line x1="105" y1="90" x2="105" y2="110" stroke="#FEDC00" strokeWidth="3" />
        </svg>
      ),
    },
    {
      id: 'apartments',
      title: 'Flats & Apartments',
      count: '1,240+ Properties',
      tagline: '1, 2, 3 & 4 BHK Gated Community Homes',
      href: '/properties?category=Apartments',
      icon: <Home className="w-6 h-6 text-[#A78BFA]" />,
      bgGradient: 'linear-gradient(180deg, rgba(167, 139, 250, 0.15) 0%, rgba(20, 10, 45, 0.9) 100%)',
      accentColor: '#A78BFA',
      imageSvg: (
        <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="40" width="80" height="120" rx="6" fill="#6D28D9" opacity="0.4" />
          <rect x="150" y="20" width="100" height="140" rx="6" fill="#8B5CF6" opacity="0.5" />
          <rect x="70" y="60" width="16" height="20" rx="2" fill="#E0E7FF" opacity="0.7" />
          <rect x="94" y="60" width="16" height="20" rx="2" fill="#E0E7FF" opacity="0.7" />
          <rect x="170" y="40" width="20" height="24" rx="2" fill="#FEDC00" opacity="0.8" />
          <rect x="210" y="40" width="20" height="24" rx="2" fill="#FEDC00" opacity="0.8" />
        </svg>
      ),
    },
    {
      id: 'builder-floors',
      title: 'Builder Floor & Penthouses',
      count: '340+ Properties',
      tagline: 'Independent Low-Rise Luxury Floors',
      href: '/properties?category=Builder+Floor',
      icon: <Building2 className="w-6 h-6 text-[#34D399]" />,
      bgGradient: 'linear-gradient(180deg, rgba(52, 211, 153, 0.15) 0%, rgba(20, 10, 45, 0.9) 100%)',
      accentColor: '#34D399',
      imageSvg: (
        <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="50" width="180" height="110" rx="8" fill="#059669" opacity="0.3" />
          <path d="M40 50L150 10L260 50H40Z" fill="#10B981" opacity="0.45" />
          <rect x="130" y="100" width="40" height="60" rx="4" fill="#FEDC00" opacity="0.7" />
        </svg>
      ),
    },
    {
      id: 'villas',
      title: 'Villas & Bungalows',
      count: '210+ Properties',
      tagline: 'Private Garden & Luxury Lifestyle',
      href: '/properties?category=Villas',
      icon: <Trees className="w-6 h-6 text-[#F472B6]" />,
      bgGradient: 'linear-gradient(180deg, rgba(244, 114, 182, 0.15) 0%, rgba(20, 10, 45, 0.9) 100%)',
      accentColor: '#F472B6',
      imageSvg: (
        <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 70L120 20L210 70V160H30V70Z" fill="#EC4899" opacity="0.3" />
          <circle cx="240" cy="110" r="30" fill="#10B981" opacity="0.5" />
          <rect x="235" y="130" width="10" height="30" fill="#78350F" />
        </svg>
      ),
    },
    {
      id: 'commercial',
      title: 'Commercial Shops & Offices',
      count: '410+ Properties',
      tagline: 'Retail Stores, Warehouses & Office Spaces',
      href: '/properties?category=Commercial',
      icon: <Store className="w-6 h-6 text-[#FBBF24]" />,
      bgGradient: 'linear-gradient(180deg, rgba(251, 191, 36, 0.15) 0%, rgba(20, 10, 45, 0.9) 100%)',
      accentColor: '#FBBF24',
      imageSvg: (
        <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="30" width="220" height="130" rx="8" fill="#D97706" opacity="0.35" />
          <rect x="70" y="60" width="160" height="40" rx="4" fill="#FEDC00" opacity="0.8" />
        </svg>
      ),
    },
    {
      id: 'studio',
      title: 'Studio & 1 RK Apartments',
      count: '95+ Properties',
      tagline: 'Compact & High Yield Rental Options',
      href: '/properties?category=Studio',
      icon: <Hotel className="w-6 h-6 text-[#60A5FA]" />,
      bgGradient: 'linear-gradient(180deg, rgba(96, 165, 250, 0.15) 0%, rgba(20, 10, 45, 0.9) 100%)',
      accentColor: '#60A5FA',
      imageSvg: (
        <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="70" y="40" width="160" height="120" rx="8" fill="#2563EB" opacity="0.35" />
        </svg>
      ),
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        background: 'linear-gradient(140deg, #1A0B3B 0%, #2A125E 45%, #41208C 100%)',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden',
        color: '#ffffff',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Background Ambient Glow Circles */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254, 220, 0, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap">
        {/* Section Header with Left Content & Right Carousel Arrows */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#FEDC00',
                background: 'rgba(254, 220, 0, 0.12)',
                border: '1px solid rgba(254, 220, 0, 0.25)',
                padding: '4px 12px',
                borderRadius: '20px',
                marginBottom: '10px',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> PROPERTY CATEGORIES
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
              Apartments, Villas, Land &amp; More
            </h2>
            <p style={{ fontSize: '15px', color: '#D1D5DB', margin: '6px 0 0 0', fontWeight: 400 }}>
              Explore verified zero-brokerage listings by property category across Gujarat &amp; Top Cities
            </p>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEDC00';
                e.currentTarget.style.color = '#1A0B3B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEDC00';
                e.currentTarget.style.color = '#1A0B3B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Category Cards Container */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '22px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '12px',
            scrollBehavior: 'smooth',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              style={{
                flex: '0 0 310px',
                scrollSnapAlign: 'start',
                borderRadius: '20px',
                background: cat.bgGradient,
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '360px',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${cat.accentColor}33`;
                e.currentTarget.style.borderColor = cat.accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
              }}
            >
              {/* Top Text Header Info */}
              <div style={{ padding: '24px 24px 0 24px', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${cat.accentColor}44`,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: cat.accentColor,
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '4px 10px',
                      borderRadius: '14px',
                      border: `1px solid ${cat.accentColor}33`,
                    }}
                  >
                    {cat.count}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                  {cat.tagline}
                </p>
              </div>

              {/* Bottom Visual SVG Vector Background */}
              <div
                style={{
                  width: '100%',
                  height: '160px',
                  position: 'relative',
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                {cat.imageSvg}
              </div>

              {/* Hover Action Arrow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: cat.accentColor,
                  color: '#1A0B3B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  zIndex: 3,
                }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCategoriesShowcase;
