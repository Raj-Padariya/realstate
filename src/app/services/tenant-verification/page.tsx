'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  Building2, 
  Clock, 
  ChevronDown, 
  Phone, 
  Lock, 
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';

const PACKAGES = [
  {
    id: 'identity',
    name: 'Basic Identity Check',
    price: '₹499',
    badge: 'Fastest',
    turnaround: 'Within 4 Hours',
    features: [
      'Aadhaar & PAN card authenticity verification',
      'Civil litigation & court records search',
      'Instant digital verification certificate',
      'Downloadable PDF tenant report',
    ],
  },
  {
    id: 'police',
    name: 'Police Intimation Package',
    price: '₹999',
    badge: 'Most Popular',
    turnaround: '24 - 48 Hours',
    popular: true,
    features: [
      'Official local police department tenant intimation form',
      'Police station acknowledgement receipt copy',
      'Biometric ID & address confirmation',
      'Legal compliance under Section 188 of IPC',
      'Dedicated legal coordinator support',
    ],
  },
  {
    id: 'complete',
    name: 'Comprehensive 360° Shield',
    price: '₹1,799',
    badge: 'Total Peace of Mind',
    turnaround: '48 - 72 Hours',
    features: [
      'Everything in Police Intimation Package',
      'Current employer & HR employment confirmation',
      'Previous landlord reference & conduct feedback',
      'Soft credit & financial default check',
      'Priority express processing',
    ],
  },
];

const FAQS = [
  {
    q: 'Is tenant police verification compulsory by law?',
    a: 'Yes, under Section 188 of the Indian Penal Code (IPC) and local police commissioner directives in Gujarat and Maharashtra, house owners are legally mandated to submit tenant details to their local police station before handing over possession.'
  },
  {
    q: 'Does the tenant or owner need to visit the police station physically?',
    a: 'No! Our team handles the end-to-end digital submission and liaison. You and your tenant submit the details and ID proofs online, and we provide you with the stamped official submission receipt.'
  },
  {
    q: 'What documents are required from the tenant and landlord?',
    a: 'From Tenant: Aadhaar Card, PAN card, passport-size photo, and permanent address proof. From Landlord: Electricity bill or property tax receipt as ownership proof, along with a signed Rent Agreement.'
  },
  {
    q: 'How long does the verification process take?',
    a: 'Digital identity checks take under 4 hours. Official police intimation receipts are processed and delivered to your email/WhatsApp within 24 to 48 working hours.'
  },
];

