'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProperties, FullPropertyItem } from '@/shared/context/PropertyContext';
import Button from '@/shared/ui/button';
import ImageUploader from '@/shared/ui/image-uploader';
import PropertyMap from '@/components/common/PropertyMap';

const CITIES = ['Dholera SIR', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Mumbai', 'Pune', 'Bengaluru'];

const LAND_SUBTYPES = [
  { id: 'Residential Plot (NA Approved)', label: 'Residential Plot', icon: '📐', desc: 'NA Approved, TP Scheme Plot, Gated Society' },
  { id: 'Agricultural Land', label: 'Agricultural Land', icon: '🌾', desc: 'Farmhouse, Agro Land, Irrigation Facility' },
  { id: 'Commercial Land', label: 'Commercial Land', icon: '🏗️', desc: 'Main Road Frontage, Hotel / Showroom Site' },
  { id: 'Industrial Plot', label: 'Industrial Land', icon: '🏭', desc: 'GIDC / Industrial Zone, Factory Site' },
  { id: 'Dholera SIR Investment Region', label: 'Dholera SIR Plot', icon: '🌟', desc: 'Smart City Smart Zone, High Appreciation' },
];

function LandPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCity = searchParams?.get('city') || 'Dholera SIR';
  const initialType = searchParams?.get('type') || 'Sale';
  const initialSubtype = searchParams?.get('subtype') || 'Residential Plot (NA Approved)';

  const { addProperty } = useProperties();
  const [activeStep, setActiveStep] = useState<number>(0);

  const [plotType, setPlotType] = useState<string>(initialSubtype);
  const [plotArea, setPlotArea] = useState<string>('250');
  const [areaUnit, setAreaUnit] = useState<string>('sq.yd');
  const [city, setCity] = useState<string>(initialCity);
  const [locality, setLocality] = useState<string>('Activation Area');
  const [village, setVillage] = useState<string>(searchParams?.get('village') || '');
  const [linearType, setLinearType] = useState<string>(searchParams?.get('linear') || 'Linear');
  const [zone, setZone] = useState<string>(searchParams?.get('zone') || '');
  const [tpScheme, setTpScheme] = useState<string>(searchParams?.get('tp') || '');
  const [expectedPrice, setExpectedPrice] = useState<string>('2500000');
  const [titleStatus, setTitleStatus] = useState<string>('Clear Title / NA Approved');
  const [roadWidth, setRoadWidth] = useState<string>('40 ft Wide Road');
  const [facing, setFacing] = useState<string>('East Facing');
  const [ownerName, setOwnerName] = useState<string>('Jitin Vora');
  const [ownerPhone, setOwnerPhone] = useState<string>('+91 99XXX XXXXX');
  const [description, setDescription] = useState<string>('Premium plot in prime development zone with clear title, 40 ft road touch, and immediate registry capability.');

  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
  ]);
  const [mainImage, setMainImage] = useState<string>('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80');

  const [createdProperty, setCreatedProperty] = useState<FullPropertyItem | null>(null);

  const isStepValid = (stepIdx: number = activeStep): boolean => {
    if (stepIdx === 0) return Boolean(plotType.trim() && plotArea.trim() && areaUnit.trim());
    if (stepIdx === 1) return Boolean(city.trim() && locality.trim());
    if (stepIdx === 2) return Boolean(expectedPrice.trim() && titleStatus.trim() && roadWidth.trim() && facing.trim());
    if (stepIdx === 3) return true; // Gallery optional
    if (stepIdx === 4) return Boolean(ownerName.trim() && ownerPhone.trim());
    return true;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const valNum = parseFloat(expectedPrice.replace(/,/g, '')) || 0;
    const formattedPrice = valNum >= 10000000 ? `₹${(valNum / 10000000).toFixed(2)} Cr` : `₹${(valNum / 100000).toFixed(2)} Lakh`;

    const titleText = `${plotType} for ${initialType} in ${locality}, ${city}`;
    const fullAddress = `${locality}, ${city}`;

    const newPropPayload: Partial<FullPropertyItem> = {
      title: titleText,
      price: formattedPrice,
      pricePerSqFt: `₹${Math.round(valNum / (parseFloat(plotArea) || 1))}/${areaUnit}`,
      address: fullAddress,
      bhk: 'Plot / Land',
      areaSqFt: `${plotArea} ${areaUnit}`,
      floorInfo: titleStatus,
      facing: facing,
      chips: [titleStatus, 'Road Touch', plotType],
      badgeText: 'Verified Land',
      image: mainImage || (photos[0] ?? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'),
      photos: photos,
      amenities: ['Road Touch', 'Electricity Connection', 'Water Connection', 'Boundary Wall'],
      description: description || `Premium ${plotType} with ${titleStatus} located in ${locality}, ${city}. Excellent investment opportunity.`,
      ownerName: ownerName,
      ownerPhone: ownerPhone,
      ownerRole: 'Land Owner',
      listingCategory: 'Plot',
      titleStatus: titleStatus,
      roadWidth: roadWidth,
      locality: locality,
      zone: zone,
      tpScheme: tpScheme,
      linearType: linearType,
    } as Partial<FullPropertyItem>;

    const created = addProperty(newPropPayload);
    setCreatedProperty(created);
    setActiveStep(5);
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit();
    }
  };

  const stepsList = [
    { title: 'Plot details', icon: 'M4 20V9.5l8-5.5 8 5.5V20z M9.5 20v-5.5h5V20' },
    { title: 'Locality details', icon: 'M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z' },
    { title: 'Pricing & title', icon: 'M5 21V6.5l7-3.5 7 3.5V21M9 21v-4.5h6V21M8.5 9.5h2M13.5 9.5h2M8.5 13h2M13.5 13h2' },
    { title: 'Gallery', icon: 'M3.5 7.5h4l2-3h5l2 3h4v12h-17z M12 16.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
    { title: 'Schedule', icon: 'M4.5 6.5h15v13h-15z M4.5 10.5h15M8.5 3.5v4M15.5 3.5v4M9 14.5h2M13 14.5h2' },
  ];

  const canSubmitCurrent = isStepValid();
  const progressPct: number = activeStep === 5 ? 100 : Math.round((activeStep / 5) * 100);
  const pct = progressPct;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* Top Sticky Progress Bar */}
      <div className="wizbar">
        <div className="wrap">
          <Link href="/post-property" className="wizhome" title="Back to Ad Type selection">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V9.5l8-5.5 8 5.5V20z M9.5 20v-5.5h5V20"/></svg>
          </Link>
          <div className="wiztitle">
            Post your property
            <span>{plotType} · {initialType} · {city}</span>
          </div>
          <div className="wiztrack">
            <div className="wizfill" style={{ width: `${pct}%` }} />
          </div>
          <div className="wizpct">{pct}% done</div>
          <button className="btn grey sm" type="button" onClick={() => router.push('/properties')}>
            Preview
          </button>
        </div>
      </div>

      {activeStep <= 4 && (
        <div className="wrap">
          <div className="wizgrid">

            {/* Left Nav Steps */}
            <nav className="wiznav">
              {stepsList.map((st, idx) => {
                const isDone = isStepValid(idx);
                const isOn = activeStep === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`wizstep ${isOn ? 'on' : ''} ${isDone ? 'done' : ''}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <span className="si">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={st.icon} />
                      </svg>
                    </span>
                    {st.title}
                    <span className="tick">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Main Form Center Panel */}
            <div className="wizmain">

              {/* STEP 0: Plot Details */}
              {activeStep === 0 && (
                <section className="wizpanel on">
                  <h2>Plot details</h2>

                  <div className="frow one">
                    <div className="fld2">
                      <label>Plot type <i>*</i></label>
                      <div className="chipset">
                        {LAND_SUBTYPES.map(t => (
                          <button
                            key={t.id}
                            type="button"
                            className={`chip2 ${plotType === t.id ? 'on' : ''}`}
                            onClick={() => setPlotType(t.id)}
                          >
                            <span style={{ marginRight: '6px' }}>{t.icon}</span>{t.label}
                          </button>
                        ))}
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>
                        {LAND_SUBTYPES.find(t => t.id === plotType)?.desc}
                      </p>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Plot area <i>*</i></label>
                      <div className="suffix">
                        <input className="inp" type="number" value={plotArea} onChange={(e) => setPlotArea(e.target.value)} placeholder="Plot area" />
                        <span>{areaUnit}</span>
                      </div>
                    </div>
                    <div className="fld2">
                      <label>Area unit <i>*</i></label>
                      <select className="sel" value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)}>
                        <option value="sq.ft">sq.ft</option>
                        <option value="sq.yd">sq.yd</option>
                        <option value="sq.m">sq.m</option>
                        <option value="acre">acre</option>
                        <option value="hectare">hectare</option>
                        <option value="guntha">guntha</option>
                        <option value="bigha">bigha</option>
                      </select>
                    </div>
                  </div>

                  <div className="frow" style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                      <button type="button" disabled style={{ padding: '14px 20px', background: '#f0f0f0', border: '1px solid var(--line)', borderRadius: '8px', fontWeight: 700, cursor: 'not-allowed', opacity: 0.6 }}>
                        ← Back
                      </button>
                      <button type="button" onClick={handleNext} disabled={!canSubmitCurrent} className="btn" style={{ flex: 1 }}>
                        Continue →
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 1: Locality Details */}
              {activeStep === 1 && (
                <section className="wizpanel on">
                  <h2>Locality details</h2>

                  <div className="frow">
                    <div className="fld2">
                      <label>City <i>*</i></label>
                      <select className="sel" value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Select</option>
                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="fld2">
                      <label>Locality <i>*</i></label>
                      <div className="prefix">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M12 21s7-6.1 7-11.5A7 7 0 005 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>
                        <input className="inp" type="text" value={locality} onChange={(e) => setLocality(e.target.value)} placeholder="Enter locality" />
                      </div>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Village / Town <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <input className="inp" type="text" value={village} onChange={(e) => setVillage(e.target.value)} placeholder="e.g. Bavla" />
                    </div>
                    <div className="fld2">
                      <label>Plot Layout</label>
                      <select className="sel" value={linearType} onChange={(e) => setLinearType(e.target.value)}>
                        <option value="Linear">Linear</option>
                        <option value="Non-Linear">Non-Linear</option>
                        <option value="Irregular">Irregular</option>
                      </select>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Zone <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <input className="inp" type="text" value={zone} onChange={(e) => setZone(e.target.value)} placeholder="e.g. Residential Zone" />
                    </div>
                    <div className="fld2">
                      <label>TP Scheme <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <input className="inp" type="text" value={tpScheme} onChange={(e) => setTpScheme(e.target.value)} placeholder="e.g. TP Scheme No. 5" />
                    </div>
                  </div>

                  <div className="maphead">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M12 21s7-6.1 7-11.5A7 7 0 005 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>
                    Mark plot location on map
                  </div>
                  <p className="maphint">Set property location on map pin</p>

                  <div style={{ marginTop: '12px' }}>
                    <PropertyMap
                      address={[locality, village, city].filter(Boolean).join(', ') || 'Dholera SIR, Gujarat'}
                      height="240px"
                      showTitleBadge={true}
                    />
                  </div>

                  <div className="frow" style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                      <button type="button" onClick={() => setActiveStep(0)} className="btn grey">
                        ← Back
                      </button>
                      <button type="button" onClick={handleNext} disabled={!canSubmitCurrent} className="btn" style={{ flex: 1 }}>
                        Continue →
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 2: Pricing & Title */}
              {activeStep === 2 && (
                <section className="wizpanel on">
                  <h2>Pricing &amp; title</h2>

                  <div className="frow">
                    <div className="fld2">
                      <label>Expected price <i>*</i></label>
                      <div className="suffix">
                        <input className="inp" type="number" value={expectedPrice} onChange={(e) => setExpectedPrice(e.target.value)} placeholder="Total price" />
                        <span>₹</span>
                      </div>
                    </div>
                    <div className="fld2">
                      <label>Title status <i>*</i></label>
                      <select className="sel" value={titleStatus} onChange={(e) => setTitleStatus(e.target.value)}>
                        <option>Clear Title / NA Approved</option>
                        <option>Society Transfer</option>
                        <option>Power of Attorney</option>
                        <option>Co-operative Housing</option>
                        <option>Agricultural 7/12 Clear</option>
                      </select>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Front road width <i>*</i></label>
                      <input className="inp" type="text" value={roadWidth} onChange={(e) => setRoadWidth(e.target.value)} placeholder="e.g. 40 ft Wide Road" />
                    </div>
                    <div className="fld2">
                      <label>Plot facing <i>*</i></label>
                      <select className="sel" value={facing} onChange={(e) => setFacing(e.target.value)}>
                        <option>East Facing</option>
                        <option>North Facing</option>
                        <option>North-East Facing</option>
                        <option>West Facing</option>
                        <option>South Facing</option>
                      </select>
                    </div>
                  </div>

                  <div className="frow one">
                    <div className="fld2">
                      <label>Land description <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your plot, surroundings, access, and unique features..."
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>

                  <div className="frow" style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                      <button type="button" onClick={() => setActiveStep(1)} className="btn grey">
                        ← Back
                      </button>
                      <button type="button" onClick={handleNext} disabled={!canSubmitCurrent} className="btn" style={{ flex: 1 }}>
                        Continue →
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 3: Gallery */}
              {activeStep === 3 && (
                <section className="wizpanel on">
                  <h2>Gallery</h2>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Upload up to 20 photos of your plot. The first photo will be the cover image.
                  </p>

                  <ImageUploader
                    photos={photos}
                    onChange={setPhotos}
                    mainImage={mainImage}
                    onMainImageChange={setMainImage}
                  />

                  <div className="frow" style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                      <button type="button" onClick={() => setActiveStep(2)} className="btn grey">
                        ← Back
                      </button>
                      <button type="button" onClick={handleNext} className="btn" style={{ flex: 1 }}>
                        Continue →
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 4: Schedule / Owner Contact */}
              {activeStep === 4 && (
                <section className="wizpanel on">
                  <h2>Schedule &amp; contact</h2>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Direct connection with land buyers. No broker intervention.
                  </p>

                  <div className="frow">
                    <div className="fld2">
                      <label>Land owner / Seller name <i>*</i></label>
                      <input className="inp" type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Full name" />
                    </div>
                    <div className="fld2">
                      <label>Mobile phone number <i>*</i></label>
                      <div className="prefix">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M22 16.92V21a1 1 0 0 1-1.1 1A19 19 0 0 1 2 4.1 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.27 1L7 10.5a16 16 0 0 0 6.5 6.5l1.75-1.82a1 1 0 0 1 1-.27l4 1a1 1 0 0 1 .75 1z"/></svg>
                        <input className="inp" type="tel" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>
                  </div>

                  <div className="frow" style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                      <button type="button" onClick={() => setActiveStep(3)} className="btn grey">
                        ← Back
                      </button>
                      <button type="button" onClick={handleSubmit} disabled={!canSubmitCurrent} className="btn" style={{ flex: 1, boxShadow: '0 4px 14px rgba(82,42,176,0.3)' }}>
                        🚀 Publish Land &amp; Plot Listing Now
                      </button>
                    </div>
                  </div>
                </section>
              )}

            </div>

            {/* Right Assistance Rail */}
            <aside className="wizrail">
              <div className="rcard2">
                <h4>Verified land service</h4>
                <div className="sub">Title check &amp; registry help</div>
                <div className="art">
                  <svg viewBox="0 0 240 130" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    <rect width="240" height="130" fill="#EFE9FB"/>
                    <rect x="80" y="32" width="80" height="68" rx="5" fill="#fff" stroke="#522AB0" strokeWidth="3"/>
                    <g stroke="#C9B9EE" strokeWidth="4" strokeLinecap="round"><path d="M92 48h56M92 60h56M92 72h36"/></g>
                    <circle cx="146" cy="84" r="9" fill="#FEDC00"/>
                    <g fill="#522AB0"><circle cx="42" cy="52" r="11"/><path d="M28 96c0-9 6-15 14-15s14 6 14 15z"/></g>
                    <g fill="#41208C"><circle cx="198" cy="52" r="11"/><path d="M184 96c0-9 6-15 14-15s14 6 14 15z"/></g>
                  </svg>
                </div>
                <p>Free 7/12 &amp; NA title verification. Hassle-free registry support.</p>
                <button className="btn" type="button" style={{ width: '100%', background: '#522AB0', color: '#fff' }}>Get it now</button>
              </div>

              <div className="rcard2">
                <h4>Sell plot faster</h4>
                <div className="sub">Owner plans</div>
                <div className="perks">
                  <div className="perk">
                    <span className="pi">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="10.5" width="14" height="9" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>
                    </span>
                    Privacy
                  </div>
                  <div className="perk">
                    <span className="pi">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>
                    </span>
                    Promoted
                  </div>
                  <div className="perk">
                    <span className="pi">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 1 8 8H4z"/><path d="M8.5 11h7M8.5 14.5h4"/></svg>
                    </span>
                    Social reach
                  </div>
                  <div className="perk">
                    <span className="pi">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V8M10 19V5M16 19v-7M4 19h16"/></svg>
                    </span>
                    Price advice
                  </div>
                </div>
                <button className="btn line" type="button" style={{ width: '100%', borderColor: '#522AB0', color: '#522AB0', background: '#fff' }}>See owner plans</button>
              </div>
            </aside>

          </div>
        </div>
      )}

      {/* STEP 5: Success Screen */}
      {activeStep === 5 && createdProperty && (
        <div className="wrap" style={{ maxWidth: '680px', marginTop: '40px' }}>
          <div style={{ background: '#fff', border: '2px solid var(--brand)', borderRadius: '16px', padding: '36px', textAlign: 'center', boxShadow: 'var(--sh)' }}>
            <h2 style={{ fontSize: '26px', color: 'var(--brand)', fontWeight: 800, marginBottom: '10px' }}>
              🎉 Land &amp; Plot Published!
            </h2>
            <p style={{ color: 'var(--body)', fontSize: '15px', marginBottom: '24px' }}>
              Your plot listing <b>{createdProperty.title}</b> is active and immediately visible to land buyers &amp; investors on the platform!
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button onClick={() => router.push(`/property/${createdProperty.id}`)}>👁️ View Property Page</Button>
              <Button onClick={() => router.push('/properties')}>🏢 View All Listings</Button>
              <Button onClick={() => router.push('/admin/properties')}>⚡ Admin CMS</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function LandPostFormPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>Loading land form...</div>}>
      <LandPostContent />
    </Suspense>
  );
}