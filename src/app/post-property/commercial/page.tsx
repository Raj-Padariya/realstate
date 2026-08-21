'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProperties, FullPropertyItem } from '@/shared/context/PropertyContext';
import Button from '@/shared/ui/button';
import PropertyMap from '@/components/common/PropertyMap';

const CITIES = ['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Delhi NCR', 'Ahmedabad', 'Dholera SIR', 'Surat', 'Vadodara', 'Rajkot'];

const COMMERCIAL_SUBTYPES = [
  { id: 'Office Space', label: 'Office Space', icon: '🏢', desc: 'IT Park, Corporate Office, Bare Shell' },
  { id: 'Shop & Showroom', label: 'Shop & Showroom', icon: '🏬', desc: 'Main Road Frontage, Retail Shop' },
  { id: 'Warehouse / Godown', label: 'Warehouse / Godown', icon: '🏭', desc: 'Logistics Hub, Industrial Storage' },
  { id: 'Industrial Shed / Building', label: 'Industrial Building', icon: '⚙️', desc: 'Factory, Manufacturing Plant' },
  { id: 'Coworking Space', label: 'Coworking Desk', icon: '💻', desc: 'Dedicated Desk, Private Cabin' },
];

function CommercialPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCity = searchParams?.get('city') || 'Ahmedabad';
  const initialType = searchParams?.get('type') || 'Rent';
  const initialSubtype = searchParams?.get('subtype') || 'Office Space';

  const { addProperty } = useProperties();
  const [activeStep, setActiveStep] = useState<number>(1);

  const [spaceType, setSpaceType] = useState<string>(initialSubtype);
  const [builtUpArea, setBuiltUpArea] = useState<string>('2400');
  const [floorInfo, setFloorInfo] = useState<string>('5th / 14 Floors');
  const [city, setCity] = useState<string>(initialCity);
  const [locality, setLocality] = useState<string>('SG Highway');
  const [societyName, setSocietyName] = useState<string>('Titanium Business Park');
  const [priceNum, setPriceNum] = useState<string>('75000');
  const [maintenance, setMaintenance] = useState<string>('₹5,000 / mo');
  const [furnishing, setFurnishing] = useState<string>('Fully Furnished');
  const [parking, setParking] = useState<string>('2 Reserved Parkings');
  const [ownerName, setOwnerName] = useState<string>('Rajesh Patel');
  const [ownerPhone, setOwnerPhone] = useState<string>('+91 98XXX XXXXX');
  const [description, setDescription] = useState<string>('Prime commercial office space with excellent highway visibility, glass facade, central AC, and top corporate connectivity.');

  const [createdProperty, setCreatedProperty] = useState<FullPropertyItem | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valNum = parseFloat(priceNum.replace(/,/g, '')) || 0;
    const isRent = initialType.toLowerCase().includes('rent') || initialType.toLowerCase().includes('lease');
    const formattedPrice = isRent ? `₹${valNum.toLocaleString('en-IN')}/mo` : `₹${(valNum / 100000).toFixed(2)} Lakh`;

    const titleText = `${spaceType} for ${initialType} in ${locality}, ${city}`;
    const fullAddress = `${societyName ? societyName + ', ' : ''}${locality}, ${city}`;

    const newPropPayload: Partial<FullPropertyItem> = {
      title: titleText,
      price: formattedPrice,
      pricePerSqFt: `₹${Math.round(valNum / (parseFloat(builtUpArea) || 1000))}/sq.ft`,
      address: fullAddress,
      bhk: 'Commercial',
      areaSqFt: `${builtUpArea} sq.ft`,
      floorInfo: floorInfo,
      facing: 'Main Road Facing',
      furnishing: furnishing,
      parking: parking,
      chips: ['Commercial Space', spaceType, 'Main Road Facing', '24x7 Security'],
      badgeText: 'Verified Commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      amenities: ['Power Backup', 'Lift', 'Reserved Parking', 'Security', 'Central AC', 'Fire Safety'],
      description: description || `Prime ${spaceType} in top business district of ${locality}, ${city}.`,
      ownerName: ownerName,
      ownerPhone: ownerPhone,
      ownerRole: 'Commercial Property Owner',
      listingCategory: 'Commercial',
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
                🏢 Commercial Property Listing Form
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--brand)', fontWeight: 700 }}>
                {spaceType} · {initialType} · {city}
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
              { num: 1, label: '1. Space & Type' },
              { num: 2, label: '2. Locality & Map' },
              { num: 3, label: '3. Pricing & Terms' },
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
              
              {/* STEP 1: Space & Type */}
              {activeStep === 1 && (
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: 'var(--ink)' }}>
                    Commercial Space Sub-Type & Area
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Select the exact commercial category for corporate tenants or buyers.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                    {COMMERCIAL_SUBTYPES.map((item) => {
                      const isSel = spaceType.toLowerCase().includes(item.id.toLowerCase());
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSpaceType(item.id)}
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
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Super Built-up Area (sq.ft) *</label>
                      <input
                        type="number"
                        value={builtUpArea}
                        onChange={(e) => setBuiltUpArea(e.target.value)}
                        required
                        placeholder="e.g. 2400"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Floor Info</label>
                      <input
                        type="text"
                        value={floorInfo}
                        onChange={(e) => setFloorInfo(e.target.value)}
                        placeholder="e.g. Ground / 5th Floor"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    style={{ width: '100%', padding: '14px', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}
                  >
                    Next: Locality & Map →
                  </button>
                </div>
              )}

              {/* STEP 2: Locality & Map */}
              {activeStep === 2 && (
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: 'var(--ink)' }}>
                    Commercial Hub & Location
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Locality & building complex details for max visibility.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>City *</label>
                      <select value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}>
                        {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Locality / Business District *</label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        required
                        placeholder="e.g. SG Highway, BKC, Powai"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Commercial Hub / Tower Name</label>
                    <input
                      type="text"
                      value={societyName}
                      onChange={(e) => setSocietyName(e.target.value)}
                      placeholder="e.g. Titanium Business Park, Mondeal Heights"
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <PropertyMap address={`${societyName ? societyName + ', ' : ''}${locality}, ${city}`} height="220px" showTitleBadge={true} />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="button" onClick={() => setActiveStep(1)} style={{ padding: '14px 20px', background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                      ← Back
                    </button>
                    <button type="button" onClick={() => setActiveStep(3)} style={{ flex: 1, padding: '14px', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>
                      Next: Pricing & Terms →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Pricing & Terms */}
              {activeStep === 3 && (
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: 'var(--ink)' }}>
                    Commercial Financials & Furnishing
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Set expected price / rent and commercial terms.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                        Expected {initialType.toLowerCase().includes('rent') ? 'Rent (₹ / mo)' : 'Sale Price (₹)'} *
                      </label>
                      <input
                        type="number"
                        value={priceNum}
                        onChange={(e) => setPriceNum(e.target.value)}
                        required
                        placeholder="e.g. 75000"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Maintenance</label>
                      <input
                        type="text"
                        value={maintenance}
                        onChange={(e) => setMaintenance(e.target.value)}
                        placeholder="e.g. ₹5,000 / mo"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Furnishing Status</label>
                      <select value={furnishing} onChange={(e) => setFurnishing(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}>
                        <option>Fully Furnished</option>
                        <option>Semi-furnished</option>
                        <option>Bare Shell</option>
                        <option>Warm Shell</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Parking Spaces</label>
                      <input
                        type="text"
                        value={parking}
                        onChange={(e) => setParking(e.target.value)}
                        placeholder="e.g. 2 Reserved Parkings"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Property Description</label>
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
                    Owner Contact Details & Publish
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', marginBottom: '20px' }}>
                    Clients & businesses will contact you directly. Zero brokerage.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Owner / Agent Name *</label>
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
                      🚀 Publish Commercial Listing Now
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
              🎉 Commercial Listing Published!
            </h2>
            <p style={{ color: 'var(--body)', fontSize: '15px', marginBottom: '24px' }}>
              Your listing <b>{createdProperty.title}</b> is active and immediately visible to businesses & corporate clients on the platform!
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

export default function CommercialPostFormPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>Loading commercial form...</div>}>
      <CommercialPostContent />
    </Suspense>
  );
}
