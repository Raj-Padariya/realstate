'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProperties, FullPropertyItem } from '@/shared/context/PropertyContext';
import Button from '@/shared/ui/button';
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
  const [activeStep, setActiveStep] = useState<number>(1);

  const [plotType, setPlotType] = useState<string>(initialSubtype);
  const [plotArea, setPlotArea] = useState<string>('250');
  const [areaUnit, setAreaUnit] = useState<string>('sq.yd');
  const [city, setCity] = useState<string>(initialCity);
  const [locality, setLocality] = useState<string>('Activation Area');
  const [expectedPrice, setExpectedPrice] = useState<string>('2500000'); // 25 Lakhs
  const [titleStatus, setTitleStatus] = useState<string>('Clear Title / NA Approved');
  const [roadWidth, setRoadWidth] = useState<string>('40 ft Wide Road');
  const [facing, setFacing] = useState<string>('East Facing');
  const [ownerName, setOwnerName] = useState<string>('Jitin Vora');
  const [ownerPhone, setOwnerPhone] = useState<string>('+91 99XXX XXXXX');
  const [description, setDescription] = useState<string>('Premium plot in prime development zone with clear title, 40 ft road touch, and immediate registry capability.');

  const [createdProperty, setCreatedProperty] = useState<FullPropertyItem | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      amenities: ['Road Touch', 'Electricity Connection', 'Water Connection', 'Boundary Wall'],
      description: description || `Premium ${plotType} with ${titleStatus} located in ${locality}, ${city}. Excellent investment opportunity.`,
      ownerName: ownerName,
      ownerPhone: ownerPhone,
      ownerRole: 'Land Owner',
      listingCategory: 'Plot',
    };

    const created = addProperty(newPropPayload);
    setCreatedProperty(created);
    setActiveStep(5);
  };

  return (
    <div style={{ background: '#f6f7f9', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Header Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--line)', padding: '14px 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/post-property" style={{ background: 'var(--bg)', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 700 }}>
              ← Change Ad Type
            </Link>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                📐 Land & Plot Property Post Form
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--brand)', fontWeight: 700 }}>
                {plotType} · {initialType} · {city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {activeStep <= 4 && (
        <div className="wrap" style={{ maxWidth: '820px', marginTop: '24px' }}>
          
          {/* Step Indicators */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
            {[
              { num: 1, label: '1. Plot Category' },
              { num: 2, label: '2. Location & Map' },
              { num: 3, label: '3. Pricing & Title' },
              { num: 4, label: '4. Owner Contact' },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(s.num)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: activeStep === s.num ? '2px solid var(--brand)' : '1px solid var(--line)',
                  background: activeStep === s.num ? 'var(--brand)' : '#fff',
                  color: activeStep === s.num ? '#fff' : 'var(--body)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--sh)' }}>
              
              {/* STEP 1: Plot Category */}
              {activeStep === 1 && (
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: 'var(--ink)' }}>
                    Land & Plot Sub-Category & Area
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Select the land type and plot dimension parameters.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                    {LAND_SUBTYPES.map((item) => {
                      const isSel = plotType.toLowerCase().includes(item.id.toLowerCase());
                      return (
                        <div
                          key={item.id}
                          onClick={() => setPlotType(item.id)}
                          style={{
                            border: isSel ? '2px solid var(--brand)' : '1.5px solid var(--line)',
                            background: isSel ? 'var(--brand-lt)' : '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ fontSize: '24px', marginBottom: '6px' }}>{item.icon}</div>
                          <div style={{ fontWeight: 800, fontSize: '15px', color: isSel ? 'var(--brand)' : 'var(--ink)' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                            {item.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Plot Area *</label>
                      <input
                        type="number"
                        value={plotArea}
                        onChange={(e) => setPlotArea(e.target.value)}
                        required
                        placeholder="e.g. 250"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Area Unit *</label>
                      <select value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}>
                        <option value="sq.yd">sq.yd (Gaj)</option>
                        <option value="sq.ft">sq.ft</option>
                        <option value="Bigha">Bigha</option>
                        <option value="Acre">Acre</option>
                        <option value="Guntha">Guntha</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    style={{ width: '100%', padding: '14px', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}
                  >
                    Next: Location & Map →
                  </button>
                </div>
              )}

              {/* STEP 2: Location & Map */}
              {activeStep === 2 && (
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: 'var(--ink)' }}>
                    Land Location & Interactive Map
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Pinpoint your plot location for investors and buyers.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>City / Region *</label>
                      <select value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}>
                        {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Locality / Village / Zone *</label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        required
                        placeholder="e.g. Activation Area, Dholera / SG Highway"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <PropertyMap address={`${locality ? locality + ', ' : ''}${city}`} height="220px" showTitleBadge={true} />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="button" onClick={() => setActiveStep(1)} style={{ padding: '14px 20px', background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                      ← Back
                    </button>
                    <button type="button" onClick={() => setActiveStep(3)} style={{ flex: 1, padding: '14px', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>
                      Next: Pricing & Title →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Pricing & Title */}
              {activeStep === 3 && (
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: 'var(--ink)' }}>
                    Plot Pricing & Legal Approvals
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Title status, road connectivity, and expected pricing.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Expected Price (Total ₹) *</label>
                      <input
                        type="number"
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(e.target.value)}
                        required
                        placeholder="e.g. 2500000"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Title Approval Status</label>
                      <select value={titleStatus} onChange={(e) => setTitleStatus(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}>
                        <option>Clear Title / NA Approved</option>
                        <option>NA NOC Under Process</option>
                        <option>Freehold Plot</option>
                        <option>Agricultural 7/12 Clear</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Front Road Width</label>
                      <input
                        type="text"
                        value={roadWidth}
                        onChange={(e) => setRoadWidth(e.target.value)}
                        placeholder="e.g. 40 ft Wide Road"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Plot Facing</label>
                      <select value={facing} onChange={(e) => setFacing(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}>
                        <option>East Facing</option>
                        <option>North Facing</option>
                        <option>North-East Facing</option>
                        <option>West Facing</option>
                        <option>South Facing</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Land Description</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="button" onClick={() => setActiveStep(2)} style={{ padding: '14px 20px', background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                      ← Back
                    </button>
                    <button type="button" onClick={() => setActiveStep(4)} style={{ flex: 1, padding: '14px', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>
                      Next: Owner Contact →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Owner Contact */}
              {activeStep === 4 && (
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: 'var(--ink)' }}>
                    Land Owner Contact & Publish
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Direct connection with land buyers. No broker intervention.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Land Owner / Seller Name *</label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Mobile Phone Number *</label>
                      <input
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="button" onClick={() => setActiveStep(3)} style={{ padding: '14px 20px', background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                      ← Back
                    </button>
                    <button
                      type="submit"
                      style={{ flex: 1, padding: '14px', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(82,42,176,0.3)' }}
                    >
                      🚀 Publish Land & Plot Listing Now
                    </button>
                  </div>
                </div>
              )}

            </div>
          </form>
        </div>
      )}

      {/* STEP 5: Success Screen */}
      {activeStep === 5 && createdProperty && (
        <div className="wrap" style={{ maxWidth: '680px', marginTop: '40px' }}>
          <div style={{ background: '#fff', border: '2px solid var(--brand)', borderRadius: '16px', padding: '36px', textAlign: 'center', boxShadow: 'var(--sh)' }}>
            <h2 style={{ fontSize: '26px', color: 'var(--brand)', fontWeight: 800, marginBottom: '10px' }}>
              🎉 Land & Plot Published!
            </h2>
            <p style={{ color: 'var(--body)', fontSize: '15px', marginBottom: '24px' }}>
              Your plot listing <b>{createdProperty.title}</b> is active and immediately visible to land buyers & investors on the platform!
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
