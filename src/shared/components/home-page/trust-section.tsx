'use client';

import React from 'react';
import { UserCheck, IndianRupee, ShieldCheck, KeyRound, Sparkles, CheckCircle } from 'lucide-react';

const TRUST_FEATURES = [
  {
    icon: <UserCheck className="w-6 h-6 text-[#522AB0]" />,
    title: '100% Verified Owners',
    desc: 'Every listing is verified directly from property owners. Zero agent reposts or fake contacts.',
    badge: 'Verified',
  },
  {
    icon: <IndianRupee className="w-6 h-6 text-[#0F9D58]" />,
    title: 'Zero Commission Paid',
    desc: 'No brokerage fees at any stage. Save 2% to 4% of total deal value on every single property.',
    badge: '₹0 Brokerage',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#522AB0]" />,
    title: 'Legal Title Checked',
    desc: 'Complete 7/12 extract and encumbrance verification conducted by registered property advocates.',
    badge: 'Safe & Clear',
  },
  {
    icon: <KeyRound className="w-6 h-6 text-[#F0A500]" />,
    title: 'Ready to Move & Plots',
    desc: 'Immediate possession residential flats, commercial spaces and Collector NA approved plots.',
    badge: 'Instant Handover',
  },
];

export function TrustSection() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="wrap">
        
        {/* Section Header Ticker */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#EFE9FB] text-[#41208C] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#522AB0]" /> Why 42,000+ Indians Trust GujjuProperty
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1F23] tracking-tight">
            The Safe, Direct &amp; Transparent Property Portal
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF9FD] hover:bg-white rounded-2xl p-6 border border-[#EBE6F7] hover:border-[#522AB0]/30 hover:shadow-xl hover:shadow-[#522AB0]/5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#EFE9FB] border border-gray-200/80 flex items-center justify-center transition-colors shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200 group-hover:border-[#522AB0]/20 group-hover:text-[#522AB0] transition-colors">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1C1F23] group-hover:text-[#41208C] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-1.5 text-xs font-bold text-[#0F9D58]">
                <CheckCircle className="w-3.5 h-3.5" /> Guaranteed Promise
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TrustSection;
