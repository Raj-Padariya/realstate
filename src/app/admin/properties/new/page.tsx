'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import ImageUploader from '@/shared/ui/image-uploader';

type CategoryType = 'Residential Rent' | 'Residential Resale' | 'Commercial' | 'Land & Plot';

export default function AdminNewPropertyPage() {
  const router = useRouter();
  const { addProperty } = useProperties();

  const [category, setCategory] = useState<CategoryType>('Residential Rent');

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    pricePerSqFt: '₹8,500 / sq.ft',
    address: '',
    bhk: '3 BHK',
    areaSqFt: '',
    carpetArea: '',
    floorInfo: '5th / 10',
    facing: 'East',
    furnishing: 'Semi-furnished',
    age: '1-3 Years',
    possessionStatus: 'Ready to Move',
    parking: '1 Covered Parking',
    balconies: '2 Balconies',
    bathrooms: '2 Bathrooms',
    badgeText: 'Owner verified',
    description: 'Spacious verified property directly from title owner without any brokerage fees.',
    ownerName: 'Sandeep Kumar',
    ownerPhone: '+91 98XXX XXXXX',
    ownerRole: 'Individual Owner',
  });

  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  ]);
  const [mainImage, setMainImage] = useState<string>('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const coverPhoto = mainImage || photos[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';

    const created = addProperty({
      ...formData,
      image: coverPhoto,
      photos: photos.length > 0 ? photos : [coverPhoto],
    });

    alert(`🎉 Property "${created.title}" [Category: ${category}] published live! (ID: ${created.id})`);
    router.push('/admin/properties');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link href="/admin/properties" style={{ color: '#522AB0', fontWeight: '700', textDecoration: 'none' }}>
          ← Back to Properties List
        </Link>
      </div>

      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>Add New Property Listing</h1>
        <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '14px' }}>
          Select category and enter property details to instantly publish it live across the portal.
        </p>
      </div>

      {/* Category Selector Tabs */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ fontSize: '13px', fontWeight: 800, color: '#41208C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          1. Select Property Category
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {(['Residential Rent', 'Residential Resale', 'Commercial', 'Land & Plot'] as CategoryType[]).map((cat) => {
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid #522AB0' : '1px solid var(--line)',
                  background: isSelected ? '#EFE9FB' : '#fff',
                  color: isSelected ? '#41208C' : 'var(--ink)',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat === 'Residential Rent' && '🏠 Rent'}
                {cat === 'Residential Resale' && '🏡 Resale'}
                {cat === 'Commercial' && '🏬 Commercial'}
                {cat === 'Land & Plot' && '📐 Land/Plot'}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        {/* 2. BASIC INFORMATION */}
        <div style={{ fontWeight: '800', fontSize: '15px', color: '#522AB0', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
          2. Basic Property Details [{category}]
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Property Title *</label>
            <input
              required
              placeholder={category === 'Land & Plot' ? 'e.g. 2400 sq.ft Residential Plot in Dholera SIR' : 'e.g. 3 BHK Flat in Rohan Abhilasha'}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>
              {category === 'Residential Rent' ? 'Monthly Rent (₹) *' : 'Total Price (₹) *'}
            </label>
            <input
              required
              placeholder={category === 'Residential Rent' ? 'e.g. ₹28,000/mo' : 'e.g. ₹1.28 Cr'}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Built-up / Plot Area *</label>
            <input
              required
              placeholder="e.g. 1,420 sq.ft"
              value={formData.areaSqFt}
              onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>BHK Config / Type</label>
            <select
              value={formData.bhk}
              onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            >
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4+ BHK">4+ BHK</option>
              <option value="Plot / Land">Plot / Land</option>
              <option value="Shop / Showroom">Shop / Showroom</option>
              <option value="Office Space">Office Space</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Status Badge Tag</label>
            <select
              value={formData.badgeText}
              onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            >
              <option value="Owner verified">Owner verified</option>
              <option value="RERA Approved">RERA Approved</option>
              <option value="Featured">Featured Listing</option>
              <option value="Zero Brokerage">Zero Brokerage</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Full Address / Locality *</label>
          <input
            required
            placeholder="e.g. Rohan Abhilasha, Baner Road, Baner, Pune"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
          />
        </div>

        {/* 3. OWNER / CONTACT INFO */}
        <div style={{ fontWeight: '800', fontSize: '15px', color: '#522AB0', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginTop: '10px' }}>
          3. Owner / Seller Contact Information
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Owner Name *</label>
            <input
              required
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Phone Number *</label>
            <input
              required
              value={formData.ownerPhone}
              onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Owner Role</label>
            <input
              value={formData.ownerRole}
              onChange={(e) => setFormData({ ...formData, ownerRole: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
        </div>

        {/* 4. PHOTOS */}
        <div style={{ fontWeight: '800', fontSize: '15px', color: '#522AB0', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginTop: '10px' }}>
          4. Property Photos
        </div>

        <ImageUploader
          photos={photos}
          onPhotosChange={setPhotos}
          mainImage={mainImage}
          onMainImageChange={setMainImage}
        />

        <button
          type="submit"
          style={{
            padding: '14px',
            background: '#522AB0',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(82, 42, 176, 0.3)',
            marginTop: '10px',
          }}
        >
          🚀 Publish Property Live across GujjuProperty
        </button>
      </form>
    </div>
  );
}
