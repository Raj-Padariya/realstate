'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, PlusCircle } from 'lucide-react';

export function OwnerBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#200A47] via-[#351578] to-[#522AB0] text-white relative overflow-hidden border-t border-b border-white/10">
      {/* Background Ambience */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FEDC00]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#41208C]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#FEDC00]/20 border border-[#FEDC00]/40 text-[#FEDC00] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-[#FEDC00]" /> 100% Free For Property Owners
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-4">
              Are You Renting Out or Selling Your Property?
            </h2>

            <p className="text-base text-white/80 font-normal leading-relaxed mb-6 max-w-xl">
              Post your property in under 3 minutes. Genuine buyers and tenants connect via Gujju Concierge — we protect your privacy and never spam your phone.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2.5 text-sm font-semibold text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#FEDC00] flex-shrink-0 mt-0.5" />
                <span>Zero listing fee &amp; zero commission</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm font-semibold text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#FEDC00] flex-shrink-0 mt-0.5" />
                <span>Phone number privacy shield</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm font-semibold text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#FEDC00] flex-shrink-0 mt-0.5" />
                <span>Instant WhatsApp lead notifications</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm font-semibold text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#FEDC00] flex-shrink-0 mt-0.5" />
                <span>Free Verified Owner badge</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/post-property"
                className="bg-[#FEDC00] hover:bg-[#E3C500] text-[#1C0A3F] font-black text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-[#FEDC00]/30 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span>Post Property Free</span>
              </Link>
              <Link
                href="/tenant-plans?tab=owner"
                className="bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>View Owner Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
                <div className="text-3xl font-black text-[#FEDC00] mb-1">3,400+</div>
                <div className="text-xs text-white/80 font-medium">Owners listed this month</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
                <div className="text-3xl font-black text-white mb-1">48 Hours</div>
                <div className="text-xs text-white/80 font-medium">Median first inquiry time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
                <div className="text-3xl font-black text-[#34D399] mb-1">₹0</div>
                <div className="text-xs text-white/80 font-medium">Charged to owners, ever</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
                <div className="text-3xl font-black text-white mb-1">4.9 ★</div>
                <div className="text-xs text-white/80 font-medium">From 14,000+ happy owners</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default OwnerBanner;
