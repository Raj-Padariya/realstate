'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Video, Search, Building2, KeyRound, Globe, CheckCircle2 } from 'lucide-react';

export default function NriDeskPage() {
  const [formState, setFormState] = useState({
    name: '',
    country: 'United States (EST/PST)',
    phone: '',
    email: '',
    interest: 'Buying New Property',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg('🎉 Request Received! Our NRI Desk Specialist will contact you via WhatsApp / Zoom within 12 hours matching your timezone.');
      setFormState({
        name: '',
        country: 'United States (EST/PST)',
        phone: '',
        email: '',
        interest: 'Buying New Property',
        message: '',
      });
      setTimeout(() => setSuccessMsg(''), 7000);
    }, 700);
  };

  const nriServices = [
    {
      icon: <Video className="w-6 h-6 text-[#522AB0]" />,
      title: 'Live HD Video Walkthroughs',
      desc: 'Can’t visit in person? Our representative visits the property, inspects construction quality, and conducts a live 4K video walkthrough with you.',
      bg: '#EFE9FB',
    },
    {
      icon: <Search className="w-6 h-6 text-[#0F9D58]" />,
      title: '7/12 & Title Verification',
      desc: 'Advocate-verified legal report for land, plots, and apartments before you pay any token money or signing amount.',
      bg: '#E6F4EA',
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#B06000]" />,
      title: 'Power of Attorney (POA) Support',
      desc: 'Assistance with embassy attestation, draft templates, sub-registrar booking, and seamless registration on your behalf.',
      bg: '#FEF7E0',
    },
    {
      icon: <KeyRound className="w-6 h-6 text-[#1A73E8]" />,
      title: 'Tenant Placement & Rent Deposit',
      desc: 'We verify tenants, execute e-stamped agreements, and ensure direct monthly rent deposit directly into your NRE/NRO bank account.',
      bg: '#E8F0FE',
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
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>NRI Real Estate Desk</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#522AB0', fontWeight: 800, background: '#EFE9FB', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Globe className="w-3.5 h-3.5" /> Serving NRIs in 34+ Countries
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #240E54 0%, #41208C 50%, #522AB0 100%)', color: '#fff', padding: '64px 20px', textAlign: 'center', position: 'relative' }}>
        <div className="wrap" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '20px' }}>
            <Globe className="w-3.5 h-3.5" /> Specialized NRI Services
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.25 }}>
            Buy, Verify & Manage Indian Real Estate from Anywhere in the World
          </h1>

          <p style={{ fontSize: '16.5px', color: '#d9cdf2', margin: '0 0 36px', lineHeight: 1.6, maxWidth: '780px', marginLeft: 'auto', marginRight: 'auto' }}>
            Zero brokerage, advocate-backed title checks, live video walkthroughs, and timezone-matched support for non-resident Indians.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '14px', fontWeight: 700 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 className="w-4 h-4 text-[#FEDC00]" /> Timezone-matched Consultation</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 className="w-4 h-4 text-[#FEDC00]" /> Advocate Title Check</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 className="w-4 h-4 text-[#FEDC00]" /> 100% Remote POA Registration</span>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1200px', margin: '50px auto 0' }}>
        
        {/* SERVICES GRID */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>
            Dedicated Services for NRIs
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)' }}>
            Everything you need to handle real estate transactions back home with total confidence.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {nriServices.map((svc, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '30px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: svc.bg, display: 'grid', placeItems: 'center', marginBottom: '20px' }}>
                {svc.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>{svc.title}</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>{svc.desc}</p>
            </div>
          ))}
        </div>

        {/* BOOK CONSULTATION FORM */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '44px 36px', border: '1px solid #EBE6F7', boxShadow: '0 16px 40px rgba(41, 16, 92, 0.08)', maxWidth: '800px', margin: '0 auto 60px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', background: '#EFE9FB', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase' }}>
              Free Zoom / WhatsApp Call
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#41208C', margin: '10px 0 6px' }}>
              Schedule an NRI Desk Consultation
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
              Speak with a dedicated NRI property manager at a time convenient for your country's time zone.
            </p>
          </div>

          {successMsg && (
            <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '12px', padding: '16px', fontSize: '14px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.5 }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Falguni Shah"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Country of Residence</label>
                <select
                  value={formState.country}
                  onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                >
                  <option value="United States (EST/PST)">United States (USA)</option>
                  <option value="United Kingdom (GMT)">United Kingdom (UK)</option>
                  <option value="United Arab Emirates (GST)">United Arab Emirates (UAE)</option>
                  <option value="Canada (EST/PST)">Canada</option>
                  <option value="Australia (AEST)">Australia</option>
                  <option value="Singapore / Malaysia">Singapore / Malaysia</option>
                  <option value="Other Country">Other Country</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="Include country code (e.g. +1 415...)"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Primary Requirement</label>
              <select
                value={formState.interest}
                onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
              >
                <option value="Buying New Property">Buying Flat / Villa in India</option>
                <option value="Dholera Smart City Plot">Investment in Dholera SIR Plots</option>
                <option value="Selling Existing Property">Selling My Property in India</option>
                <option value="Property Management">Tenant Placement & Property Care</option>
                <option value="Legal Title Verification">7/12 & Advocate Legal Check</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Message or Preferred Call Time</label>
              <textarea
                rows={3}
                placeholder="Mention preferred date, time or details about your property..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #41208C 0%, #522AB0 100%)',
                color: '#fff',
                border: 'none',
                fontSize: '15.5px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(82, 42, 176, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Globe className="w-5 h-5" /> Book Free NRI Consultation
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
