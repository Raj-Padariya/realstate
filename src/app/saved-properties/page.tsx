'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import PropertyListCard from '@/shared/ui/property-list-card';
import {
  Heart,
  Building2,
  Home,
  Key,
  Store,
  Landmark,
  ArrowRight,
  Trash2,
  Share2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function SavedPropertiesPage() {
  const { savedProperties, clearAllSaved, savedIds } = useProperties();
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Buy' | 'Rent' | 'Commercial' | 'Plot'>('All');
  const [sortBy, setSortBy] = useState<string>('Recently Added');

  const filteredProperties = useMemo(() => {
    let result = savedProperties.filter((item) => {
      if (categoryFilter === 'All') return true;
      const isRent = item.listingCategory === 'Rent' || item.price.includes('/mo');
      const isPlot = item.listingCategory === 'Plot' || item.title.toLowerCase().includes('plot');
      const isComm = item.listingCategory === 'Commercial' || item.title.toLowerCase().includes('office');

      if (categoryFilter === 'Rent') return isRent;
      if (categoryFilter === 'Buy') return !isRent && !isPlot && !isComm;
      if (categoryFilter === 'Commercial') return isComm;
      if (categoryFilter === 'Plot') return isPlot;
      return true;
    });

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => {
        const numA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
        const numB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
        return numA - numB;
      });
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => {
        const numA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
        const numB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
        return numB - numA;
      });
    }

    return result;
  }, [savedProperties, categoryFilter, sortBy]);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '80vh', paddingBottom: '80px' }}>
      {/* Top Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1C0A3F 0%, #301366 100%)',
          color: '#FFFFFF',
          padding: '40px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '14px', display: 'flex', gap: '8px' }}>
            <Link href="/" style={{ color: '#FEDC00', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#FFFFFF', fontWeight: 650 }}>Shortlisted Properties</span>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span
                style={{
                  background: 'rgba(254, 220, 0, 0.2)',
                  border: '1px solid rgba(254, 220, 0, 0.4)',
                  color: '#FEDC00',
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '10px',
                }}
              >
                <Heart style={{ width: 12, height: 12, fill: '#FEDC00' }} /> SAVED SHORTLIST
              </span>
              <h1 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 900, margin: '4px 0 8px 0', letterSpacing: '-0.3px' }}>
                Your Shortlisted Properties
              </h1>
              <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255, 255, 255, 0.82)', maxWidth: '600px' }}>
                Compare your saved direct verified owner properties, schedule site visits, or get direct owner contact numbers with ₹0 brokerage.
              </p>
            </div>

            {savedProperties.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={clearAllSaved}
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: '9px 16px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Trash2 style={{ width: 14, height: 14 }} />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1180px', margin: '30px auto 0', padding: '0 20px' }}>
        {savedProperties.length > 0 ? (
          <>
            {/* Filter & Sort Bar */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 20px',
                border: '1.5px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                marginBottom: '24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              }}
            >
              {/* Category Tabs */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                {[
                  { id: 'All', label: 'All Saved', icon: <Heart style={{ width: 13, height: 13 }} /> },
                  { id: 'Buy', label: 'Buy / Resale', icon: <Home style={{ width: 13, height: 13 }} /> },
                  { id: 'Rent', label: 'For Rent', icon: <Key style={{ width: 13, height: 13 }} /> },
                  { id: 'Commercial', label: 'Commercial', icon: <Store style={{ width: 13, height: 13 }} /> },
                  { id: 'Plot', label: 'Plots / Land', icon: <Landmark style={{ width: 13, height: 13 }} /> },
                ].map((cat) => {
                  const active = categoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryFilter(cat.id as any)}
                      style={{
                        padding: '7px 16px',
                        borderRadius: '999px',
                        border: active ? '1.5px solid #522AB0' : '1.5px solid #E2E8F0',
                        background: active ? '#522AB0' : '#FFFFFF',
                        color: active ? '#FFFFFF' : '#475569',
                        fontWeight: active ? 800 : 650,
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sort By */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 650 }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #E2E8F0',
                    background: '#FAF9FD',
                    color: '#1E293B',
                    fontSize: '13px',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option>Recently Added</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* List of Shortlisted Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {filteredProperties.map((prop) => (
                <div key={prop.id}>
                  <PropertyListCard listing={prop} />
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: '24px',
              padding: '80px 24px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#F1ECFB',
                color: '#522AB0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <Heart style={{ width: 36, height: 36, color: '#522AB0' }} />
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 850, color: '#0F172A', margin: '0 0 8px 0' }}>
              You Haven&apos;t Shortlisted Any Properties Yet
            </h2>

            <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '440px', margin: '0 auto 28px', lineHeight: 1.6 }}>
              Browse thousands of verified owner properties across Pune, Ahmedabad, Mumbai, and Dholera SIR. Click the heart icon to save and compare them here.
            </p>

            <Link
              href="/properties"
              style={{
                background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
                color: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: '12px',
                fontSize: '14.5px',
                fontWeight: 750,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(82, 42, 176, 0.3)',
              }}
            >
              <span>Explore Verified Properties</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
