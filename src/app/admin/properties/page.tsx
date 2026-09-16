'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import {
  KeyRound,
  Trees,
  Building2,
  Home,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Bed,
  Maximize2,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function AdminManagePropertiesPage() {
  const { properties, deleteProperty, toggleVerification } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBhk, setFilterBhk] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterVerified, setFilterVerified] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Quick stats
  const totalCount = properties.length;
  const rentCount = properties.filter(p => p.listingCategory === 'Rent' || p.price.includes('/mo') || p.title.toLowerCase().includes('rent')).length;
  const buyCount = properties.filter(p => p.listingCategory === 'Buy' || (!p.price.includes('/mo') && !p.title.toLowerCase().includes('rent'))).length;
  const commCount = properties.filter(p => p.listingCategory === 'Commercial' || p.title.toLowerCase().includes('office') || p.title.toLowerCase().includes('shop')).length;
  const verifiedCount = properties.filter(p => p.badgeText?.toLowerCase().includes('verified') || p.badgeText?.toLowerCase().includes('rera')).length;

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBhk = filterBhk === 'All' || prop.bhk === filterBhk;
    
    let matchesCat = true;
    if (filterCategory === 'Rent') {
      matchesCat = prop.listingCategory === 'Rent' || prop.price.includes('/mo') || prop.title.toLowerCase().includes('rent');
    } else if (filterCategory === 'Buy') {
      matchesCat = prop.listingCategory === 'Buy' || (!prop.price.includes('/mo') && !prop.title.toLowerCase().includes('rent'));
    } else if (filterCategory === 'Commercial') {
      matchesCat = prop.listingCategory === 'Commercial' || prop.title.toLowerCase().includes('office') || prop.title.toLowerCase().includes('shop');
    } else if (filterCategory === 'Plot') {
      matchesCat = prop.listingCategory === 'Plot' || prop.title.toLowerCase().includes('plot') || prop.title.toLowerCase().includes('land');
    }

    let matchesVer = true;
    const isVer = prop.badgeText?.toLowerCase().includes('verified') || prop.badgeText?.toLowerCase().includes('rera');
    if (filterVerified === 'Verified') matchesVer = isVer;
    if (filterVerified === 'Pending') matchesVer = !isVer;

    return matchesSearch && matchesBhk && matchesCat && matchesVer;
  });

  const handleDelete = (id: string) => {
    deleteProperty(id);
    setDeleteConfirmId(null);
  };

  const getCategoryBadge = (prop: any) => {
    const isRent = prop.listingCategory === 'Rent' || prop.price.includes('/mo') || prop.title.toLowerCase().includes('rent');
    const isPlot = prop.listingCategory === 'Plot' || prop.title.toLowerCase().includes('plot') || prop.title.toLowerCase().includes('land');
    const isComm = prop.listingCategory === 'Commercial' || prop.title.toLowerCase().includes('office') || prop.title.toLowerCase().includes('shop');

    if (isRent) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50">
          <KeyRound className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Rent
        </span>
      );
    }
    if (isPlot) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50">
          <Trees className="w-3 h-3 text-purple-600 dark:text-purple-400" /> Land / Plot
        </span>
      );
    }
    if (isComm) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50">
          <Building2 className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Commercial
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/50">
        <Home className="w-3 h-3 text-indigo-600 dark:text-indigo-400" /> For Sale
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Inventory &amp; Listings Manager
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-200/60 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800">
              {properties.length} Active
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Publish new properties, update pricing, verify genuine owners, or preview public listing pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/properties"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" /> View Live Portal
          </Link>
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-sm shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all active:scale-[0.99]"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" /> Add New Property
          </Link>
        </div>
      </div>

      {/* QUICK STATS PILLS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Inventory</div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{totalCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Verified Owners</div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{verifiedCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">For Resale</div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{buyCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Home className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">For Rent</div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{rentCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <KeyRound className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* SEARCH INPUT */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, location, ID (e.g. Pune, Baner, prop-1)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* BHK FILTER */}
          <div className="flex items-center gap-2">
            <select
              value={filterBhk}
              onChange={(e) => setFilterBhk(e.target.value)}
              aria-label="Filter by BHK configuration"
              className="px-3 py-2.5 text-xs font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">All BHKs</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
            </select>

            {/* VERIFICATION FILTER */}
            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value)}
              aria-label="Filter by verification status"
              className="px-3 py-2.5 text-xs font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">All Verification</option>
              <option value="Verified">Verified Only</option>
              <option value="Pending">Unverified / Pending</option>
            </select>
          </div>
        </div>

        {/* CATEGORY PILL SELECTORS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {[
            { id: 'All', label: 'All Inventory' },
            { id: 'Buy', label: '🏠 Resale / Buy' },
            { id: 'Rent', label: '🔑 For Rent' },
            { id: 'Commercial', label: '🏬 Commercial' },
            { id: 'Plot', label: '📐 Plots & Land' },
          ].map((cat) => {
            const isActive = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          <div className="ml-auto text-xs font-semibold text-slate-500 dark:text-slate-400 pl-3">
            Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredProperties.length}</strong> of {properties.length}
          </div>
        </div>
      </div>

      {/* PROPERTIES TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Specs &amp; Area</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredProperties.map((prop) => {
                const isVerified = prop.badgeText?.toLowerCase().includes('verified') || prop.badgeText?.toLowerCase().includes('rera');
                return (
                  <tr
                    key={prop.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* PROPERTY TITLE & IMAGE */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 border border-slate-200/70 dark:border-slate-700 bg-slate-100">
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <div className="font-bold text-slate-900 dark:text-white truncate">
                            {prop.title}
                          </div>
                          <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                            <span>ID: {prop.id}</span>
                            {prop.ownerName && (
                              <>
                                <span>•</span>
                                <span>{prop.ownerName}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getCategoryBadge(prop)}
                    </td>

                    {/* PRICE */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-black text-slate-900 dark:text-white text-sm">
                        {prop.price}
                      </div>
                      {prop.pricePerSqFt && (
                        <div className="text-[11px] text-slate-400">{prop.pricePerSqFt}</div>
                      )}
                    </td>

                    {/* SPECS */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">{prop.bhk}</span>
                        <span className="text-slate-400">{prop.areaSqFt}</span>
                      </div>
                    </td>

                    {/* LOCATION */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="flex items-start gap-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-1" title={prop.address}>
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="truncate">{prop.address}</span>
                      </div>
                    </td>

                    {/* VERIFICATION TOGGLE */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toggleVerification(prop.id)}
                        title="Click to toggle verification status"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isVerified
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/80 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isVerified ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                        {prop.badgeText || (isVerified ? 'Verified' : 'Pending')}
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/property/${prop.id}`}
                          target="_blank"
                          title="Preview live on portal"
                          className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/properties/edit/${prop.id}`}
                          title="Edit listing details"
                          className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(prop.id)}
                          title="Delete property"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProperties.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3">
                      <Search className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">No properties found</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                      No listing matches the current filter query. Try selecting &apos;All&apos; category or clearing your search term.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterBhk('All');
                        setFilterCategory('All');
                        setFilterVerified('All');
                      }}
                      className="mt-3 px-3.5 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all"
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Delete Property Listing?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Are you sure you want to remove listing <strong>#{deleteConfirmId}</strong>? This will immediately take the property offline from GujjuProperty search and property pages.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-sm shadow-rose-500/20"
              >
                Yes, Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
