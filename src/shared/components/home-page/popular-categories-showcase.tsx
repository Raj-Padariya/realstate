'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Home, Building2, Landmark, Store, Hotel, Trees } from 'lucide-react';

export interface CategoryCard {
  id: string;
  title: string;
  count: string;
  tagline: string;
  href: string;
  icon: React.ReactNode;
  headerBg: string;
  badgeBg: string;
  badgeColor: string;
  accentColor: string;
  imageUrl: string;
}

export function PopularCategoriesShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: CategoryCard[] = [
    {
      id: 'plots',
      title: 'Residential Land & Plots',
      count: '880+ Properties',
      tagline: 'NA + NOC Clear Title Plots',
      href: '/properties?category=Plots',
      icon: <Landmark className="w-5 h-5 text-[#047857]" />,
      headerBg: 'linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)',
      badgeBg: '#10B981',
      badgeColor: '#ffffff',
      accentColor: '#059669',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'apartments',
      title: 'Flats & Apartments',
      count: '1,240+ Properties',
      tagline: '1, 2, 3 & 4 BHK Gated Homes',
      href: '/properties?category=Apartments',
      icon: <Home className="w-5 h-5 text-[#6D28D9]" />,
      headerBg: 'linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)',
      badgeBg: '#6D28D9',
      badgeColor: '#ffffff',
      accentColor: '#6D28D9',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'builder-floors',
      title: 'Builder Floors & Penthouses',
      count: '340+ Properties',
      tagline: 'Independent Low-Rise Residences',
      href: '/properties?category=Builder+Floor',
      icon: <Building2 className="w-5 h-5 text-[#B45309]" />,
      headerBg: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
      badgeBg: '#D97706',
      badgeColor: '#ffffff',
      accentColor: '#D97706',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'villas',
      title: 'Villas & Bungalows',
      count: '210+ Properties',
      tagline: 'Private Lawn & Luxury Lifestyle',
      href: '/properties?category=Villas',
      icon: <Trees className="w-5 h-5 text-[#BE185D]" />,
      headerBg: 'linear-gradient(135deg, #FCE7F3 0%, #FDF2F8 100%)',
      badgeBg: '#DB2777',
      badgeColor: '#ffffff',
      accentColor: '#DB2777',
      imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'commercial',
      title: 'Commercial Shops & Offices',
      count: '410+ Properties',
      tagline: 'Retail Outlets & Workspaces',
      href: '/properties?category=Commercial',
      icon: <Store className="w-5 h-5 text-[#1D4ED8]" />,
      headerBg: 'linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)',
      badgeBg: '#2563EB',
      badgeColor: '#ffffff',
      accentColor: '#2563EB',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'studio',
      title: '1 RK / Studio Apartments',
      count: '95+ Properties',
      tagline: 'Compact & High Yield Rental Units',
      href: '/properties?category=Studio',
      icon: <Hotel className="w-5 h-5 text-[#4338CA]" />,
      headerBg: 'linear-gradient(135deg, #E0E7FF 0%, #EEF2FF 100%)',
      badgeBg: '#4F46E5',
      badgeColor: '#ffffff',
      accentColor: '#4F46E5',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        background: '#FAF9FD',
        padding: '64px 0',
        position: 'relative',
        borderTop: '1px solid #EFE9FB',
        borderBottom: '1px solid #EFE9FB',
      }}
    >
      <div className="wrap">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
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
                color: '#522AB0',
                background: '#EFE9FB',
                padding: '5px 14px',
                borderRadius: '20px',
                marginBottom: '10px',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> EXPLORE BY CATEGORY
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#1F2937', margin: 0, letterSpacing: '-0.5px' }}>
              Apartments, Villas, Land &amp; More
            </h2>
            <p style={{ fontSize: '15px', color: '#4B5563', margin: '6px 0 0 0', fontWeight: 500 }}>
              Discover verified zero-brokerage properties organized by category across Gujarat
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1.5px solid #E5E7EB',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#522AB0';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#522AB0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1.5px solid #E5E7EB',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#522AB0';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#522AB0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Category Cards */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '16px',
            scrollBehavior: 'smooth',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              style={{
                flex: '0 0 320px',
                scrollSnapAlign: 'start',
                borderRadius: '22px',
                background: '#ffffff',
                border: '1px solid #E5E7EB',
                boxShadow: '0 10px 28px rgba(82, 42, 176, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                height: '380px',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(82, 42, 176, 0.16)';
                e.currentTarget.style.borderColor = cat.accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(82, 42, 176, 0.07)';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              {/* Top Colored Header Info */}
              <div
                style={{
                  background: cat.headerBg,
                  padding: '24px 22px 20px 22px',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: cat.badgeColor,
                      background: cat.badgeBg,
                      padding: '4px 12px',
                      borderRadius: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    {cat.count}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1F2937', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, fontWeight: 600 }}>
                  {cat.tagline}
                </p>
              </div>

              {/* Bottom Real Property Image Container */}
              <div
                style={{
                  position: 'relative',
                  flex: 1,
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />

                {/* Subtle Image Overlay Gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)',
                  }}
                />

                {/* Floating Arrow Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    color: '#1F2937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease, background 0.2s ease, color 0.2s ease',
                  }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCategoriesShowcase;
