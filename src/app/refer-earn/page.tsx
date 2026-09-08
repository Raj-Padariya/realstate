'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Gift,
  Share2,
  Copy,
  CheckCircle2,
  Phone,
  User,
  Building,
  Coins,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Send,
} from 'lucide-react';

export default function ReferEarnPage() {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('GUJJU-7829');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerPhone: '',
    referrerUpi: '',
    friendName: '',
    friendPhone: '',
    propertyType: 'Residential Rent',
    city: 'Ahmedabad',
    locality: '',
  });

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`https://gujjuproperty.com?ref=${referralCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `Hey! Check out GujjuProperty to buy, rent, or sell property with ZERO brokerage and direct owner contact: https://gujjuproperty.com?ref=${referralCode}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '14px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>Refer &amp; Earn Rewards</span>
          </div>
          <span style={{ fontSize: '12.5px', color: '#059669', fontWeight: 800, background: '#ECFDF5', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Coins className="w-3.5 h-3.5" /> Over ₹18.5 Lakhs Paid Out
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(135deg, #1E0B45 0%, #41208C 60%, #5E33C4 100%)', color: '#fff', padding: '60px 20px 70px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '18px', letterSpacing: '0.06em' }}>
            <Gift className="w-4 h-4" /> GUJJU REWARDS PROGRAM
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 850, lineHeight: 1.2, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
            Refer an Owner or Tenant &amp; Earn Up to ₹5,000
          </h1>
          <p style={{ fontSize: '16px', color: '#E2E8F0', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            Know someone looking to rent, sell, or purchase a property? Share your link or submit their details. Get instant UPI payout as soon as their verified listing goes live!
          </p>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1160px', margin: '-40px auto 0', padding: '0 20px' }}>
        {/* Referral Card & Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
          
          {/* Box 1: Quick Share & Code */}
          <div style={{ background: '#fff', borderRadius: '18px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#EDE9FE', color: '#522AB0', display: 'grid', placeItems: 'center' }}>
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Share Your Referral Code</h3>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748B' }}>Friends get ₹500 off plans, you get cash.</p>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: '12px', padding: '16px', textAlign: 'center', marginBottom: '22px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.08em' }}>Your Unique Referral Code</span>
              <div style={{ fontSize: '26px', fontWeight: 850, color: '#522AB0', letterSpacing: '0.12em', margin: '6px 0 10px' }}>
                {referralCode}
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  padding: '9px 18px',
                  background: copied ? '#059669' : '#0F172A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.2s',
                }}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Link Copied!' : 'Copy Referral Link'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              style={{
                width: '100%',
                padding: '13px',
                background: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 750,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '28px',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
              }}
            >
              Share via WhatsApp Now
            </button>

            <div style={{ marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '20px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Rewards Breakdown:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                  <span style={{ color: '#475569' }}>Residential Rental Listing:</span>
                  <b style={{ color: '#059669' }}>₹1,000 Cash</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                  <span style={{ color: '#475569' }}>Residential Sale / Flat:</span>
                  <b style={{ color: '#059669' }}>₹3,000 Cash</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                  <span style={{ color: '#475569' }}>Commercial / Plot / Villa:</span>
                  <b style={{ color: '#059669' }}>₹5,000 Cash</b>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Direct Lead Referral Form */}
          <div style={{ background: '#fff', borderRadius: '18px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#ECFDF5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Refer a Friend Directly</h3>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748B' }}>We'll contact them and credit your UPI account.</p>
              </div>
            </div>

            {formSubmitted ? (
              <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '14px', padding: '32px 20px', textAlign: 'center' }}>
                <CheckCircle2 className="w-12 h-12 text-emerald-600" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 850, color: '#065F46', margin: '0 0 8px' }}>Referral Submitted Successfully!</h3>
                <p style={{ fontSize: '14px', color: '#047857', margin: '0 0 18px', lineHeight: 1.5 }}>
                  Tracking ID: <b>REF-{Math.floor(100000 + Math.random() * 900000)}</b><br />
                  Our relationship manager will verify your friend's property within 24 hours. Your reward will be transferred to <b>{formData.referrerUpi || 'your registered UPI'}</b>.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  style={{
                    padding: '10px 22px',
                    background: '#059669',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Refer Another Friend
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patel"
                      value={formData.referrerName}
                      onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>Your Phone / UPI *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. rahul@upi"
                      value={formData.referrerUpi}
                      onChange={(e) => setFormData({ ...formData, referrerUpi: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                    />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', marginTop: '4px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>Friend's Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Owner or tenant's name"
                    value={formData.friendName}
                    onChange={(e) => setFormData({ ...formData, friendName: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>Friend's Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={formData.friendPhone}
                    onChange={(e) => setFormData({ ...formData, friendPhone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', background: '#fff' }}
                    >
                      <option>Residential Rent</option>
                      <option>Residential Sale</option>
                      <option>Plot / Land</option>
                      <option>Commercial Shop/Office</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>City</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', background: '#fff' }}
                    >
                      <option>Ahmedabad</option>
                      <option>Surat</option>
                      <option>Vadodara</option>
                      <option>Rajkot</option>
                      <option>Pune</option>
                      <option>Dholera SIR</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>Society / Locality (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Vaishno Devi Circle, Baner"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: '6px',
                    padding: '13px',
                    background: '#522AB0',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: 750,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(82, 42, 176, 0.25)',
                  }}
                >
                  <Send className="w-4 h-4" /> Submit Referral &amp; Claim Reward
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3-Step Process */}
        <div style={{ marginTop: '70px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>SIMPLE 3-STEP PROCESS</span>
          <h2 style={{ fontSize: '28px', fontWeight: 850, color: '#0F172A', margin: '8px 0 40px' }}>How Gujju Rewards Work</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#fff', padding: '30px 24px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EDE9FE', color: '#522AB0', display: 'grid', placeItems: 'center', fontWeight: 850, fontSize: '18px', marginBottom: '16px' }}>1</div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Share Link or Submit Lead</h3>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Send your unique link via WhatsApp or submit your friend's phone number directly using the form above.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '30px 24px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', color: '#D97706', display: 'grid', placeItems: 'center', fontWeight: 850, fontSize: '18px', marginBottom: '16px' }}>2</div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>We Verify the Property</h3>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Our operations team calls the owner, conducts title/ownership check, and publishes the zero-brokerage listing.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '30px 24px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', color: '#059669', display: 'grid', placeItems: 'center', fontWeight: 850, fontSize: '18px', marginBottom: '16px' }}>3</div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Get Direct Bank Transfer</h3>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                The referral bounty is credited directly to your Google Pay, PhonePe, or Bank Account within 24 hours of publishing!
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ marginTop: '70px', background: '#fff', borderRadius: '18px', padding: '40px 30px', border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 850, color: '#0F172A', marginBottom: '24px', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div>
              <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>When do I get my referral payout?</h4>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                As soon as the referred property listing is verified and activated on GujjuProperty, our system initiates the UPI transfer within 24 hours.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Is there any limit to how much I can earn?</h4>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                No limit at all! Many housing society residents and brokers refer multiple properties every month and earn upwards of ₹50,000.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Can I refer my own property?</h4>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Self-referrals are not eligible for cash bonuses, but you can list your property for 100% free with zero brokerage on our portal anytime.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>How will I know if my friend registered?</h4>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                You will receive an automated WhatsApp confirmation as soon as your referral registers and when your payout is processed.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
