'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [appliedRole, setAppliedRole] = useState<string | null>(null);

  const departments = ['All', 'Technology & Product', 'Sales & Business', 'Legal & Operations', 'Customer Delight'];

  const jobListings = [
    { id: 'job-1', title: 'Senior Full-Stack Developer (Next.js & Node)', dept: 'Technology & Product', location: 'Ahmedabad HQ / Remote', type: 'Full-time', exp: '3-5 Years' },
    { id: 'job-2', title: 'Corporate B2B Account Manager', dept: 'Sales & Business', location: 'Pune Regional Office', type: 'Full-time', exp: '2-4 Years' },
    { id: 'job-3', title: 'Legal Advocate & Title Inspector', dept: 'Legal & Operations', location: 'Ahmedabad / Pune', type: 'Full-time', exp: '4-7 Years' },
    { id: 'job-4', title: 'Customer Experience Lead (OTP & Support)', dept: 'Customer Delight', location: 'Ahmedabad HQ', type: 'Full-time', exp: '1-3 Years' },
    { id: 'job-5', title: 'UI/UX & Product Designer', dept: 'Technology & Product', location: 'Remote / Hybrid', type: 'Full-time', exp: '2-5 Years' },
  ];

  const filteredJobs = selectedDept === 'All' ? jobListings : jobListings.filter((j) => j.dept === selectedDept);

  return (
    <div style={{ background: '#F8F9FC', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(135deg, #3A1C82 0%, #522AB0 60%, #41208C 100%)', color: '#fff', padding: '60px 20px 70px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '1180px' }}>
          
          <div style={{ display: 'inline-block', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            🚀 JOIN TEAM GUJJUPROPERTY
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            Build the Future of Zero-Brokerage Real Estate
          </h1>

          <p style={{ fontSize: '15px', color: '#d9cdf2', margin: '0 auto', maxWidth: '680px', lineHeight: 1.6 }}>
            Help millions of property owners, buyers, and tenants connect directly without middleman fees across India.
          </p>

        </div>
      </div>

      {/* Main Jobs Section */}
      <div className="wrap" style={{ maxWidth: '1180px', marginTop: '40px' }}>
        
        {/* Department Filter Chips */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px', justifyContent: 'center' }}>
          {departments.map((dept) => {
            const isActive = selectedDept === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  border: isActive ? '2px solid #522AB0' : '1px solid var(--line)',
                  background: isActive ? '#522AB0' : '#fff',
                  color: isActive ? '#fff' : 'var(--ink)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(82, 42, 176, 0.25)' : 'none',
                }}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Job Listings Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #EBE6F7',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <div>
                <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', display: 'inline-block', marginBottom: '8px' }}>
                  {job.dept}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px' }}>
                  {job.title}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600, display: 'flex', gap: '14px' }}>
                  <span>📍 {job.location}</span>
                  <span>💼 {job.type}</span>
                  <span>⭐ {job.exp}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAppliedRole(job.title)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: '#522AB0',
                  color: '#fff',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Apply Now →
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* APPLICATION MODAL POPUP */}
      {appliedRole && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', maxWidth: '480px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#41208C', margin: 0 }}>Apply for {appliedRole}</h3>
              <button type="button" onClick={() => setAppliedRole(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 18px' }}>
              Fill in your details to apply for this opening. Our Talent Acquisition team will get back to you within 24 hours.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert(`Application submitted for ${appliedRole}!`); setAppliedRole(null); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input required placeholder="Your Full Name" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }} />
              <input required type="email" placeholder="Email Address" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }} />
              <input required type="tel" placeholder="Mobile Number" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }} />
              <input placeholder="LinkedIn / Portfolio URL" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }} />

              <button type="submit" style={{ padding: '12px', background: '#0F9D58', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', marginTop: '6px' }}>
                Submit Job Application →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
