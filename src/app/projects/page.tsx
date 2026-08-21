'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Building2, MapPin } from 'lucide-react';

export default function ProjectsDirectoryPage() {
  const [stageFilter, setStageFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const projects = [
    {
      id: 'proj-1',
      name: 'Amara Heights',
      builder: 'Kalpataru Group',
      location: 'Thane West, Mumbai',
      priceRange: '₹95 L – 1.8 Cr',
      priceNote: 'all inclusive',
      config: '2, 3 & 4 BHK · 1,050–2,240 sq.ft',
      stage: 'Launching soon',
      type: 'Apartments',
      reraNo: 'P51700028491',
      imageBg: 'linear-gradient(135deg, #41208C 0%, #522AB0 100%)',
    },
    {
      id: 'proj-2',
      name: 'Lakeside Habitat',
      builder: 'Prestige Group',
      location: 'Whitefield, Bengaluru',
      priceRange: '₹1.2 – 2.6 Cr',
      priceNote: 'all inclusive',
      config: '3 & 4 BHK · 1,480–2,610 sq.ft',
      stage: 'Under construction',
      type: 'Villas',
      reraNo: 'PRM/KA/RERA/1251/446',
      imageBg: 'linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)',
    },
    {
      id: 'proj-3',
      name: 'Shilp Riverfront',
      builder: 'Shilp Group',
      location: 'Ashram Road, Ahmedabad',
      priceRange: '₹92 L – 1.6 Cr',
      priceNote: 'all inclusive',
      config: '3 & 4 BHK · 1,390–2,180 sq.ft',
      stage: 'Ready to move',
      type: 'Apartments',
      reraNo: 'PR/GJ/AHMEDABAD/00142',
      imageBg: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
    },
    {
      id: 'proj-4',
      name: 'Dholera Greens',
      builder: 'Vraj Infra',
      location: 'Activation Area, Dholera SIR',
      priceRange: '₹11 – 28 L',
      priceNote: 'all inclusive',
      config: 'Plots · 150–450 sq.yd',
      stage: 'Open plots',
      type: 'Plots',
      reraNo: 'PR/GJ/AHMEDABAD/00882',
      imageBg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
    {
      id: 'proj-5',
      name: 'Godrej Garden City',
      builder: 'Godrej Properties',
      location: 'Sarkhej - Gandhinagar Highway, Ahmedabad',
      priceRange: '₹55 L – 1.2 Cr',
      priceNote: 'all inclusive',
      config: '2 & 3 BHK Township · 1,120–1,850 sq.ft',
      stage: 'Ready to move',
      type: 'Apartments',
      reraNo: 'PR/GJ/AHMEDABAD/00311',
      imageBg: 'linear-gradient(135deg, #3A1C71 0%, #D76D77 50%, #FFAF7B 100%)',
    },
    {
      id: 'proj-6',
      name: 'Cyber City Business Towers',
      builder: 'DLF Commercial',
      location: 'Cyber City, Gurugram',
      priceRange: '₹1.8 – 4.5 Cr',
      priceNote: 'all inclusive',
      config: 'Commercial Offices · 850–3,500 sq.ft',
      stage: 'Under construction',
      type: 'Commercial',
      reraNo: 'HRERA-GGM-2023-149',
      imageBg: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)',
    },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchStage = stageFilter === 'All' || p.stage.toLowerCase() === stageFilter.toLowerCase();
    const matchType = typeFilter === 'All' || p.type.toLowerCase() === typeFilter.toLowerCase();
    return matchStage && matchType;
  });

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>New Builder Projects</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#0F9D58', fontWeight: 800, background: '#E6F4EA', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% RERA Registered Projects
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #240E54 0%, #41208C 50%, #522AB0 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Building2 className="w-3.5 h-3.5" /> Direct Developer Launches
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            New Builder Projects Across India
          </h1>
          <p style={{ fontSize: '15.5px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6 }}>
            Explore RERA-registered townships, luxury apartments, open plots, and commercial projects with real launch pricing.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1200px', margin: '40px auto 0' }}>
        
        {/* FILTER BAR */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '20px 24px', border: '1px solid #EBE6F7', boxShadow: '0 6px 20px rgba(0,0,0,0.03)', marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Construction Stage:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Ready to move', 'Under construction', 'Launching soon', 'Open plots'].map((stage) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => setStageFilter(stage)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: stageFilter === stage ? '2px solid #522AB0' : '1px solid #EBE6F7',
                    background: stageFilter === stage ? '#EFE9FB' : '#FAF9FD',
                    color: stageFilter === stage ? '#41208C' : 'var(--ink)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', borderTop: '1px solid #EBE6F7', paddingTop: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Property Type:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Apartments', 'Villas', 'Plots', 'Commercial'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTypeFilter(type)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: typeFilter === type ? '2px solid #522AB0' : '1px solid #EBE6F7',
                    background: typeFilter === type ? '#EFE9FB' : '#FAF9FD',
                    color: typeFilter === type ? '#41208C' : 'var(--ink)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* PROJECTS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              style={{
                background: '#fff',
                borderRadius: '24px',
                border: '1px solid #EBE6F7',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* PROJECT BANNER HEADER */}
                <div style={{ background: proj.imageBg, height: '140px', padding: '20px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#321670', background: '#FEDC00', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                      {proj.stage}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>
                      RERA: {proj.reraNo}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 2px' }}>{proj.name}</h3>
                    <div style={{ fontSize: '13px', color: '#d9cdf2', fontWeight: 600 }}>By {proj.builder}</div>
                  </div>
                </div>

                {/* CONTENT BODY */}
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '13.5px', color: 'var(--muted)', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin className="w-3.5 h-3.5 text-[#522AB0]" /> {proj.location}
                  </div>

                  <div style={{ background: '#FAF9FD', borderRadius: '12px', padding: '14px', border: '1px solid #EBE6F7', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Configuration</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginTop: '2px' }}>{proj.config}</div>
                  </div>
                </div>
              </div>

              {/* FOOTER STRIP */}
              <div style={{ borderTop: '1px solid #EBE6F7', padding: '18px 24px', background: '#FAF9FD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Price Range</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#41208C' }}>{proj.priceRange}</div>
                </div>

                <Link
                  href={`/projects/${proj.id}`}
                  style={{
                    background: '#522AB0',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(82, 42, 176, 0.25)',
                  }}
                >
                  View Project →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
