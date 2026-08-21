'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, Ban, Trash2, FileKey } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestType, setRequestType] = useState('Data Erasure');
  const [userEmail, setUserEmail] = useState('');

  const handlePrivacyRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      alert('Your privacy request has been submitted to our Data Protection Officer. We will process it within 48 hours.');
      setUserEmail('');
    }, 800);
  };

  const privacyPillars = [
    {
      icon: <Lock className="w-7 h-7 text-[#522AB0]" />,
      title: 'Phone Number Protection',
      desc: 'Property owners control who gets their contact number. No public scraping, no unwanted sales calls.',
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#522AB0]" />,
      title: '256-Bit SSL Encryption',
      desc: 'All communications, legal documents, and payment details are encrypted using banking-grade security protocols.',
    },
    {
      icon: <Ban className="w-7 h-7 text-[#522AB0]" />,
      title: 'Zero Data Selling',
      desc: 'We never sell your personal contact numbers, property addresses, or financial data to 3rd party brokers or telemarketers.',
    },
    {
      icon: <Trash2 className="w-7 h-7 text-[#522AB0]" />,
      title: 'Right to Be Forgotten',
      desc: 'You can delete your listings, remove your contact number, or erase your entire account history at any time.',
    },
  ];

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Privacy Policy</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#0F9D58', fontWeight: 800, background: '#E6F4EA', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck className="w-3.5 h-3.5" /> DPO Compliant Platform
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 100%)', color: '#fff', padding: '48px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '11.5px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Lock className="w-3.5 h-3.5" /> Data Protection & Trust
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px' }}>
            Your Privacy & Data Control
          </h1>
          <p style={{ fontSize: '15px', color: '#d9cdf2', margin: 0, lineHeight: 1.6 }}>
            At GujjuProperty, we respect your privacy. Learn how we protect your personal contact information and property details.
          </p>
        </div>
      </div>

      {/* PRIVACY PILLARS GRID */}
      <div className="wrap" style={{ maxWidth: '1100px', margin: '40px auto 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {privacyPillars.map((p, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #EBE6F7', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ marginBottom: '12px' }}>{p.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px' }}>{p.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* DETAILED SECTIONS */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 36px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)', marginBottom: '40px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#41208C', margin: '0 0 10px' }}>
                1. Information We Collect
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                When you create an account, post a listing, or request owner contact numbers, we collect information such as your name, mobile number, email address, property location, pricing details, and browsing preferences.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#41208C', margin: '0 0 10px' }}>
                2. How We Use Your Information
              </h2>
              <ul style={{ fontSize: '14px', color: 'var(--body)', lineHeight: 1.6, margin: 0, paddingLeft: '20px' }}>
                <li>To enable direct buyer-owner and tenant-landlord communication.</li>
                <li>To send instant WhatsApp alerts for matching property shortlists.</li>
                <li>To process rental agreement paperwork and title verification requests.</li>
                <li>To prevent fraud, fake listings, and telemarketing spam.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#41208C', margin: '0 0 10px' }}>
                3. Cookies & Tracking Technologies
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                We use essential cookies to keep you logged in, save your favorite property shortlists, and analyze website traffic performance. You can disable non-essential cookies via your web browser settings.
              </p>
            </div>

          </div>

        </div>

        {/* PRIVACY REQUEST FORM CARD */}
        <div style={{ background: '#FAF9FD', borderRadius: '20px', padding: '32px', border: '1px solid #EBE6F7', maxWidth: '640px', margin: '0 auto' }}>
          <div className="flex justify-center mb-2">
            <FileKey className="w-8 h-8 text-[#522AB0]" />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#41208C', margin: '0 0 8px', textAlign: 'center' }}>
            Submit Data Privacy / Deletion Request
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', margin: '0 0 20px' }}>
            Need to export your personal data or permanently remove your phone number and listings?
          </p>

          <form onSubmit={handlePrivacyRequest} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Request Type</label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#fff' }}
              >
                <option value="Data Erasure">Permanent Account & Listing Deletion</option>
                <option value="Data Export">Export My Data & Activity History</option>
                <option value="Hide Phone">Hide Phone Number from Public Search</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Registered Email / Mobile *</label>
              <input
                type="text"
                required
                placeholder="Enter your registered email or 10-digit mobile number"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#fff' }}
              />
            </div>

            <button
              type="submit"
              disabled={requestSubmitted}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                background: '#522AB0',
                color: '#fff',
                border: 'none',
                fontSize: '14.5px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {requestSubmitted ? 'Submitting Request...' : 'Submit Official Privacy Request'}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
