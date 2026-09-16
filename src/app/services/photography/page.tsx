'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Camera, 
  Video, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Calendar, 
  ChevronDown, 
  Image as ImageIcon,
  Zap,
  TrendingUp,
  Eye,
  Phone
} from 'lucide-react';

const PACKAGES = [
  {
    id: 'standard',
    name: 'Standard HDR Photoshoot',
    price: '₹1,499',
    badge: 'Essential',
    features: [
      '15 High-Resolution HDR interior & exterior photos',
      'Ultra wide-angle architectural lens',
      'Professional color grading & lighting enhancement',
      'Digital delivery within 24 hours',
      'Instant upload to your GujjuProperty listing',
    ],
  },
  {
    id: 'premium',
    name: '360° Virtual Tour + HDR',
    price: '₹2,999',
    badge: 'Most Popular',
    popular: true,
    features: [
      '25 High-Resolution HDR photos (daytime & twilight)',
      '360° interactive Matterport virtual walkthrough',
      'Short 30-sec Instagram Reel / WhatsApp showcase video',
      'Featured badge on GujjuProperty search results',
      'Digital delivery within 24-36 hours',
    ],
  },
  {
    id: 'drone',
    name: 'Drone & Estate Luxe Shoot',
    price: '₹5,499',
    badge: 'Best for Plots & Villas',
    features: [
      '4K Drone aerial photography & boundary mapping',
      '35+ Master HDR photos (interior + landscape)',
      'Cinematic 60-second 4K video walkthrough with background music',
      '360° full estate virtual tour',
      'Priority listing boost on GujjuProperty',
    ],
  },
];

const FAQS = [
  {
    q: 'Why should I hire a professional photographer instead of using phone photos?',
    a: 'Listings with professional wide-angle HDR photography receive 3.8x more buyer clicks, 2.5x more inquiries, and sell or rent up to 40% faster. Good lighting and proper framing showcase true room proportions that phone cameras often distort.'
  },
  {
    q: 'How do I prepare my property before the photographer arrives?',
    a: 'Declutter rooms, ensure all lights and ambient lamps are working, open curtains to maximize natural daylight, clean kitchen counters, and keep bathroom floors dry. Our photographer will help with minor staging adjustments on site.'
  },
  {
    q: 'How soon will I receive the edited photos and tour?',
    a: 'Your fully edited, color-graded photos will be delivered via a high-resolution cloud link within 24 hours. Virtual tours and drone videos are delivered within 36 hours.'
  },
  {
    q: 'Can the photographer also shoot video walkthroughs for WhatsApp and Instagram?',
    a: 'Yes! Our Premium and Drone packages include tailored vertical short-form video reels optimized for WhatsApp status and social media marketing.'
  },
];

import { useLeads } from '@/shared/context/LeadsContext';

