'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import ImageUploader from '@/shared/ui/image-uploader';
import PropertyMap from '@/components/common/PropertyMap';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function AdminEditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const propertyId = params?.id || 'prop-1';
  const { getPropertyById, updateProperty } = useProperties();

  const matched = getPropertyById(propertyId);

  const [formData, setFormData] = useState({
    id: propertyId,
    title: matched?.title || '3 BHK Flat in Rohan Abhilasha',
    price: matched?.price || '₹1.28 Cr',
    pricePerSqFt: matched?.pricePerSqFt || '₹9,010 / sq.ft',
    address: matched?.address || 'Baner Road, Baner, Pune 411045',
    bhk: matched?.bhk || '3 BHK',
    areaSqFt: matched?.areaSqFt || '1,420 sq.ft',
    badgeText: matched?.badgeText || 'Owner verified',
    description: matched?.description || 'Spacious verified property directly from owner.',
    ownerName: matched?.ownerName || 'Sandeep Kumar',
    ownerPhone: matched?.ownerPhone || '+971 54 246 7717',
  });

  const [photos, setPhotos] = useState<string[]>(
    matched?.photos && matched.photos.length > 0
      ? matched.photos
      : [matched?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80']
  );
  const [mainImage, setMainImage] = useState<string>(matched?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (matched) {
      setFormData({
        id: matched.id,
        title: matched.title,
        price: matched.price,
        pricePerSqFt: matched.pricePerSqFt || '',
        address: matched.address,
        bhk: matched.bhk || '3 BHK',
        areaSqFt: matched.areaSqFt || '',
        badgeText: matched.badgeText,
        description: matched.description || '',
        ownerName: matched.ownerName || '',
        ownerPhone: matched.ownerPhone || '',
      });
      if (matched.photos && matched.photos.length > 0) {
        setPhotos(matched.photos);
      } else if (matched.image) {
        setPhotos([matched.image]);
      }
      if (matched.image) {
        setMainImage(matched.image);
      }
    }
  }, [matched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);

    const cover = mainImage || photos[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';

    updateProperty(formData.id, {
      ...formData,
      image: cover,
      photos: photos.length > 0 ? photos : [cover],
    });

    setTimeout(() => {
      alert(`Property "${formData.title}" updated successfully!`);
      router.push('/admin/properties');
    }, 400);
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Top back navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          href="/admin/properties"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#522AB0', textDecoration: 'none' }}
        >
          <ArrowLeft style={{ width: '14px', height: '14px' }} /> Back to Properties Inventory
        </Link>
        <Link
          href={`/property/${formData.id}`}
          target="_blank"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700, color: '#64748B', textDecoration: 'none' }}
        >
          <ExternalLink style={{ width: '13px', height: '13px' }} /> View Public Listing Page
        </Link>
      </div>

      {/* Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: 0 }}>
            Edit Listing
          </h1>
          <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 800, padding: '3px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.15)', color: '#FEDC00' }}>
            #{formData.id}
          </span>
        </div>
        <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)' }}>
          Modify pricing, specifications, geo-coordinates, and high-resolution photo gallery.
        </p>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 1. Basic Details */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
            1. Basic Property Information
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Property Title *
              </label>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Price Tag (₹) *
              </label>
              <input
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', fontWeight: 800, color: '#059669', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Address &amp; Landmark
            </label>
            <input
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', marginBottom: '12px' }}
            />
            {/* Interactive Map Preview */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
              <PropertyMap address={formData.address || 'Ahmedabad, Gujarat'} height="180px" showTitleBadge={true} />
            </div>
          </div>
        </div>

        {/* 2. Specifications */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
            2. Specifications &amp; Verification
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>BHK Type</label>
              <select
                value={formData.bhk}
                onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#fff' }}
              >
                <option value="1 RK">1 RK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="4+ BHK">4+ BHK / Villa</option>
                <option value="Plot">Plot / Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Built-up Area</label>
              <input
                value={formData.areaSqFt}
                onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Verification Status</label>
              <select
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: '#fff' }}
              >
                <option value="Owner verified">Owner verified</option>
                <option value="Title checked">Title checked</option>
                <option value="RERA Approved">RERA Approved</option>
                <option value="Featured">Featured</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Property Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', resize: 'vertical' }}
            />
          </div>
        </div>

        {/* 3. Photo Gallery */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
            3. Photo Gallery
          </div>

          <ImageUploader
            photos={photos}
            onPhotosChange={setPhotos}
            mainImage={mainImage}
            onMainImageChange={setMainImage}
          />
        </div>

        {/* 4. Owner Details */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
            4. Owner Contact
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Owner Name</label>
              <input
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Owner Phone</label>
              <input
                value={formData.ownerPhone}
                onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '18px 24px', borderRadius: '16px', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <Link
            href="/admin/properties"
            style={{ padding: '10px 20px', borderRadius: '8px', background: '#F1F5F9', color: '#334155', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saved}
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
            <Save style={{ width: '15px', height: '15px', display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
            {saved ? 'Saving Changes...' : 'Save & Update Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
