'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import { KeyRound, Trees, Building2, Home, PlusCircle, Search, Trash2, Edit, CheckCircle2 } from 'lucide-react';

export default function AdminManagePropertiesPage() {
  const { properties, deleteProperty, toggleVerification } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBhk, setFilterBhk] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) || prop.address.toLowerCase().includes(searchQuery.toLowerCase());
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

    return matchesSearch && matchesBhk && matchesCat;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this property listing? It will immediately be removed across the portal.')) {
      deleteProperty(id);
    }
  };

  const getCategoryBadge = (prop: any) => {
    const isRent = prop.listingCategory === 'Rent' || prop.price.includes('/mo') || prop.title.toLowerCase().includes('rent');
    const isPlot = prop.listingCategory === 'Plot' || prop.title.toLowerCase().includes('plot') || prop.title.toLowerCase().includes('land');
    const isComm = prop.listingCategory === 'Commercial' || prop.title.toLowerCase().includes('office') || prop.title.toLowerCase().includes('shop');

    if (isRent) {
      return (
        <span style={{ background: '#e8f6ee', color: '#107c41', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '99px', border: '1px solid #b7e1cd', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <KeyRound className="w-3 h-3" /> FOR RENT
        </span>
      );
    }
    if (isPlot) {
      return (
        <span style={{ background: '#f3e8ff', color: '#6b21a8', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '99px', border: '1px solid #d8b4fe', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Trees className="w-3 h-3" /> PLOT / LAND
        </span>
      );
    }
    if (isComm) {
      return (
        <span style={{ background: '#fef7e0', color: '#b06000', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '99px', border: '1px solid #fde293', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Building2 className="w-3 h-3" /> COMMERCIAL
        </span>
      );
    }
    return (
      <span style={{ background: '#efe9fb', color: '#522ab0', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '99px', border: '1px solid #dcd0f9', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        <Home className="w-3 h-3" /> FOR RESALE
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* TITLE & HEADER BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: 'var(--ink)' }}>Manage Property Listings</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '14px' }}>Add, edit, verify, or remove property listings live on the portal.</p>
        </div>
        <Link
          href="/admin/properties/new"
          style={{
            background: 'var(--brand)',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '14px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <PlusCircle className="w-4 h-4 text-[#FEDC00]" /> Add New Property
        </Link>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <input
            placeholder="Search by property title or locality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '10px 14px',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              background: '#efe9fb',
              color: '#522ab0',
              cursor: 'pointer',
            }}
          >
            <option value="All">All Categories</option>
            <option value="Buy">🏠 Buy / Sale</option>
            <option value="Rent">🔑 For Rent</option>
            <option value="Commercial">🏬 Commercial</option>
            <option value="Plot">📐 Plots / Land</option>
          </select>
        </div>

        <div>
          <select
            value={filterBhk}
            onChange={(e) => setFilterBhk(e.target.value)}
            style={{
              padding: '10px 14px',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="All">All BHK Types</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
          </select>
        </div>

        <div style={{ fontWeight: '700', fontSize: '13.5px', color: 'var(--muted)' }}>
          Showing {filteredProperties.length} of {properties.length} properties
        </div>
      </div>

      {/* PROPERTIES MANAGEMENT TABLE */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', color: 'var(--muted)', fontWeight: '700' }}>
                <th style={{ padding: '14px 18px' }}>Category</th>
                <th style={{ padding: '14px 18px' }}>Property Title</th>
                <th style={{ padding: '14px 18px' }}>Price</th>
                <th style={{ padding: '14px 18px' }}>Location</th>
                <th style={{ padding: '14px 18px' }}>Specs</th>
                <th style={{ padding: '14px 18px' }}>Verification Status</th>
                <th style={{ padding: '14px 18px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((prop) => (
                <tr key={prop.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '14px 18px' }}>
                    {getCategoryBadge(prop)}
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={prop.image}
                        alt={prop.title}
                        style={{ width: '56px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <div>{prop.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '500' }}>ID: {prop.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: '800', color: 'var(--ink)' }}>{prop.price}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--body)' }}>{prop.address}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--muted)', fontWeight: '600' }}>
                    {prop.bhk} · {prop.areaSqFt}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <button
                      type="button"
                      onClick={() => toggleVerification(prop.id)}
                      title="Click to toggle status"
                      style={{
                        background: prop.badgeText.toLowerCase().includes('verified') ? '#e8f6ee' : '#fff3d6',
                        color: prop.badgeText.toLowerCase().includes('verified') ? 'var(--green)' : '#8a5f00',
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        border: 0,
                        cursor: 'pointer',
                      }}
                    >
                      {prop.badgeText}
                    </button>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link
                        href={`/admin/properties/edit/${prop.id}`}
                        style={{
                          background: 'var(--brand-lt)',
                          color: 'var(--brand)',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontWeight: '700',
                          fontSize: '12px',
                          textDecoration: 'none',
                        }}
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(prop.id)}
                        style={{
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 0,
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontWeight: '700',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProperties.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', fontWeight: '600' }}>
                    No properties match the selected category &amp; search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