export default function PhotographyServicePage() {
  const { addLead } = useLeads();
  const [selectedPkg, setSelectedPkg] = useState('premium');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Ahmedabad',
    propertyType: '2/3 BHK Apartment',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    addLead({
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      type: 'photography',
      source: 'Photography & 360° Tours Page',
      details: {
        'Package': PACKAGES.find(p => p.id === selectedPkg)?.name || selectedPkg,
        'Property Type': formData.propertyType,
        'Preferred Date': formData.preferredDate || 'Not specified',
        'Preferred Time': formData.preferredTime,
      }
    });
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
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
            <span style={{ color: '#0F172A', fontWeight: 700 }}>Property Photography &amp; 360° Tours</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles className="w-4 h-4" /> 3.8x More Inquiries
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #4338CA 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', color: '#FDE047', fontSize: '12px', fontWeight: 800, padding: '5px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Camera className="w-3.5 h-3.5" /> High-End Real Estate Media
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
            Professional Property Photography &amp; 360° Virtual Tours
          </h1>
          <p style={{ fontSize: '15.5px', color: '#C7D2FE', margin: '0 auto 28px', maxWidth: '680px', lineHeight: 1.6 }}>
            First impressions happen in 3 seconds. Showcase your residential home, commercial showroom, or land plot with cinematic HDR imaging that attracts high-intent buyers.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '13px', color: '#E0E7FF' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp className="w-4 h-4 text-amber-400" /> 3.8x Higher Inquiries
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock className="w-4 h-4 text-emerald-400" /> 24-Hr Delivery
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Video className="w-4 h-4 text-purple-300" /> Drone &amp; Reels Included
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 20px' }}>
        
        {/* Packages Cards */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
              Select a Photoshoot Package
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Fixed pricing with professional equipment, lighting, and dedicated post-production editing.
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
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#522AB0', background: '#F5F3FF', padding: '3px 10px', borderRadius: '6px' }}>
                      {pkg.badge}
                    </span>

                    <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '12px 0 10px' }}>
                      {pkg.name}
                    </h3>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
                      {pkg.price}{' '}
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>/ shoot</span>
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
                    {isSelected ? '✓ Package Chosen' : 'Choose Package'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Form + Visual Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', alignItems: 'start', marginBottom: '60px' }}>
          
          {/* Booking Form */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
              Schedule Shoot Slot
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 24px' }}>
              Package: <strong style={{ color: '#522AB0' }}>{PACKAGES.find(p => p.id === selectedPkg)?.name} ({PACKAGES.find(p => p.id === selectedPkg)?.price})</strong>
            </p>

            {isSubmitted ? (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                <CheckCircle className="w-12 h-12 text-emerald-600" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#065F46', margin: '0 0 6px' }}>
                  Shoot Scheduled Successfully!
                </h4>
                <p style={{ fontSize: '13.5px', color: '#047857', margin: '0 0 16px', lineHeight: 1.5 }}>
                  Booking confirmed for <strong>{formData.city}</strong>. Our photographer will call you at <strong>{formData.phone}</strong> to confirm exact arrival timing.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  style={{ background: '#059669', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Book Another Shoot
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Property owner / agent"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) })}
                      placeholder="10-digit mobile"
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
                      <option value="Dholera">Dholera SIR</option>
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
                      <option value="2/3 BHK Apartment">2/3 BHK Apartment</option>
                      <option value="4+ BHK Penthouse / Villa">4+ BHK Penthouse / Villa</option>
                      <option value="Residential Plot / Land">Residential Plot / Land</option>
                      <option value="Commercial Office / Showroom">Commercial Office / Showroom</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Time Window
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      style={{ width: '100%', padding: '9px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none', background: '#fff' }}
                    >
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10 AM - 1 PM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1 PM - 4 PM)</option>
                      <option value="Sunset Golden Hour (4:30 PM - 6:30 PM)">Sunset Golden Hour</option>
                    </select>
                  </div>
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
                  {isSubmitting ? 'Confirming Slot...' : 'Book Photoshoot Slot →'}
                </button>
              </form>
            )}
          </div>

          {/* Key Advantages */}
          <div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px' }}>
                Why Professional Real Estate Photos Sell Faster
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>380% Higher Viewership</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Buyers scroll past dark, blurry smartphone snaps. Professionally lit wide shots stand out on portals immediately.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>Higher Price Retention</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Premium visual presentation anchors buyer perception, preventing aggressive price under-bidding and lengthy negotiations.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>NRI &amp; Outstation Appeal</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Our 360° virtual tours allow NRI investors in USA, UK, UAE to inspect room-by-room before sending their token advance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance Box */}
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#581C87', margin: '0 0 4px' }}>Need drone shoot for large plot / project?</h4>
                <p style={{ fontSize: '12px', color: '#6B21A8', margin: 0 }}>Custom developer packages available.</p>
              </div>
              <a
                href="tel:+971542467717"
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
                <Phone className="w-3.5 h-3.5" /> Call Media Desk
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
