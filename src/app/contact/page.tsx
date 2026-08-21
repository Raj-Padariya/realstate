'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Home, Gem, FileText, PhoneCall, KeyRound, Mail, Clock, Building2, Building, ChevronDown, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill in all required fields (Name, Phone, Message).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessNotice('🎉 Thank you! Your message has been received. Our team will call you back within 15 minutes.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: 'General Inquiry',
        message: '',
      });
      setTimeout(() => setSuccessNotice(''), 6000);
    }, 600);
  };

  const topicOptions = [
    { label: 'General Inquiry', icon: <MessageCircle className="w-4 h-4" /> },
    { label: 'Post Property Help', icon: <Home className="w-4 h-4" /> },
    { label: 'Buyer & Owner Plans', icon: <Gem className="w-4 h-4" /> },
    { label: 'Rental Agreement', icon: <FileText className="w-4 h-4" /> },
  ];

  const faqs = [
    {
      q: 'How fast will someone respond to my inquiry?',
      a: 'Our phone lines and WhatsApp chat respond instantly during working hours (9:00 AM – 8:00 PM IST). Online form messages receive a callback within 15 minutes.',
    },
    {
      q: 'How do I get help listing my property directly on GujjuProperty?',
      a: 'You can post your property online in under 2 minutes, or call our Owner Support Hotline at +91 89XXX XXXXX where an assistant will list it for you free.',
    },
    {
      q: 'Are there any hidden charges when using GujjuProperty?',
      a: 'Zero! GujjuProperty connects buyers, tenants, and owners directly without any brokerage fees.',
    },
  ];

  return (
    <div style={{ background: '#F4F5F8', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb & Page Title Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '16px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Contact Us</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12.5px', color: '#0F9D58', fontWeight: 800, background: '#E6F4EA', padding: '4px 12px', borderRadius: '999px' }}>
              ● Support Online Now
            </span>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1200px', margin: '36px auto 0' }}>
        
        {/* NEW MODERN SPLIT CONTAINER */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 420px) 1fr',
            gap: '0',
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(41, 16, 92, 0.08)',
            border: '1px solid #EBE6F7',
            overflow: 'hidden',
          }}
        >
          
          {/* LEFT COLUMN: DARK BRAND HIGHLIGHT PANEL */}
          <div
            style={{
              background: 'linear-gradient(145deg, #321670 0%, #41208C 50%, #522AB0 100%)',
              color: '#fff',
              padding: '44px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '11.5px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '18px' }}>
                ⚡ Fast Callback Service
              </div>

              <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.25 }}>
                Let's Talk About Your Property Needs
              </h1>

              <p style={{ fontSize: '14px', color: '#d9cdf2', margin: '0 0 32px', lineHeight: 1.6 }}>
                Connect directly with our real estate specialists. No brokers, no spam, only genuine guidance.
              </p>

              {/* Contact List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                
                {/* Item 1 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <PhoneCall className="w-5 h-5 text-[#FEDC00]" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#FEDC00', fontWeight: 800, textTransform: 'uppercase' }}>Buyer & General Helpline</div>
                    <a href="tel:+918900000000" style={{ fontSize: '16px', fontWeight: 800, color: '#fff', textDecoration: 'none', display: 'block', marginTop: '2px' }}>
                      +91 89XXX XXXXX
                    </a>
                  </div>
                </div>

                {/* Item 2 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <KeyRound className="w-5 h-5 text-[#FEDC00]" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#FEDC00', fontWeight: 800, textTransform: 'uppercase' }}>Owner Listing Helpline</div>
                    <a href="tel:+918900000000" style={{ fontSize: '16px', fontWeight: 800, color: '#fff', textDecoration: 'none', display: 'block', marginTop: '2px' }}>
                      +91 89XXX XXXXX
                    </a>
                  </div>
                </div>

                {/* Item 3 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Mail className="w-5 h-5 text-[#FEDC00]" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#FEDC00', fontWeight: 800, textTransform: 'uppercase' }}>Email Support</div>
                    <a href="mailto:support@gujjuproperty.com" style={{ fontSize: '14px', fontWeight: 700, color: '#fff', textDecoration: 'none', display: 'block', marginTop: '2px' }}>
                      support@gujjuproperty.com
                    </a>
                  </div>
                </div>

                {/* Item 4 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Clock className="w-5 h-5 text-[#FEDC00]" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#FEDC00', fontWeight: 800, textTransform: 'uppercase' }}>Working Hours</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                      Monday – Sunday (9 AM – 8 PM IST)
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* WhatsApp Quick Pill */}
            <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <a
                href="https://wa.me/918905552444"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: '#25D366',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)',
                }}
              >
                <MessageCircle className="w-5 h-5 fill-current" /> Chat on WhatsApp Now
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: MODERN FORM CONTAINER */}
          <div style={{ padding: '44px 40px', background: '#fff' }}>
            
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px' }}>
                Send Us a Direct Message
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
                Select a topic below and fill out your details. We respond within 15 minutes.
              </p>
            </div>

            {successNotice && (
              <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '12px', padding: '16px', fontSize: '14px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.5 }}>
                {successNotice}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Topic Pills Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  Select Topic
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {topicOptions.map((opt) => {
                    const isSelected = formData.category === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: opt.label })}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #522AB0' : '1px solid var(--line)',
                          background: isSelected ? '#EFE9FB' : '#FAF9FD',
                          color: isSelected ? '#41208C' : 'var(--ink)',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {opt.icon} {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Phone Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what you are looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', background: '#FAF9FD', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #41208C 0%, #522AB0 100%)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(82, 42, 176, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Send className="w-5 h-5" /> {isSubmitting ? 'Sending Request...' : 'Send Direct Inquiry'}
              </button>

            </form>
          </div>

        </div>

        {/* CORPORATE OFFICE LOCATIONS SHOWCASE */}
        <div style={{ marginTop: '50px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 20px', textAlign: 'center' }}>
            Visit Our Corporate Offices
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            
            {/* Office 1 */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F9D58', background: '#E6F4EA', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                    Corporate Headquarters
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#41208C', margin: '8px 0 0' }}>
                    Ahmedabad HQ
                  </h3>
                </div>
                <Building2 className="w-7 h-7 text-[#522AB0]" />
              </div>

              <p style={{ fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.6, margin: '0 0 16px' }}>
                📍 GujjuProperty Towers, 4th Floor, SG Highway, near Iscon Cross Road, Satellite, Ahmedabad, Gujarat 380015
              </p>

              <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#522AB0', fontWeight: 700 }}>
                <span>📞 +91 79 XXXX XXXX</span>
                <span>•</span>
                <span>✉️ ahmedabad@gujjuproperty.com</span>
              </div>
            </div>

            {/* Office 2 */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#522AB0', background: '#EFE9FB', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                    Operations & Legal Hub
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#41208C', margin: '8px 0 0' }}>
                    Pune Regional Hub
                  </h3>
                </div>
                <Building className="w-7 h-7 text-[#522AB0]" />
              </div>

              <p style={{ fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.6, margin: '0 0 16px' }}>
                📍 Opus Heights, 2nd Floor, Balewadi High Street, Baner, Pune, Maharashtra 411045
              </p>

              <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#522AB0', fontWeight: 700 }}>
                <span>📞 +91 20 XXXX XXXX</span>
                <span>•</span>
                <span>✉️ pune@gujjuproperty.com</span>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div style={{ marginTop: '50px', background: '#fff', borderRadius: '20px', padding: '36px 32px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: '0 0 20px', textAlign: 'center' }}>
            Frequently Asked Support Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '840px', margin: '0 auto' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} style={{ border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', background: '#FAF9FD' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      padding: '16px 20px',
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      textAlign: 'left',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#522AB0] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 20px 16px', fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.6, borderTop: '1px solid #EBE6F7', paddingTop: '12px', background: '#fff' }}>
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
