'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Phone, Zap, Eye, Pause, Play, CheckCircle2, Plus } from 'lucide-react';
import MasterPlansComponent from '@/components/plans/MasterPlansComponent';

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'leads' | 'plans'>('listings');

  const [myProperties, setMyProperties] = useState([
    {
      id: 'prop-101',
      title: '3 BHK Flat in Shivalik Shilp',
      location: 'Bopal, Ahmedabad',
      price: '₹78 Lakh',
      type: 'Resale Flat',
      status: 'Active',
      views: 184,
      inquiries: 19,
      postedDate: '12 Aug 2026',
      badge: 'Owner Verified',
    },
    {
      id: 'prop-102',
      title: 'Commercial Ground Floor Shop',
      location: 'SG Highway, Ahmedabad',
      price: '₹45,000 / mo',
      type: 'Commercial Rent',
      status: 'Active',
      views: 92,
      inquiries: 8,
      postedDate: '04 Aug 2026',
      badge: 'Owner Verified',
    },
    {
      id: 'prop-103',
      title: 'Residential Plot - 220 Sq.Yd',
      location: 'Activation Area, Dholera SIR',
      price: '₹14.5 Lakh',
      type: 'Plot / Land',
      status: 'Paused',
      views: 310,
      inquiries: 34,
      postedDate: '28 Jul 2026',
      badge: 'Title Checked',
    },
  ]);

  const recentLeads = [
    {
      id: 'lead-1',
      buyerName: 'Amit Shah',
      phone: '+91 9825X XXXXX',
      propertyTitle: '3 BHK Flat in Shivalik Shilp',
      date: 'Today, 10:45 AM',
      type: 'Direct Call Request',
      status: 'New',
    },
    {
      id: 'lead-2',
      buyerName: 'Priya Joshi',
      phone: '+91 9408X XXXXX',
      propertyTitle: 'Commercial Ground Floor Shop',
      date: 'Yesterday, 4:20 PM',
      type: 'WhatsApp Inquiry',
      status: 'Contacted',
    },
    {
      id: 'lead-3',
      buyerName: 'Sanjay Patel',
      phone: '+91 9979X XXXXX',
      propertyTitle: 'Residential Plot - Dholera',
      date: '18 Aug 2026',
      type: 'Visit Scheduled',
      status: 'Scheduled',
    },
  ];

  const togglePropertyStatus = (id: string) => {
    setMyProperties((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Active' ? 'Paused' : 'Active' }
          : item
      )
    );
  };

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Header Strip */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Owner Dashboard</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12.5px', color: '#0F9D58', fontWeight: 800, background: '#E6F4EA', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Owner Account
            </span>
            <Link href="/post-property" style={{ background: '#522AB0', color: '#fff', padding: '8px 16px', borderRadius: '10px', fontWeight: 800, fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Plus className="w-4 h-4" /> Post New Property
            </Link>
          </div>
        </div>
      </div>

      {/* DASHBOARD HERO STRIP */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 100%)', color: '#fff', padding: '36px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#FEDC00', textTransform: 'uppercase' }}>
                Welcome back, Owner Portal
              </span>
              <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0 4px' }}>
                Ramesh Patel's Property Dashboard
              </h1>
              <p style={{ fontSize: '14px', color: '#d9cdf2', margin: 0 }}>
                Manage your posted listings, view buyer inquiries, and boost property reach.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '14px', padding: '14px 20px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#FEDC00' }}>3</div>
                <div style={{ fontSize: '11px', color: '#d9cdf2', fontWeight: 600 }}>Properties</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '14px', padding: '14px 20px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#FEDC00' }}>586</div>
                <div style={{ fontSize: '11px', color: '#d9cdf2', fontWeight: 600 }}>Total Views</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '14px', padding: '14px 20px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#FEDC00' }}>61</div>
                <div style={{ fontSize: '11px', color: '#d9cdf2', fontWeight: 600 }}>Buyer Leads</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD CONTENT WRAPPER */}
      <div className="wrap" style={{ maxWidth: '1200px', margin: '30px auto 0' }}>
        
        {/* TABS NAVIGATION */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid #EBE6F7', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('listings')}
            style={{
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 800,
              border: 'none',
              background: 'none',
              color: activeTab === 'listings' ? '#522AB0' : 'var(--muted)',
              borderBottom: activeTab === 'listings' ? '3px solid #522AB0' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Home className="w-4 h-4" /> My Properties ({myProperties.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            style={{
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 800,
              border: 'none',
              background: 'none',
              color: activeTab === 'leads' ? '#522AB0' : 'var(--muted)',
              borderBottom: activeTab === 'leads' ? '3px solid #522AB0' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Phone className="w-4 h-4" /> Buyer Inquiries ({recentLeads.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('plans')}
            style={{
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 800,
              border: 'none',
              background: 'none',
              color: activeTab === 'plans' ? '#522AB0' : 'var(--muted)',
              borderBottom: activeTab === 'plans' ? '3px solid #522AB0' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Zap className="w-4 h-4" /> Boost & Owner Plans
          </button>
        </div>

        {/* TAB 1: MY PROPERTIES */}
        {activeTab === 'listings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {myProperties.map((prop) => (
              <div key={prop.id} style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #EBE6F7', boxShadow: '0 6px 20px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: prop.status === 'Active' ? '#0F9D58' : '#B06000', background: prop.status === 'Active' ? '#E6F4EA' : '#FEF7E0', padding: '3px 10px', borderRadius: '999px' }}>
                      ● {prop.status}
                    </span>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#522AB0', background: '#EFE9FB', padding: '3px 10px', borderRadius: '999px' }}>
                      {prop.badge}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Posted: {prop.postedDate}</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px' }}>
                    {prop.title}
                  </h3>
                  <div style={{ fontSize: '13.5px', color: 'var(--muted)', fontWeight: 600, marginBottom: '12px' }}>
                    📍 {prop.location} • <strong style={{ color: '#41208C' }}>{prop.price}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--body)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Eye className="w-4 h-4 text-[#522AB0]" /> <strong>{prop.views}</strong> Views</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Phone className="w-4 h-4 text-[#522AB0]" /> <strong>{prop.inquiries}</strong> Buyer Contacts</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => togglePropertyStatus(prop.id)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--line)',
                      background: '#FAF9FD',
                      color: 'var(--ink)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {prop.status === 'Active' ? <><Pause className="w-3.5 h-3.5" /> Pause Listing</> : <><Play className="w-3.5 h-3.5" /> Activate Listing</>}
                  </button>

                  <Link href={`/property/${prop.id}`} style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #522AB0', background: '#EFE9FB', color: '#41208C', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}>
                    Preview
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: BUYER INQUIRIES */}
        {activeTab === 'leads' && (
          <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #EBE6F7', boxShadow: '0 6px 20px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 16px' }}>
              Recent Buyer Leads & Callback Requests
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentLeads.map((lead) => (
                <div key={lead.id} style={{ background: '#FAF9FD', borderRadius: '14px', padding: '18px 20px', border: '1px solid #EBE6F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#41208C' }}>{lead.buyerName}</span>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#522AB0', background: '#EFE9FB', padding: '2px 8px', borderRadius: '6px' }}>{lead.type}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--body)' }}>Property: <strong>{lead.propertyTitle}</strong></div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>⏰ Received: {lead.date}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <a
                      href={`tel:${lead.phone}`}
                      style={{
                        background: '#0F9D58',
                        color: '#fff',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '13px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Phone className="w-4 h-4" /> Call Buyer ({lead.phone})
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BOOST & OWNER PLANS */}
        {activeTab === 'plans' && (
          <div style={{ marginTop: '10px' }}>
            <MasterPlansComponent defaultTab="owner" />
          </div>
        )}

      </div>

    </div>
  );
}
