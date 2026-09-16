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
    ownerPhone: matched?.ownerPhone || '+91 98765 43210',
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Properties Inventory
        </Link>
        <Link
          href={`/property/${formData.id}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
        >
          <ExternalLink className="w-3.5 h-3.5" /> View Public Page
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Edit Listing
            </h1>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              #{formData.id}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Modify pricing, specifications, geo-coordinates, and high-resolution photo gallery.
          </p>
        </div>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Basic Details */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            1. Basic Property Information
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Property Title *
              </label>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Price Tag (₹) *
              </label>
              <input
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Address &amp; Landmark
            </label>
            <input
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Interactive Map Preview */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mt-2">
            <PropertyMap address={formData.address || 'Ahmedabad, Gujarat'} height="180px" showTitleBadge={true} />
          </div>
        </div>

        {/* 2. Specifications */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            2. Specifications &amp; Verification
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">BHK Type</label>
              <select
                value={formData.bhk}
                onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Built-up Area</label>
              <input
                value={formData.areaSqFt}
                onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Verification Status</label>
              <select
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
              >
                <option value="Owner verified">Owner verified</option>
                <option value="Title checked">Title checked</option>
                <option value="RERA Approved">RERA Approved</option>
                <option value="Featured">Featured</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Property Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none resize-none"
            />
          </div>
        </div>

        {/* 3. Photo Gallery */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pb-2 border-b border-slate-100 dark:border-slate-800">
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
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            4. Owner Contact
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Owner Name</label>
              <input
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Owner Phone</label>
              <input
                value={formData.ownerPhone}
                onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <Link
            href="/admin/properties"
            className="px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saved}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-500/25 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> {saved ? 'Saving Changes...' : 'Save & Update Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
