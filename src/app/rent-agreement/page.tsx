'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const ALL_CITIES = [
  'Agra', 'Ahmedabad', 'Ajmer', 'Aligarh', 'Allahabad', 'Amritsar', 'Asansol', 'Bangalore',
  'Bhopal', 'Chandigarh', 'Chennai', 'Coimbatore', 'Delhi', 'Faridabad', 'Ghaziabad', 'Goa',
  'Gurgaon', 'Guwahati', 'Hyderabad', 'Indore', 'Jaipur', 'Jodhpur', 'Kanpur', 'Kochi',
  'Kolkata', 'Lucknow', 'Ludhiana', 'Madurai', 'Mumbai', 'Mysore', 'Nagpur', 'Nashik',
  'Navi Mumbai', 'Noida', 'Patna', 'Pune', 'Raipur', 'Rajkot', 'Ranchi', 'Surat',
  'Thane', 'Vadodara', 'Varanasi', 'Vijayawada'
];

const POPULAR_CITIES = [
  'Bangalore', 'Mumbai', 'Chennai', 'Pune', 'Hyderabad', 'Gurgaon', 'Delhi', 'Ahmedabad'
];

export default function RentAgreementPage() {
  const [selectedCity, setSelectedCity] = useState<string>('Bangalore');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cityFilter, setCityFilter] = useState<string>('');

  // Calculator State
  const [monthlyRent, setMonthlyRent] = useState<string>('15000');
  const [depositAmount, setDepositAmount] = useState<string>('50000');
  const [selectedDuration, setSelectedDuration] = useState<number>(11);
  const [otherDuration, setOtherDuration] = useState<string>('');

  // Filtered Cities for Modal
  const filteredCities = useMemo(() => {
    if (!cityFilter.trim()) return ALL_CITIES;
    return ALL_CITIES.filter((c) => c.toLowerCase().includes(cityFilter.toLowerCase()));
  }, [cityFilter]);

  // Rent Agreement Calculation logic
  const calculatedTotal = useMemo(() => {
    const rent = parseFloat(monthlyRent) || 0;
    const dep = parseFloat(depositAmount) || 0;
    if (rent <= 0 && dep <= 0) return 0;
    return 250 + Math.round((rent + dep) * 0.001);
  }, [monthlyRent, depositAmount]);

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setIsModalOpen(false);
  };

  const handleDurationChip = (months: number) => {
    setSelectedDuration(months);
    setOtherDuration('');
  };

  const handleOtherDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setOtherDuration(val);
    if (val) {
      setSelectedDuration(parseInt(val, 10));
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif" }}>
      
      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(135deg, #41208C, #522AB0 70%)', padding: '38px 0 0', color: '#fff', position: 'relative' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px' }}>
              Online Rent Agreement <span style={{ color: '#FEDC00' }}>in {selectedCity}</span>
            </h1>
            <p style={{ margin: '0 0 14px', fontSize: '14px', color: '#d9cdf2' }}>
              Top-rated rental agreement service in India with 100% legal validity
            </p>
            <div style={{ display: 'flex', gap: '18px', fontSize: '13px', color: '#e7defa', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FEDC00" strokeWidth="2"><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>
                Same day delivery
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FEDC00" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /></svg>
                100% legally valid
              </span>
            </div>
          </div>
          <div style={{ background: '#0f9d58', color: '#fff', borderRadius: '999px', padding: '6px 14px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            4.7 ★ <span style={{ fontSize: '10px', fontWeight: 600, color: '#e7f9ee', marginLeft: '4px' }}>50K+ reviews</span>
          </div>
        </div>

        {/* Hassle-Free Card */}
        <div className="wrap">
          <div
            style={{
              background: '#fff',
              borderRadius: '14px',
              boxShadow: '0 14px 34px rgba(20,10,50,0.16)',
              marginTop: '24px',
              padding: '22px 26px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '20px',
              alignItems: 'center',
              position: 'relative',
              top: '26px',
              color: 'var(--ink)',
            }}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#41208C', marginBottom: '12px' }}>
                Hassle-Free Rental Agreements in 3 Easy Steps
              </div>
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1, minWidth: '180px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EFE9FB', color: '#522AB0', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    1
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Enter details or upload agreement</div>
                    <div style={{ fontSize: '11.5px', color: '#4a5158', marginTop: '2px' }}>Use our template or upload your old draft</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1, minWidth: '180px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EFE9FB', color: '#522AB0', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    2
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Sign digitally using Aadhaar e-Sign</div>
                    <div style={{ fontSize: '11.5px', color: '#4a5158', marginTop: '2px' }}>For owner, tenant & witnesses remotely</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1, minWidth: '180px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EFE9FB', color: '#522AB0', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    3
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Get stamped copy delivered</div>
                    <div style={{ fontSize: '11.5px', color: '#4a5158', marginTop: '2px' }}>Delivered within 24 hours to your door</div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{
                background: '#E23F62',
                color: '#fff',
                border: 'none',
                borderRadius: '9px',
                padding: '14px 26px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(226,63,98,0.3)',
              }}
            >
              Start Creating Agreement ›
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Wrap */}
      <div className="wrap" style={{ marginTop: '50px' }}>
        
        {/* Stats Band */}
        <div style={{ padding: '30px 0 24px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, background: '#EFE9FB', borderRadius: '12px', padding: '20px', textAlign: 'center', minWidth: '200px' }}>
            <div style={{ fontWeight: 800, fontSize: '20px', color: '#41208C' }}>150+ Cities</div>
            <div style={{ fontSize: '13px', color: '#4a5158', marginTop: '2px' }}>Available across India</div>
          </div>
          <div style={{ flex: 1, background: '#EFE9FB', borderRadius: '12px', padding: '20px', textAlign: 'center', minWidth: '200px' }}>
            <div style={{ fontWeight: 800, fontSize: '20px', color: '#41208C' }}>30 Lakh+ Agreements</div>
            <div style={{ fontSize: '13px', color: '#4a5158', marginTop: '2px' }}>Trusted by users nationwide</div>
          </div>
        </div>

        {/* How It Works */}
        <div style={{ padding: '20px 0 34px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 18px', color: 'var(--ink)' }}>How it Works?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center', padding: '20px 14px', border: '1px solid var(--line)', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFE9FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#522AB0" strokeWidth="1.8"><path d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-7h6v7" /></svg>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700 }}>Add details or upload draft</h4>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--body)', lineHeight: 1.5 }}>Enter owner, tenant & rent details, or upload your existing draft.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px 14px', border: '1px solid var(--line)', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFE9FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#522AB0" strokeWidth="1.8"><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18" /></svg>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700 }}>Stamping and Printing</h4>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--body)', lineHeight: 1.5 }}>We prepare the agreement, handle e-stamping, and print it on legal stamp paper.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px 14px', border: '1px solid var(--line)', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFE9FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#522AB0" strokeWidth="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2.1z" /></svg>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700 }}>Get your agreement</h4>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--body)', lineHeight: 1.5 }}>Download the soft copy and get a physical copy delivered in 24 hours.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px 14px', border: '1px solid var(--line)', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFE9FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#522AB0" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 2v4M16 2v4M8 12l3 3 5-6" /></svg>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700 }}>E-sign (optional)</h4>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--body)', lineHeight: 1.5 }}>Use Aadhaar-based e-sign for remote signing if needed.</p>
            </div>
          </div>
        </div>

        {/* Add-Ons */}
        <div style={{ padding: '10px 0 34px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px' }}>Add-Ons Available</h2>
          <div style={{ fontSize: '13px', color: 'var(--body)', margin: '0 0 18px' }}>Extra services you can add on to your rent agreement</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>Notarised Agreement</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--body)', lineHeight: 1.5, flex: 1 }}>Verified and stamped by an official notary — accepted for official and government purposes.</p>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#41208C' }}>₹499</div>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>E-Sign Agreement</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--body)', lineHeight: 1.5, flex: 1 }}>Sign digitally using Aadhaar-based e-sign — no need for owner, tenant or witnesses to meet in person.</p>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#41208C' }}>₹199</div>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>Get Same Day Delivery</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--body)', lineHeight: 1.5, flex: 1 }}>Get the stamped and signed copy delivered the same day, anywhere in the city.</p>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#41208C' }}>₹299</div>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>Tenant Verification</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--body)', lineHeight: 1.5, flex: 1 }}>Runs an identity and background check on your tenant before you finalise the agreement.</p>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#41208C' }}>₹599</div>
            </div>
          </div>
        </div>

        {/* Cost Calculator Section */}
        <div style={{ padding: '10px 0 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: '14px', padding: '24px', background: '#fafbfc' }}>
            <h3 style={{ fontSize: '18px', margin: '0 0 4px', color: '#41208C', fontWeight: 800 }}>Rent Agreement Cost Calculator</h3>
            <div style={{ fontSize: '13px', color: 'var(--body)', margin: '0 0 16px' }}>Calculated dynamically based on Rent, Deposit & Duration</div>
            
            <svg style={{ width: '100%', height: '130px', margin: '10px 0' }} viewBox="0 0 260 130">
              <rect x="20" y="30" width="90" height="70" rx="6" fill="#EFE9FB" stroke="#522AB0" strokeWidth="2" transform="rotate(-6 65 65)" />
              <rect x="70" y="20" width="90" height="70" rx="6" fill="#fff" stroke="#522AB0" strokeWidth="2" />
              <path d="M84 40h60M84 52h60M84 64h40" stroke="#522AB0" strokeWidth="2" />
              <circle cx="200" cy="90" r="26" fill="#FEDC00" />
              <path d="M188 90l8 8 16-16" stroke="#41208C" strokeWidth="3" fill="none" />
            </svg>

            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' }}>Total Rent Agreement Estimated Amount</div>
            <div style={{ fontWeight: 800, fontSize: '26px', color: '#41208C' }}>
              ₹ {calculatedTotal.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ border: '1px solid var(--line)', borderRadius: '14px', padding: '24px', background: '#fff' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>Where is your Property Located?</label>
              <input
                className="inp"
                value={selectedCity}
                readOnly
                onClick={() => setIsModalOpen(true)}
                style={{ width: '100%', padding: '11px 13px', fontSize: '14px', border: '1px solid var(--line)', borderRadius: '8px', background: '#f8f9fa', cursor: 'pointer', fontWeight: 600 }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>What is your Monthly Rent (₹)?</label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                placeholder="Enter rent amount"
                style={{ width: '100%', padding: '11px 13px', fontSize: '14px', border: '1px solid var(--line)', borderRadius: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>What is your Deposit Amount (₹)?</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter deposit amount"
                style={{ width: '100%', padding: '11px 13px', fontSize: '14px', border: '1px solid var(--line)', borderRadius: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>Agreement Duration</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleDurationChip(11)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    textAlign: 'center',
                    border: selectedDuration === 11 && !otherDuration ? '2px solid #522AB0' : '1px solid var(--line)',
                    background: selectedDuration === 11 && !otherDuration ? '#EFE9FB' : '#fff',
                    color: selectedDuration === 11 && !otherDuration ? '#522AB0' : 'var(--body)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  11 Months
                </button>
                <button
                  type="button"
                  onClick={() => handleDurationChip(12)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    textAlign: 'center',
                    border: selectedDuration === 12 && !otherDuration ? '2px solid #522AB0' : '1px solid var(--line)',
                    background: selectedDuration === 12 && !otherDuration ? '#EFE9FB' : '#fff',
                    color: selectedDuration === 12 && !otherDuration ? '#522AB0' : 'var(--body)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  12 Months
                </button>
                <select
                  value={otherDuration}
                  onChange={handleOtherDurationChange}
                  style={{ flex: 1, padding: '10px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                >
                  <option value="">Other</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert(`Starting Rent Agreement process for ${selectedCity} (Rent: ₹${monthlyRent}, Duration: ${selectedDuration} Months)!`)}
              style={{
                width: '100%',
                background: '#522AB0',
                color: '#fff',
                border: 'none',
                borderRadius: '9px',
                padding: '14px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                marginTop: '8px',
                boxShadow: '0 4px 14px rgba(82,42,176,0.3)',
              }}
            >
              🚀 Create Agreement Now
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div style={{ padding: '10px 0 45px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                GujjuProperty compared to local vendors
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: 'var(--muted)' }}>
                See why over 30 Lakh+ home owners choose our digital agreement service
              </p>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFE9FB', color: '#522AB0', padding: '6px 14px', borderRadius: '999px', fontSize: '12.5px', fontWeight: 800 }}>
              ✨ 100% Hassle Free
            </span>
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(82, 42, 176, 0.08)',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #41208C 0%, #522AB0 100%)', color: '#fff' }}>
                    <th style={{ padding: '18px 24px', fontSize: '14.5px', fontWeight: 800, width: '42%' }}>
                      Services & Features
                    </th>
                    <th style={{ padding: '18px 24px', fontSize: '14.5px', fontWeight: 800, textAlign: 'center', width: '29%', background: 'rgba(255, 255, 255, 0.1)' }}>
                      🏆 GujjuProperty
                    </th>
                    <th style={{ padding: '18px 24px', fontSize: '14.5px', fontWeight: 800, textAlign: 'center', width: '29%' }}>
                      Local Vendors
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: 'Legal Stamp Paper Duty', gp: '✓', local: '✓', gpText: '', localText: '' },
                    { service: 'Custom Draft Options', gp: '✓', local: '', gpText: '', localText: 'Rare format' },
                    { service: 'E-Sign / Remote Agreement', gp: '✓', local: '✕', gpText: '', localText: '' },
                    { service: 'Doorstep Delivery', gp: '✓', local: '✕', gpText: '', localText: '' },
                    { service: 'Easy Renewal Process', gp: 'Online', local: '', gpText: '⚡ Online', localText: 'Manual process' },
                    { service: 'Dedicated HR & Support Assistance', gp: '✓', local: '✕', gpText: '', localText: '' },
                  ].map((row, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <tr
                        key={idx}
                        style={{
                          background: isEven ? '#ffffff' : '#FAFAFD',
                          borderBottom: idx === 5 ? 'none' : '1px solid #EAEBF0',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <td style={{ padding: '16px 24px', fontWeight: 700, color: '#1c1f23', fontSize: '14px' }}>
                          {row.service}
                        </td>
                        
                        {/* GujjuProperty Column */}
                        <td style={{ padding: '16px 24px', textAlign: 'center', background: isEven ? 'rgba(239, 233, 251, 0.25)' : 'rgba(239, 233, 251, 0.45)' }}>
                          {row.gpText ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 14px', borderRadius: '999px', background: '#E4F7EE', color: '#1EA672', fontWeight: 800, fontSize: '13px' }}>
                              {row.gpText}
                            </span>
                          ) : row.gp === '✓' ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: '#1EA672', color: '#fff', fontWeight: 900, fontSize: '14px', boxShadow: '0 2px 6px rgba(30,166,114,0.3)' }}>
                              ✓
                            </span>
                          ) : (
                            <span style={{ color: '#79818a' }}>-</span>
                          )}
                        </td>

                        {/* Local Vendors Column */}
                        <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                          {row.localText ? (
                            <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '6px', background: '#FFF5F5', color: '#C53030', fontWeight: 700, fontSize: '12.5px', border: '1px solid #FED7D7' }}>
                              {row.localText}
                            </span>
                          ) : row.local === '✓' ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: '#E4F7EE', color: '#1EA672', fontWeight: 800, fontSize: '13px' }}>
                              ✓
                            </span>
                          ) : row.local === '✕' ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: '#FFF5F5', color: '#E53E3E', fontWeight: 800, fontSize: '13px', border: '1px solid #FED7D7' }}>
                              ✕
                            </span>
                          ) : (
                            <span style={{ color: '#79818a' }}>-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div style={{ padding: '10px 0 50px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Customer Reviews <span style={{ color: '#E3C500', fontWeight: 800 }}>4.7 ★</span>
          </h2>
          <div style={{ fontSize: '13px', color: 'var(--body)', margin: '0 0 18px' }}>4.7 rating out of 50,000 verified reviews</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EFE9FB', color: '#522AB0', fontWeight: 800, fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>DA</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>Deeptan Aggarwal</div>
                  <div style={{ color: '#E3C500', fontSize: '11px' }}>★★★★★</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--body)', lineHeight: 1.5 }}>Used them for their rental agreement service recently. It's genuinely good and hassle-free.</p>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EFE9FB', color: '#522AB0', fontWeight: 800, fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>VK</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>Vikram Kumar</div>
                  <div style={{ color: '#E3C500', fontSize: '11px' }}>★★★★★</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--body)', lineHeight: 1.5 }}>Good customer service, agreement was ready in time and delivery was smooth.</p>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EFE9FB', color: '#522AB0', fontWeight: 800, fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SC</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>Sumit Chinta</div>
                  <div style={{ color: '#E3C500', fontSize: '11px' }}>★★★★☆</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--body)', lineHeight: 1.5 }}>I got my landlord's rent agreement done quickly, decent value for the cost.</p>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EFE9FB', color: '#522AB0', fontWeight: 800, fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>BP</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>Bharat Pai</div>
                  <div style={{ color: '#E3C500', fontSize: '11px' }}>★★★★★</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--body)', lineHeight: 1.5 }}>Used their rental agreement service twice — payments and delivery, they got it done fast.</p>
            </div>
          </div>
        </div>

      </div>

      {/* City Select Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20,10,40,0.5)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '60px',
            zIndex: 300,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div style={{ background: '#fff', borderRadius: '14px', width: '440px', maxWidth: '92vw', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: '20px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#41208C' }}>Select your property City</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--muted)' }}>&times;</button>
            </div>
            
            <div style={{ background: '#EFE9FB', color: '#41208C', fontWeight: 700, fontSize: '13px', textAlign: 'center', padding: '10px', margin: '14px 22px', borderRadius: '8px' }}>
              Now available in 150+ Cities in India!
            </div>
            
            <div style={{ padding: '0 22px 14px' }}>
              <input
                placeholder="Type city name to filter..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>

            <div style={{ padding: '0 22px', fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>Popular Cities</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '0 22px 18px' }}>
              {POPULAR_CITIES.map((c) => (
                <div
                  key={c}
                  onClick={() => handleSelectCity(c)}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EFE9FB', margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#522AB0" strokeWidth="1.7"><path d="M3 21h18M6 21V9l6-5 6 5v12M10 21v-6h4v6" /></svg>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{c}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '12px 22px 4px', fontWeight: 700, fontSize: '13px', borderTop: '1px solid var(--line)' }}>All Cities</div>
            <div style={{ padding: '0 22px 8px', fontSize: '12px', color: 'var(--body)' }}>
              Showing {filteredCities.length} cities
            </div>
            
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filteredCities.map((c) => (
                <div
                  key={c}
                  onClick={() => handleSelectCity(c)}
                  style={{ padding: '11px 22px', fontSize: '14px', color: 'var(--ink)', borderBottom: '1px solid var(--line)', cursor: 'pointer' }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
