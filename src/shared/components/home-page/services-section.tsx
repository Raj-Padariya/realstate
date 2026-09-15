'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Shield,
  Landmark,
  Truck,
  UserCheck,
  Camera,
  Receipt,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const SERVICES = [
  {
    h: '/rent-agreement',
    ic: <FileText className="w-6 h-6 text-[#522AB0]" />,
    t: 'Online Rent Agreement',
    d: 'E-stamped legal draft with doorstep biometric verification done in 24 hours.',
    badge: 'Popular',
    iconBg: '#EFE9FB',
  },
  {
    h: '/services/title-check',
    ic: <Shield className="w-6 h-6 text-[#0F9D58]" />,
    t: '7/12 & Legal Title Check',
    d: 'Experienced advocate reads 30-year ownership chain & EC before token payment.',
    badge: 'Advocate Verified',
    iconBg: '#E6F4EA',
  },
  {
    h: '/rent-receipts',
    ic: <Receipt className="w-6 h-6 text-[#2563EB]" />,
    t: 'HRA Rent Receipts Generator',
    d: 'Generate complete 12-month HRA tax-saving receipts with instant 1-page A4 PDF print.',
    badge: 'Free Instant PDF',
    iconBg: '#EFF6FF',
  },
  {
    h: '/services/tenant-verification',
    ic: <UserCheck className="w-6 h-6 text-[#D97706]" />,
    t: 'Tenant Police Verification',
    d: 'Official police-format verification plus background check before handing keys.',
    badge: 'Safe Landlords',
    iconBg: '#FEF3C7',
  },
  {
    h: '/services/photography',
    ic: <Camera className="w-6 h-6 text-[#E11D48]" />,
    t: 'HD Property Photography',
    d: 'Professional photographer shoots wide-angle photos. Listings sell 3x faster.',
    badge: '3x More Enquiries',
    iconBg: '#FFE4E6',
  },
  {
    h: '/services/home-loan',
    ic: <Landmark className="w-6 h-6 text-[#059669]" />,
    t: 'Lowest Rate Home Loans',
    d: 'Pre-approval from SBI, HDFC, ICICI & Axis at lowest interest without branch visits.',
    badge: 'Bank Tie-ups',
    iconBg: '#ECFDF5',
  },
  {
    h: '/services/packers-movers',
    ic: <Truck className="w-6 h-6 text-[#7C3AED]" />,
    t: 'Verified Packers & Movers',
    d: 'Zero-damage guaranteed relocation crews with fixed price quotes upfront.',
    badge: 'Damage Guarantee',
    iconBg: '#F5F3FF',
  },
  {
    h: '/services/site-visit',
    ic: <MapPin className="w-6 h-6 text-[#0284C7]" />,
    t: 'Assisted Site Visits & NRI Desk',
    d: 'Dedicated field manager conducts guided property visit for NRI & outstation buyers.',
    badge: 'NRI Friendly',
    iconBg: '#E0F2FE',
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 bg-[#F8FAFC] border-t border-b border-gray-200/80">
      <div className="wrap">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#EFE9FB] text-[#41208C] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#522AB0]" /> Hassle-Free Property Services
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1C1F23] tracking-tight">
              Essential Services for Buyers, Tenants &amp; Owners
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
              Legal diligence, e-stamped documentation, HRA rent receipts, and doorstep services without broker hassles.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#522AB0] hover:text-[#41208C] bg-white border border-[#522AB0]/30 hover:border-[#522AB0] px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, idx) => (
            <Link
              key={idx}
              href={s.h}
              className="bg-white hover:bg-[#FAF9FD] rounded-2xl p-6 border border-gray-200/80 hover:border-[#522AB0]/40 hover:shadow-xl hover:shadow-[#522AB0]/5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: s.iconBg }}
                  >
                    {s.ic}
                  </div>
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 group-hover:bg-[#EFE9FB] group-hover:text-[#522AB0] transition-colors">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1C1F23] group-hover:text-[#41208C] transition-colors mb-2">
                  {s.t}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  {s.d}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#522AB0] group-hover:translate-x-1 transition-transform">
                <span>Book Service Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;
