'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plane, Navigation, Building2, FileCheck, Zap, Building, Car, CheckCircle, Search } from 'lucide-react';
import {
  DHOLERA_VILLAGES,
  DHOLERA_LINEAR_TYPES,
  DHOLERA_ZONES,
  DHOLERA_TP_SCHEMES,
} from '@/shared/data/dholeraData';
import { useLeads } from '@/shared/context/LeadsContext';

const highlights = [
  { title: 'Dholera International Airport', desc: 'Under-construction greenfield airport located 12km from Activation Zone.' },
  { title: 'Ahmedabad - Dholera Expressway', desc: '4-lane access controlled expressway linking Ahmedabad in under 50 mins.' },
  { title: 'Tata Semiconductor Fab plant', desc: '91,000 Cr Tata Electronics semiconductor plant under construction in Dholera SIR.' },
  { title: '100% NA + Title Clear', desc: 'Collector approved Non-Agricultural land with complete legal due diligence.' },
];

const plotListings = [
  { tp: 'TP-5 Sangasar', size: '150 sq.yd', price: 'Rs. 11 Lakhs', type: 'Residential Corner Plot', status: 'Available' },
  { tp: 'Activation Zone (TP-2)', size: '220 sq.yd', price: 'Rs. 14.5 Lakhs', type: 'Commercial Road Facing', status: 'Hot Deal' },
  { tp: 'Kadipur TP-4', size: '300 sq.yd', price: 'Rs. 19 Lakhs', type: 'Villa Land', status: 'Available' },
  { tp: 'TP-1 High Street', size: '450 sq.yd', price: 'Rs. 28 Lakhs', type: 'Industrial / Warehouse', status: 'Limited' },
];

