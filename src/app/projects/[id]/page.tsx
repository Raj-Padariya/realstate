'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Waves, Dumbbell, ShieldAlert, Zap, Trees, Baby, CheckCircle2, Download } from 'lucide-react';

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplans' | 'amenities'>('overview');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Mock lookup data for projects
  const projectDataMap: Record<string, any> = {
    'proj-1': {
      name: 'Amara Heights',
      builder: 'Kalpataru Group',
      location: 'Thane West, Mumbai',
      priceRange: '₹95 L – 1.8 Cr',
      stage: 'Launching soon',
      reraNo: 'P51700028491',
      possession: 'December 2027',
      totalArea: '4.5 Acres',
      totalUnits: '480 Luxury Units',
      description: 'Amara Heights brings luxury high-rise living to Thane West with sprawling green spaces, infinity sky pool, and smart home automation.',
      configurations: [
        { type: '2 BHK Premium', area: '1,050 sq.ft', price: '₹95 Lakhs' },
        { type: '3 BHK Grande', area: '1,480 sq.ft', price: '₹1.35 Cr' },
        { type: '4 BHK Duplex', area: '2,240 sq.ft', price: '₹1.80 Cr' },
      ],
    },
    'proj-2': {
      name: 'Lakeside Habitat',
      builder: 'Prestige Group',
      location: 'Whitefield, Bengaluru',
      priceRange: '₹1.2 – 2.6 Cr',
      stage: 'Under construction',
      reraNo: 'PRM/KA/RERA/1251/446',
      possession: 'March 2027',
      totalArea: '12 Acres',
      totalUnits: '720 Units & Villas',
      description: 'Lakeside Habitat offers serene lake-facing luxury apartments and independent villas in the heart of Whitefield IT hub.',
      configurations: [
        { type: '3 BHK Lake View', area: '1,480 sq.ft', price: '₹1.20 Cr' },
        { type: '4 BHK Luxury Villa', area: '2,610 sq.ft', price: '₹2.60 Cr' },
      ],
    },
    'proj-3': {
      name: 'Shilp Riverfront',
      builder: 'Shilp Group',
      location: 'Ashram Road, Ahmedabad',
      priceRange: '₹92 L – 1.6 Cr',
      stage: 'Ready to move',
      reraNo: 'PR/GJ/AHMEDABAD/00142',
      possession: 'Ready to Move',
      totalArea: '3.2 Acres',
      totalUnits: '240 Premium Apartments',
      description: 'Overlooking Sabarmati Riverfront, Shilp Riverfront offers ready-to-move 3 & 4 BHK residences with direct river views.',
      configurations: [
        { type: '3 BHK River View', area: '1,390 sq.ft', price: '₹92 Lakhs' },
        { type: '4 BHK Penthouse', area: '2,180 sq.ft', price: '₹1.60 Cr' },
      ],
    },
    'proj-4': {
      name: 'Dholera Greens',
      builder: 'Vraj Infra',
      location: 'Activation Area, Dholera SIR',
      priceRange: '₹11 – 28 L',
      stage: 'Open plots',
      reraNo: 'PR/GJ/AHMEDABAD/00882',
      possession: 'Immediate Possession',
      totalArea: '50 Acres Township',
      totalUnits: '350 NA Plots',
      description: 'Government approved NA + NOC plotted development inside Dholera SIR Activation Zone with 55ft wide DP roads and electricity grid.',
      configurations: [
        { type: 'Corner Plot', area: '150 sq.yd', price: '₹11 Lakhs' },
        { type: 'Commercial Plot', area: '300 sq.yd', price: '₹19 Lakhs' },
        { type: 'Industrial Plot', area: '450 sq.yd', price: '₹28 Lakhs' },
      ],
    },
  };

  const project = projectDataMap[params.id] || {
    name: 'Dholera Greens',
    builder: 'Vraj Infra',
    location: 'Activation Area, Dholera SIR',
    priceRange: '₹11 – 28 L',
    stage: 'Open plots',
    reraNo: 'PR/GJ/AHMEDABAD/00882',
    possession: 'Immediate Possession',
    totalArea: '50 Acres Township',
    totalUnits: '350 NA Plots',
    description: 'Government approved NA + NOC plotted development inside Dholera SIR Activation Zone with 55ft wide DP roads and electricity grid.',
    configurations: [
      { type: 'Corner Plot', area: '150 sq.yd', price: '₹11 Lakhs' },
      { type: 'Commercial Plot', area: '300 sq.yd', price: '₹19 Lakhs' },
      { type: 'Industrial Plot', area: '450 sq.yd', price: '₹28 Lakhs' },
    ],
  };

  const handleVisitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
  };

  const amenities = [
    { name: 'Swimming Pool', icon: <Waves className="w-5 h-5 text-[#522AB0]" /> },
    { name: 'Clubhouse & Gym', icon: <Dumbbell className="w-5 h-5 text-[#522AB0]" /> },
    { name: '24/7 Security & CCTV', icon: <ShieldAlert className="w-5 h-5 text-[#522AB0]" /> },
    { name: 'EV Charging Stations', icon: <Zap className="w-5 h-5 text-[#522AB0]" /> },
    { name: 'Landscaping & Gardens', icon: <Trees className="w-5 h-5 text-[#522AB0]" /> },
    { name: 'Kids Play Area', icon: <Baby className="w-5 h-5 text-[#522AB0]" /> },
  ];

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link href="/projects" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>New Projects</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{project.name}</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#0F9D58', fontWeight: 800, background: '#E6F4EA', padding: '4px 12px', borderRadius: '999px' }}>
            RERA: {project.reraNo}
          </span>
        </div>
      </div>

      {/* PROJECT HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 100%)', color: '#fff', padding: '48px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#321670', background: '#FEDC00', padding: '4px 12px', borderRadius: '6px', textTransform: 'uppercase' }}>
                  {project.stage}
                </span>
                <span style={{ fontSize: '13px', color: '#d9cdf2', fontWeight: 600 }}>By {project.builder}</span>
              </div>

              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 8px' }}>{project.name}</h1>
              <div style={{ fontSize: '15px', color: '#d9cdf2', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin className="w-4 h-4 text-[#FEDC00]" /> {project.location}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '20px', padding: '20px 28px', textAlign: 'right', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '12px', color: '#d9cdf2', fontWeight: 600 }}>Starting Price</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#FEDC00' }}>{project.priceRange}</div>
              <div style={{ fontSize: '12px', color: '#d9cdf2' }}>All Inclusive</div>
            </div>
          </div>
        </div>
      </div>

      {/* SPECS HIGHLIGHT STRIP */}
      <div className="wrap" style={{ maxWidth: '1200px', marginTop: '-24px', position: 'relative', zIndex: 3 }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '24px 32px', boxShadow: '0 12px 36px rgba(41, 16, 92, 0.08)', border: '1px solid #EBE6F7', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>Possession Date</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#41208C', marginTop: '2px' }}>{project.possession}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Land Area</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#41208C', marginTop: '2px' }}>{project.totalArea}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Capacity</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#41208C', marginTop: '2px' }}>{project.totalUnits}</div>
          </div>
        </div>
      </div>

      {/* MAIN DETAILS CONTAINER */}
      <div className="wrap" style={{ maxWidth: '1200px', margin: '40px auto 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(320px, 380px)', gap: '32px' }}>
          
          {/* LEFT CONTENT */}
          <div>
            
            {/* TABS */}
            <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid #EBE6F7', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                style={{
                  padding: '12px 20px',
                  fontSize: '14.5px',
                  fontWeight: 800,
                  border: 'none',
                  background: 'none',
                  color: activeTab === 'overview' ? '#522AB0' : 'var(--muted)',
                  borderBottom: activeTab === 'overview' ? '3px solid #522AB0' : '3px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-2px',
                }}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('floorplans')}
                style={{
                  padding: '12px 20px',
                  fontSize: '14.5px',
                  fontWeight: 800,
                  border: 'none',
                  background: 'none',
                  color: activeTab === 'floorplans' ? '#522AB0' : 'var(--muted)',
                  borderBottom: activeTab === 'floorplans' ? '3px solid #522AB0' : '3px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-2px',
                }}
              >
                Floor Plans & Pricing ({project.configurations.length})
              </button>
            </div>

            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #EBE6F7' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: '0 0 12px' }}>Project Overview</h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--body)', lineHeight: 1.7, margin: 0 }}>{project.description}</p>
                </div>

                <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #EBE6F7' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: '0 0 20px' }}>Key Project Amenities</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    {amenities.map((item, idx) => (
                      <div key={idx} style={{ background: '#FAF9FD', padding: '14px', borderRadius: '12px', border: '1px solid #EBE6F7', fontSize: '14px', fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.icon} {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'floorplans' && (
              <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #EBE6F7' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: '0 0 20px' }}>Available Configurations</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {project.configurations.map((config: any, idx: number) => (
                    <div key={idx} style={{ background: '#FAF9FD', borderRadius: '14px', padding: '20px', border: '1px solid #EBE6F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px' }}>{config.type}</h4>
                        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Area: <strong>{config.area}</strong></div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F9D58' }}>{config.price}</div>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Base Price</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR: SITE VISIT / BROCHURE FORM */}
          <div>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #EBE6F7', boxShadow: '0 12px 36px rgba(0,0,0,0.04)', position: 'sticky', top: '20px' }}>
              
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: '0 0 6px' }}>
                Book Site Visit & Brochure
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 20px' }}>
                Get direct developer contact, floor plan PDFs, and schedule free cab site visit.
              </p>

              {requestSubmitted ? (
                <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '12px', padding: '20px', textAlign: 'center', fontSize: '13.5px', fontWeight: 700 }}>
                  <CheckCircle2 className="w-8 h-8 text-[#0F9D58] mx-auto mb-2" />
                  Site visit request submitted! A sales representative will call you in 15 mins.
                </div>
              ) : (
                <form onSubmit={handleVisitRequest} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      maxLength={10}
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #41208C 0%, #522AB0 100%)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '14.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 6px 18px rgba(82, 42, 176, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <Download className="w-4 h-4" /> Download Brochure & Book Visit
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
