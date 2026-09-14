'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Car, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Compass, 
  ChevronDown, 
  Phone, 
  Building2, 
  Users,
  Award
} from 'lucide-react';

const DESTINATIONS = [
  {
    name: 'Dholera SIR Smart City',
    tag: 'High ROI Investment',
    desc: 'Guided tour of Activation Zone, TP2, TP4, Expressway, and International Airport corridor.',
    features: ['Airport Corridor plots', 'Expressway proximity', 'Clear Title NA land'],
  },
  {
    name: 'Ahmedabad & GIFT City',
    tag: 'Top Residential & Commercial',
    desc: 'Tour high-demand projects across SG Highway, Vaishnodevi Circle, Shela, and GIFT City.',
    features: ['GIFT City SEZ flats', 'SG Highway luxury homes', 'Ready-to-move options'],
  },
  {
    name: 'Surat Diamond Hub',
    tag: 'Luxury & High Growth',
    desc: 'Assisted visits across Vesu, Pal, Althan, and Surat Dream City / Khajod corridor.',
    features: ['Vesu premium 3/4 BHK', 'Dream City commercial', 'Gated township villas'],
  },
  {
    name: 'Pune IT Corridors',
    tag: 'Tech Parks & Livability',
    desc: 'Visits in Baner, Hinjewadi Phase 1-3, Wakad, Balewadi High Street, and Kharadi.',
    features: ['Hinjewadi IT rental yield', 'Baner luxury high-rises', 'RERA registered only'],
  },
];

const FAQS = [
  {
    q: 'Is the assisted site visit service completely free?',
    a: 'Yes, 100% free! For serious buyers looking to purchase residential or commercial properties or plots, GujjuProperty coordinates the vehicle and property manager visit at zero cost.'
  },
  {
    q: 'Can you arrange pick-up from the airport or railway station?',
    a: 'Absolutely. If you are an NRI or visiting from another city (e.g. Mumbai, Delhi, Bengaluru, Dubai), our driver and property advisor can pick you up directly from Ahmedabad, Surat, or Pune airport/station.'
  },
  {
    q: 'Will the property advisor force me to buy a specific project?',
    a: 'Never. GujjuProperty is an independent, non-brokerage advisory platform. Our relationship managers provide impartial comparisons of pros, cons, construction quality, water table, and title risks across multiple builders.'
  },
  {
    q: 'How many properties or projects can we visit in one day?',
    a: 'Typically, we recommend visiting 3 to 4 curated projects in a single half-day or full-day itinerary so you can compare configurations without feeling exhausted.'
  },
];

import { useLeads } from '@/shared/context/LeadsContext';

