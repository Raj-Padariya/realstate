'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import PropertyCard from '@/shared/ui/property-card';
import { Sparkles, ArrowRight } from 'lucide-react';

export function PopularCategoriesShowcase() {
  const { properties } = useProperties();
  const [activeTab, setActiveTab] = useState<'All' | 'Buy' | 'Rent' | 'Plot'>('All');

  // Filter live properties according to selected tab
  const filteredListings = useMemo(() => {
    if (!properties || properties.length === 0) return [];

    let list = properties;
    if (activeTab === 'Rent') {
      list = properties.filter((p) => {
        const cat = (p.listingCategory || '').toLowerCase();
        const price = (p.price || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        return cat === 'rent' || price.includes('/mo') || price.includes('rent') || title.includes('rent');
      });
    } else if (activeTab === 'Buy') {
      list = properties.filter((p) => {
        const cat = (p.listingCategory || '').toLowerCase();
        const price = (p.price || '').toLowerCase();
        const isRent = cat === 'rent' || price.includes('/mo') || price.includes('rent');
        const isPlot = (p.bhk || '').toLowerCase().includes('plot') || (p.title || '').toLowerCase().includes('plot') || (p.title || '').toLowerCase().includes('land');
        return !isRent && !isPlot;
      });
    } else if (activeTab === 'Plot') {
      list = properties.filter((p) => {
        const bhk = (p.bhk || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        const cat = (p.listingCategory || '').toLowerCase();
        return bhk.includes('plot') || bhk.includes('land') || title.includes('plot') || title.includes('land') || cat === 'plot';
      });
    }

    // Prioritize properties with images, then take top 6
    const withImages = list.filter((p) => p.image && !p.image.startsWith('data:image/svg'));
    const others = list.filter((p) => !p.image || p.image.startsWith('data:image/svg'));
    return [...withImages, ...others].slice(0, 6);
  }, [properties, activeTab]);

  return (
    <section className="sec" style={{ background: '#F8FAFC', borderTop: '1px solid #EEF2F6', borderBottom: '1px solid #EEF2F6' }}>
      <div className="wrap">
        {/* Section Header */}
        <div className="sec-head sec-head--row" style={{ alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <span
              className="eyebrow"
              style={{
                background: '#EDE9FE',
                color: '#522AB0',
                padding: '6px 14px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.05em',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> LIVE OWNER LISTINGS
            </span>
            <h2 style={{ marginTop: '12px', marginBottom: '6px', fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 800 }}>
              Fresh Verified Properties Directly From Owners
            </h2>
            <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
              Real-time zero-brokerage listings across Gujarat and Pune with verified documents.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/properties"
              className="seeall"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
                color: '#522AB0',
                textDecoration: 'none',
                fontSize: '14.5px',
              }}
            >
              View all {properties?.length || 23} listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '26px',
            flexWrap: 'wrap',
          }}
        >
          {(['All', 'Buy', 'Rent', 'Plot'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 750 : 600,
                  cursor: 'pointer',
                  border: isActive ? '1.5px solid #522AB0' : '1px solid #E2E8F0',
                  background: isActive ? '#522AB0' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  transition: 'all 0.18s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(82, 42, 176, 0.22)' : '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                {tab === 'All' && '🌟 All Live Properties'}
                {tab === 'Buy' && '🏡 Homes for Sale'}
                {tab === 'Rent' && '🔑 Rental Homes'}
                {tab === 'Plot' && '🌾 Land & Plots'}
              </button>
            );
          })}
        </div>

        {/* Live Properties 6-Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
          className="live-properties-grid"
        >
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <PropertyCard
                key={listing.id}
                listing={listing}
                ownerListedText={listing.ownerRole || 'Owner Verified'}
                ctaText="View Details"
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '48px 20px',
                textAlign: 'center',
                background: '#fff',
                borderRadius: '16px',
                border: '1px dashed #CBD5E1',
                color: '#64748B',
              }}
            >
              No properties found in this category.
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .live-properties-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 18px !important;
          }
        }
        @media (max-width: 640px) {
          .live-properties-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default PopularCategoriesShowcase;
