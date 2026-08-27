'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import cmsDataRaw from '@/shared/data/mockCmsData.json';
import { CmsData } from '@/shared/types/cms';
import { useProperties } from '@/shared/context/PropertyContext';
import PropertyCard from '@/shared/ui/property-card';
import OffersSection from '@/shared/components/home-page/offers-section';
import ProjectsSection from '@/shared/components/home-page/projects-section';
import BlogsSection from '@/shared/components/home-page/blogs-section';
import AppDownload from '@/shared/components/home-page/app-download';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './v16.css';

const cmsData = cmsDataRaw as unknown as CmsData;

export default function HomeV16Page() {
  const router = useRouter();
  const { properties } = useProperties();

  // Search state
  const [dealTab, setDealTab] = useState<'sale' | 'rent' | 'commercial' | 'plot' | 'project'>('sale');
  const [city, setCity] = useState('pune');
  const [locQuery, setLocQuery] = useState('');
  const [budget, setBudget] = useState('any');

  // Brokerage Meter State
  const [meterLakh, setMeterLakh] = useState<number>(125);

  // States Slider Ref & Handler
  const statesSliderRef = useRef<HTMLDivElement>(null);
  const handleStatesSlide = (direction: 'left' | 'right') => {
    if (statesSliderRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      statesSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // SEO Farm Active Tab
  const [farmTab, setFarmTab] = useState<'sale' | 'rent' | 'plot' | 'comm'>('sale');

  // Helper formatting functions
  function inr(n: number) {
    const s = Math.round(n).toString();
    const last3 = s.slice(-3);
    const rest = s.slice(0, -3);
    return '₹' + (rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' : '') + last3;
  }

  function crLakh(lakh: number) {
    return lakh >= 100
      ? '₹' + (lakh / 100).toFixed(2).replace(/\.00$/, '') + ' Cr'
      : '₹' + lakh + ' L';
  }

  const brokerFee = meterLakh * 100000 * 0.02;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (dealTab) params.set('deal', dealTab);
    if (city) params.set('city', city);
    if (locQuery.trim()) params.set('q', locQuery.trim());
    if (budget && budget !== 'any') params.set('budget', budget);
    router.push(`/properties?${params.toString()}`);
  };

  const displayListings = properties && properties.length > 0 ? properties.slice(0, 6) : cmsData.featuredProperties.listings;

  const STATES = [
    ['MH', 'Maharashtra', '18,420', 'Pune · Mumbai · Thane · Nashik · Nagpur'],
    ['KA', 'Karnataka', '12,180', 'Bengaluru · Mysuru · Mangaluru · Hubballi'],
    ['TS', 'Telangana', '9,340', 'Hyderabad · Secunderabad · Warangal'],
    ['GJ', 'Gujarat', '8,920', 'Ahmedabad · Surat · Vadodara · Dholera SIR'],
    ['TN', 'Tamil Nadu', '7,610', 'Chennai · Coimbatore · Madurai · Trichy'],
    ['UP', 'Uttar Pradesh', '6,880', 'Noida · Ghaziabad · Lucknow · Kanpur'],
    ['DL', 'Delhi NCR', '6,240', 'New Delhi · Gurugram · Faridabad'],
    ['WB', 'West Bengal', '4,510', 'Kolkata · Howrah · Siliguri · Durgapur'],
    ['RJ', 'Rajasthan', '3,940', 'Jaipur · Jodhpur · Udaipur · Kota'],
    ['KL', 'Kerala', '3,320', 'Kochi · Thiruvananthapuram · Kozhikode'],
    ['MP', 'Madhya Pradesh', '3,180', 'Indore · Bhopal · Jabalpur · Gwalior'],
    ['PB', 'Punjab', '2,470', 'Ludhiana · Mohali · Amritsar · Jalandhar'],
    ['HR', 'Haryana', '2,290', 'Gurugram · Panchkula · Karnal · Hisar'],
    ['AP', 'Andhra Pradesh', '2,140', 'Visakhapatnam · Vijayawada · Guntur'],
    ['OD', 'Odisha', '1,560', 'Bhubaneswar · Cuttack · Rourkela'],
    ['BR', 'Bihar', '1,280', 'Patna · Gaya · Muzaffarpur']
  ];

  const TYPES = [
    {
      k: 'flat',
      n: '1,240 listings',
      t: 'Flats & apartments',
      d: '1, 2, 3 and 4 BHK in gated societies.',
      h: '/properties?category=apartments',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      k: 'plot',
      n: '880 listings',
      t: 'Residential plots',
      d: 'NA and NOC cleared land with title papers.',
      h: '/properties?category=plots',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    },
    {
      k: 'villa',
      n: '210 listings',
      t: 'Villas & bungalows',
      d: 'Independent homes with private outdoor space.',
      h: '/properties?category=villas',
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    },
    {
      k: 'comm',
      n: '410 listings',
      t: 'Shops & offices',
      d: 'Retail frontage and Grade A workspace.',
      h: '/properties?category=commercial',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      k: 'studio',
      n: '95 listings',
      t: '1 RK & studios',
      d: 'Compact units that rent out quickly.',
      h: '/properties?category=studio',
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    },
    {
      k: 'floor',
      n: '340 listings',
      t: 'Builder floors',
      d: 'Low-rise independent floors, whole-floor privacy.',
      h: '/properties?category=builder-floor',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const LOC = {
    sale: [
      ['Flats for sale in Baner, Pune', '/buy/flats-baner-pune'],
      ['Flats for sale in Wakad, Pune', '/buy/flats-wakad-pune'],
      ['Flats for sale in Hinjewadi, Pune', '/buy/flats-hinjewadi-pune'],
      ['Flats for sale in Kharadi, Pune', '/buy/flats-kharadi-pune'],
      ['Flats for sale in Kothrud, Pune', '/buy/flats-kothrud-pune'],
      ['Flats for sale in Andheri, Mumbai', '/buy/flats-andheri-mumbai'],
      ['Flats for sale in Thane West', '/buy/flats-thane-west'],
      ['Flats for sale in Powai, Mumbai', '/buy/flats-powai-mumbai'],
      ['Flats for sale in SG Highway, Ahmedabad', '/buy/flats-sg-highway-ahmedabad'],
      ['Flats for sale in Bopal, Ahmedabad', '/buy/flats-bopal-ahmedabad'],
      ['Flats for sale in Whitefield, Bengaluru', '/buy/flats-whitefield-bengaluru'],
      ['Flats for sale in Sarjapur Road', '/buy/flats-sarjapur-road-bengaluru'],
      ['Flats for sale in Gachibowli, Hyderabad', '/buy/flats-gachibowli-hyderabad'],
      ['Flats for sale in Kondapur, Hyderabad', '/buy/flats-kondapur-hyderabad'],
      ['Flats for sale in Sector 150, Noida', '/buy/flats-sector-150-noida'],
      ['Flats for sale in New Town, Kolkata', '/buy/flats-new-town-kolkata']
    ],
    rent: [
      ['Flats for rent in Hinjewadi, Pune', '/rent/flats-hinjewadi-pune'],
      ['Flats for rent in Baner, Pune', '/rent/flats-baner-pune'],
      ['Flats for rent in Wakad, Pune', '/rent/flats-wakad-pune'],
      ['Flats for rent in Viman Nagar, Pune', '/rent/flats-viman-nagar-pune'],
      ['1 BHK for rent in Kothrud, Pune', '/rent/1bhk-kothrud-pune'],
      ['Flats for rent in Andheri East, Mumbai', '/rent/flats-andheri-east-mumbai'],
      ['Flats for rent in Malad, Mumbai', '/rent/flats-malad-mumbai'],
      ['Flats for rent in Satellite, Ahmedabad', '/rent/flats-satellite-ahmedabad'],
      ['Flats for rent in Vastrapur, Ahmedabad', '/rent/flats-vastrapur-ahmedabad'],
      ['Flats for rent in Marathahalli, Bengaluru', '/rent/flats-marathahalli-bengaluru'],
      ['Flats for rent in HSR Layout, Bengaluru', '/rent/flats-hsr-layout-bengaluru'],
      ['Flats for rent in Madhapur, Hyderabad', '/rent/flats-madhapur-hyderabad'],
      ['Bachelor-friendly flats in Pune', '/rent/bachelor-flats-pune'],
      ['Fully furnished flats in Bengaluru', '/rent/furnished-flats-bengaluru'],
      ['Family flats for rent in Ahmedabad', '/rent/family-flats-ahmedabad'],
      ['Flats for rent in Sector 62, Noida', '/rent/flats-sector-62-noida']
    ],
    plot: [
      ['Residential plots in Dholera SIR', '/buy/plots-dholera-sir'],
      ['NA plots near Dholera expressway', '/buy/na-plots-dholera-expressway'],
      ['Plots in Sanand, Ahmedabad', '/buy/plots-sanand-ahmedabad'],
      ['Plots in Sus Gaon, Pune', '/buy/plots-sus-gaon-pune'],
      ['Plots in Wagholi, Pune', '/buy/plots-wagholi-pune'],
      ['Farmland near Nashik', '/buy/farmland-nashik'],
      ['Plots in Devanahalli, Bengaluru', '/buy/plots-devanahalli-bengaluru'],
      ['Plots in Shadnagar, Hyderabad', '/buy/plots-shadnagar-hyderabad'],
      ['Plots in Kharghar, Navi Mumbai', '/buy/plots-kharghar-navi-mumbai'],
      ['Plots in Jagatpura, Jaipur', '/buy/plots-jagatpura-jaipur'],
      ['Plots in Kelambakkam, Chennai', '/buy/plots-kelambakkam-chennai'],
      ['Plots in Yamuna Expressway', '/buy/plots-yamuna-expressway'],
      ['Corner plots under ₹25 lakh', '/buy/plots-under-25-lakh'],
      ['Gated-community plots in Gujarat', '/buy/gated-plots-gujarat'],
      ['Industrial land in Sanand GIDC', '/buy/industrial-land-sanand'],
      ['Title-checked plots in Pune', '/buy/title-checked-plots-pune']
    ],
    comm: [
      ['Shops for sale in Baner, Pune', '/commercial/shops-baner-pune'],
      ['Office space for rent in Kharadi', '/commercial/offices-kharadi-pune'],
      ['Showrooms on SG Highway, Ahmedabad', '/commercial/showrooms-sg-highway'],
      ['Office space in GIFT City', '/commercial/offices-gift-city'],
      ['Coworking desks in Hinjewadi', '/commercial/coworking-hinjewadi-pune'],
      ['Shops for rent in Prahlad Nagar', '/commercial/shops-prahlad-nagar'],
      ['Warehouses near Bhiwandi, Mumbai', '/commercial/warehouse-bhiwandi'],
      ['Office space in BKC, Mumbai', '/commercial/offices-bkc-mumbai'],
      ['Retail space in Koramangala', '/commercial/retail-koramangala-bengaluru'],
      ['Office space in HITEC City', '/commercial/offices-hitec-city-hyderabad'],
      ['Shops for sale in Surat', '/commercial/shops-surat'],
      ['Godowns near Sanand GIDC', '/commercial/godown-sanand'],
      ['Clinics and medical space in Pune', '/commercial/medical-space-pune'],
      ['Restaurant space in Viman Nagar', '/commercial/restaurant-space-viman-nagar'],
      ['Grade A offices in Noida', '/commercial/grade-a-offices-noida'],
      ['Shops for rent in New Town, Kolkata', '/commercial/shops-new-town-kolkata']
    ]
  };

  return (
    <div className="v16-root">
      {/* SVG icon sprite */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <g id="i-shield"><path d="M12 3l7 3v5c0 4.4-2.9 8.3-7 9.5C7.9 19.3 5 15.4 5 11V6l7-3z" /><path d="M9 12l2 2 4-4" /></g>
          <g id="i-rupee"><path d="M7 5h10M7 9h10M16 5c0 3-2.2 4.6-5.4 4.6H7l7.5 8.4" /></g>
          <g id="i-doc"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></g>
          <g id="i-key"><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8M17 6l2 2M15 8l2 2" /></g>
          <g id="i-check"><path d="M20 6L9 17l-5-5" /></g>
          <g id="i-search"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4.3-4.3" /></g>
          <g id="i-truck"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7" /><circle cx="5.5" cy="18.5" r="2" /><circle cx="17.5" cy="18.5" r="2" /></g>
          <g id="i-bank"><path d="M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M2 21h20M12 2l9 5H3z" /></g>
          <g id="i-user"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></g>
          <g id="i-cam"><path d="M14.5 4h-5L8 6H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-4l-1.5-2z" /><circle cx="12" cy="13" r="3.5" /></g>
          <g id="i-map"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></g>
        </defs>
      </svg>

      {/* Top Banner indicating preview version */}
      <div style={{ background: '#FEDC00', color: '#1A0B3B', padding: '10px 20px', textAlign: 'center', fontSize: '13.5px', fontWeight: 800 }}>
        ⚡ Home Page (v16 Integrated Live Version) · Real Data &amp; Sections Sandbox · <Link href="/" style={{ textDecoration: 'underline', marginLeft: '6px' }}>Go to Main Home Page (v1)</Link>
      </div>

      {/* HERO SECTION */}
      <section className="v16-hero">
        <div className="v16-wrap">
          <div>
            <div className="v16-hero-tag"><span>NEW</span> Dholera SIR plots now listed</div>
            <h1 className="v16-h1">Buy, rent or sell property <span className="v16-hl">without a broker</span> in between.</h1>
            <p className="v16-hero-sub">Every listing comes from a verified owner with clear title papers. You call them, you visit, you decide. Nobody takes a cut.</p>

            {/* Search Panel */}
            <div className="v16-sp">
              <div className="v16-sp-tabs" role="tablist">
                <button className={`v16-sp-tab ${dealTab === 'sale' ? 'active' : ''}`} type="button" onClick={() => setDealTab('sale')}>Buy</button>
                <button className={`v16-sp-tab ${dealTab === 'rent' ? 'active' : ''}`} type="button" onClick={() => setDealTab('rent')}>Rent</button>
                <button className={`v16-sp-tab ${dealTab === 'commercial' ? 'active' : ''}`} type="button" onClick={() => setDealTab('commercial')}>Commercial</button>
                <button className={`v16-sp-tab ${dealTab === 'plot' ? 'active' : ''}`} type="button" onClick={() => setDealTab('plot')}>Plots &amp; land</button>
                <button className={`v16-sp-tab ${dealTab === 'project' ? 'active' : ''}`} type="button" onClick={() => setDealTab('project')}>New projects</button>
              </div>

              <form onSubmit={handleSearch} className="v16-sp-body">
                <div className="v16-fld">
                  <label htmlFor="fCity">City</label>
                  <select id="fCity" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="pune">Pune</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="bengaluru">Bengaluru</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="delhi-ncr">Delhi NCR</option>
                    <option value="surat">Surat</option>
                    <option value="dholera-sir">Dholera SIR</option>
                  </select>
                </div>

                <div className="v16-fld">
                  <label htmlFor="fLoc">Locality or project</label>
                  <input
                    id="fLoc"
                    type="text"
                    placeholder="e.g. Baner, Kharadi, Rohan Abhilasha"
                    value={locQuery}
                    onChange={(e) => setLocQuery(e.target.value)}
                  />
                </div>

                <div className="v16-fld">
                  <label htmlFor="fBud">Budget</label>
                  <select id="fBud" value={budget} onChange={(e) => setBudget(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="under-50-lakh">Up to ₹50 L</option>
                    <option value="50-lakh-1-crore">₹50 L – ₹1 Cr</option>
                    <option value="1-2-crore">₹1 Cr – ₹2 Cr</option>
                    <option value="above-2-crore">Above ₹2 Cr</option>
                  </select>
                </div>

                <button className="v16-btn v16-btn-p" type="submit">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><use href="#i-search" /></svg>
                  Search
                </button>
              </form>
            </div>

            {/* Popular City Chips */}
            <div className="v16-chips">
              <b>Popular</b>
              <Link className="v16-chip" href="/properties?city=pune&q=Baner">Baner, Pune</Link>
              <Link className="v16-chip" href="/properties?city=pune&q=Kharadi">Kharadi</Link>
              <Link className="v16-chip" href="/properties?city=ahmedabad&q=SG+Highway">SG Highway</Link>
              <Link className="v16-chip" href="/dholera-sir">Dholera SIR</Link>
              <Link className="v16-chip" href="/properties?city=ahmedabad&q=GIFT+City">GIFT City</Link>
              <Link className="v16-chip" href="/properties?deal=rent&city=pune&q=Hinjewadi">Rent in Hinjewadi</Link>
            </div>
          </div>

          {/* SIGNATURE: Brokerage Meter */}
          <aside className="v16-meter">
            <div className="v16-meter-k">Brokerage meter</div>
            <h3>What a broker would cost you</h3>
            <p className="v16-meter-note">Drag to your budget. Standard agent commission in India is 2% of the deal value, from both sides.</p>

            <div className="v16-meter-val">
              <span>Property value</span>
              <b>{crLakh(meterLakh)}</b>
            </div>

            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={meterLakh}
              onChange={(e) => setMeterLakh(Number(e.target.value))}
              aria-label="Property value in lakh rupees"
            />

            <div className="v16-meter-rows">
              <div className="v16-meter-row">
                <span>Through an agent (2%)</span>
                <b>{inr(brokerFee)}</b>
              </div>
              <div className="v16-meter-row v16-meter-row--us">
                <span>Through GujjuProperty</span>
                <b>₹0</b>
              </div>
            </div>

            <div className="v16-meter-save">
              You keep <b>{inr(brokerFee)}</b> in your own pocket
            </div>
            <p className="v16-meter-fine">Owner listings are free to post and free to contact.</p>
          </aside>
        </div>
      </section>

      {/* EXCLUSIVE OFFERS SECTION (From Current App) */}
      <OffersSection />

      {/* TRUST STRIP */}
      <section className="v16-trust">
        <div className="v16-wrap v16-trust-grid">
          <div className="v16-trust-i">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-user" /></svg>
            <div><b>Owners only</b><p>Every listing is posted by the person who owns it. No agent reposts.</p></div>
          </div>
          <div className="v16-trust-i">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-rupee" /></svg>
            <div><b>No commission</b><p>Nothing to us at any stage — not on a rental, not on a sale.</p></div>
          </div>
          <div className="v16-trust-i">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-shield" /></svg>
            <div><b>Title checked</b><p>7/12 extract and encumbrance certificate read by a registered advocate.</p></div>
          </div>
          <div className="v16-trust-i">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-key" /></svg>
            <div><b>Ready to move</b><p>Filter for possession-ready homes and skip the construction wait.</p></div>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="v16-sec">
        <div className="v16-wrap">
          <div className="v16-sec-head v16-sec-head--row">
            <div>
              <span className="v16-eyebrow">Browse by type</span>
              <h2>Flats, plots, villas and workspaces</h2>
              <p>Verified owner listings sorted by what you are actually looking for.</p>
            </div>
            <Link className="v16-seeall" href="/properties">See all listings →</Link>
          </div>

          <div className="v16-types">
            {TYPES.map((t, idx) => (
              <Link key={idx} className="v16-type" href={t.h}>
                <div
                  className="v16-type-art"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '165px',
                    overflow: 'hidden',
                    background: '#f3f4f6',
                  }}
                >
                  <img
                    src={t.img}
                    alt={t.t}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      position: 'absolute',
                      inset: 0,
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(6px)',
                      color: '#41208C',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.t}
                  </span>
                </div>
                <div className="v16-type-ct">
                  <div className="v16-type-n">{t.n}</div>
                  <h3>{t.t}</h3>
                  <p>{t.d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATES SLIDER SECTION */}
      <section className="v16-sec v16-sec--tint" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="v16-wrap">
          <div className="v16-sec-head v16-sec-head--row">
            <div>
              <span className="v16-eyebrow">Where we operate</span>
              <h2>Live listings across 28 states</h2>
              <p>Strongest coverage in the IT corridors and the emerging smart-city belts.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link className="v16-seeall" href="/properties">View every state →</Link>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleStatesSlide('left')}
                  aria-label="Previous States"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#fff',
                    border: '1.5px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--ink)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--pp)';
                    e.currentTarget.style.color = 'var(--pp)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--line)';
                    e.currentTarget.style.color = 'var(--ink)';
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStatesSlide('right')}
                  aria-label="Next States"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#fff',
                    border: '1.5px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--ink)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--pp)';
                    e.currentTarget.style.color = 'var(--pp)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--line)';
                    e.currentTarget.style.color = 'var(--ink)';
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Smooth Scroll Carousel */}
          <div
            ref={statesSliderRef}
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              paddingBottom: '8px',
              scrollBehavior: 'smooth',
            }}
          >
            {STATES.map((s, idx) => (
              <Link
                key={idx}
                className="v16-state"
                href={`/properties?state=${s[1].toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  flex: '0 0 280px',
                  minWidth: '280px',
                  scrollSnapAlign: 'start',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <span className="v16-state-ab">{s[0]}</span>
                <span>
                  <b>{s[1]}</b>
                  <em>{s[2]} listings</em>
                  <p>{s[3]}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES (With Real Dynamic Data & 16:10 standard cards) */}
      <section className="v16-sec" id="listings">
        <div className="v16-wrap">
          <div className="v16-sec-head v16-sec-head--row">
            <div>
              <span className="v16-eyebrow">Handpicked Owner Properties</span>
              <h2>Featured Properties from Real Owners</h2>
              <p>Verified title papers, instant direct owner contact, and zero brokerage commission.</p>
            </div>
            <Link className="v16-seeall" href="/properties">View all {properties?.length || 248} listings →</Link>
          </div>

          <div className="v16-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {displayListings.map((listing) => (
              <PropertyCard
                key={listing.id}
                listing={listing}
                ownerListedText="Owner Verified · ₹0 Brokerage"
                ctaText="Get Owner Details"
              />
            ))}
          </div>
        </div>
      </section>

      {/* OWNER BAND (Purple Accent) */}
      <section className="v16-band">
        <div className="v16-wrap">
          <div>
            <h2>Renting it out or selling it?</h2>
            <p>Put it up in about four minutes. Buyers and tenants call you directly — we never hand your number to an agent.</p>
            <ul className="v16-ticks">
              <li><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><use href="#i-check" /></svg> Calls come from people who actually want the property</li>
              <li><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><use href="#i-check" /></svg> No listing fee, no success fee, no renewal fee</li>
              <li><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><use href="#i-check" /></svg> Upload your papers once and carry a verified badge</li>
              <li><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><use href="#i-check" /></svg> Every enquiry lands on WhatsApp the moment it comes in</li>
            </ul>
            <div className="v16-band-cta">
              <Link className="v16-btn v16-btn-y" href="/post-property">Post your property free</Link>
              <Link className="v16-btn v16-btn-w" href="/tenant-plans?tab=owner">Compare owner plans</Link>
            </div>
          </div>
          <div className="v16-stats">
            <div className="v16-stat"><b>3,140</b><span>Owners listed this month</span></div>
            <div className="v16-stat"><b>48 hrs</b><span>Median time to first genuine enquiry</span></div>
            <div className="v16-stat"><b>₹0</b><span>Charged to owners, ever</span></div>
            <div className="v16-stat"><b>4.8 / 5</b><span>From 12,400 owner reviews</span></div>
          </div>
        </div>
      </section>

      {/* SERVICES / ADD-ONS (Clean White) */}
      <section className="v16-sec">
        <div className="v16-wrap">
          <div className="v16-sec-head v16-sec-head--row">
            <div>
              <span className="v16-eyebrow">Optional add-ons</span>
              <h2>The paperwork nobody enjoys</h2>
              <p>Use them if you want them. Skip them and the listing still costs you nothing.</p>
            </div>
            <Link className="v16-seeall" href="/services">All services →</Link>
          </div>

          <div className="v16-svcs">
            <Link className="v16-svc" href="/rent-agreement">
              <div className="v16-svc-ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-doc" /></svg></div>
              <h3>Rent agreement</h3>
              <p>E-stamped draft, biometric verification at your door, done inside 24 hours.</p>
            </Link>
            <Link className="v16-svc" href="/services/title-check">
              <div className="v16-svc-ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-shield" /></svg></div>
              <h3>Title &amp; 7/12 check</h3>
              <p>An advocate reads the ownership chain and EC before you pay any token.</p>
            </Link>
            <Link className="v16-svc" href="/services/home-loan">
              <div className="v16-svc-ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-bank" /></svg></div>
              <h3>Home loan</h3>
              <p>Pre-approval from SBI, HDFC, ICICI and Axis without running between branches.</p>
            </Link>
            <Link className="v16-svc" href="/services/packers-movers">
              <div className="v16-svc-ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-truck" /></svg></div>
              <h3>Packers &amp; movers</h3>
              <p>Vetted crews with a damage guarantee, quoted before the truck arrives.</p>
            </Link>
            <Link className="v16-svc" href="/services/tenant-verification">
              <div className="v16-svc-ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-user" /></svg></div>
              <h3>Tenant verification</h3>
              <p>Police-format check plus employment confirmation before you hand over keys.</p>
            </Link>
            <Link className="v16-svc" href="/services/photography">
              <div className="v16-svc-ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-cam" /></svg></div>
              <h3>Listing photos</h3>
              <p>A photographer visits and shoots the place properly. Listings with photos move faster.</p>
            </Link>
            <Link className="v16-svc" href="/rent-receipts">
              <div className="v16-svc-ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-rupee" /></svg></div>
              <h3>Rent receipts</h3>
              <p>Generate a year of HRA-ready receipts with revenue stamps for your filing.</p>
            </Link>
            <Link className="v16-svc" href="/services/site-visit">
              <div className="v16-svc-ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><use href="#i-map" /></svg></div>
              <h3>Site visit booking</h3>
              <p>Pick a slot that suits you and the owner. Useful for out-of-city and NRI buyers.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* TOP RERA REGISTERED DEVELOPMENTS (Dark Luxury Glassmorphism Carousel) */}
      <ProjectsSection data={cmsData.projectsSection} />

      {/* HOW IT WORKS (Soft Tint 3 Steps) */}
      <section className="v16-sec v16-sec--tint">
        <div className="v16-wrap">
          <div className="v16-sec-head">
            <span className="v16-eyebrow">Three steps, no middleman</span>
            <h2>How a deal actually closes here</h2>
          </div>
          <div className="v16-steps">
            <div className="v16-step">
              <div className="v16-step-n">1</div>
              <h3>Filter down to a shortlist</h3>
              <p>Narrow by locality, BHK, budget and possession status until you have five or six worth your Saturday.</p>
              <span className="v16-step-tag">Owner-posted only</span>
            </div>
            <div className="v16-step">
              <div className="v16-step-n">2</div>
              <h3>Call the owner yourself</h3>
              <p>Numbers are unlocked directly. Fix the visit at a time that works for both of you, without a third person setting the agenda.</p>
              <span className="v16-step-tag">No agent in the loop</span>
            </div>
            <div className="v16-step">
              <div className="v16-step-n">3</div>
              <h3>Verify papers, then pay</h3>
              <p>Get the title read by an advocate before any token money moves. Then negotiate straight with the owner.</p>
              <span className="v16-step-tag">Advocate-checked</span>
            </div>
          </div>
        </div>
      </section>

      {/* DHOLERA SIR (Smart City Dark Accent) */}
      <section className="v16-dh">
        <div className="v16-wrap">
          <div>
            <span className="v16-dh-k">Dholera SIR</span>
            <h2>India's first greenfield smart city, plot by plot</h2>
            <p>NA and NOC cleared plots inside the activation zone, with the semiconductor fab, the expressway and the international airport all under construction around them.</p>
            <div className="v16-dh-facts">
              <div className="v16-dh-fact"><b>₹11 L</b><span>Entry plot price</span></div>
              <div className="v16-dh-fact"><b>920 sq.km</b><span>Planned region</span></div>
              <div className="v16-dh-fact"><b>NA + NOC</b><span>Title status on every listing</span></div>
            </div>
            <div className="v16-band-cta">
              <Link className="v16-btn v16-btn-y" href="/dholera-sir">Read the Dholera guide</Link>
              <Link className="v16-btn v16-btn-w" href="/contact?subject=Dholera+SIR+Visit">Book a site visit</Link>
            </div>
          </div>
          <div className="v16-dh-art">
            <svg viewBox="0 0 420 300" role="img" aria-label="Dholera SIR activation-zone site plan">
              <rect width="420" height="300" fill="#4a2699" />
              <path d="M0 96 L420 60" stroke="#FEDC00" strokeWidth="5" opacity=".85" />
              <path d="M0 112 L420 76" stroke="#6b45c9" strokeWidth="12" />
              <path d="M0 96 L420 60" stroke="#FEDC00" strokeWidth="2" strokeDasharray="10 12" />
              {[0, 1, 2, 3].map((r) =>
                [0, 1, 2, 3, 4].map((c) => {
                  const x = 26 + c * 76;
                  const y = 140 + r * 36;
                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={x}
                      y={y}
                      width="62"
                      height="26"
                      rx="3"
                      fill={(r + c) % 4 === 0 ? '#FEDC00' : '#5E33C4'}
                      opacity={(r + c) % 4 === 0 ? '.9' : '.72'}
                    />
                  );
                })
              )}
              <rect x="26" y="126" width="366" height="2" fill="#8f74e0" />
              <text x="26" y="46" fill="#FEDC00" fontFamily="Open Sans,sans-serif" fontSize="13" fontWeight="700">EXPRESSWAY</text>
              <text x="26" y="290" fill="#cfc2ee" fontFamily="Open Sans,sans-serif" fontSize="12">TP 2 · Activation area · illustrative layout</text>
            </svg>
          </div>
        </div>
      </section>

      {/* REAL ESTATE BLOGS & GUIDES (From Current App) */}
      <BlogsSection />

      {/* MOBILE APP DOWNLOAD SECTION (From Current App) */}
      <AppDownload data={cmsData.appDownload} />

      {/* SEO LINK FARM */}
      <section className="v16-farm">
        <div className="v16-wrap">
          <div className="v16-farm-tabs" role="tablist">
            <button className={`v16-farm-tab ${farmTab === 'sale' ? 'active' : ''}`} type="button" onClick={() => setFarmTab('sale')}>Flats for sale</button>
            <button className={`v16-farm-tab ${farmTab === 'rent' ? 'active' : ''}`} type="button" onClick={() => setFarmTab('rent')}>Flats for rent</button>
            <button className={`v16-farm-tab ${farmTab === 'plot' ? 'active' : ''}`} type="button" onClick={() => setFarmTab('plot')}>Plots &amp; land</button>
            <button className={`v16-farm-tab ${farmTab === 'comm' ? 'active' : ''}`} type="button" onClick={() => setFarmTab('comm')}>Commercial</button>
          </div>

          <div className="v16-farm-links">
            {LOC[farmTab].map((l, idx) => (
              <Link key={idx} href={l[1]}>{l[0]}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
