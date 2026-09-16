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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top back navigation */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Properties Inventory
        </Link>
      </div>

      {/* Title Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Create New Property Listing
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Select listing type and fill specifications to publish instantly across GujjuProperty portal.
        </p>
      </div>

      {/* 1. Category Selector */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
          1. Select Category &amp; Transaction Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Property Details */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            2. Basic Details ({category})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Property Title *
              </label>
              <input
                required
                placeholder={category === 'Land & Plot' ? 'e.g. 2400 sq.ft Residential Plot in Dholera SIR' : 'e.g. 3 BHK Luxury Flat in Rohan Abhilasha'}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {category === 'Residential Rent' ? 'Monthly Rent (₹) *' : 'Total Price (₹) *'}
              </label>
              <input
                required
                placeholder={category === 'Residential Rent' ? 'e.g. ₹28,000/mo' : 'e.g. ₹1.28 Cr'}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Built-up / Plot Area *
              </label>
              <input
                required
                placeholder="e.g. 1,420 sq.ft"
                value={formData.areaSqFt}
                onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                BHK Configuration
              </label>
              <select
                value={formData.bhk}
                onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Status Badge Tag
              </label>
              <select
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Owner verified">Owner verified</option>
                <option value="RERA Approved">RERA Approved</option>
                <option value="Featured">Featured Listing</option>
                <option value="Zero Brokerage">Zero Brokerage</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Full Locality &amp; Address *
            </label>
            <input
              required
              placeholder="e.g. Rohan Abhilasha, Baner Road, Baner, Pune 411045"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Owner Contact Information */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            3. Owner / Seller Contact Information
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Owner Full Name *
              </label>
              <input
                required
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Phone Number *
              </label>
              <input
                required
                value={formData.ownerPhone}
                onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Owner Role
              </label>
              <input
                value={formData.ownerRole}
                onChange={(e) => setFormData({ ...formData, ownerRole: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* 4. Photos */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pb-2 border-b border-slate-100 dark:border-slate-800">
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
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <Link
            href="/admin/properties"
            className="px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-500/25 active:scale-[0.99] transition-all cursor-pointer"
          >
            🚀 Publish Property Live
          </button>
        </div>
      </form>
    </div>
  );
}
