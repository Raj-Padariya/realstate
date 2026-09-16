'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import {
  KeyRound,
  Trees,
  Building2,
  Home,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Bed,
  Maximize2,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function AdminManagePropertiesPage() {
  const { properties, deleteProperty, toggleVerification } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBhk, setFilterBhk] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterVerified, setFilterVerified] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Quick stats
  const totalCount = properties.length;
  const rentCount = properties.filter(p => p.listingCategory === 'Rent' || p.price.includes('/mo') || p.title.toLowerCase().includes('rent')).length;
  const buyCount = properties.filter(p => p.listingCategory === 'Buy' || (!p.price.includes('/mo') && !p.title.toLowerCase().includes('rent'))).length;
  const commCount = properties.filter(p => p.listingCategory === 'Commercial' || p.title.toLowerCase().includes('office') || p.title.toLowerCase().includes('shop')).length;
  const verifiedCount = properties.filter(p => p.badgeText?.toLowerCase().includes('verified') || p.badgeText?.toLowerCase().includes('rera')).length;

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBhk = filterBhk === 'All' || prop.bhk === filterBhk;
    
    let matchesCat = true;
    if (filterCategory === 'Rent') {
      matchesCat = prop.listingCategory === 'Rent' || prop.price.includes('/mo') || prop.title.toLowerCase().includes('rent');
    } else if (filterCategory === 'Buy') {
      matchesCat = prop.listingCategory === 'Buy' || (!prop.price.includes('/mo') && !prop.title.toLowerCase().includes('rent'));
    } else if (filterCategory === 'Commercial') {
      matchesCat = prop.listingCategory === 'Commercial' || prop.title.toLowerCase().includes('office') || prop.title.toLowerCase().includes('shop');
    } else if (filterCategory === 'Plot') {
      matchesCat = prop.listingCategory === 'Plot' || prop.title.toLowerCase().includes('plot') || prop.title.toLowerCase().includes('land');
    }

    let matchesVer = true;
    const isVer = prop.badgeText?.toLowerCase().includes('verified') || prop.badgeText?.toLowerCase().includes('rera');
    if (filterVerified === 'Verified') matchesVer = isVer;
    if (filterVerified === 'Pending') matchesVer = !isVer;

    return matchesSearch && matchesBhk && matchesCat && matchesVer;
  });

  const handleDelete = (id: string) => {
    deleteProperty(id);
    setDeleteConfirmId(null);
  };

  const getCategoryBadge = (prop: any) => {
    const isRent = prop.listingCategory === 'Rent' || prop.price.includes('/mo') || prop.title.toLowerCase().includes('rent');
    const isPlot = prop.listingCategory === 'Plot' || prop.title.toLowerCase().includes('plot') || prop.title.toLowerCase().includes('land');
    const isComm = prop.listingCategory === 'Commercial' || prop.title.toLowerCase().includes('office') || prop.title.toLowerCase().includes('shop');

    if (isRent) {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}>
          <KeyRound style={{ width: '12px', height: '12px', color: '#059669' }} /> Rent
        </span>
      );
    }
    if (isPlot) {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, background: '#FAF5FF', color: '#7E22CE', border: '1px solid #E9D5FF' }}>
          <Trees style={{ width: '12px', height: '12px', color: '#7E22CE' }} /> Land / Plot
        </span>
      );
    }
    if (isComm) {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A' }}>
          <Building2 style={{ width: '12px', height: '12px', color: '#D97706' }} /> Commercial
        </span>
      );
    }
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE' }}>
        <Home style={{ width: '12px', height: '12px', color: '#4F46E5' }} /> For Sale
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '100%' }}>
      {/* 1. HEADER SECTION */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E1035 0%, #2A1454 60%, #170A30 100%)',
          borderRadius: '18px',
          padding: '24px 28px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 24px rgba(23, 10, 48, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 900, margin: 0, letterSpacing: '-0.2px' }}>
              Inventory &amp; Listings Manager
            </h1>
            <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 800, background: 'rgba(254, 220, 0, 0.18)', color: '#FEDC00', border: '1px solid rgba(254, 220, 0, 0.35)' }}>
              {properties.length} Active Listings
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Publish new properties, update pricing, toggle verified owner status, or preview public listing pages live.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            href="/properties"
            target="_blank"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: 750,
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <ExternalLink style={{ width: '14px', height: '14px', color: '#FEDC00' }} /> View Live Portal
          </Link>
          <Link
            href="/admin/properties/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 850,
              color: '#1E1035',
              background: 'linear-gradient(135deg, #FEDC00 0%, #FBBF24 100%)',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(254, 220, 0, 0.35)',
            }}
          >
            <PlusCircle style={{ width: '15px', height: '15px' }} /> Add New Property
          </Link>
        </div>
      </div>

      {/* 2. QUICK STATS PILLS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Properties</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>{totalCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EEF2FF', display: 'grid', placeItems: 'center', color: '#4F46E5' }}>
            <Building2 style={{ width: '20px', height: '20px' }} />
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Verified Owners</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#059669', marginTop: '2px' }}>{verifiedCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', display: 'grid', placeItems: 'center', color: '#059669' }}>
            <ShieldCheck style={{ width: '20px', height: '20px' }} />
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>For Resale / Buy</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>{buyCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FAF5FF', display: 'grid', placeItems: 'center', color: '#7C3AED' }}>
            <Home style={{ width: '20px', height: '20px' }} />
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>For Rent</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#059669', marginTop: '2px' }}>{rentCount}</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', display: 'grid', placeItems: 'center', color: '#059669' }}>
            <KeyRound style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
      </div>

      {/* 3. FILTER & SEARCH TOOLBAR */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* SEARCH INPUT */}
          <div style={{ flex: 1, minWidth: '240px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '12px', width: '16px', height: '16px', color: '#94A3B8', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search by property title, locality, ID (e.g. Pune, Baner, prop-1)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 38px',
                fontSize: '13.5px',
                borderRadius: '9px',
                border: '1px solid #CBD5E1',
                outline: 'none',
                background: '#F8FAFC',
                color: '#0F172A',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', fontSize: '11px', fontWeight: 700, color: '#64748B', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* BHK FILTER */}
          <select
            value={filterBhk}
            onChange={(e) => setFilterBhk(e.target.value)}
            aria-label="Filter by BHK"
            style={{
              padding: '9px 14px',
              borderRadius: '9px',
              border: '1px solid #CBD5E1',
              fontSize: '12.5px',
              fontWeight: 700,
              background: '#F8FAFC',
              color: '#334155',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="All">All BHK Types</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
          </select>

          {/* VERIFICATION FILTER */}
          <select
            value={filterVerified}
            onChange={(e) => setFilterVerified(e.target.value)}
            aria-label="Filter by verification"
            style={{
              padding: '9px 14px',
              borderRadius: '9px',
              border: '1px solid #CBD5E1',
              fontSize: '12.5px',
              fontWeight: 700,
              background: '#F8FAFC',
              color: '#334155',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="All">All Verification</option>
            <option value="Verified">Verified Only</option>
            <option value="Pending">Pending / Unverified</option>
          </select>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {[
            { id: 'All', label: 'All Inventory' },
            { id: 'Buy', label: '🏠 Resale / Buy' },
            { id: 'Rent', label: '🔑 For Rent' },
            { id: 'Commercial', label: '🏬 Commercial' },
            { id: 'Plot', label: '📐 Plots & Land' },
          ].map((cat) => {
            const isActive = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: isActive ? '1px solid #522AB0' : '1px solid #E2E8F0',
                  background: isActive ? '#522AB0' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}

          <div style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}>
            Showing <strong>{filteredProperties.length}</strong> of {properties.length} properties
          </div>
        </div>
      </div>

      {/* 4. PROPERTIES DATA TABLE */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 800, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 18px', minWidth: '240px' }}>Property Title &amp; ID</th>
                <th style={{ padding: '14px 18px' }}>Category</th>
                <th style={{ padding: '14px 18px' }}>Price</th>
                <th style={{ padding: '14px 18px' }}>Specs &amp; Area</th>
                <th style={{ padding: '14px 18px' }}>Location</th>
                <th style={{ padding: '14px 18px' }}>Verification Status</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((prop) => {
                const isVerified = prop.badgeText?.toLowerCase().includes('verified') || prop.badgeText?.toLowerCase().includes('rera');
                return (
                  <tr
                    key={prop.id}
                    style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#FBFBFE')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                  >
                    {/* PROPERTY TITLE & PHOTO */}
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={prop.image}
                          alt={prop.title}
                          style={{
                            width: '56px',
                            height: '42px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            flexShrink: 0,
                            border: '1px solid #E2E8F0',
                            background: '#F1F5F9'
                          }}
                        />
                        <div style={{ minWidth: 0, maxWidth: '280px' }}>
                          <div style={{ fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {prop.title}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748B', fontFamily: 'monospace', marginTop: '2px' }}>
                            ID: <span style={{ color: '#522AB0', fontWeight: 700 }}>{prop.id}</span>
                            {prop.ownerName && <span> · {prop.ownerName}</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td style={{ padding: '12px 18px', whiteSpace: 'nowrap' }}>
                      {getCategoryBadge(prop)}
                    </td>

                    {/* PRICE */}
                    <td style={{ padding: '12px 18px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 900, color: '#0F172A', fontSize: '14px' }}>
                        {prop.price}
                      </div>
                      {prop.pricePerSqFt && (
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{prop.pricePerSqFt}</div>
                      )}
                    </td>

                    {/* SPECS */}
                    <td style={{ padding: '12px 18px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontWeight: 700, color: '#334155', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', marginRight: '6px' }}>
                        {prop.bhk}
                      </span>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>{prop.areaSqFt}</span>
                    </td>

                    {/* LOCATION */}
                    <td style={{ padding: '12px 18px', maxWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={prop.address}>
                        <MapPin style={{ width: '13px', height: '13px', color: '#94A3B8', flexShrink: 0 }} />
                        <span>{prop.address}</span>
                      </div>
                    </td>

                    {/* VERIFICATION TOGGLE */}
                    <td style={{ padding: '12px 18px', whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        onClick={() => toggleVerification(prop.id)}
                        title="Click to toggle status"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          background: isVerified ? '#ECFDF5' : '#FFFBEB',
                          color: isVerified ? '#059669' : '#D97706',
                          border: isVerified ? '1px solid #A7F3D0' : '1px solid #FDE68A',
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isVerified ? '#10B981' : '#F59E0B' }} />
                        {prop.badgeText || (isVerified ? 'Verified' : 'Pending')}
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td style={{ padding: '12px 18px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <Link
                          href={`/property/${prop.id}`}
                          target="_blank"
                          title="Preview live on portal"
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            background: '#F1F5F9',
                            color: '#475569',
                            display: 'grid',
                            placeItems: 'center',
                            textDecoration: 'none',
                          }}
                        >
                          <ExternalLink style={{ width: '14px', height: '14px' }} />
                        </Link>
                        <Link
                          href={`/admin/properties/edit/${prop.id}`}
                          title="Edit listing details"
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            background: '#EFE9FB',
                            color: '#522AB0',
                            display: 'grid',
                            placeItems: 'center',
                            textDecoration: 'none',
                          }}
                        >
                          <Edit style={{ width: '14px', height: '14px' }} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(prop.id)}
                          title="Delete listing"
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            background: '#FEE2E2',
                            color: '#DC2626',
                            border: 'none',
                            display: 'grid',
                            placeItems: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProperties.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '48px 20px', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F1F5F9', color: '#64748B', margin: '0 auto 10px', display: 'grid', placeItems: 'center' }}>
                      <Search style={{ width: '22px', height: '22px' }} />
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>No properties found</div>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 12px' }}>
                      No listing matches the current filter query. Try resetting your search or category pills.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setFilterBhk('All');
                        setFilterCategory('All');
                        setFilterVerified('All');
                      }}
                      style={{ padding: '7px 14px', borderRadius: '8px', background: '#522AB0', color: '#FFFFFF', border: 'none', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '24px', maxWidth: '440px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FEE2E2', color: '#DC2626', display: 'grid', placeItems: 'center', marginBottom: '14px' }}>
              <AlertCircle style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>Delete Property Listing?</h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
              Are you sure you want to remove listing <strong>#{deleteConfirmId}</strong>? It will immediately be taken offline from search results.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                style={{ padding: '8px 16px', borderRadius: '8px', background: '#F1F5F9', border: '1px solid #CBD5E1', color: '#334155', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                style={{ padding: '8px 16px', borderRadius: '8px', background: '#DC2626', border: 'none', color: '#FFFFFF', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
