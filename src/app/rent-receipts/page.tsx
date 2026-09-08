'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Receipt, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  User,
  Sparkles,
  Building2,
  Lock
} from 'lucide-react';

function numberToWords(num: number): string {
  if (isNaN(num) || num <= 0) return '';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n: number): string {
    let str = '';
    if (n >= 10000000) {
      str += inWords(Math.floor(n / 10000000)) + 'Crore ';
      n %= 10000000;
    }
    if (n >= 100000) {
      str += inWords(Math.floor(n / 100000)) + 'Lakh ';
      n %= 100000;
    }
    if (n >= 1000) {
      str += inWords(Math.floor(n / 1000)) + 'Thousand ';
      n %= 1000;
    }
    if (n >= 100) {
      str += inWords(Math.floor(n / 100)) + 'Hundred ';
      n %= 100;
    }
    if (n > 0) {
      if (n < 20) {
        str += a[n];
      } else {
        str += b[Math.floor(n / 10)] + ' ' + a[n % 10];
      }
    }
    return str;
  }

  const result = inWords(num).trim();
  return result ? `${result} Rupees Only` : '';
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function RentReceiptsPage() {
  const currentYear = new Date().getFullYear();
  const currentMonthIdx = new Date().getMonth();

  const [tenantName, setTenantName] = useState('Rahul Sharma');
  const [landlordName, setLandlordName] = useState('Suresh Patel');
  const [rentAmount, setRentAmount] = useState('18500');
  const [address, setAddress] = useState('Flat 402, Shivalik Residency, Bodakdev, Ahmedabad, Gujarat - 380054');
  const [landlordPan, setLandlordPan] = useState('ABCDE1234F');
  const [paymentMode, setPaymentMode] = useState('UPI / Net Banking');
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[currentMonthIdx]);
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const [receiptNumber, setReceiptNumber] = useState('GP-REC-2026-8942');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const parsedAmount = parseInt(rentAmount, 10) || 0;
  const annualAmount = parsedAmount * 12;
  const isPanRequired = annualAmount > 100000;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const faqs = [
    {
      q: 'Is a revenue stamp mandatory on rent receipts?',
      a: 'A ₹1 revenue stamp is legally required only if the monthly rent payment exceeds ₹5,000 and is paid in cash. For digital bank transfers, NEFT, RTGS, or UPI, an acknowledgment with the landlord’s signature or digital proof is acceptable to Income Tax authorities.'
    },
    {
      q: 'When is the landlord’s PAN mandatory for HRA claim?',
      a: 'As per Income Tax guidelines, if your total rent paid in a financial year exceeds ₹1,00,000 (i.e. more than ₹8,333/month), declaring your landlord’s PAN is compulsory on the receipts to claim HRA tax exemption.'
    },
    {
      q: 'Can I generate rent receipts for previous months or the whole year?',
      a: 'Yes! You can select any previous month and year to generate and download individual monthly receipts for your employer submission or ITR filing.'
    },
    {
      q: 'How much HRA tax exemption can I claim?',
      a: 'The exempt HRA amount is the minimum of: 1) Actual HRA received from employer, 2) 50% of basic salary (for metro cities) or 40% (non-metro), or 3) Total rent paid minus 10% of basic salary.'
    }
  ];

  return (
    <div className="receipt-page-container" style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif" }}>
      <style>{`
        @page {
          size: A4 portrait;
          margin: 8mm 10mm;
        }

        @media print {
          /* 1. HIDE EVERY PAGE COMPONENT OUTSIDE THE RECEIPT TO PREVENT BLANK PAGES */
          header,
          footer,
          nav,
          aside,
          .topbar,
          .scrim,
          .drawer,
          .no-print,
          .no-print * {
            display: none !important;
            height: 0 !important;
            max-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            overflow: hidden !important;
            visibility: hidden !important;
          }

          /* 2. Zero-out HTML, Body, and Wrapper Containers */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            background: #ffffff !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          main,
          .receipt-page-container,
          .receipt-outer-wrap,
          .receipt-grid-wrap,
          .receipt-preview-col {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            min-height: 0 !important;
            height: auto !important;
            background: transparent !important;
            box-shadow: none !important;
          }

          /* 3. The receipt card itself in normal static flow */
          #printable-receipt {
            position: static !important;
            display: block !important;
            visibility: visible !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 20px 24px !important;
            background: #ffffff !important;
            border: 2px solid #1E1B4B !important;
            border-radius: 8px !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-before: avoid !important;
            break-before: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }

          #printable-receipt * {
            visibility: visible !important;
          }

          .print-header {
            padding-bottom: 10px !important;
            margin-bottom: 12px !important;
          }
          .print-title-banner {
            margin-bottom: 12px !important;
            padding: 6px 10px !important;
          }
          .print-body {
            font-size: 13px !important;
            line-height: 1.6 !important;
            margin-bottom: 12px !important;
          }
          .print-address {
            padding: 6px 10px !important;
            margin-top: 6px !important;
            font-size: 12px !important;
          }
          .print-grid {
            padding: 8px 12px !important;
            margin-bottom: 14px !important;
            gap: 10px !important;
          }
          .print-stamp {
            width: 78px !important;
            height: 92px !important;
            padding: 4px !important;
            font-size: 9px !important;
          }
          .print-sign-space {
            height: 36px !important;
            margin-bottom: 4px !important;
          }
          .print-footer {
            margin-top: 12px !important;
            padding-top: 6px !important;
          }
        }
      `}</style>

      {/* Breadcrumb Bar */}
      <div className="no-print" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '14px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link href="/services" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>HRA Rent Receipts</span>
          </div>
          <span style={{ fontSize: '12px', color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Free &amp; IT Compliant
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="no-print" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)', color: '#fff', padding: '44px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', color: '#FDE047', fontSize: '12px', fontWeight: 700, padding: '5px 14px', borderRadius: '999px', marginBottom: '14px' }}>
            <Sparkles className="w-3.5 h-3.5" /> Free HRA Tax Exemption Tool
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            Instant HRA Rent Receipt Generator
          </h1>
          <p style={{ fontSize: '15px', color: '#C7D2FE', margin: '0 auto', maxWidth: '620px', lineHeight: 1.6 }}>
            Generate and print Income Tax compliant rent receipts with revenue stamp format in 60 seconds. Claim your full HRA deductions effortlessly.
          </p>
        </div>
      </div>

      {/* Main Content Grid: Form + Live Receipt Preview */}
      <div className="receipt-outer-wrap" style={{ maxWidth: '1240px', margin: '36px auto', padding: '0 20px' }}>
        <div className="receipt-grid-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Column: Form Details */}
          <div className="no-print" style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0F172A' }}>Receipt Information</h2>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>Fill details to update the live receipt</p>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Tenant Name */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Tenant Full Name (Claimant) *
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: '12px', top: '12px', width: '16px', height: '16px', color: '#94A3B8' }} />
                  <input
                    type="text"
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Landlord Name */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Landlord / House Owner Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: '12px', top: '12px', width: '16px', height: '16px', color: '#94A3B8' }} />
                  <input
                    type="text"
                    value={landlordName}
                    onChange={(e) => setLandlordName(e.target.value)}
                    placeholder="e.g. Suresh Patel"
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Monthly Rent & Month Picker */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    placeholder="18500"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Month &amp; Year *
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      style={{ width: '60%', padding: '10px 6px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#fff' }}
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      style={{ width: '40%', padding: '10px 6px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#fff' }}
                    >
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Rental Property Address */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Rented House Address *
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Complete flat no, building name, area, city, pin code"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {/* Landlord PAN & Payment Mode */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Landlord PAN {isPanRequired ? '(Mandatory)' : '(Optional)'}
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={landlordPan}
                    onChange={(e) => setLandlordPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${isPanRequired && !landlordPan ? '#EF4444' : '#CBD5E1'}`, fontSize: '13px', outline: 'none' }}
                  />
                  {isPanRequired && (
                    <span style={{ fontSize: '11px', color: '#D97706', marginTop: '4px', display: 'block' }}>
                      Required since annual rent &gt; ₹1 Lakh.
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Payment Mode
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    style={{ width: '100%', padding: '10px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#fff' }}
                  >
                    <option value="UPI / Net Banking">UPI / Net Banking</option>
                    <option value="Cheque Transfer">Cheque Transfer</option>
                    <option value="Cash Payment">Cash Payment</option>
                    <option value="NEFT / RTGS">NEFT / RTGS</option>
                  </select>
                </div>
              </div>

              {/* Receipt Number */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Receipt Reference Number
                </label>
                <input
                  type="text"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#F8FAFC' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#522AB0',
                    color: '#fff',
                    padding: '12px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(82, 42, 176, 0.25)',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <Printer className="w-4 h-4" /> Print / Save as PDF (A4 1-Page)
                </button>
                <span style={{ fontSize: '11.5px', color: '#64748B', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Guaranteed 1-page A4 fit (Zero blank pages)
                </span>
              </div>
            </form>
          </div>

          {/* Right Column: Live Printable Receipt Preview */}
          <div className="receipt-preview-col">
            <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Live Receipt Preview
              </span>
              <button
                onClick={handlePrint}
                style={{ fontSize: '12.5px', color: '#522AB0', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Download className="w-3.5 h-3.5" /> Download Now
              </button>
            </div>

            {/* Official Receipt Paper Card */}
            <div
              id="printable-receipt"
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '30px',
                border: '2px solid #E2E8F0',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.06)',
                position: 'relative',
                color: '#1E293B',
              }}
            >
              {/* Top Brand Header with Logo & Verified Badges */}
              <div className="print-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #522AB0', paddingBottom: '14px', marginBottom: '16px' }}>
                {/* Brand Logo & Wordmark */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #522AB0 0%, #35167A 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    boxShadow: '0 3px 8px rgba(82, 42, 176, 0.3)',
                    flexShrink: 0
                  }}>
                    <Building2 className="w-5 h-5 text-white" />
                    <span style={{ fontSize: '9.5px', lineHeight: 1, fontWeight: 900, letterSpacing: '0.5px', marginTop: '1px' }}>GP</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '21px', fontWeight: 900, color: '#1E1B4B', letterSpacing: '-0.5px' }}>
                        Gujju<span style={{ color: '#522AB0' }}>Property</span>
                      </span>
                      <span style={{ fontSize: '9.5px', fontWeight: 800, background: '#F5F3FF', color: '#522AB0', border: '1px solid #DDD6FE', padding: '1px 6px', borderRadius: '4px' }}>
                        OFFICIAL
                      </span>
                    </div>
                    <p style={{ fontSize: '10.5px', color: '#64748B', margin: '2px 0 0', fontWeight: 600 }}>
                      Direct Owner Property Network • Gujarat &amp; Maharashtra
                    </p>
                  </div>
                </div>

                {/* Right: Receipt Metadata */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '3px 8px', borderRadius: '6px', fontSize: '10.5px', fontWeight: 800, color: '#047857', marginBottom: '4px' }}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> IT ACT SEC 10(13A)
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                    Receipt No: <span style={{ color: '#522AB0', fontFamily: 'monospace', fontWeight: 800 }}>{receiptNumber || 'GP-REC-2026-8942'}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    Date: <strong>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                  </div>
                </div>
              </div>

              {/* Formal Document Title Banner */}
              <div className="print-title-banner" style={{ textAlign: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 14px', marginBottom: '18px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#1E1B4B', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>
                  RENT RECEIPT (HRA DECLARATION)
                </h2>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                  Issued by Landlord for claiming House Rent Allowance (HRA) Exemption
                </span>
              </div>

              {/* Receipt Body Text */}
              <div className="print-body" style={{ fontSize: '14px', lineHeight: 1.9, color: '#334155', marginBottom: '20px' }}>
                Received with thanks from Mr./Ms.{' '}
                <strong style={{ color: '#0F172A', borderBottom: '1px dashed #64748B', paddingBottom: '1px' }}>
                  {tenantName || '____________________'}
                </strong>{' '}
                the sum of{' '}
                <strong style={{ color: '#0F172A', fontSize: '15px', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
                  ₹{parsedAmount.toLocaleString('en-IN')}
                </strong>{' '}
                (Rupees{' '}
                <em style={{ fontWeight: 600, color: '#0F172A' }}>
                  {numberToWords(parsedAmount) || '__________________________________'}
                </em>
                ) towards full and final payment of monthly rent for the period of{' '}
                <strong style={{ color: '#522AB0' }}>
                  {selectedMonth} {selectedYear}
                </strong>{' '}
                via <strong>{paymentMode}</strong> in respect of the rented premises located at:
                <div className="print-address" style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '6px', borderLeft: '3px solid #522AB0', marginTop: '8px', fontSize: '13px', fontStyle: 'italic' }}>
                  {address || 'Address not provided'}
                </div>
              </div>

              {/* Tax & Landlord PAN details */}
              <div className="print-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', background: '#FAFAFA', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '22px' }}>
                <div>
                  <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>Landlord Name</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{landlordName || '—'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>Landlord PAN Number</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', marginTop: '2px', letterSpacing: '0.5px' }}>{landlordPan || 'N/A'}</div>
                </div>
              </div>

              {/* Footer with Revenue Stamp & Signature Area */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '6px' }}>
                {/* Simulated Revenue Stamp */}
                <div
                  className="print-stamp"
                  style={{
                    width: '88px',
                    height: '105px',
                    border: '1.5px dashed #94A3B8',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '6px',
                    background: '#FEF3C7',
                    color: '#92400E',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>₹1 STAMP</div>
                  <div>Affix Revenue Stamp if rent paid in cash &gt; ₹5,000</div>
                </div>

                {/* Signature Box */}
                <div style={{ textAlign: 'center', minWidth: '180px' }}>
                  <div className="print-sign-space" style={{ height: '46px', borderBottom: '1px solid #334155', marginBottom: '6px' }}></div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                    {landlordName || 'Signature of Landlord'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Landlord / House Owner</div>
                </div>
              </div>

              {/* Watermark/Brand footer */}
              <div className="print-footer" style={{ marginTop: '20px', borderTop: '1px solid #F1F5F9', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified by GujjuProperty Services
                </span>
                <span>Computer Generated Legal Document • Valid for Form 12BB HRA Claims</span>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="no-print" style={{ background: '#EFF6FF', borderRadius: '12px', border: '1px solid #BFDBFE', padding: '16px', marginTop: '20px' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E40AF', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck className="w-4 h-4" /> Pro Tip for HRA Submission
              </h4>
              <p style={{ fontSize: '12.5px', color: '#1E3A8A', margin: 0, lineHeight: 1.5 }}>
                Submit this receipt alongside your formal <strong>Rent Agreement</strong> and bank debit statements for seamless corporate payroll HRA approval.
              </p>
            </div>
          </div>

        </div>

        {/* Informational Section: How HRA works */}
        <div className="no-print" style={{ marginTop: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Understanding House Rent Allowance (HRA) Tax Exemption
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px' }}>
            HRA exemption is calculated under Section 10(13A) Rule 2A of the Income Tax Act. The lowest of the following 3 amounts is exempt from tax:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', marginBottom: '6px' }}>CRITERION 1</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>Actual HRA Received</h4>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>The exact HRA allowance component provided in your monthly salary slip.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', marginBottom: '6px' }}>CRITERION 2</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>Metro / Non-Metro %</h4>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>50% of (Basic Salary + DA) for metro cities, or 40% for non-metro cities like Ahmedabad, Surat, Pune, etc.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', marginBottom: '6px' }}>CRITERION 3</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>Excess Rent Paid</h4>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>Actual rent paid minus 10% of your total basic salary.</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="no-print" style={{ marginTop: '40px', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '20px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '14.5px',
                      color: '#0F172A',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 20px 18px', fontSize: '13.5px', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #F1F5F9' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
