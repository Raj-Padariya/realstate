'use client';

import React from 'react';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import { useLeads } from '@/shared/context/LeadsContext';
import {
  Building2,
  CheckCircle2,
  Mail,
  Users,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  CreditCard,
  FileText,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  Home,
  Check,
  AlertCircle,
  Eye,
  KeyRound,
  Trees,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { properties, toggleVerification } = useProperties();
  const { leads, stats } = useLeads();

  const totalProperties = properties.length;
  const verifiedProperties = properties.filter((l) =>
    (l.badgeText || '').toLowerCase().includes('verified')
  ).length;

  const buyCount = properties.filter(
    (p) =>
      p.listingCategory === 'Buy' ||
      (!p.price.includes('/mo') && !p.title.toLowerCase().includes('rent') && !p.title.toLowerCase().includes('plot'))
  ).length;

  const rentCount = properties.filter(
    (p) => p.listingCategory === 'Rent' || p.price.includes('/mo') || p.title.toLowerCase().includes('rent')
  ).length;

  const commCount = properties.filter(
    (p) => p.listingCategory === 'Commercial' || p.title.toLowerCase().includes('office') || p.title.toLowerCase().includes('shop')
  ).length;

  const plotCount = properties.filter(
    (p) => p.listingCategory === 'Plot' || p.title.toLowerCase().includes('plot') || p.title.toLowerCase().includes('land')
  ).length;

  // City breakdown calculation
  const puneCount = properties.filter((p) => (p.address || '').toLowerCase().includes('pune')).length || 4;
  const ahmedabadCount = properties.filter((p) => (p.address || '').toLowerCase().includes('ahmedabad')).length || 5;
  const dholeraCount = properties.filter((p) => (p.address || '').toLowerCase().includes('dholera')).length || 3;
  const mumbaiCount = properties.filter((p) => (p.address || '').toLowerCase().includes('mumbai')).length || 2;

  const statsCards = [
    {
      label: 'Total Properties Listed',
      value: totalProperties,
      sublabel: `${buyCount} Resale · ${rentCount} Rent · ${commCount} Comm · ${plotCount} Plots`,
      trend: '+14% this month',
      icon: Building2,
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #522AB0 100%)',
      href: '/admin/properties',
    },
    {
      label: 'Leads & Inquiries CRM',
      value: `${leads.length} Leads`,
      sublabel: `${stats.newCount} New · ${stats.inContactCount} In Progress`,
      trend: stats.newCount > 0 ? `${stats.newCount} Unattended` : 'All Contacted',
      isNewAlert: stats.newCount > 0,
      icon: Users,
      gradient: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
      href: '/admin/leads',
    },
    {
      label: 'Verified Direct Owners',
      value: `${verifiedProperties} (${Math.round((verifiedProperties / (totalProperties || 1)) * 100)}%)`,
      sublabel: 'Advocate Title & 7/12 Checked',
      trend: '100% Zero Brokerage',
      icon: CheckCircle2,
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      href: '/admin/properties',
    },
    {
      label: 'Subscription Plans',
      value: '4 Tiers Active',
      sublabel: 'Tenant, Buyer, Owner, Seller Plans',
      trend: '₹0 Commission Model',
      icon: CreditCard,
      gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      href: '/admin/plans',
    },
  ];

  const recentLeads = leads.slice(0, 5);
  const recentProperties = properties.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', maxWidth: '100%' }}>
      {/* 1. WELCOME HERO BANNER */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E1035 0%, #2A1454 50%, #170A30 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 10px 30px rgba(23, 10, 48, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(254, 220, 0, 0.15)', border: '1px solid rgba(254, 220, 0, 0.3)', color: '#FEDC00', padding: '4px 12px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
            <Sparkles className="w-3.5 h-3.5" /> GUJJUPROPERTY CONTROL DESK
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
            Welcome back, Super Admin 👋
          </h1>
          <p style={{ margin: 0, fontSize: '14.5px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '580px', lineHeight: 1.5 }}>
            Real-time management for listings, owner connections, site visits, and automated subscriptions across India.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
          <Link
            href="/admin/leads"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13.5px',
              fontWeight: 750,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
            }}
          >
            <Mail className="w-4 h-4 text-[#FEDC00]" />
            <span>Open Leads CRM ({leads.length})</span>
          </Link>

          <Link
            href="/admin/properties/new"
            style={{
              background: 'linear-gradient(135deg, #FEDC00 0%, #FBBF24 100%)',
              color: '#1E1035',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '13.5px',
              fontWeight: 850,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(254, 220, 0, 0.35)',
            }}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* 2. 4 LUXURY KPI METRIC CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
        }}
      >
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                border: '1.5px solid #E2E8F0',
                padding: '22px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#C4B5FD';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(82, 42, 176, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: card.gradient,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748B', fontWeight: 700 }}>
                  <span>Manage</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#522AB0]" />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
                  {card.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1, marginBottom: '6px' }}>
                  {card.value}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '12px' }}>
                  {card.sublabel}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 800,
                    color: card.isNewAlert ? '#E11D48' : '#059669',
                    background: card.isNewAlert ? '#FFE4E6' : '#ECFDF5',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {card.trend}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. PLATFORM INVENTORY & GEOGRAPHY DISTRIBUTION WIDGET */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '20px',
        }}
      >
        {/* Left: Inventory by City & Geography */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            border: '1.5px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Inventory by City &amp; Region
              </h2>
              <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 600 }}>
                Active properties distributed across top markets
              </span>
            </div>
            <Link href="/admin/properties" style={{ fontSize: '12.5px', color: '#522AB0', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>View Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { city: 'Ahmedabad (SG Highway, Bopal, Prahlad Nagar)', count: ahmedabadCount, pct: 40, color: '#522AB0' },
              { city: 'Pune (Baner, Wakad, Kharadi, Hinjewadi)', count: puneCount, pct: 30, color: '#2563EB' },
              { city: 'Dholera SIR (Smart City & Semiconductor Zone)', count: dholeraCount, pct: 20, color: '#059669' },
              { city: 'Mumbai (Bandra, Andheri, Powai)', count: mumbaiCount, pct: 10, color: '#D97706' },
            ].map((reg, rIdx) => (
              <div key={rIdx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '5px' }}>
                  <span style={{ color: '#1E293B' }}>{reg.city}</span>
                  <span style={{ color: '#64748B' }}>{reg.count} Properties</span>
                </div>
                <div style={{ height: '8px', width: '100%', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${reg.pct}%`, background: reg.color, borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Category Pill summary */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 750, background: '#EDE9FE', color: '#522AB0', padding: '4px 10px', borderRadius: '8px' }}>
              🏠 {buyCount} Resale Homes
            </span>
            <span style={{ fontSize: '11.5px', fontWeight: 750, background: '#ECFDF5', color: '#059669', padding: '4px 10px', borderRadius: '8px' }}>
              🔑 {rentCount} Rental Flats
            </span>
            <span style={{ fontSize: '11.5px', fontWeight: 750, background: '#FEF3C7', color: '#D97706', padding: '4px 10px', borderRadius: '8px' }}>
              🏢 {commCount} Commercial Spaces
            </span>
            <span style={{ fontSize: '11.5px', fontWeight: 750, background: '#F3E8FF', color: '#7C3AED', padding: '4px 10px', borderRadius: '8px' }}>
              🌳 {plotCount} Plots &amp; Land
            </span>
          </div>
        </div>

        {/* Right: Quick Action Hub & Verification Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Direct Title Checked Trust Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
              color: '#FFFFFF',
              borderRadius: '18px',
              padding: '22px',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              <ShieldCheck className="w-4 h-4 text-[#10B981]" /> ZERO BROKERAGE VERIFIED
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 6px 0' }}>
              {verifiedProperties} of {totalProperties} Listings Verified
            </h3>
            <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 16px 0', lineHeight: 1.5 }}>
              Properties checked for 7/12 land records, ownership verification, and clear title documentation.
            </p>
            <Link
              href="/admin/properties"
              style={{
                background: '#522AB0',
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 750,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Verify Pending Listings</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              border: '1.5px solid #E2E8F0',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
              Quick Workflows
            </div>
            <Link
              href="/admin/blogs"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: '#F8FAFC',
                borderRadius: '10px',
                textDecoration: 'none',
                color: '#1E293B',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText className="w-4 h-4 text-[#522AB0]" />
                <span>Write Real Estate Blog</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
            </Link>

            <Link
              href="/admin/rent-agreements"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: '#F8FAFC',
                borderRadius: '10px',
                textDecoration: 'none',
                color: '#1E293B',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound className="w-4 h-4 text-[#059669]" />
                <span>View Rent Agreements</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. RECENT LEADS & RECENT PROPERTIES STREAMS (2-COLUMN) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '20px',
        }}
      >
        {/* Left: Recent Leads & Inquiries Table */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            border: '1.5px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users className="w-5 h-5 text-[#522AB0]" />
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Recent Leads &amp; Inquiries
              </h2>
            </div>
            <Link
              href="/admin/leads"
              style={{ fontSize: '12.5px', color: '#522AB0', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View All ({leads.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
                  <th style={{ padding: '10px 8px', fontWeight: 750 }}>Customer</th>
                  <th style={{ padding: '10px 8px', fontWeight: 750 }}>Service Type</th>
                  <th style={{ padding: '10px 8px', fontWeight: 750 }}>Phone</th>
                  <th style={{ padding: '10px 8px', fontWeight: 750 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#EDE9FE',
                            color: '#522AB0',
                            fontWeight: 800,
                            fontSize: '11px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#0F172A' }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>{item.city}</div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '12px 8px' }}>
                      <span
                        style={{
                          background: '#F1F5F9',
                          color: '#334155',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.type.replace('-', ' ')}
                      </span>
                    </td>

                    <td style={{ padding: '12px 8px', fontFamily: 'monospace', color: '#334155', fontWeight: 650 }}>
                      {item.phone}
                    </td>

                    <td style={{ padding: '12px 8px' }}>
                      <span
                        style={{
                          background: item.status === 'New' ? '#FFE4E6' : item.status === 'Completed' ? '#ECFDF5' : '#FEF3C7',
                          color: item.status === 'New' ? '#E11D48' : item.status === 'Completed' ? '#059669' : '#D97706',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 800,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recent Property Submissions */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            border: '1.5px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 className="w-5 h-5 text-[#522AB0]" />
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Recent Listings
              </h2>
            </div>
            <Link
              href="/admin/properties"
              style={{ fontSize: '12.5px', color: '#522AB0', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Manage All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentProperties.map((prop) => {
              const isVer = (prop.badgeText || '').toLowerCase().includes('verified');
              return (
                <div
                  key={prop.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #EEF2F6',
                  }}
                >
                  <img
                    src={prop.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80'}
                    alt={prop.title}
                    style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: '#0F172A' }}>
                      {prop.price}
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 750, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {prop.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin className="w-3 h-3 text-[#522AB0]" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.address}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleVerification(prop.id)}
                    title={isVer ? 'Click to mark as Title checked' : 'Click to mark as Owner verified'}
                    style={{
                      background: isVer ? '#ECFDF5' : '#FEF3C7',
                      color: isVer ? '#059669' : '#D97706',
                      border: '1px solid',
                      borderColor: isVer ? '#A7F3D0' : '#FDE68A',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isVer ? 'Verified' : 'Pending'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

