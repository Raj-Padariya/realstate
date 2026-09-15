'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Navigation, Building2, Plane, Factory, CheckCircle2, ArrowRight, Car } from 'lucide-react';

export function DholeraSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#130728] via-[#261054] to-[#3C1985] text-white relative overflow-hidden border-t border-b border-white/10">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEDC00]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#522AB0]/50 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Highlight Metrics */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#FEDC00]/20 border border-[#FEDC00]/40 text-[#FEDC00] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-[#FEDC00]" /> High-Appreciation Smart City Hub
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black leading-tight tracking-tight mb-4 text-white">
              Invest in <span className="text-[#FEDC00]">Dholera SIR</span> — India First Greenfield Smart City
            </h2>

            <p className="text-base text-white/80 font-normal leading-relaxed mb-8 max-w-xl">
              100% Collector NA &amp; NOC approved clear-title plots inside the Activation Zone. Located minutes from the ₹91,000 Cr Tata Semiconductor Fab and Ahmedabad 4-lane expressway.
            </p>

            {/* Key Facts Pill Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <div className="text-2xl sm:text-3xl font-black text-[#FEDC00] mb-1">₹11 L</div>
                <div className="text-xs sm:text-sm text-white/80 font-medium">Starting Plot Price</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">920 sq.km</div>
                <div className="text-xs sm:text-sm text-white/80 font-medium">Smart Region Area</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <div className="text-2xl sm:text-3xl font-black text-[#34D399] mb-1">100% NA</div>
                <div className="text-xs sm:text-sm text-white/80 font-medium">Clear Title Guarantee</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/dholera-sir"
                className="bg-[#FEDC00] hover:bg-[#E3C500] text-[#1C0A3F] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-[#FEDC00]/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                <span>Explore Dholera Plots</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/contact?subject=Dholera+SIR+Visit"
                className="bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Car className="w-4 h-4 text-[#FEDC00]" />
                <span>Book Free Cab Visit</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Card with Real Project Layout Badges */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0F9D58] animate-pulse" />
                  <span className="text-xs font-extrabold text-white tracking-wider uppercase">Live Master Plan TP Schemes</span>
                </div>
                <span className="text-xs font-bold text-[#FEDC00] bg-white/10 px-2.5 py-1 rounded-full border border-[#FEDC00]/30">
                  Gujarat Govt SIR
                </span>
              </div>

              {/* Infrastructure Highlights List */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#FEDC00]/20 flex items-center justify-center text-[#FEDC00] flex-shrink-0">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">Tata Semiconductor Fab</h4>
                    <p className="text-xs text-white/70">₹91,000 Cr chip manufacturing mega plant</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#34D399]/20 flex items-center justify-center text-[#34D399] flex-shrink-0">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">Dholera Greenfield Airport</h4>
                    <p className="text-xs text-white/70">International cargo &amp; passenger airport (12km)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#A78BFA]/20 flex items-center justify-center text-[#A78BFA] flex-shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">Ahmedabad Expressway</h4>
                    <p className="text-xs text-white/70">4-Lane access controlled high-speed highway</p>
                  </div>
                </div>
              </div>

              {/* Verified Trust Bar */}
              <div className="bg-[#1C0A3F]/80 rounded-2xl p-4 border border-[#FEDC00]/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#FEDC00]" />
                  <span>Free Site Visit from Ahmedabad</span>
                </div>
                <Link href="/contact" className="text-xs font-black text-[#FEDC00] hover:underline flex items-center gap-1">
                  Book Now →
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DholeraSection;
