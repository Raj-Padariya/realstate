'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Search, Landmark, Truck, KeyRound, Building2, Sparkles, Ruler, Wrench, Zap } from 'lucide-react';

export default function ServicesHubPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Paperwork & Legal', 'Money & Loans', 'Moving & Care'];

  const services = [
    {
      id: 'rent-agreement',
      title: 'Rental Agreement',
      category: 'Paperwork & Legal',
      desc: 'E-stamped, legally binding rent agreement with doorstep delivery within 48 hours.',
      price: 'Starting ₹499',
      icon: <FileText className="w-6 h-6 text-[#522AB0]" />,
      href: '/rent-agreement',
      badge: 'Popular',
    },
    {
      id: 'title-check',
      title: 'Title & 7/12 Verification',
      category: 'Paperwork & Legal',
      desc: 'Advocate-verified land title check, encumbrance certificate, and 7/12 extract audit.',
      price: 'Starting ₹1,999',
      icon: <Search className="w-6 h-6 text-[#522AB0]" />,
      href: '/services/title-check',
      badge: 'Advocate Verified',
    },
    {
      id: 'home-loan',
      title: 'Home Loan Assistance',
      category: 'Money & Loans',
      desc: 'Compare low-interest home loans from 14 leading banks & NBFCs with zero processing markup.',
      price: 'Lowest EMI Deals',
      icon: <Landmark className="w-6 h-6 text-[#522AB0]" />,
      href: '/services/home-loan',
      badge: '0% Commission',
    },
    {
      id: 'packers-movers',
      title: 'Packers & Movers',
      category: 'Moving & Care',
      desc: 'Hassle-free household packing, loading, insurance, and transit with guaranteed price quotes.',
      price: 'Fixed Fair Quotes',
      icon: <Truck className="w-6 h-6 text-[#522AB0]" />,
      href: '/services/packers-movers',
      badge: 'Instant Quote',
    },
    {
      id: 'property-management',
      title: 'Property Management',
      category: 'Moving & Care',
      desc: 'End-to-end property care, tenant management, rent collection, and maintenance for owners.',
      price: 'Monthly Care Plans',
      icon: <KeyRound className="w-6 h-6 text-[#522AB0]" />,
      href: '/services/property-management',
      badge: 'For Owners & NRIs',
    },
    {
      id: 'registration',
      title: 'Property Registration Help',
      category: 'Paperwork & Legal',
      desc: 'Sub-registrar slot booking, stamp duty calculation, and on-site legal assistant at registrar office.',
      price: 'Legal Assistance',
      icon: <Building2 className="w-6 h-6 text-[#522AB0]" />,
      href: '/contact',
      badge: 'Doorstep Help',
    },
    {
      id: 'cleaning',
      title: 'Move-in Deep Cleaning',
      category: 'Moving & Care',
      desc: 'Professional deep sanitization, kitchen & bathroom scrubbing, and pest control before shifting.',
      price: 'Starting ₹1,499',
      icon: <Sparkles className="w-6 h-6 text-[#522AB0]" />,
      href: '/contact',
      badge: 'Same-day Booking',
    },
    {
      id: 'survey',
      title: 'Plot & Land Survey',
      category: 'Paperwork & Legal',
      desc: 'Digital plot boundary measurement, land contour mapping, and GPS satellite boundary certification.',
      price: 'On-site Survey',
      icon: <Ruler className="w-6 h-6 text-[#522AB0]" />,
      href: '/contact',
      badge: 'Certified Surveyors',
    },
  ];

  const filteredServices = services.filter(
    (s) => activeCategory === 'All' || s.category === activeCategory
  );

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Real Estate Services</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#522AB0', fontWeight: 800, background: '#EFE9FB', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Zap className="w-3.5 h-3.5" /> 8+ Doorstep Real Estate Services
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 50%, #522AB0 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Wrench className="w-3.5 h-3.5" /> End-to-End Solutions
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            Everything After "We Agreed" to "We Moved In"
          </h1>
          <p style={{ fontSize: '15.5px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6 }}>
            Legal title checks, e-stamped rent agreements, home loans, packers & movers — handled locally with zero hassle.
          </p>
        </div>
      </div>

      {/* SERVICES HUB CONTAINER */}
      <div className="wrap" style={{ maxWidth: '1200px', margin: '40px auto 0' }}>
        
        {/* CATEGORY FILTER PILLS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  border: isSelected ? '2px solid #522AB0' : '1px solid #EBE6F7',
                  background: isSelected ? '#522AB0' : '#fff',
                  color: isSelected ? '#fff' : 'var(--ink)',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 6px 18px rgba(82, 42, 176, 0.25)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* SERVICES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid #EBE6F7',
                boxShadow: '0 6px 24px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#EFE9FB', display: 'grid', placeItems: 'center' }}>
                    {svc.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#522AB0', background: '#EFE9FB', padding: '4px 10px', borderRadius: '999px' }}>
                    {svc.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {svc.desc}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #EBE6F7', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#41208C' }}>{svc.price}</span>
                <Link
                  href={svc.href}
                  style={{
                    background: '#522AB0',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    textDecoration: 'none',
                  }}
                >
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK SERVICE HELPLINE BANNER */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '36px', border: '1px solid #EBE6F7', marginTop: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F9D58', background: '#E6F4EA', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
              Custom Assistance
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: '8px 0 4px' }}>
              Need custom legal or paperwork assistance?
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
              Speak directly with our dedicated real estate support team in Gujarat & Maharashtra.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/contact" style={{ background: '#522AB0', color: '#fff', padding: '12px 24px', borderRadius: '12px', fontWeight: 800, fontSize: '14px', textDecoration: 'none' }}>
              Contact Service Desk
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
