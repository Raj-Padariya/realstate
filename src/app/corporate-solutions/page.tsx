'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import {
  Home,
  FileText,
  Truck,
  Paintbrush,
  Sparkles,
  Wind,
  Building2,
  Hammer,
  ShieldCheck,
  Box,
  CheckCircle2,
  ArrowRight,
  Building
} from 'lucide-react';

export default function CorporateSolutionsPage() {
  const [activeTab, setActiveTab] = useState<'employees' | 'office'>('employees');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: 'Ahmedabad',
    employeesCount: '50-200 Employees',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitted(true);
  };

  const employeeServices = [
    { title: 'House Search', desc: 'Direct owner property listings with zero brokerage fees for employees.', icon: <Home className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80' },
    { title: 'Rental Agreement', desc: 'Doorstep legal E-Stamp agreement delivery & biometric verification.', icon: <FileText className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80' },
    { title: 'Packers & Movers', desc: 'Safe, insured relocation with dedicated vehicle & hassle-free setup.', icon: <Truck className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { title: 'Home Painting', desc: 'Professional eco-friendly painting with 1-year warranty & dust-free process.', icon: <Paintbrush className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80' },
    { title: 'Home Deep Cleaning', desc: 'Sanitized deep cleaning for move-in ready homes & apartments.', icon: <Sparkles className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80' },
    { title: 'AC Servicing & Repair', desc: 'Certified HVAC technicians for instant repair & preventive servicing.', icon: <Wind className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80' },
  ];

  const officeServices = [
    { title: 'Office Interiors & Fit-outs', desc: 'Custom workspace interior design, ergonomic furniture & acoustic setup.', icon: <Building2 className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
    { title: 'Office Renovation', desc: 'Turnkey renovation services to modernize corporate office layouts.', icon: <Hammer className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
    { title: 'Commercial Painting', desc: 'High-durability corporate wall painting with low-VOC non-toxic paints.', icon: <Paintbrush className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&w=600&q=80' },
    { title: 'Commercial Deep Cleaning', desc: 'Scheduled deep sanitation & carpet shampooing for office premises.', icon: <Sparkles className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80' },
    { title: 'Visitor Management', desc: 'Digital QR-based gate pass & visitor tracking systems for office security.', icon: <ShieldCheck className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80' },
    { title: 'Asset & Office Relocation', desc: 'End-to-end IT hardware packing, server transport & office equipment setup.', icon: <Box className="w-5 h-5 text-[#522AB0]" />, img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
  ];

  const clientLogos = [
    'TCS Corporate', 'Infosys Ltd', 'Wipro Technologies', 'Reliance Industries', 'HDFC Bank', 'Tech Mahindra', 'L&T Construction', 'Adani Group'
  ];

  return (
    <div style={{ background: '#F8F9FC', minHeight: '100vh', fontFamily: "'Open Sans', Arial, sans-serif", paddingBottom: '80px' }}>
      
      {/* HERO BANNER SECTION */}
      <section style={{ background: 'linear-gradient(135deg, #3A1C82 0%, #522AB0 60%, #41208C 100%)', color: '#fff', padding: '60px 20px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ maxWidth: '1180px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '12.5px', fontWeight: 800, padding: '5px 16px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
            <Building2 className="w-4 h-4 text-[#FEDC00]" />
            <span>GujjuProperty B2B Corporate Solutions</span>
          </div>

          <h1 style={{ fontSize: '38px', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            Comprehensive Corporate Solutions
          </h1>

          <p style={{ fontSize: '16px', color: '#d9cdf2', margin: '0 auto 32px', maxWidth: '720px', lineHeight: 1.6 }}>
            Partner with GujjuProperty to receive exclusive corporate discounts on real estate, employee relocation, doorstep rental agreements & commercial office services.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#corporate-form"
              style={{
                background: '#FEDC00',
                color: '#41208C',
                padding: '14px 28px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(254, 220, 0, 0.3)',
              }}
            >
              Sign Up For Your Company →
            </a>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '14px 28px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}
            >
              Know More
            </button>
          </div>

        </div>

        {/* TRUSTED BY CLIENTS BANNER */}
        <div style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            TRUSTED BY LEADING CORPORATES ACROSS INDIA
          </div>

          <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {clientLogos.map((client, idx) => (
              <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '6px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS SWITCHER SECTION */}
      <section className="wrap" style={{ maxWidth: '1180px', marginTop: '50px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>
            Explore Our Corporate Solutions
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--body)', margin: '0 0 24px' }}>
            Customized plans designed specifically for your employees and office workspace requirements.
          </p>

          {/* TAB TOGGLE SELECTOR */}
          <div style={{ display: 'inline-flex', gap: '8px', background: '#fff', padding: '6px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #EBE6F7' }}>
            <button
              type="button"
              onClick={() => setActiveTab('employees')}
              style={{
                padding: '12px 28px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'employees' ? '#522AB0' : 'transparent',
                color: activeTab === 'employees' ? '#fff' : 'var(--ink)',
                fontSize: '14.5px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Home className="w-4 h-4" />
              <span>For Employees</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('office')}
              style={{
                padding: '12px 28px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'office' ? '#522AB0' : 'transparent',
                color: activeTab === 'office' ? '#fff' : 'var(--ink)',
                fontSize: '14.5px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Building2 className="w-4 h-4" />
              <span>For Office Space</span>
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {(activeTab === 'employees' ? employeeServices : officeServices).map((service, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #EBE6F7', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
              <img src={service.img} alt={service.title} style={{ width: '100%', height: '170px', objectFit: 'cover' }} />

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EFE9FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {service.icon}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{service.title}</h3>
                  </div>

                  <p style={{ fontSize: '13.5px', color: 'var(--body)', lineHeight: 1.6, margin: '0 0 20px' }}>
                    {service.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: '#FAF9FD',
                    border: '1px solid #522AB0',
                    color: '#522AB0',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  Request Corporate Quote →
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{ background: '#fff', padding: '70px 20px', marginTop: '60px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ maxWidth: '1180px', textAlign: 'center' }}>
          
          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            SIMPLE 3-STEP ONBOARDING
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 40px' }}>
            How GujjuProperty Corporate Partnership Works
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            <div style={{ background: '#FAF9FD', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#522AB0', color: '#FEDC00', fontWeight: 800, fontSize: '20px', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
                1
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>Sign Up With Us</h3>
              <p style={{ fontSize: '14px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                Once onboarded, we create exclusive customized discount plans tailored specifically for your company.
              </p>
            </div>

            <div style={{ background: '#FAF9FD', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#522AB0', color: '#FEDC00', fontWeight: 800, fontSize: '20px', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
                2
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>Employees Choose Service</h3>
              <p style={{ fontSize: '14px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                Your employees easily book house hunting, rental agreement, or relocation services on web/app.
              </p>
            </div>

            <div style={{ background: '#FAF9FD', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#522AB0', color: '#FEDC00', fontWeight: 800, fontSize: '20px', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
                3
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>Unlock Savings & Support</h3>
              <p style={{ fontSize: '14px', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                Employees unlock zero brokerage perks, waived service fees & dedicated priority account managers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CORPORATE INQUIRY FORM SECTION */}
      <section id="corporate-form" className="wrap" style={{ maxWidth: '800px', marginTop: '60px' }}>
        <div style={{ background: '#fff', borderRadius: '24px', border: '2px solid #522AB0', padding: '40px', boxShadow: '0 12px 40px rgba(82,42,176,0.1)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#41208C', margin: '0 0 8px' }}>
              Loved What You Saw? Get In Touch!
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', margin: 0 }}>
              Fill out your company details below and our B2B corporate team will respond within 15 minutes.
            </p>
          </div>

          {isSubmitted ? (
            <div style={{ background: '#E6F4EA', border: '1px solid #137333', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎉</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#137333', margin: '0 0 8px' }}>
                Corporate Inquiry Received!
              </h3>
              <p style={{ fontSize: '14px', color: '#137333', margin: 0, lineHeight: 1.6 }}>
                Thank you for connecting with GujjuProperty Corporate Solutions. Our Senior B2B Account Manager will call you shortly at <strong>{formData.phone}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Your Name *</label>
                  <input
                    required
                    placeholder="e.g. Ramesh Shah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', background: '#FAF9FD' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Company Name *</label>
                  <input
                    required
                    placeholder="e.g. Infosys / TCS"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', background: '#FAF9FD' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Phone Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', background: '#FAF9FD' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Official Work Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', background: '#FAF9FD' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Primary City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', background: '#FAF9FD' }}
                  >
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Number of Employees</label>
                  <select
                    value={formData.employeesCount}
                    onChange={(e) => setFormData({ ...formData, employeesCount: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', background: '#FAF9FD' }}
                  >
                    <option value="10-50 Employees">10-50 Employees</option>
                    <option value="50-200 Employees">50-200 Employees</option>
                    <option value="200-1000 Employees">200-1000 Employees</option>
                    <option value="1000+ Employees">1000+ Employees</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  padding: '16px',
                  background: '#522AB0',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  marginTop: '10px',
                  boxShadow: '0 6px 20px rgba(82, 42, 176, 0.3)',
                }}
              >
                Connect With Us →
              </button>
            </form>
          )}

        </div>
      </section>

      {/* POPUP MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', maxWidth: '500px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: 0 }}>Corporate Consultation</h3>
              <button type="button" onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: '0 0 20px' }}>
              Submit your work details and our corporate desk will contact you within 15 minutes.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry submitted! Our representative will call you.'); setShowModal(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input required placeholder="Your Name" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }} />
              <input required placeholder="Company Name" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }} />
              <input required type="tel" placeholder="Mobile Number" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }} />
              <input required type="email" placeholder="Work Email" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }} />
              
              <button type="submit" style={{ padding: '12px', background: '#522AB0', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', marginTop: '6px' }}>
                Submit Request →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
