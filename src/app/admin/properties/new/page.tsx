'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import ImageUploader from '@/shared/ui/image-uploader';
import {
  ArrowLeft,
  Building2,
  Home,
  KeyRound,
  Trees,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Upload,
  UserCheck
} from 'lucide-react';

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
    ownerPhone: '+971 54 246 7717',
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

    let listingCat: 'Buy' | 'Rent' | 'Commercial' | 'Plot' = 'Buy';
    if (category === 'Residential Rent') listingCat = 'Rent';
    else if (category === 'Commercial') listingCat = 'Commercial';
    else if (category === 'Land & Plot') listingCat = 'Plot';

    const created = addProperty({
      ...formData,
      listingCategory: listingCat,
      image: coverPhoto,
      photos: photos.length > 0 ? photos : [coverPhoto],
    });

    alert(`🎉 Property "${created.title}" [Category: ${category}] published live! (ID: ${created.id})`);
    router.push('/admin/properties');
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Top back navigation */}
      <div>
        <Link
          href="/admin/properties"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#522AB0', textDecoration: 'none' }}
        >
          <ArrowLeft style={{ width: '14px', height: '14px' }} /> Back to Properties Inventory
        </Link>
      </div>

      {/* Title Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E1035 0%, #2A1454 60%, #170A30 100%)',
          borderRadius: '18px',
          padding: '24px 28px',
          color: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(23, 10, 48, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px 0' }}>
          Create New Property Listing
        </h1>
        <p style={{ margin: 0, fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)' }}>
          Select listing type and fill specifications to publish instantly across GujjuProperty portal.
        </p>
      </div>

      {/* 1. Category Selector */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          1. Select Category &amp; Transaction Type
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {[
            { id: 'Residential Rent', label: 'For Rent', icon: KeyRound },
            { id: 'Residential Resale', label: 'Resale / Buy', icon: Home },
            { id: 'Commercial', label: 'Commercial Space', icon: Building2 },
            { id: 'Land & Plot', label: 'Plots & Land', icon: Trees },
          ].map((cat) => {
            const isSelected = category === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id as CategoryType)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid #522AB0' : '1px solid #CBD5E1',
                  background: isSelected ? '#EFE9FB' : '#F8FAFC',
                  color: isSelected ? '#41208C' : '#334155',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon style={{ width: '16px', height: '16px', color: isSelected ? '#522AB0' : '#64748B' }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Basic Property Details */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
            2. Basic Details ({category})
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Property Title *
              </label>
              <input
                required
                placeholder={category === 'Land & Plot' ? 'e.g. 2400 sq.ft Residential Plot in Dholera SIR' : 'e.g. 3 BHK Luxury Flat in Rohan Abhilasha'}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                {category === 'Residential Rent' ? 'Monthly Rent (₹) *' : 'Total Price (₹) *'}
              </label>
              <input
                required
                placeholder={category === 'Residential Rent' ? 'e.g. ₹28,000/mo' : 'e.g. ₹1.28 Cr'}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', fontWeight: 800, color: '#059669', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Built-up / Plot Area *
              </label>
              <input
                required
                placeholder="e.g. 1,420 sq.ft"
                value={formData.areaSqFt}
                onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                BHK Configuration
              </label>
              <select
                value={formData.bhk}
                onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#fff' }}
              >
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4+ BHK">4+ BHK / Villa</option>
                <option value="Plot / Land">Plot / Land</option>
                <option value="Shop / Showroom">Shop / Showroom</option>
                <option value="Office Space">Office Space</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Status Badge Tag
              </label>
              <select
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#fff' }}
              >
                <option value="Owner verified">Owner verified</option>
                <option value="RERA Approved">RERA Approved</option>
                <option value="Featured">Featured Listing</option>
                <option value="Zero Brokerage">Zero Brokerage</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Full Locality &amp; Address *
            </label>
            <input
              required
              placeholder="e.g. Rohan Abhilasha, Baner Road, Baner, Pune 411045"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
            />
          </div>
        </div>

        {/* Owner Contact Information */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
            3. Owner / Seller Contact Information
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Owner Full Name *
              </label>
              <input
                required
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Phone Number *
              </label>
              <input
                required
                value={formData.ownerPhone}
                onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Owner Role
              </label>
              <input
                value={formData.ownerRole}
                onChange={(e) => setFormData({ ...formData, ownerRole: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* 4. Photos */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
            4. Property Photo Gallery
          </div>

          <ImageUploader
            photos={photos}
            onPhotosChange={setPhotos}
            mainImage={mainImage}
            onMainImageChange={setMainImage}
          />
        </div>

        {/* Submit Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '18px 24px', borderRadius: '16px', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <Link
            href="/admin/properties"
            style={{ padding: '10px 20px', borderRadius: '8px', background: '#F1F5F9', color: '#334155', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            style={{
              padding: '12px 28px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 850,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(82, 42, 176, 0.3)',
            }}
          >
            🚀 Publish Property Live
          </button>
        </div>
      </form>
    </div>
  );
}
