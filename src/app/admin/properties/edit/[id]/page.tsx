'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import ImageUploader from '@/shared/ui/image-uploader';
import PropertyMap from '@/components/common/PropertyMap';

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
    ownerPhone: matched?.ownerPhone || '+91 98765 43210',
  });

  const [photos, setPhotos] = useState<string[]>(
    matched?.photos && matched.photos.length > 0
      ? matched.photos
      : [matched?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80']
  );
  const [mainImage, setMainImage] = useState<string>(matched?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80');

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

  const [saved, setSaved] = useState(false);

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
    <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link href="/admin/properties" style={{ color: 'var(--brand)', fontWeight: '700', textDecoration: 'none' }}>
          ← Back to Properties List
        </Link>
      </div>

      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: 'var(--ink)' }}>
          Edit Listing #{formData.id}
        </h1>
        <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '14px' }}>
          Update listing details, pricing, layout, and image gallery.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--brand)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
          1. Basic Details
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>Property Title</label>
            <input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>Price (₹)</label>
            <input
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>Address</label>
          <input
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px', marginBottom: '12px' }}
          />
          <PropertyMap address={formData.address || 'Ahmedabad, Gujarat'} height="200px" showTitleBadge={true} />
        </div>

        <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--brand)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginTop: '8px' }}>
          2. Specifications
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>BHK</label>
            <select
              value={formData.bhk}
              onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px', background: '#fff' }}
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
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>Built-up Area</label>
            <input
              value={formData.areaSqFt}
              onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>Verification Status</label>
            <select
              value={formData.badgeText}
              onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px', background: '#fff' }}
            >
              <option value="Owner verified">Owner verified</option>
              <option value="Title checked">Title checked</option>
              <option value="Under construction">Under construction</option>
            </select>
          </div>
        </div>

        {/* 3. INTERACTIVE PHOTO UPLOADER */}
        <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--brand)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginTop: '8px' }}>
          3. Photo Gallery (Drag &amp; Drop / Device Upload)
        </div>

        <ImageUploader
          photos={photos}
          onChange={setPhotos}
          mainImage={mainImage}
          onMainImageChange={setMainImage}
        />

        <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--brand)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginTop: '8px' }}>
          4. Owner Details &amp; Summary
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>Owner Name</label>
            <input
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>Owner Phone</label>
            <input
              value={formData.ownerPhone}
              onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '6px' }}>Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '14px', marginTop: '12px' }}>
          <button
            type="submit"
            disabled={saved}
            style={{
              background: 'var(--brand)',
              color: '#fff',
              border: 0,
              padding: '12px 32px',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            {saved ? 'Saving Changes...' : 'Save & Update Property Listing →'}
          </button>
          <Link
            href="/admin/properties"
            style={{
              background: 'var(--bg)',
              color: 'var(--body)',
              border: '1px solid var(--line)',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
