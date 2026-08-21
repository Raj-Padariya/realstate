'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Home, CreditCard, Scale, Search } from 'lucide-react';

export default function TermsOfServicePage() {
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const termSections = [
    {
      id: 'general',
      title: '1. General Terms & Platform Usage',
      icon: <FileText className="w-5 h-5" />,
      content: [
        {
          heading: 'Acceptance of Terms',
          body: 'By accessing or using GujjuProperty (gujjuproperty.com), mobile apps, or associated services, you agree to be bound by these Terms of Service. If you do not agree, please refrain from using the platform.',
        },
        {
          heading: 'Platform Role & Zero Brokerage Policy',
          body: 'GujjuProperty acts solely as an owner-to-buyer/tenant communication marketplace. We do not act as a real estate agent or broker, nor do we collect commission on property transactions.',
        },
        {
          heading: 'Eligibility',
          body: 'You must be at least 18 years of age and legally competent to enter into binding contracts under Indian Law to post listings or enter property agreements.',
        },
      ],
    },
    {
      id: 'listings',
      title: '2. Property Listing & Owner Guidelines',
      icon: <Home className="w-5 h-5" />,
      content: [
        {
          heading: 'Accurate Information Required',
          body: 'Property owners must provide accurate property titles, real photographs, exact pricing, and correct contact numbers. Listing misleading photos or false ownership claims will result in instant account suspension.',
        },
        {
          heading: 'No Broker Listings on Free Tier',
          body: 'Free listings are strictly reserved for direct property owners. Real estate brokers or agencies attempting to list under free owner tier will have their accounts banned permanently.',
        },
        {
          heading: 'Verification & Moderation Rights',
          body: 'GujjuProperty reserves the right to request proof of ownership (7/12 extract, tax bills, allotment letters) before publishing listings on the public domain.',
        },
      ],
    },
    {
      id: 'payments',
      title: '3. Assisted Plans & Payment Policy',
      icon: <CreditCard className="w-5 h-5" />,
      content: [
        {
          heading: 'Optional Assisted Services',
          body: 'Basic searching, viewing owner listings, and posting free properties remain 100% free. Assisted plans (Relax Plan, Buyer VIP, NRI Assist) are optional value-added services.',
        },
        {
          heading: 'Refund & Money-Back Guarantee',
          body: 'The Relax Plan comes with a 30-day Money-Back Guarantee if GujjuProperty fails to schedule shortlisted visits or assist in finding a property according to agreed criteria.',
        },
        {
          heading: 'Payment Gateway Security',
          body: 'All online transactions are processed securely via RBI-compliant 256-bit encrypted gateways. GujjuProperty never stores your card CVV or net banking credentials.',
        },
      ],
    },
    {
      id: 'legal',
      title: '4. Legal Liability & Disclaimers',
      icon: <Scale className="w-5 h-5" />,
      content: [
        {
          heading: 'Independent Verification Advised',
          body: 'While GujjuProperty performs automated and title sanity checks, buyers and tenants are strongly advised to perform independent title checks, sub-registrar verification, and physical inspection before transferring funds.',
        },
        {
          heading: 'Limitation of Liability',
          body: 'GujjuProperty is not liable for disputes arising between landlords and tenants, contract breaches, non-payment of rent, or title defects beyond the scope of selected assisted legal verification packages.',
        },
        {
          heading: 'Jurisdiction & Governing Law',
          body: 'These terms are governed by the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of courts located in Ahmedabad, Gujarat.',
        },
      ],
    },
  ];

  const filteredSections = termSections.map((sec) => ({
    ...sec,
    content: sec.content.filter(
      (c) =>
        c.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.body.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((sec) => sec.content.length > 0);

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Terms of Service</span>
          </div>

          <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
            Last Updated: January 15, 2026
          </span>
        </div>
      </div>

      {/* HEADER BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 100%)', color: '#fff', padding: '48px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px' }}>
            Terms & Conditions of Service
          </h1>
          <p style={{ fontSize: '15px', color: '#d9cdf2', margin: '0 0 24px', lineHeight: 1.5 }}>
            Please read these terms carefully before using GujjuProperty services.
          </p>

          {/* Quick Search inside Terms */}
          <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search in terms (e.g. refund, listing, zero brokerage)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '14px 20px 14px 44px', borderRadius: '12px', border: 'none', fontSize: '14px', outline: 'none', background: '#fff', color: 'var(--ink)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            />
            <Search className="w-5 h-5 text-[#522AB0] absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1100px', margin: '40px auto 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '30px' }}>
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', border: '1px solid #EBE6F7', position: 'sticky', top: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '8px 12px' }}>
                Navigation Sections
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                {termSections.map((sec) => {
                  const isActive = activeTab === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(sec.id);
                        setSearchQuery('');
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: 'none',
                        background: isActive ? '#EFE9FB' : 'transparent',
                        color: isActive ? '#41208C' : 'var(--ink)',
                        fontSize: '13.5px',
                        fontWeight: isActive ? 800 : 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span>{sec.icon}</span>
                      <span>{sec.title}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #EBE6F7', paddingLeft: '12px', paddingRight: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>Need legal help?</div>
                <Link href="/contact" style={{ fontSize: '13px', color: '#522AB0', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Contact Legal Desk →
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT DISPLAY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredSections.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', textAlign: 'center', border: '1px solid #EBE6F7' }}>
                <Search className="w-8 h-8 text-[#522AB0] mx-auto mb-2" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginTop: '12px' }}>No terms matched your search</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>Try searching for another keyword like "refund" or "listing".</p>
                <button type="button" onClick={() => setSearchQuery('')} style={{ background: '#522AB0', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginTop: '10px' }}>
                  Clear Search Filter
                </button>
              </div>
            ) : (
              filteredSections
                .filter((sec) => searchQuery !== '' || sec.id === activeTab)
                .map((section) => (
                  <div key={section.id} style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #EBE6F7', boxShadow: '0 6px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #EBE6F7', paddingBottom: '16px' }}>
                      <span className="text-[#522AB0]">{section.icon}</span>
                      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: 0 }}>{section.title}</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {section.content.map((clause, cIdx) => (
                        <div key={cIdx} style={{ background: '#FAF9FD', borderRadius: '12px', padding: '20px', border: '1px solid #EBE6F7' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>
                            {clause.heading}
                          </h4>
                          <p style={{ fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                            {clause.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