export default function DholeraSirPage() {
  const router = useRouter();
  const { addLead } = useLeads();
  const [investorName, setInvestorName] = useState('');
  const [investorPhone, setInvestorPhone] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [budget, setBudget] = useState('Rs. 11 L - 15 L');
  const [submitted, setSubmitted] = useState(false);

  // Dholera Search Card State
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedLinear, setSelectedLinear] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedTp, setSelectedTp] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('city', 'Dholera SIR');
    if (selectedVillage) params.set('village', selectedVillage);
    if (selectedLinear) params.set('linear', selectedLinear);
    if (selectedZone) params.set('zone', selectedZone);
    if (selectedTp) params.set('tp', selectedTp);
    router.push(`/properties?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      type: 'site-visit',
      name: investorName,
      phone: investorPhone,
      email: investorEmail,
      city: 'Dholera SIR',
      source: 'Dholera SIR Investment Form',
      details: {
        budget,
        interest: 'Dholera Smart City Land & Industrial Investment',
      },
    });
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
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Dholera SIR Smart City Plots</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#321670', fontWeight: 800, background: '#FEDC00', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Zap className="w-3.5 h-3.5" /> High Appreciation Land Investment
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #1C0A3F 0%, #321670 50%, #522AB0 100%)', color: '#fff', padding: '56px 20px 72px', textAlign: 'center', position: 'relative' }}>
        <div className="wrap" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Building className="w-3.5 h-3.5" /> Special Investment Region (SIR)
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            Invest in Dholera Smart City NA Plots - Starting Rs. 11 Lakhs
          </h1>

          <p style={{ fontSize: '16px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6, maxWidth: '780px', marginLeft: 'auto', marginRight: 'auto' }}>
            Clear title, Collector NA approved, 55ft DP road facing plots inside India premier semiconductor &amp; industrial hub.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '13.5px', fontWeight: 700, marginBottom: '36px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle className="w-4 h-4 text-[#FEDC00]" /> Clear Title + NOC</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle className="w-4 h-4 text-[#FEDC00]" /> Near Expressway &amp; Airport</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle className="w-4 h-4 text-[#FEDC00]" /> Free Site Visit Cab from Ahmedabad</span>
          </div>

          {/* LOOKING FOR INVESTMENT IN DHOLERA ? FORM CARD */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '32px 28px 28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            border: '2px solid rgba(254, 220, 0, 0.4)',
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'left',
            color: 'var(--ink)',
          }}>
            <div style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.3px', margin: '0 0 4px', color: '#1c1f23' }}>
                LOOKING FOR INVESTMENT IN <span style={{ background: '#FEDC00', padding: '2px 8px', borderRadius: '4px', color: '#1c1f23' }}>DHOLERA</span> ?
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                Filter plots by official Village, Zone, Linear layout and Town Planning Scheme
              </p>
            </div>

            <form onSubmit={handleSearchSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>
                    Village <span style={{ color: 'var(--muted)', fontWeight: 500 }}>({DHOLERA_VILLAGES.length})</span>
                  </label>
                  <select
                    value={selectedVillage}
                    onChange={(e) => setSelectedVillage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e3e6ea',
                      fontSize: '13.5px',
                      background: '#FFFDF5',
                      color: '#1c1f23',
                      outline: 'none',
                    }}
                  >
                    <option value="">Village</option>
                    {DHOLERA_VILLAGES.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>
                    Linear / Non-Linear
                  </label>
                  <select
                    value={selectedLinear}
                    onChange={(e) => setSelectedLinear(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e3e6ea',
                      fontSize: '13.5px',
                      background: '#FFFDF5',
                      color: '#1c1f23',
                      outline: 'none',
                    }}
                  >
                    <option value="">Linear / Non - Linear</option>
                    {DHOLERA_LINEAR_TYPES.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>
                    Zone <span style={{ color: 'var(--muted)', fontWeight: 500 }}>({DHOLERA_ZONES.length})</span>
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e3e6ea',
                      fontSize: '13.5px',
                      background: '#FFFDF5',
                      color: '#1c1f23',
                      outline: 'none',
                    }}
                  >
                    <option value="">Zone</option>
                    {DHOLERA_ZONES.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>
                    TP <span style={{ color: 'var(--muted)', fontWeight: 500 }}>({DHOLERA_TP_SCHEMES.length})</span>
                  </label>
                  <select
                    value={selectedTp}
                    onChange={(e) => setSelectedTp(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e3e6ea',
                      fontSize: '13.5px',
                      background: '#FFFDF5',
                      color: '#1c1f23',
                      outline: 'none',
                    }}
                  >
                    <option value="">TP</option>
                    {DHOLERA_TP_SCHEMES.map((tp) => (
                      <option key={tp} value={tp}>{tp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  background: '#FEDC00',
                  color: '#1C0A3F',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(254, 220, 0, 0.4)',
                  transition: 'transform 0.15s, background 0.15s',
                }}
              >
                <Search className="w-4 h-4" /> Search Now
              </button>
            </form>
          </div>

        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1200px', margin: '50px auto 0' }}>
        
        {/* HIGHLIGHTS GRID */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>
            Why Invest in Dholera SIR Today?
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)' }}>
            India largest planned smart city project with world-class infrastructure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {highlights.map((h, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #EBE6F7', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ marginBottom: '14px' }}>
                {idx === 0 && <Plane className="w-8 h-8 text-[#522AB0]" />}
                {idx === 1 && <Navigation className="w-8 h-8 text-[#522AB0]" />}
                {idx === 2 && <Building2 className="w-8 h-8 text-[#522AB0]" />}
                {idx === 3 && <FileCheck className="w-8 h-8 text-[#522AB0]" />}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#41208C', margin: '0 0 8px' }}>{h.title}</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>{h.desc}</p>
            </div>
          ))}
        </div>

        {/* FEATURED PLOTS TABLE */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '36px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#41208C', margin: '0 0 20px' }}>
            Featured Dholera SIR Plot Schemes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {plotListings.map((plot, idx) => (
              <div key={idx} style={{ background: '#FAF9FD', borderRadius: '14px', padding: '20px', border: '1px solid #EBE6F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)' }}>{plot.tp}</span>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#321670', background: '#FEDC00', padding: '2px 8px', borderRadius: '4px' }}>{plot.status}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Type: <strong>{plot.type}</strong> • Area: <strong>{plot.size}</strong></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F9D58' }}>{plot.price}</div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>All Inclusive Price</span>
                  </div>
                  <Link href="/contact" style={{ background: '#522AB0', color: '#fff', padding: '10px 18px', borderRadius: '10px', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
                    Inquire Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOOK FREE SITE VISIT FORM CARD */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '44px 36px', border: '1px solid #EBE6F7', boxShadow: '0 16px 40px rgba(41, 16, 92, 0.08)', maxWidth: '720px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', background: '#EFE9FB', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Car className="w-3.5 h-3.5" /> Free Cab Service from Ahmedabad
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#41208C', margin: '10px 0 6px' }}>
              Book Free Dholera SIR Site Visit
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
              Inspect the land on-site with our Dholera investment specialist.
            </p>
          </div>

          {submitted ? (
            <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <Building2 className="w-10 h-10 text-[#0F9D58] mx-auto mb-2" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '8px 0' }}>Site Visit Requested!</h3>
              <p style={{ fontSize: '13.5px', margin: 0 }}>
                Our Dholera project manager will contact <strong>{investorPhone}</strong> to schedule cab pickup and site walkthrough.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
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
                    value={investorPhone}
                    onChange={(e) => setInvestorPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={investorEmail}
                    onChange={(e) => setInvestorEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Investment Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  >
                    <option value="Rs. 11 L - 15 L">Rs. 11 Lakhs - 15 Lakhs</option>
                    <option value="Rs. 15 L - 25 L">Rs. 15 Lakhs - 25 Lakhs</option>
                    <option value="Rs. 25 L - 50 L">Rs. 25 Lakhs - 50 Lakhs</option>
                    <option value="Above Rs. 50 L">Above Rs. 50 Lakhs</option>
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
                <Car className="w-5 h-5" /> Book Free Dholera Site Visit Cab
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
