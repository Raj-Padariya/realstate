'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Landmark, Calculator, Coins, Building2, CreditCard, CheckCircle2 } from 'lucide-react';

export default function HomeLoanServicePage() {
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs
  const [tenureYears, setTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // EMI Calculation Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const partnerBanks = [
    { name: 'State Bank of India', rate: '8.40% onwards', icon: <Landmark className="w-7 h-7 text-[#522AB0] mx-auto" /> },
    { name: 'HDFC Bank', rate: '8.50% onwards', icon: <Building2 className="w-7 h-7 text-[#522AB0] mx-auto" /> },
    { name: 'ICICI Bank', rate: '8.55% onwards', icon: <CreditCard className="w-7 h-7 text-[#522AB0] mx-auto" /> },
    { name: 'Axis Bank', rate: '8.60% onwards', icon: <Building2 className="w-7 h-7 text-[#522AB0] mx-auto" /> },
    { name: 'Bank of Baroda', rate: '8.40% onwards', icon: <Landmark className="w-7 h-7 text-[#522AB0] mx-auto" /> },
    { name: 'Kotak Mahindra', rate: '8.50% onwards', icon: <Building2 className="w-7 h-7 text-[#522AB0] mx-auto" /> },
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
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Home Loan & Financing</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#0F9D58', fontWeight: 800, background: '#E6F4EA', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Landmark className="w-3.5 h-3.5" /> 14+ Partner Banks
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #321670 0%, #41208C 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Coins className="w-3.5 h-3.5" /> Lowest Interest Deals
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            Home Loans & Financing Assistance
          </h1>
          <p style={{ fontSize: '15.5px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6 }}>
            Compare rates from 14 top banks, calculate monthly EMI, and get instant doorstep pre-approval assistance.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1150px', margin: '40px auto 0' }}>
        
        {/* INTERACTIVE EMI CALCULATOR & SUMMARY */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 36px', border: '1px solid #EBE6F7', boxShadow: '0 16px 40px rgba(41, 16, 92, 0.08)', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#41208C', margin: '0 0 24px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Calculator className="w-6 h-6 text-[#522AB0]" /> Interactive Home Loan EMI Calculator
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            
            {/* CALCULATOR CONTROLS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Loan Amount Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Loan Amount</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#522AB0' }}>₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={20000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#522AB0' }}
                />
              </div>

              {/* Tenure Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Tenure (Years)</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#522AB0' }}>{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#522AB0' }}
                />
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Interest Rate (% p.a.)</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#522AB0' }}>{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={12.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#522AB0' }}
                />
              </div>

            </div>

            {/* EMI SUMMARY BOX */}
            <div style={{ background: '#FAF9FD', borderRadius: '20px', padding: '32px', border: '1px solid #EBE6F7', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', marginBottom: '4px' }}>
                Estimated Monthly Payment
              </div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#41208C', marginBottom: '20px' }}>
                ₹{emi.toLocaleString('en-IN')}<span style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 600 }}>/month</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', borderTop: '1px solid #EBE6F7', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Principal Amount:</span>
                  <strong style={{ color: 'var(--ink)' }}>₹{loanAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Total Interest Payable:</span>
                  <strong style={{ color: '#0F9D58' }}>₹{totalInterest.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #EBE6F7', paddingTop: '10px' }}>
                  <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Total Amount Payable:</span>
                  <strong style={{ color: '#41208C', fontSize: '15px' }}>₹{totalPayment.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* PARTNER BANKS GRID */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 20px', textAlign: 'center' }}>
            Partner Banks & Financial Institutions
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {partnerBanks.map((bank, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #EBE6F7', boxShadow: '0 4px 16px rgba(0,0,0,0.02)', textAlign: 'center' }}>
                <div style={{ marginBottom: '8px' }}>{bank.icon}</div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px' }}>{bank.name}</h4>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F9D58' }}>{bank.rate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LOAN ASSISTANCE FORM */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '36px', border: '1px solid #EBE6F7', maxWidth: '640px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: '0 0 8px', textAlign: 'center' }}>
            Get Pre-Approved Home Loan Callback
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', textAlign: 'center', margin: '0 0 24px' }}>
            Our banking specialist will compare offers and guide you through eligibility paperwork.
          </p>

          {submitted ? (
            <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '12px', padding: '20px', textAlign: 'center', fontSize: '14px', fontWeight: 700 }}>
              <CheckCircle2 className="w-8 h-8 text-[#0F9D58] mx-auto mb-2" /> Thank you! A home loan advisor will call you within 15 minutes.
            </div>
          ) : (
            <form onSubmit={handleLoanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#522AB0',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Landmark className="w-5 h-5" /> Request Home Loan Callback
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
