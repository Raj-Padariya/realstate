'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Building2, ClipboardList, Scale, Search, CheckCircle } from 'lucide-react';

const verificationFeatures = [
  { title: '7/12 &amp; Hakka Patrak Audit', desc: 'Complete ownership history, mutation entry verification, and boundary discrepancy check.' },
  { title: '30-Year Encumbrance Search', desc: 'Verification against existing bank mortgages, court stays, litigations, or pending loans.' },
  { title: 'RERA &amp; NA / NOC Certification', desc: 'Checks for non-agricultural (NA) use approval, Collector layout permissions, and RERA registration.' },
  { title: 'Advocate Signed Legal Opinion', desc: 'Official legal search report issued by experienced High Court advocates before token payment.' },
];

export default function TitleCheckServicePage() {
  const [selectedPackage, setSelectedPackage] = useState('full');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Ahmedabad',
    propertyType: 'Plot / Land',
    surveyNo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
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
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Title &amp; 7/12 Legal Check</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#0F9D58', fontWeight: 800, background: '#E6F4EA', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Scale className="w-3.5 h-3.5" /> Advocate Verified Search
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #240E54 0%, #41208C 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Search className="w-3.5 h-3.5" /> Legal Due Diligence
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            Property Title &amp; 7/12 Legal Check Before You Pay
          </h1>
          <p style={{ fontSize: '15.5px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6 }}>
            Never risk your hard-earned savings. Get a 30-year advocate search report and 7/12 extract verification within 48 hours.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1100px', margin: '40px auto 0' }}>
        
        {/* FEATURES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {verificationFeatures.map((feat, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1px solid #EBE6F7', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ marginBottom: '12px' }}>
                {idx === 0 && <FileText className="w-7 h-7 text-[#522AB0]" />}
                {idx === 1 && <Building2 className="w-7 h-7 text-[#522AB0]" />}
                {idx === 2 && <ClipboardList className="w-7 h-7 text-[#522AB0]" />}
                {idx === 3 && <Scale className="w-7 h-7 text-[#522AB0]" />}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px' }}>{feat.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.5, margin: 0 }}>{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* ORDER / REQUEST FORM CARD */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 36px', border: '1px solid #EBE6F7', boxShadow: '0 16px 40px rgba(41, 16, 92, 0.08)', maxWidth: '720px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#41208C', margin: '0 0 6px' }}>
              Request Title Verification Report
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
              Provide basic property details to initiate advocate search report.
            </p>
          </div>

          {submitted ? (
            <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <CheckCircle className="w-10 h-10 text-[#0F9D58] mx-auto mb-2" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '8px 0' }}>Title Check Request Submitted!</h3>
              <p style={{ fontSize: '13.5px', margin: 0 }}>
                Our senior legal associate will call you at <strong>{formData.phone}</strong> within 30 minutes to review document requirements.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Package Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Select Package
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage('basic')}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      border: selectedPackage === 'basic' ? '2px solid #522AB0' : '1px solid var(--line)',
                      background: selectedPackage === 'basic' ? '#EFE9FB' : '#FAF9FD',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#41208C' }}>7/12 &amp; NA Audit</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F9D58', marginTop: '4px' }}>Rs. 1,999</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPackage('full')}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      border: selectedPackage === 'full' ? '2px solid #522AB0' : '1px solid var(--line)',
                      background: selectedPackage === 'full' ? '#EFE9FB' : '#FAF9FD',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#41208C' }}>30-Yr Advocate Report</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F9D58', marginTop: '4px' }}>Rs. 3,999</div>
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Your Name *</label>
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
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Dholera SIR, Ahmedabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Survey No. / Plot No. (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Block 142/A"
                    value={formData.surveyNo}
                    onChange={(e) => setFormData({ ...formData, surveyNo: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>
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
                <Scale className="w-5 h-5" /> Request Advocate Title Search
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
