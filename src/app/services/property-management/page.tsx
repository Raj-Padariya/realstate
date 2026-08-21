'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Camera, Coins, Wrench, Building2, CheckCircle } from 'lucide-react';

const managementPillars = [
  { title: 'Tenant Placement &amp; Screening', desc: 'Background verification, credit score audit, employment check, and police verification.' },
  { title: 'Quarterly Video Inspections', desc: 'Our team visits your vacant or rented property every 90 days and uploads 4K video inspection reports.' },
  { title: 'Timely Rent Collection', desc: 'Direct rent deposit to your NRE/NRO or resident savings account by the 5th of every month.' },
  { title: 'Maintenance &amp; Repairs', desc: 'On-demand electrical, plumbing, painting, and deep cleaning with transparent vendor invoices.' },
];

export default function PropertyManagementServicePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyCity: 'Ahmedabad',
    propertyType: 'Residential Flat',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link href="/services" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Property Management</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#522AB0', fontWeight: 800, background: '#EFE9FB', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <KeyRound className="w-3.5 h-3.5" /> Total Peace of Mind for Owners
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #240E54 0%, #41208C 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Building2 className="w-3.5 h-3.5" /> Complete Landlord Protection
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            Property Management for Outstation &amp; NRI Owners
          </h1>
          <p style={{ fontSize: '15.5px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6 }}>
            Living outside Gujarat or abroad? We manage your property, find verified tenants, collect rent, and maintain the premises.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1100px', margin: '40px auto 0' }}>
        
        {/* PILLARS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {managementPillars.map((p, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1px solid #EBE6F7', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ marginBottom: '12px' }}>
                {idx === 0 && <KeyRound className="w-7 h-7 text-[#522AB0]" />}
                {idx === 1 && <Camera className="w-7 h-7 text-[#522AB0]" />}
                {idx === 2 && <Coins className="w-7 h-7 text-[#522AB0]" />}
                {idx === 3 && <Wrench className="w-7 h-7 text-[#522AB0]" />}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px' }}>{p.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* PROPERTY MANAGEMENT INQUIRY FORM */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 36px', border: '1px solid #EBE6F7', boxShadow: '0 16px 40px rgba(41, 16, 92, 0.08)', maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#41208C', margin: '0 0 8px', textAlign: 'center' }}>
            Request Property Management Consultation
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', textAlign: 'center', margin: '0 0 28px' }}>
            Our property care manager will discuss custom plans tailored to your property.
          </p>

          {submitted ? (
            <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <CheckCircle className="w-10 h-10 text-[#0F9D58] mx-auto mb-2" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '8px 0' }}>Consultation Scheduled!</h3>
              <p style={{ fontSize: '13.5px', margin: 0 }}>
                Our senior property manager will call you at <strong>{formData.phone}</strong> to review management options.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Owner Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Property City</label>
                  <input
                    type="text"
                    placeholder="e.g. Ahmedabad, Surat, Pune"
                    value={formData.propertyCity}
                    onChange={(e) => setFormData({ ...formData, propertyCity: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  >
                    <option value="Residential Flat">Residential Flat / Apartment</option>
                    <option value="Independent House / Villa">Independent House / Villa</option>
                    <option value="Commercial Shop / Office">Commercial Shop / Office</option>
                    <option value="Residential Land / Plot">Residential Land / Plot</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
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
                <KeyRound className="w-5 h-5" /> Request Property Care Consultation
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
