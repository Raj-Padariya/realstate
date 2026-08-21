'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Building2, KeyRound, Coins, PhoneCall, Ban, ShieldCheck, Globe, Sparkles, Rocket, Search, Home } from 'lucide-react';

export default function AboutUsPage() {
  const stats = [
    { value: '28', label: 'Indian States Covered', icon: <MapPin className="w-8 h-8 text-[#522AB0] mx-auto" /> },
    { value: '380+', label: 'Cities & Townships', icon: <Building2 className="w-8 h-8 text-[#522AB0] mx-auto" /> },
    { value: '38,000+', label: 'Verified Owner Listings', icon: <KeyRound className="w-8 h-8 text-[#522AB0] mx-auto" /> },
    { value: '₹0', label: 'Brokerage Charged Ever', icon: <Coins className="w-8 h-8 text-[#522AB0] mx-auto" /> },
  ];

  const coreValues = [
    {
      title: '100% Direct Owner Contact',
      desc: 'We eliminate brokers, middlemen, and hidden fees. Every phone number connects you directly to the property owner or official developer representative.',
      icon: <PhoneCall className="w-6 h-6 text-[#522AB0]" />,
      bg: '#EFE9FB',
    },
    {
      title: 'Zero Brokerage Commission',
      desc: 'Whether buying a 3 BHK in Mumbai or renting a flat in Bengaluru, nobody takes a cut. Save thousands to lakhs in hard-earned money.',
      icon: <Ban className="w-6 h-6 text-[#0F9D58]" />,
      bg: '#E6F4EA',
    },
    {
      title: 'Physical & Document Verification',
      desc: 'Our team verifies property ownership, 7/12 land records, and RERA registration before listings go live on the platform.',
      icon: <ShieldCheck className="w-6 h-6 text-[#B06000]" />,
      bg: '#FEF7E0',
    },
    {
      title: 'Pan-India Real Estate Access',
      desc: 'From tier-1 metros like Delhi NCR and Pune to emerging smart hubs like Dholera SIR, find transparent real estate deals everywhere.',
      icon: <Globe className="w-6 h-6 text-[#1A73E8]" />,
      bg: '#E8F0FE',
    },
  ];

  const timeline = [
    { year: '2022', title: 'The Beginning', desc: 'Started in Gujarat to solve aggressive brokerage demands for homebuyers and tenants.' },
    { year: '2023', title: 'Pan-Gujarat Expansion', desc: 'Expanded across 30+ cities in Gujarat with 10,000+ direct owner listings.' },
    { year: '2024', title: 'Assisted Plans Launch', desc: 'Introduced Relax & NRI Assist plans for buyers requiring title verification & legal support.' },
    { year: '2025', title: 'Pan-India Scale', desc: 'Scaled across 28 Indian states with over 350+ cities and 30,000+ live properties.' },
    { year: '2026', title: 'AI & Instant Agreements', desc: 'Launched instant 48-hour rental agreement delivery and smart valuation engine.' },
  ];

  const teamMembers = [
    { name: 'Parth Patel', role: 'Founder & CEO', location: 'Ahmedabad', bio: 'Passionate about transparent real estate tech. 12+ years in property domain.', initial: 'P' },
    { name: 'Ananya Sharma', role: 'Head of Customer Experience', location: 'Pune', bio: 'Ensuring zero-spam and instant 15-min callbacks for buyers and owners.', initial: 'A' },
    { name: 'Rajesh Mehta', role: 'Chief Legal Officer', location: 'Mumbai', bio: 'Specialist in land title verification, RERA compliance, and sub-registrar deeds.', initial: 'R' },
    { name: 'Devendra Shah', role: 'Head of NRI Desk', location: 'Ahmedabad / USA', bio: 'Helping diaspora across 34 countries invest securely in Indian real estate.', initial: 'D' },
  ];

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>About Us</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#522AB0', fontWeight: 800, background: '#EFE9FB', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles className="w-3.5 h-3.5" /> 100% Owner-to-Owner Portal
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 50%, #522AB0 100%)', color: '#fff', padding: '64px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '20px' }}>
            <Rocket className="w-3.5 h-3.5" /> Our Mission
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.25 }}>
            Reinventing Real Estate in India — Zero Brokerage, 100% Transparency
          </h1>

          <p style={{ fontSize: '16px', color: '#d9cdf2', margin: '0 0 36px', lineHeight: 1.6, maxWidth: '780px', marginLeft: 'auto', marginRight: 'auto' }}>
            GujjuProperty was founded with a single powerful vision: to eliminate unfair brokerage fees and connect buyers, tenants, and property owners directly without intermediaries.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/properties" style={{ background: '#FEDC00', color: '#321670', padding: '14px 28px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(254, 220, 0, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Search className="w-4 h-4" /> Browse Owner Properties
            </Link>
            <Link href="/post-property" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '14px 28px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Home className="w-4 h-4" /> Post Property Free
            </Link>
          </div>
        </div>
      </div>

      {/* STATS COUNTER STRIP */}
      <div className="wrap" style={{ maxWidth: '1200px', marginTop: '-36px', position: 'relative', zIndex: 3 }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '28px 36px', boxShadow: '0 16px 40px rgba(41, 16, 92, 0.08)', border: '1px solid #EBE6F7', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {stats.map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '12px' }}>
              <div style={{ marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#41208C', lineHeight: 1.1 }}>{item.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600, marginTop: '6px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1200px', marginTop: '60px' }}>
        
        {/* CORE VALUES */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>
            Why Millions Trust GujjuProperty
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
            Built for everyday Indians buying, selling, or renting properties with absolute peace of mind.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {coreValues.map((val, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '30px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: val.bg, display: 'grid', placeItems: 'center', marginBottom: '20px' }}>
                {val.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>{val.title}</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>{val.desc}</p>
            </div>
          ))}
        </div>

        {/* OUR JOURNEY TIMELINE */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '44px 36px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)', marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', background: '#EFE9FB', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase' }}>
              Milestones
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)', margin: '10px 0 0' }}>
              Our Journey & Growth Story
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', position: 'relative' }}>
            {timeline.map((item, idx) => (
              <div key={idx} style={{ background: '#FAF9FD', borderRadius: '16px', padding: '24px', border: '1px solid #EBE6F7', position: 'relative' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', background: '#41208C', padding: '3px 10px', borderRadius: '6px', display: 'inline-block', marginBottom: '12px' }}>
                  {item.year}
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LEADERSHIP TEAM */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>
              Meet Our Leadership Team
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)' }}>
              The team dedicated to hassle-free real estate experiences across India.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {teamMembers.map((member, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #EBE6F7', textAlign: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #41208C 0%, #522AB0 100%)', color: '#FEDC00', fontSize: '26px', fontWeight: 800, display: 'grid', placeItems: 'center', margin: '0 auto 16px', boxShadow: '0 6px 16px rgba(65, 32, 140, 0.25)' }}>
                  {member.initial}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px' }}>{member.name}</h3>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#522AB0', marginBottom: '4px' }}>{member.role}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <MapPin className="w-3.5 h-3.5 text-[#522AB0]" /> {member.location}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.5, margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA CARD */}
        <div style={{ background: 'linear-gradient(135deg, #321670 0%, #522AB0 100%)', borderRadius: '24px', padding: '48px 36px', textAlign: 'center', color: '#fff', boxShadow: '0 16px 40px rgba(41, 16, 92, 0.15)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 12px' }}>
            Ready to find or sell property with 0% brokerage?
          </h2>
          <p style={{ fontSize: '15px', color: '#d9cdf2', margin: '0 0 28px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Join over 38,000+ owners and lakhs of buyers dealing directly on GujjuProperty today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/properties" style={{ background: '#FEDC00', color: '#321670', padding: '14px 28px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', textDecoration: 'none' }}>
              Explore All Listings
            </Link>
            <Link href="/contact" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '14px 28px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
              Contact Support
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
