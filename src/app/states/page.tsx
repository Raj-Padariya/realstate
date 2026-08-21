'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Globe, Search } from 'lucide-react';

export default function StatesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const statesList = [
    { name: 'Maharashtra', code: 'MH', propertyCount: '68,400', citiesText: 'Mumbai · Pune · Nagpur · Thane · Nashik' },
    { name: 'Karnataka', code: 'KA', propertyCount: '52,100', citiesText: 'Bengaluru · Mysuru · Mangaluru · Hubballi' },
    { name: 'Gujarat', code: 'GJ', propertyCount: '42,600', citiesText: 'Ahmedabad · Surat · Vadodara · Rajkot · Dholera' },
    { name: 'Tamil Nadu', code: 'TN', propertyCount: '38,900', citiesText: 'Chennai · Coimbatore · Madurai · Salem' },
    { name: 'Telangana', code: 'TS', propertyCount: '31,200', citiesText: 'Hyderabad · Warangal · Nizamabad · Karimnagar' },
    { name: 'Uttar Pradesh', code: 'UP', propertyCount: '27,800', citiesText: 'Noida · Lucknow · Ghaziabad · Agra · Kanpur' },
    { name: 'Delhi NCR', code: 'DL', propertyCount: '26,400', citiesText: 'New Delhi · Dwarka · Rohini · Vasant Kunj' },
    { name: 'Haryana', code: 'HR', propertyCount: '21,500', citiesText: 'Gurugram · Faridabad · Panipat · Ambala' },
    { name: 'West Bengal', code: 'WB', propertyCount: '18,300', citiesText: 'Kolkata · Howrah · Siliguri · Durgapur' },
    { name: 'Rajasthan', code: 'RJ', propertyCount: '14,700', citiesText: 'Jaipur · Jodhpur · Udaipur · Kota · Ajmer' },
    { name: 'Madhya Pradesh', code: 'MP', propertyCount: '12,900', citiesText: 'Indore · Bhopal · Gwalior · Jabalpur' },
    { name: 'Kerala', code: 'KL', propertyCount: '11,600', citiesText: 'Kochi · Thiruvananthapuram · Kozhikode · Thrissur' },
    { name: 'Punjab', code: 'PB', propertyCount: '9,400', citiesText: 'Ludhiana · Mohali · Amritsar · Jalandhar' },
    { name: 'Andhra Pradesh', code: 'AP', propertyCount: '8,800', citiesText: 'Visakhapatnam · Vijayawada · Guntur · Tirupati' },
    { name: 'Bihar', code: 'BR', propertyCount: '6,200', citiesText: 'Patna · Gaya · Muzaffarpur · Bhagalpur' },
    { name: 'Odisha', code: 'OD', propertyCount: '5,700', citiesText: 'Bhubaneswar · Cuttack · Puri · Rourkela' },
  ];

  const filteredStates = statesList.filter(
    (st) =>
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.citiesText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>States & Cities Directory</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#522AB0', fontWeight: 800, background: '#EFE9FB', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <MapPin className="w-3.5 h-3.5" /> 28 Indian States & 380+ Cities
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Globe className="w-3.5 h-3.5" /> Pan-India Real Estate
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            Explore Properties by State & City
          </h1>
          <p style={{ fontSize: '15.5px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6 }}>
            Browse owner-listed flats, plots, houses, and commercial spaces across every major state in India with 0% brokerage.
          </p>

          {/* Quick Search */}
          <div style={{ maxWidth: '540px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search state or city (e.g. Maharashtra, Bengaluru, Dholera)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '14px 20px 14px 44px', borderRadius: '12px', border: 'none', fontSize: '14.5px', outline: 'none', background: '#fff', color: 'var(--ink)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            />
            <Search className="w-5 h-5 text-[#522AB0] absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* STATES GRID CONTAINER */}
      <div className="wrap" style={{ maxWidth: '1200px', margin: '40px auto 0' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
          {filteredStates.map((st) => (
            <div
              key={st.code}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #EBE6F7',
                boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', background: '#522AB0', padding: '4px 10px', borderRadius: '6px' }}>
                    {st.code}
                  </span>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F9D58', background: '#E6F4EA', padding: '3px 10px', borderRadius: '999px' }}>
                    {st.propertyCount} Properties
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: '0 0 8px' }}>
                  {st.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 16px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                  <MapPin className="w-3.5 h-3.5 text-[#522AB0] shrink-0 mt-0.5" /> {st.citiesText}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #EBE6F7', paddingTop: '16px' }}>
                <Link
                  href="/properties"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    background: '#FAF9FD',
                    border: '1px solid #EBE6F7',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    color: '#522AB0',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    textDecoration: 'none',
                  }}
                >
                  <span>Explore {st.name}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
