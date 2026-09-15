'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Building2,
  KeyRound,
  Building,
  Ruler,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';
import BrokerageMeter from './brokerage-meter';

const CITIES = [
  { name: 'Pune', state: 'MH' },
  { name: 'Mumbai', state: 'MH' },
  { name: 'Ahmedabad', state: 'GJ' },
  { name: 'Dholera SIR', state: 'GJ' },
  { name: 'Bengaluru', state: 'KA' },
  { name: 'Hyderabad', state: 'TS' },
  { name: 'Delhi NCR', state: 'DL' },
  { name: 'Surat', state: 'GJ' },
  { name: 'Vadodara', state: 'GJ' },
];

const SEARCH_TABS = [
  { id: 'sale', label: 'Buy', icon: <Building2 className="w-4 h-4" /> },
  { id: 'rent', label: 'Rent', icon: <KeyRound className="w-4 h-4" /> },
  { id: 'commercial', label: 'Commercial', icon: <Building className="w-4 h-4" /> },
  { id: 'plot', label: 'Plots & Land', icon: <Ruler className="w-4 h-4" /> },
  { id: 'dholera', label: 'Dholera SIR', icon: <Zap className="w-4 h-4" />, highlight: true },
  { id: 'project', label: 'New Projects', icon: <Sparkles className="w-4 h-4" /> },
];

const POPULAR_SEARCHES = [
  { label: 'Baner, Pune', href: '/properties?deal=sale&city=pune&q=baner' },
  { label: 'Wakad 2 BHK', href: '/properties?deal=sale&city=pune&q=wakad' },
  { label: 'SG Highway, Ahmedabad', href: '/properties?deal=sale&city=ahmedabad&q=sg-highway' },
  { label: 'Dholera SIR TP 2 Plots', href: '/dholera-sir' },
  { label: 'GIFT City Commercial', href: '/properties?deal=commercial&city=ahmedabad&q=gift-city' },
  { label: 'Rent in Hinjewadi', href: '/properties?deal=rent&city=pune&q=hinjewadi' },
];

export function HeroSection() {
  const router = useRouter();
  const [deal, setDeal] = useState('sale');
  const [city, setCity] = useState('Pune');
  const [locality, setLocality] = useState('');
  const [budget, setBudget] = useState('Any');
  const [bhk, setBhk] = useState('Any');

  function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (deal === 'dholera') {
      router.push('/dholera-sir');
      return;
    }
    const c = city.toLowerCase().replace(/\s+/g, '-');
    const q = locality.trim();
    const params = new URLSearchParams();
    params.set('deal', deal);
    params.set('city', c);
    if (q) params.set('q', q);
    if (budget !== 'Any') params.set('budget', budget);
    if (bhk !== 'Any') params.set('bhk', bhk);

    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden pt-10 pb-16 bg-gradient-to-b from-[#180A36] via-[#2A125E] to-[#41208C] text-white border-b border-[#522AB0]/30">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#522AB0]/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#FEDC00]/10 rounded-full blur-3xl pointer-events-none translate-y-1/3" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FEDC00_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* Left Column: Heading & Live Tickers */}
          <div className="lg:col-span-7 text-left">
            {/* Live Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white/90 mb-5 shadow-sm">
              <span className="bg-[#FEDC00] text-[#1C0A3F] font-extrabold px-2 py-0.5 rounded-full text-[10px] tracking-wide uppercase flex items-center gap-1">
                <Zap className="w-3 h-3 fill-[#1C0A3F]" /> Zero Brokerage
              </span>
              <span>100% Direct Verified Owners Across India</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-[1.2] tracking-tight text-white mb-4">
              Buy, Rent &amp; Sell Property <br className="hidden sm:inline" />
              <span className="relative inline-block text-[#FEDC00] underline decoration-[#FEDC00]/40 decoration-4 underline-offset-4">
                Without A Broker
              </span>{' '}
              In Between.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-xl mb-6">
              Connect directly with verified owners, inspect genuine 7/12 title papers, and close deals with zero commissions paid.
            </p>

            {/* Key Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-white/90">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FEDC00]" />
                <span>Verified Legal Title</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FEDC00]" />
                <span>e-Stamped Rent Agreement</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#FEDC00]" />
                <span>₹120+ Cr Saved in Brokerage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Brokerage Meter */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <BrokerageMeter />
            </div>
          </div>

        </div>

        {/* UNIVERSAL SEARCH PANEL (Glassmorphism & High-Converting Layout) */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/40 text-[#1c1f23]">
          
          {/* Search Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none border-b border-gray-100">
            {SEARCH_TABS.map((tab) => {
              const active = deal === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDeal(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#522AB0] text-white shadow-md shadow-[#522AB0]/20'
                      : tab.highlight
                      ? 'bg-[#FEDC00]/30 text-[#41208C] hover:bg-[#FEDC00]/50 font-extrabold'
                      : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.highlight && (
                    <span className="text-[9px] bg-[#FEDC00] text-[#1C0A3F] px-1.5 py-0.2 rounded font-extrabold ml-1">
                      HOT
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Form Inputs */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* City Selector */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#522AB0]" /> Select City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#FAF9FD] border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 focus:bg-white focus:border-[#522AB0] focus:ring-2 focus:ring-[#522AB0]/20 transition-all outline-none"
              >
                {CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Locality & Landmark Search Input */}
            <div className="lg:col-span-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Locality, Landmark or Project
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Baner, SG Highway, Wakad..."
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full bg-[#FAF9FD] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#522AB0] focus:ring-2 focus:ring-[#522AB0]/20 transition-all outline-none"
                />
              </div>
            </div>

            {/* Budget Filter */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#FAF9FD] border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-800 focus:bg-white focus:border-[#522AB0] outline-none"
              >
                <option value="Any">Any Budget</option>
                <option value="Under ₹30 L">Under ₹30 Lakhs</option>
                <option value="₹30 L - ₹60 L">₹30 L - ₹60 Lakhs</option>
                <option value="₹60 L - ₹1.2 Cr">₹60 L - ₹1.2 Cr</option>
                <option value="₹1.2 Cr - ₹2.5 Cr">₹1.2 Cr - ₹2.5 Cr</option>
                <option value="Above ₹2.5 Cr">Above ₹2.5 Cr</option>
              </select>
            </div>

            {/* BHK / Type Quick Filter */}
            <div className="lg:col-span-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                BHK
              </label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full bg-[#FAF9FD] border border-gray-200 rounded-xl px-2.5 py-2.5 text-sm font-semibold text-gray-800 focus:bg-white focus:border-[#522AB0] outline-none"
              >
                <option value="Any">All</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4+ BHK">4+ BHK</option>
              </select>
            </div>

            {/* Search Submit CTA Button */}
            <div className="lg:col-span-2 sm:col-span-2">
              <label className="hidden lg:block text-[11px] font-bold uppercase tracking-wider text-transparent mb-1">
                Action
              </label>
              <button
                type="submit"
                id="goSearch"
                className="w-full bg-[#FEDC00] hover:bg-[#E3C500] active:scale-[0.98] text-[#1C0A3F] font-black text-sm sm:text-base py-3 px-5 rounded-xl shadow-lg shadow-[#FEDC00]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Search Now</span>
              </button>
            </div>

          </form>

          {/* Quick Popular Chips */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 flex-wrap text-xs text-gray-600">
            <span className="font-bold text-[#522AB0] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Popular Hotspots:
            </span>
            {POPULAR_SEARCHES.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="bg-gray-100 hover:bg-[#EFE9FB] hover:text-[#522AB0] px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;
