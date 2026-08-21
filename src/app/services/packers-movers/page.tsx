'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Package, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

export default function PackersMoversServicePage() {
  const [shiftType, setShiftType] = useState('2 BHK');
  const [fromLoc, setFromLoc] = useState('');
  const [toLoc, setToLoc] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const shiftOptions = ['1 BHK', '2 BHK', '3 BHK', 'Villa / House', 'Office Space'];

  const benefits = [
    { icon: <Tag className="w-7 h-7 text-[#522AB0]" />, title: 'Fixed Guaranteed Price', desc: 'No sudden price surge on moving day. Full quote locking before shifting begins.' },
    { icon: <Package className="w-7 h-7 text-[#522AB0]" />, title: 'Multi-Layer Packing', desc: 'High-density bubble wrap, corrugated boxes, and furniture corner guards.' },
    { icon: <ShieldCheck className="w-7 h-7 text-[#522AB0]" />, title: 'Transit Insurance Included', desc: 'Complete safety coverage against accidental damage during loading and transit.' },
    { icon: <Truck className="w-7 h-7 text-[#522AB0]" />, title: 'Dedicated Vehicle', desc: 'Closed container trucks ensuring your belongings arrive clean and safe on time.' },
  ];

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link href="/services" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Packers & Movers</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#0F9D58', fontWeight: 800, background: '#E6F4EA', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Truck className="w-3.5 h-3.5" /> Verified Logistics Partners
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Package className="w-3.5 h-3.5" /> Reliable Relocation
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            Packers & Movers — Zero Moving-Day Surprises
          </h1>
          <p style={{ fontSize: '15.5px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6 }}>
            Get guaranteed fixed-price relocation quotes for local and inter-city shifting across India.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1100px', margin: '40px auto 0' }}>
        
        {/* BENEFITS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {benefits.map((b, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1px solid #EBE6F7', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ marginBottom: '12px' }}>{b.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px' }}>{b.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.5, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        {/* INSTANT QUOTE ESTIMATOR FORM CARD */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 36px', border: '1px solid #EBE6F7', boxShadow: '0 16px 40px rgba(41, 16, 92, 0.08)', maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#41208C', margin: '0 0 8px', textAlign: 'center' }}>
            Get Instant Moving Quote
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', textAlign: 'center', margin: '0 0 28px' }}>
            Fill in your pickup and destination details for a free moving estimate.
          </p>

          {submitted ? (
            <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <CheckCircle2 className="w-10 h-10 text-[#0F9D58] mx-auto mb-2" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '8px 0' }}>Estimate Request Submitted!</h3>
              <p style={{ fontSize: '13.5px', margin: 0 }}>
                Our logistics coordinator will call <strong>{phone}</strong> with exact vehicle options and pricing in 10 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Select Home / Office Size
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {shiftOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setShiftType(opt)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: shiftType === opt ? '2px solid #522AB0' : '1px solid var(--line)',
                        background: shiftType === opt ? '#EFE9FB' : '#FAF9FD',
                        color: shiftType === opt ? '#41208C' : 'var(--ink)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Moving From (Pickup City/Locality) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bopal, Ahmedabad"
                    value={fromLoc}
                    onChange={(e) => setFromLoc(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Moving To (Destination) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Powai, Mumbai"
                    value={toLoc}
                    onChange={(e) => setToLoc(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Mobile Number for Free Quote *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                />
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
                <Truck className="w-5 h-5" /> Get Free Moving Price Quote
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