export default function SiteVisitPage() {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    targetCity: 'Dholera SIR',
    propertyType: 'Residential Plots / Land',
    budget: '₹50 Lakh - ₹1 Crore',
    visitDate: '',
    visitTime: 'Morning (10:00 AM)',
    pickupAddress: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    addLead({
      type: 'site-visit',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.targetCity,
      source: 'Assisted Site Visit Form',
      details: {
        propertyType: formData.propertyType,
        budget: formData.budget,
        visitDate: formData.visitDate,
        visitTime: formData.visitTime,
        pickupAddress: formData.pickupAddress,
      },
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
            <span style={{ color: '#0F172A', fontWeight: 700 }}>Assisted Site Visit</span>
          </div>

          <span style={{ fontSize: '12.5px', color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '4px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Car className="w-4 h-4" /> Free Doorstep Pick &amp; Drop
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)', color: '#fff', padding: '56px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', color: '#FDE047', fontSize: '12px', fontWeight: 800, padding: '5px 14px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Compass className="w-3.5 h-3.5" /> VIP Buyer Experience
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
            Book an Assisted Property Site Visit
          </h1>
          <p style={{ fontSize: '15.5px', color: '#C7D2FE', margin: '0 auto 28px', maxWidth: '680px', lineHeight: 1.6 }}>
            Explore verified apartments, villas, and Dholera investment plots in comfort. Travel in a sanitized AC vehicle accompanied by an unbiased property expert.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '13px', color: '#E0E7FF' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Free AC Cab Service
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Personal Real Estate Advisor
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Zero Pressure Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 20px' }}>
        
        {/* Popular Destination Cards */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
              Popular Site Visit Corridors
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Daily guided trips available with pickup from Ahmedabad, Vadodara, Surat, and Pune.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {DESTINATIONS.map((dest, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#522AB0', background: '#F5F3FF', padding: '3px 8px', borderRadius: '4px' }}>
                      {dest.tag}
                    </span>
                    <MapPin className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                    {dest.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: '0 0 16px', lineHeight: 1.5 }}>
                    {dest.desc}
                  </p>
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {dest.features.map((feat, fIdx) => (
                      <span key={fIdx} style={{ fontSize: '12px', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form + Experience Perks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', alignItems: 'start', marginBottom: '60px' }}>
          
          {/* Booking Form */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
              Schedule Your Free Visit
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 24px' }}>
              Fill in your preferences and we’ll reserve an AC vehicle and expert coordinator for you.
            </p>

            {isSubmitted ? (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                <CheckCircle className="w-12 h-12 text-emerald-600" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#065F46', margin: '0 0 6px' }}>
                  Site Visit Request Confirmed!
                </h4>
                <p style={{ fontSize: '13.5px', color: '#047857', margin: '0 0 16px', lineHeight: 1.5 }}>
                  We have mapped your route for <strong>{formData.targetCity}</strong> on <strong>{formData.visitDate || 'upcoming weekend'}</strong>. Your dedicated visit manager will WhatsApp the car driver details and itinerary to <strong>{formData.phone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  style={{ background: '#059669', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Book Another Destination
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
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
                      Target Destination *
                    </label>
                    <select
                      value={formData.targetCity}
                      onChange={(e) => setFormData({ ...formData, targetCity: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none', background: '#fff' }}
                    >
                      <option value="Dholera SIR">Dholera SIR Smart City</option>
                      <option value="Ahmedabad - SG Highway / GIFT City">Ahmedabad / GIFT City</option>
                      <option value="Surat - Vesu / Dream City">Surat (Vesu / Dream City)</option>
                      <option value="Pune - Baner / Hinjewadi">Pune (Baner / Hinjewadi)</option>
                      <option value="Vadodara - Vasna / Sevasi">Vadodara (Vasna / Sevasi)</option>
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
                      <option value="Residential Plots / Land">Residential Plots / Land</option>
                      <option value="2/3 BHK Apartment">2/3 BHK Apartment</option>
                      <option value="Luxury Villa / Bungalow">Luxury Villa / Bungalow</option>
                      <option value="Commercial Shop / Office">Commercial Shop / Office</option>
                      <option value="Industrial Plot / Warehouse">Industrial Plot / Warehouse</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none', background: '#fff' }}
                    >
                      <option value="Under ₹30 Lakh">Under ₹30 Lakh</option>
                      <option value="₹30 Lakh - ₹60 Lakh">₹30 Lakh - ₹60 Lakh</option>
                      <option value="₹60 Lakh - ₹1.2 Crore">₹60 Lakh - ₹1.2 Crore</option>
                      <option value="Above ₹1.2 Crore">Above ₹1.2 Crore</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                      Preferred Visit Date
                    </label>
                    <input
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                    Pick-up Address / Landmark
                  </label>
                  <input
                    type="text"
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                    placeholder="Home address, airport terminal, or railway station"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', outline: 'none' }}
                  />
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
                  {isSubmitting ? 'Confirming Visit...' : 'Reserve Free AC Cab Visit →'}
                </button>
              </form>
            )}
          </div>

          {/* Experience Perks */}
          <div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px' }}>
                The GujjuProperty Visit Experience
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#F5F3FF', color: '#522AB0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>Chauffeured Comfort</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Travel with your family in private air-conditioned comfort without navigating traffic or parking hassles.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>Unbiased Technical Advice</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Our experts highlight genuine ground realities—water supply, approach roads, upcoming metro stations, and builder reputation.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 3px' }}>NRI &amp; Out-of-State Concierge</h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                      Specialized itinerary for out-of-town investors visiting for a 1-day or weekend trip, covering multiple prime zones systematically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance Box */}
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#581C87', margin: '0 0 4px' }}>Prefer to speak before booking?</h4>
                <p style={{ fontSize: '12px', color: '#6B21A8', margin: 0 }}>Call our tour coordination desk.</p>
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
                <Phone className="w-3.5 h-3.5" /> Call Concierge
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