export default function TenantVerificationPage() {
  const [selectedPkg, setSelectedPkg] = useState('police');
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    tenantName: '',
    tenantPhone: '',
    city: 'Ahmedabad',
    propertyType: '2 BHK Apartment',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 750);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '14px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link href="/services" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>Tenant Police Verification</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck className="w-4 h-4" /> 100% IPC Compliant
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', color: '#FDE047', fontSize: '12px', fontWeight: 800, padding: '5px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <UserCheck className="w-3.5 h-3.5" /> Doorstep &amp; Online Verification
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
            Tenant Police Verification &amp; Background Screening
          </h1>
          <p style={{ fontSize: '15.5px', color: '#C7D2FE', margin: '0 auto 28px', maxWidth: '660px', lineHeight: 1.6 }}>
            Avoid police penalties and protect your property with certified background checks, identity verification, and police station submission acknowledgment.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '13px', color: '#E0E7FF' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle className="w-4 h-4 text-emerald-400" /> No Police Station Visit
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Official Police Receipt
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle className="w-4 h-4 text-emerald-400" /> 24-48 Hr Express Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 20px' }}>
        
        {/* Verification Packages */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
              Choose Your Verification Plan
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Transparent pricing with no hidden police liaison fees.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPkg === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg.id)}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '30px',
                    border: isSelected ? '2px solid #522AB0' : '1px solid #E2E8F0',
                    boxShadow: isSelected ? '0 10px 30px rgba(82, 42, 176, 0.12)' : '0 4px 15px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {pkg.popular && (
                    <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#522AB0', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.5px' }}>
                      RECOMMENDED
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#522AB0', background: '#F5F3FF', padding: '3px 10px', borderRadius: '6px' }}>
                        {pkg.badge}
                      </span>
                      <span style={{ fontSize: '12px', color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock className="w-3.5 h-3.5" /> {pkg.turnaround}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px' }}>
                      {pkg.name}
                    </h3>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
                      {pkg.price}{' '}
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>/ tenant</span>
                    </div>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#334155' }}>
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    style={{
                      marginTop: '28px',
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      background: isSelected ? '#522AB0' : '#F1F5F9',
                      color: isSelected ? '#fff' : '#334155',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isSelected ? '✓ Plan Selected' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Form + Why It Matters Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', alignItems: 'start', marginBottom: '60px' }}>
          
          {/* Left: Instant Booking Form */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
              Book Tenant Verification
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 24px' }}>
              Selected: <strong style={{ color: '#522AB0' }}>{PACKAGES.find(p => p.id === selectedPkg)?.name} ({PACKAGES.find(p => p.id === selectedPkg)?.price})</strong>
            </p>

            {isSubmitted ? (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                <CheckCircle className="w-12 h-12 text-emerald-600" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#065F46', margin: '0 0 6px' }}>
                  Application Received!
                </h4>
                <p style={{ fontSize: '13.5px', color: '#047857', margin: '0 0 16px', lineHeight: 1.5 }}>
                  Our legal operations team has initiated verification file #GP-VER-{(Math.random() * 8999 + 1000).toFixed(0)}. We will contact you at <strong>{formData.ownerPhone}</strong> within 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  style={{ background: '#059669', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Submit Another Verification
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Owner Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      placeholder="Your full name"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Owner Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      placeholder="10-digit mobile"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Tenant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.tenantName}
                      onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                      placeholder="Tenant name"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Tenant Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.tenantPhone}
                      onChange={(e) => setFormData({ ...formData, tenantPhone: e.target.value })}
                      placeholder="Tenant phone"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Property City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none', background: '#fff' }}
                    >
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Surat">Surat</option>
                      <option value="Vadodara">Vadodara</option>
                      <option value="Rajkot">Rajkot</option>
                      <option value="Gandhinagar">Gandhinagar</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none', background: '#fff' }}
                    >
                      <option value="1 BHK Apartment">1 BHK Apartment</option>
                      <option value="2 BHK Apartment">2 BHK Apartment</option>
                      <option value="3+ BHK Apartment">3+ BHK Apartment</option>
                      <option value="Independent Villa / Bungalow">Independent Villa / Bungalow</option>
                      <option value="Commercial Office / Shop">Commercial Office / Shop</option>
                    </select>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock className="w-3.5 h-3.5 text-slate-400" /> All personal data is encrypted and used solely for police verification.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginTop: '8px',
                    background: '#522AB0',
                    color: '#fff',
                    padding: '13px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '15px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(82, 42, 176, 0.25)',
                  }}
                >
                  {isSubmitting ? 'Processing Details...' : 'Start Verification Now →'}
                </button>
              </form>
            )}
          </div>

          {/* Right: Why Police Verification is Essential */}
          <div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px' }}>
                Why Landlords Must Not Skip Verification
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>Avoid Section 188 IPC Charges</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Failure to report tenant identity to local police can lead to legal summons and non-bailable FIR penalties under Indian penal regulations.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>Eliminate Unlawful Occupancy</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Background-checked tenants have proven track records with zero history of illegal subletting or refusing to vacate.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>Housing Society Approval</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Societies in Ahmedabad, Pune, Surat, and Mumbai mandate the official police acknowledgment stamp before issuing move-in NOCs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Box */}
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#581C87', margin: '0 0 4px' }}>Have questions about the police process?</h4>
                <p style={{ fontSize: '12px', color: '#6B21A8', margin: 0 }}>Talk directly to our legal desk expert.</p>
              </div>
              <a
                href="tel:+919876543210"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#522AB0',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Phone className="w-3.5 h-3.5" /> Call Legal Desk
              </a>
            </div>
          </div>

        </div>

        {/* FAQs Section */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '20px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
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
