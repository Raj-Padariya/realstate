'use client';

import React, { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProperties, FullPropertyItem } from '@/shared/context/PropertyContext';
import Button from '@/shared/ui/button';
import PropertyMap from '@/components/common/PropertyMap';

const CITIES = ['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Delhi NCR', 'Ahmedabad', 'Dholera SIR', 'Surat', 'Vadodara', 'Rajkot'];

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
];

const RENT_AMENITIES = [
  'Lift', 'Power backup', 'Covered parking', 'Gated security', '24×7 water', 
  'Clubhouse', 'Gym', 'Swimming Pool', 'Park', 'Intercom', 'Gas pipeline', 'Fire safety'
];

function RentalPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCity = searchParams?.get('city') || 'Pune';
  const initialType = searchParams?.get('type') || 'Rent';

  const { addProperty } = useProperties();

  // Active step index: 0, 1, 2, 3, 4, 5, 6
  const [activeStep, setActiveStep] = useState<number>(0);

  // Form Fields - Step 0 (Required: aptType, bhk, floor, totalFloors, propertyAge, builtUpArea)
  const [aptType, setAptType] = useState<string>('');
  const [bhk, setBhk] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [totalFloors, setTotalFloors] = useState<string>('');
  const [propertyAge, setPropertyAge] = useState<string>('');
  const [facing, setFacing] = useState<string>(''); // Optional
  const [bathrooms, setBathrooms] = useState<string>('2 Bathrooms');
  const [balconies, setBalconies] = useState<string>('2 Balconies');
  const [builtUpArea, setBuiltUpArea] = useState<string>('');
  const [carpetArea, setCarpetArea] = useState<string>(''); // Optional

  // Locality - Step 1 (Required: city, locality, landmark)
  const [city, setCity] = useState<string>(initialCity);
  const [locality, setLocality] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [societyName, setSocietyName] = useState<string>(''); // Optional

  // Rental - Step 2 (Required: expectedRent, deposit, availableFrom)
  const [expectedRent, setExpectedRent] = useState<string>('');
  const [deposit, setDeposit] = useState<string>('');
  const [maintenance, setMaintenance] = useState<string>('Included in rent'); // Optional
  const [availableFrom, setAvailableFrom] = useState<string>('');
  const [preferredTenants, setPreferredTenants] = useState<string>(''); // Optional
  const [furnishing, setFurnishing] = useState<string>(''); // Optional
  const [parking, setParking] = useState<string>(''); // Optional
  const [description, setDescription] = useState<string>(''); // Optional

  // Schedule - Step 5 (Optional)
  const [availability, setAvailability] = useState<string>('Everyday');
  const [startTime, setStartTime] = useState<string>('10:00');
  const [endTime, setEndTime] = useState<string>('19:00');

  // Amenities - Step 3 (Optional)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Lift', 'Power backup', 'Covered parking', 'Gated security'
  ]);

  // Photos & Owner - Step 4 (Required: ownerName, ownerPhone)
  const [photos, setPhotos] = useState<string[]>(SAMPLE_PHOTOS);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerPhone, setOwnerPhone] = useState<string>('');

  // Success result
  const [createdProperty, setCreatedProperty] = useState<FullPropertyItem | null>(null);

  // Check required fields per step
  const isStepValid = (stepIdx: number = activeStep): boolean => {
    if (stepIdx === 0) {
      return Boolean(aptType.trim() && bhk.trim() && floor.trim() && totalFloors.trim() && propertyAge.trim() && builtUpArea.trim());
    }
    if (stepIdx === 1) {
      return Boolean(city.trim() && locality.trim() && landmark.trim());
    }
    if (stepIdx === 2) {
      return Boolean(expectedRent.trim() && deposit.trim() && availableFrom.trim());
    }
    if (stepIdx === 3) {
      return true; // Amenities optional
    }
    if (stepIdx === 4) {
      return Boolean(ownerName.trim() && ownerPhone.trim());
    }
    if (stepIdx === 5) {
      return true; // Schedule optional
    }
    return true;
  };

  const handleFilesSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  const removePhoto = (indexToRemove: number) => {
    setPhotos(photos.filter((_, idx) => idx !== indexToRemove));
  };

  const stepsList = [
    { title: 'Property details', icon: 'M4 20V9.5l8-5.5 8 5.5V20z M9.5 20v-5.5h5V20' },
    { title: 'Locality details', icon: 'M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z' },
    { title: 'Rental details', icon: 'M5 21V6.5l7-3.5 7 3.5V21M9 21v-4.5h6V21M8.5 9.5h2M13.5 9.5h2M8.5 13h2M13.5 13h2' },
    { title: 'Amenities', icon: 'M3.5 20.5V11a8.5 8.5 0 0 1 17 0v9.5z M3.5 15.5h17M8.5 11v9.5M15.5 11v9.5' },
    { title: 'Gallery', icon: 'M3.5 7.5h4l2-3h5l2 3h4v12h-17z M12 16.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
    { title: 'Schedule', icon: 'M4.5 6.5h15v13h-15z M4.5 10.5h15M8.5 3.5v4M15.5 3.5v4M9 14.5h2M13 14.5h2' },
  ];

  const toggleAmenity = (name: string) => {
    if (selectedAmenities.includes(name)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== name));
    } else {
      setSelectedAmenities([...selectedAmenities, name]);
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const rentVal = parseFloat(expectedRent.replace(/,/g, '')) || 25000;
    const titleText = `${bhk || '3 BHK'} ${aptType || 'Apartment'} for Rent in ${locality || 'Baner'}, ${city}`;
    const fullAddress = `${societyName ? societyName + ', ' : ''}${locality || 'Baner'}, ${city}`;

    const newPropPayload: Partial<FullPropertyItem> = {
      listingCategory: 'Rent',
      title: titleText,
      price: `₹${rentVal.toLocaleString('en-IN')}/mo`,
      pricePerSqFt: maintenance,
      address: fullAddress,
      bhk: bhk || '3 BHK',
      areaSqFt: `${builtUpArea || 1200} sq.ft`,
      floorInfo: `Floor ${floor || '4'} of ${totalFloors || '11'}`,
      facing: facing || 'East',
      chips: [furnishing || 'Semi furnished', `Available ${availableFrom || 'Immediate'}`, parking || 'Covered'],
      badgeText: 'For Rent (Owner Verified)',
      image: photos[0] || SAMPLE_PHOTOS[0],
      photos: photos,
      amenities: selectedAmenities,
      carpetArea: `${carpetArea || 950} sq.ft`,
      bathrooms: bathrooms || '2 Bathrooms',
      balconies: balconies || '2 Balconies',
      possessionStatus: `Available ${availableFrom || 'Immediate'}`,
      parking: parking || 'Car',
      age: propertyAge || '1-3 years',
      description: description || 'Corner flat, excellent ventilation and covered parking.',
      ownerName: ownerName || 'Property Owner',
      ownerPhone: ownerPhone || '9876543210',
      ownerRole: 'Individual Owner',
    };

    const created = addProperty(newPropPayload);
    setCreatedProperty(created);
    setActiveStep(6);
  };

  const canSubmitCurrent = isStepValid();
  const progressPct: number = activeStep === 6 ? 100 : Math.round((activeStep / 6) * 100);
  const pct = progressPct;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* Hidden File Input for Native Pick */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        multiple 
        accept="image/*" 
        onChange={(e) => handleFilesSelect(e.target.files)} 
      />

      {/* Top Sticky Progress Bar */}
      <div className="wizbar">
        <div className="wrap">
          <Link href="/post-property" className="wizhome" title="Back to Ad Type selection">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V9.5l8-5.5 8 5.5V20z M9.5 20v-5.5h5V20"/></svg>
          </Link>
          <div className="wiztitle">
            Post your property
            <span>{bhk || '3 BHK'} · {initialType} · {city}</span>
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

      {activeStep <= 5 && (
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

              {/* STEP 0: Property Details */}
              {activeStep === 0 && (
                <section className="wizpanel on">
                  <h2>Property details</h2>
                  <div className="frow">
                    <div className="fld2">
                      <label>Apartment type <i>*</i></label>
                      <select className="sel" value={aptType} onChange={(e) => setAptType(e.target.value)}>
                        <option value="">Select</option>
                        <option>Apartment</option><option>Independent house</option><option>Villa</option><option>Builder floor</option>
                      </select>
                    </div>
                    <div className="fld2">
                      <label>BHK type <i>*</i></label>
                      <select className="sel" value={bhk} onChange={(e) => setBhk(e.target.value)}>
                        <option value="">Select</option>
                        <option>1 RK</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option><option>4+ BHK</option>
                      </select>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Floor <i>*</i></label>
                      <select className="sel" value={floor} onChange={(e) => setFloor(e.target.value)}>
                        <option value="">Select</option>
                        <option>Ground</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7+</option>
                      </select>
                    </div>
                    <div className="fld2">
                      <label>Total floors <i>*</i></label>
                      <select className="sel" value={totalFloors} onChange={(e) => setTotalFloors(e.target.value)}>
                        <option value="">Select</option>
                        <option>1</option><option>2</option><option>4</option><option>7</option><option>11</option><option>14</option><option>20+</option>
                      </select>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Property age <i>*</i></label>
                      <select className="sel" value={propertyAge} onChange={(e) => setPropertyAge(e.target.value)}>
                        <option value="">Select</option>
                        <option>Under construction</option><option>Less than a year</option><option>1-3 years</option><option>3-5 years</option><option>5-10 years</option><option>10+ years</option>
                      </select>
                    </div>
                    <div className="fld2">
                      <label>Facing <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <select className="sel" value={facing} onChange={(e) => setFacing(e.target.value)}>
                        <option value="">Select</option>
                        <option>East</option><option>West</option><option>North</option><option>South</option><option>North-East</option><option>North-West</option><option>South-East</option><option>South-West</option>
                      </select>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Bathrooms <i>*</i></label>
                      <select className="sel" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                        <option value="1 Bathroom">1 Bathroom</option>
                        <option value="2 Bathrooms">2 Bathrooms</option>
                        <option value="3 Bathrooms">3 Bathrooms</option>
                        <option value="4+ Bathrooms">4+ Bathrooms</option>
                      </select>
                    </div>
                    <div className="fld2">
                      <label>Balconies <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <select className="sel" value={balconies} onChange={(e) => setBalconies(e.target.value)}>
                        <option value="No Balcony">No Balcony</option>
                        <option value="1 Balcony">1 Balcony</option>
                        <option value="2 Balconies">2 Balconies</option>
                        <option value="3+ Balconies">3+ Balconies</option>
                      </select>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Built-up area <i>*</i></label>
                      <div className="suffix">
                        <input className="inp" type="number" value={builtUpArea} onChange={(e) => setBuiltUpArea(e.target.value)} placeholder="Built-up area" />
                        <span>sq.ft</span>
                      </div>
                    </div>
                    <div className="fld2">
                      <label>Carpet area <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <div className="suffix">
                        <input className="inp" type="number" value={carpetArea} onChange={(e) => setCarpetArea(e.target.value)} placeholder="Carpet area" />
                        <span>sq.ft</span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 1: Locality details */}
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
                        <input className="inp" type="text" value={locality} onChange={(e) => setLocality(e.target.value)} placeholder="Enter locality or society name" />
                      </div>
                    </div>
                  </div>

                  <div className="frow one">
                    <div className="fld2">
                      <label>Landmark / Street <i>*</i></label>
                      <input className="inp" type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="e.g. Baner Road, opposite Balewadi High Street" />
                    </div>
                  </div>

                  <div className="maphead">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M12 21s7-6.1 7-11.5A7 7 0 005 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>
                    Mark locality on map
                  </div>
                  <p className="maphint">Set property location on map pin</p>
                  
                  <div style={{ marginTop: '12px' }}>
                    <PropertyMap
                      address={[societyName, locality, city].filter(Boolean).join(', ') || 'Pune, Maharashtra'}
                      height="240px"
                      showTitleBadge={true}
                    />
                  </div>

                  <div className="frow one" style={{ marginTop: '18px' }}>
                    <div className="fld2">
                      <label>Project or society <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <input className="inp" type="text" value={societyName} onChange={(e) => setSocietyName(e.target.value)} placeholder="e.g. Rohan Abhilasha" />
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 2: Rental details */}
              {activeStep === 2 && (
                <section className="wizpanel on">
                  <h2>Rental details</h2>
                  <div className="frow">
                    <div className="fld2">
                      <label>Expected rent <i>*</i></label>
                      <div className="suffix">
                        <input className="inp" type="number" value={expectedRent} onChange={(e) => setExpectedRent(e.target.value)} placeholder="Monthly rent" />
                        <span>₹ / mo</span>
                      </div>
                    </div>
                    <div className="fld2">
                      <label>Deposit <i>*</i></label>
                      <div className="suffix">
                        <input className="inp" type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} placeholder="Security deposit" />
                        <span>₹</span>
                      </div>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Monthly maintenance <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <select className="sel" value={maintenance} onChange={(e) => setMaintenance(e.target.value)}>
                        <option value="">Select</option>
                        <option>Included in rent</option><option>Extra</option>
                      </select>
                    </div>
                    <div className="fld2">
                      <label>Available from <i>*</i></label>
                      <input className="inp" type="date" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
                    </div>
                  </div>

                  <div className="frow one">
                    <div className="fld2">
                      <label>Preferred tenants <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <div className="chipset">
                        {['Anyone', 'Family', 'Bachelor female', 'Bachelor male', 'Company'].map(t => (
                          <button key={t} type="button" className={`chip2 ${preferredTenants === t ? 'on' : ''}`} onClick={() => setPreferredTenants(t)}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="frow one">
                    <div className="fld2">
                      <label>Furnishing <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <div className="chipset">
                        {['Fully furnished', 'Semi furnished', 'Unfurnished'].map(f => (
                          <button key={f} type="button" className={`chip2 ${furnishing === f ? 'on' : ''}`} onClick={() => setFurnishing(f)}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="frow one">
                    <div className="fld2">
                      <label>Parking <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <div className="chipset">
                        {['No parking', 'Bike', 'Car', 'Bike + car'].map(p => (
                          <button key={p} type="button" className={`chip2 ${parking === p ? 'on' : ''}`} onClick={() => setParking(p)}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="frow one">
                    <div className="fld2">
                      <label>Anything a tenant should know <span style={{ textTransform: 'none', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></label>
                      <textarea className="inp" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Corner flat, no common wall, covered parking included…" />
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 3: Amenities */}
              {activeStep === 3 && (
                <section className="wizpanel on">
                  <h2>Amenities & features <span style={{ textTransform: 'none', fontSize: '13px', fontWeight: 600, color: 'var(--muted)' }}>(optional)</span></h2>
                  <div className="amgrid2">
                    {RENT_AMENITIES.map(a => {
                      const isSelected = selectedAmenities.includes(a);
                      return (
                        <label key={a} className="amchk">
                          <input type="checkbox" checked={isSelected} onChange={() => toggleAmenity(a)} />
                          {a}
                        </label>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* STEP 4: Gallery */}
              {activeStep === 4 && (
                <section className="wizpanel on">
                  <div className="galhead">
                    <h2 style={{ border: 0, margin: 0, padding: 0 }}>Upload photos &amp; videos</h2>
                    <button 
                      className="btn" 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      style={{ background: '#522ab0', color: '#fff', padding: '10px 18px', borderRadius: '8px' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, marginRight: 6 }}>
                        <path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 14v4.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V14" />
                      </svg>
                      Upload photos / File select
                    </button>
                  </div>

                  {/* Dropzone Card for Photos */}
                  <div 
                    className="galcard" 
                    style={{ 
                      marginTop: '16px',
                      border: isDragging ? '2px dashed #522ab0' : '1px solid var(--line)',
                      background: isDragging ? '#efe9fb' : 'var(--bg)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 36, height: 36, margin: '0 auto 12px', display: 'block' }}>
                      <rect x="3" y="6" width="18" height="14" rx="2" /><path d="M8 6l1.6-2.4A1.5 1.5 0 0 1 10.9 3h2.2a1.5 1.5 0 0 1 1.3.7L16 6" /><circle cx="12" cy="13" r="3.4" />
                    </svg>
                    <b>{isDragging ? '📁 Drop your photos here!' : 'Add photos or Drag & Drop here'}</b>
                    <span>Tenants are far more likely to enquire on listings with clear photos</span>
                    <button 
                      className="btn" 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      style={{ background: '#522ab0', color: '#fff', padding: '10px 24px', borderRadius: '8px', marginTop: '10px' }}
                    >
                      📁 Browse files & Upload
                    </button>
                  </div>

                  {/* Uploaded Photos Grid Preview */}
                  {photos.length > 0 && (
                    <div style={{ marginTop: '22px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: 'var(--ink)' }}>
                        📸 Uploaded Photos ({photos.length})
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                        {photos.map((p, i) => (
                          <div key={i} style={{ position: 'relative', borderRadius: '9px', overflow: 'hidden', border: '1.5px solid var(--line)', aspectRatio: '4/3', background: '#f5f5f5' }}>
                            <img src={p} alt={`Uploaded ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button 
                              type="button" 
                              onClick={(e) => { e.stopPropagation(); removePhoto(i); }} 
                              title="Remove photo"
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: 'rgba(214,59,59,0.9)',
                                color: '#fff',
                                border: 0,
                                fontSize: '12px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'grid',
                                placeItems: 'center'
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            border: '2px dashed #522ab0',
                            borderRadius: '9px',
                            aspectRatio: '4/3',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            background: '#efe9fb',
                            color: '#522ab0',
                            fontSize: '12px',
                            fontWeight: 700
                          }}
                        >
                          <span style={{ fontSize: '22px', lineHeight: 1 }}>+</span>
                          <span>Add More</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="galor"><b>OR</b>WE CAN UPLOAD ON YOUR BEHALF</div>
                  <p className="galhint">We can upload photos on your behalf</p>
                  
                  <div className="galcontact">
                    <div className="cc2">
                      <span className="ci wa">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l1.3-3.9A8 8 0 1 1 8.6 19z" /></svg>
                      </span>
                      <div>
                        <small>WhatsApp us on</small>
                        <strong>+91 98XXX XXXXX</strong>
                      </div>
                    </div>
                    <div className="cc2">
                      <span className="ci em">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                      </span>
                      <div>
                        <small>Email to</small>
                        <strong>photos@gujjuproperty.com</strong>
                      </div>
                    </div>
                  </div>

                  <div className="galcard">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32, margin: '0 auto 12px', display: 'block' }}>
                      <rect x="3" y="6" width="14" height="12" rx="2" /><path d="M17 10.5l4-2.3v7.6l-4-2.3" />
                    </svg>
                    <b>Add videos to get 5x more responses</b>
                    <span>A short walkthrough answers most questions before the first call</span>
                    <button className="btn" type="button" onClick={() => fileInputRef.current?.click()} style={{ background: '#522ab0', color: '#fff', padding: '10px 24px', borderRadius: '8px' }}>Add videos</button>
                  </div>

                  <div className="shots" style={{ marginTop: '22px', marginBottom: '28px' }}>
                    <div className="shot">Living room</div>
                    <div className="shot">Bedroom</div>
                    <div className="shot">Kitchen</div>
                    <div className="shot">Balcony</div>
                  </div>

                  <div className="frow" style={{ borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
                    <div className="fld2">
                      <label>Owner Full Name <i>*</i></label>
                      <input className="inp" type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Full Name" />
                    </div>
                    <div className="fld2">
                      <label>Mobile Number <i>*</i></label>
                      <input className="inp" type="tel" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="Mobile Number" />
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 5: Schedule */}
              {activeStep === 5 && (
                <section className="wizpanel on">
                  <h2>Make house visits hassle-free — share your availability</h2>
                  <div className="frow one">
                    <div className="fld2">
                      <label>Availability</label>
                      <div className="chipset single">
                        {['Everyday', 'Weekday', 'Weekend'].map(av => (
                          <button key={av} type="button" className={`availchip ${availability === av ? 'on' : ''}`} onClick={() => setAvailability(av)}>
                            <b>{av}</b>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="frow">
                    <div className="fld2">
                      <label>Start time</label>
                      <input className="inp" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className="fld2">
                      <label>End time</label>
                      <input className="inp" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                  </div>
                </section>
              )}

              {/* Bottom Wizard Footer Bar matching Screenshot */}
              <div className="wizfoot">
                <div className="wrap" style={{ padding: 0 }}>
                  <span className="left" style={{ color: canSubmitCurrent ? 'var(--green)' : 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {canSubmitCurrent ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M20 6L9 17l-5-5"/></svg>
                        Saved automatically. Ready to continue.
                      </>
                    ) : (
                      <>
                        <span style={{ color: '#D63B3B', fontWeight: 700 }}>⚠️ Please fill all required fields (*) to enable Save & continue</span>
                      </>
                    )}
                  </span>
                  <span className="acts">
                    {activeStep > 0 && (
                      <button type="button" className="btn line" onClick={() => setActiveStep(activeStep - 1)}>
                        Back
                      </button>
                    )}
                    <button 
                      type="button" 
                      className="btn" 
                      disabled={!canSubmitCurrent}
                      onClick={handleNext}
                      style={{
                        opacity: canSubmitCurrent ? 1 : 0.4,
                        cursor: canSubmitCurrent ? 'pointer' : 'not-allowed',
                        background: canSubmitCurrent ? 'var(--brand)' : '#a58ae0'
                      }}
                    >
                      {activeStep === 5 ? '🚀 Publish Property' : 'Save & continue'}
                    </button>
                  </span>
                </div>
              </div>

            </div>

            {/* Right Assistance Rail matching Screenshot */}
            <aside className="wizrail">
              <div className="rcard2">
                <h4>Rent agreement</h4>
                <div className="sub">E-stamped, delivered home</div>
                <div className="art">
                  <svg viewBox="0 0 240 130" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    <rect width="240" height="130" fill="#EFE9FB"/>
                    <rect x="86" y="34" width="68" height="62" rx="5" fill="#fff" stroke="#522AB0" strokeWidth="3"/>
                    <g stroke="#C9B9EE" strokeWidth="4" strokeLinecap="round"><path d="M98 50h44M98 62h44M98 74h28"/></g>
                    <circle cx="140" cy="86" r="9" fill="#FEDC00"/>
                    <g fill="#522AB0"><circle cx="46" cy="52" r="11"/><path d="M32 96c0-9 6-15 14-15s14 6 14 15z"/></g>
                    <g fill="#41208C"><circle cx="194" cy="52" r="11"/><path d="M180 96c0-9 6-15 14-15s14 6 14 15z"/></g>
                  </svg>
                </div>
                <p>No visit to the sub-registrar office. Signed and delivered in 48 hours.</p>
                <button className="btn" type="button" style={{ width: '100%', background: '#522AB0', color: '#fff' }}>Get it now</button>
              </div>

              <div className="rcard2">
                <h4>Find tenants faster</h4>
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

      {/* SUCCESS STEP 6 */}
      {activeStep === 6 && createdProperty && (
        <div className="wrap" style={{ maxWidth: '680px', marginTop: '40px' }}>
          <div style={{ background: '#fff', border: '2px solid var(--brand)', borderRadius: '16px', padding: '36px', textAlign: 'center', boxShadow: 'var(--sh)' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--brand)', fontWeight: 800, marginBottom: '8px' }}>
              🎉 Rental Property Published Live!
            </h2>
            <p style={{ color: 'var(--body)', marginBottom: '20px' }}>
              Your property <b>{createdProperty.title}</b> is active and immediately visible to tenants on GujjuProperty!
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
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

export default function RentalPostFormPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>Loading rental form...</div>}>
      <RentalPostContent />
    </Suspense>
  );
}
