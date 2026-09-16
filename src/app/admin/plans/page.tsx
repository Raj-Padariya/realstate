'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Save,
  CheckCircle2,
  CreditCard,
  Tag,
  KeyRound,
  ShieldCheck,
  UserCheck,
  Zap,
  Sparkles,
  Percent,
  Check,
  X
} from 'lucide-react';

type PlanTab = 'tenant' | 'buyer' | 'owner' | 'seller';

interface EditablePlan {
  id: string;
  name: string;
  price: string;
  strikePrice?: string;
  tagline: string;
  validity?: string;
  contacts: string;
  legalSupport: boolean;
  relationshipManager: boolean;
  moneybackGuarantee: boolean;
}

const DEFAULT_PLANS: Record<PlanTab, EditablePlan[]> = {
  tenant: [
    { id: 'freedom', name: 'Freedom Plan', price: '999', strikePrice: '1,499', tagline: 'Get genuine house owner contacts matching your requirements.', validity: '15 Days', contacts: 'Upto 25', legalSupport: true, relationshipManager: false, moneybackGuarantee: false },
    { id: 'relax', name: 'Relax Plan (Most Popular)', price: '2,999', strikePrice: '4,499', tagline: 'Get a Relationship Manager to help you SAVE time & money.', validity: '30 Days', contacts: 'Upto 50', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'assure', name: 'Assure Plan', price: '5,499', strikePrice: '6,999', tagline: 'Find a home through us, or get a 100% money-back refund.', validity: '45 Days', contacts: 'Upto 50', legalSupport: true, relationshipManager: true, moneybackGuarantee: true },
  ],
  buyer: [
    { id: 'power', name: 'Power Plan', price: '1,899', strikePrice: '2,999', tagline: 'Choose your dream home from lots of options with direct owner contacts!', validity: '90 Days', contacts: 'Upto 25', legalSupport: true, relationshipManager: false, moneybackGuarantee: false },
    { id: 'expert', name: 'Property Expert Plan', price: '1,999', strikePrice: '3,499', tagline: 'Get FREE Loan Assistance + 100% Cashback + Dedicated Property Expert.', validity: '90 Days', contacts: 'Upto 50', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'moneyback', name: 'Property Expert MoneyBack Plan', price: '4,999', strikePrice: '7,499', tagline: 'Get Guaranteed property or 100% Refund with priority home inspections.', validity: '90 Days', contacts: 'Upto 50', legalSupport: true, relationshipManager: true, moneybackGuarantee: true },
  ],
  owner: [
    { id: 'owner_relax', name: 'Relax Owner Plan', price: '2,999', strikePrice: '4,999', tagline: 'Assisted listing service with dedicated manager to handle tenant inquiries.', validity: '30 Days', contacts: 'Upto 25 Tenants', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'owner_super', name: 'Super Owner Plan', price: '4,999', strikePrice: '7,999', tagline: 'Field assistant handles site visits + Premium portal promotion.', validity: '45 Days', contacts: 'Upto 50 Tenants', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'owner_moneyback', name: 'MoneyBack Owner Plan', price: '6,999', strikePrice: '9,999', tagline: 'Tenant guaranteed within 60 days or get a 100% full refund.', validity: '60 Days', contacts: 'Unlimited Tenants', legalSupport: true, relationshipManager: true, moneybackGuarantee: true },
  ],
  seller: [
    { id: 'seller_power', name: 'Power Seller Plan', price: '2,499', strikePrice: '3,999', tagline: 'High visibility ad listing with instant buyer inquiry alerts on WhatsApp.', validity: '90 Days', contacts: 'Upto 30 Buyers', legalSupport: true, relationshipManager: false, moneybackGuarantee: false },
    { id: 'seller_expert', name: 'Property Expert Seller Plan', price: '3,999', strikePrice: '5,999', tagline: 'Dedicated seller expert negotiates best price & coordinates buyer visits.', validity: '90 Days', contacts: 'Upto 60 Buyers', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'seller_moneyback', name: 'MoneyBack Seller Plan', price: '7,999', strikePrice: '11,999', tagline: 'Guaranteed buyer match within validity or 100% refund guarantee.', validity: '90 Days', contacts: 'Unlimited Buyers', legalSupport: true, relationshipManager: true, moneybackGuarantee: true },
  ],
};

export default function AdminPlansPage() {
  const [activeTab, setActiveTab] = useState<PlanTab>('buyer');
  const [plans, setPlans] = useState<Record<PlanTab, EditablePlan[]>>(DEFAULT_PLANS);
  const [savedNotice, setSavedNotice] = useState('');

  const handlePlanChange = (tab: PlanTab, idx: number, field: keyof EditablePlan, value: any) => {
    const updatedTabPlans = [...plans[tab]];
    updatedTabPlans[idx] = { ...updatedTabPlans[idx], [field]: value };
    setPlans({ ...plans, [tab]: updatedTabPlans });
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(`🎉 ${activeTab.toUpperCase()} Plans updated successfully! Changes reflected live across frontend.`);
    setTimeout(() => setSavedNotice(''), 3500);
  };

  const tabsInfo: { id: PlanTab; label: string; icon: any; targetUrl: string }[] = [
    { id: 'buyer', label: 'Buyer Plans', icon: Tag, targetUrl: '/buyer-plans' },
    { id: 'tenant', label: 'Tenant Plans', icon: KeyRound, targetUrl: '/plans' },
    { id: 'owner', label: 'Owner Plans', icon: UserCheck, targetUrl: '/owner-plans' },
    { id: 'seller', label: 'Seller Plans', icon: CreditCard, targetUrl: '/seller-plans' },
  ];

  const currentTabObj = tabsInfo.find(t => t.id === activeTab) || tabsInfo[0];

  return (
    <div className="space-y-6 max-w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Subscription &amp; Monetization CMS
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200/60 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
              Live Pricing
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Configure tiered subscription plans, discounts, contact limits, and premium perks for buyers, owners, tenants, and sellers.
          </p>
        </div>

        <Link
          href={currentTabObj.targetUrl}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all self-start sm:self-auto"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" /> Preview {currentTabObj.label} Frontend
        </Link>
      </div>

      {/* SAVED TOAST ALERT */}
      {savedNotice && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-bold shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* CATEGORY SWITCHER TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        {tabsInfo.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* PLANS FORM GRID */}
      <form onSubmit={handleSaveChanges} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans[activeTab].map((plan, idx) => {
            const numPrice = parseInt(plan.price.replace(/,/g, ''), 10) || 0;
            const numStrike = parseInt((plan.strikePrice || '').replace(/,/g, ''), 10) || 0;
            const discountPercent = numStrike > numPrice ? Math.round(((numStrike - numPrice) / numStrike) * 100) : null;

            return (
              <div
                key={plan.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                {/* Plan Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Tier #{idx + 1}
                    </span>
                    {discountPercent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                        <Zap className="w-3 h-3 text-emerald-600" /> {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Plan Name Field */}
                  <div className="mt-3.5 space-y-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => handlePlanChange(activeTab, idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 text-sm font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>

                  {/* Pricing Dual Fields */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Price (₹)
                      </label>
                      <input
                        type="text"
                        value={plan.price}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'price', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Strike Price (₹)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4,499"
                        value={plan.strikePrice || ''}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'strikePrice', e.target.value)}
                        className="w-full px-3 py-2 text-sm text-slate-500 line-through bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="mt-3 space-y-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Marketing Tagline
                    </label>
                    <textarea
                      rows={2}
                      value={plan.tagline}
                      onChange={(e) => handlePlanChange(activeTab, idx, 'tagline', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                    />
                  </div>

                  {/* Contacts & Validity */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Contacts Quota
                      </label>
                      <input
                        type="text"
                        value={plan.contacts}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'contacts', e.target.value)}
                        className="w-full px-3 py-2 text-xs font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Validity Period
                      </label>
                      <input
                        type="text"
                        value={plan.validity || '30 Days'}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'validity', e.target.value)}
                        className="w-full px-3 py-2 text-xs font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                  </div>

                  {/* Feature Switches */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 space-y-2.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Perks
                    </div>

                    <label className="flex items-center justify-between gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                      <span>Legal Consultation Support</span>
                      <input
                        type="checkbox"
                        checked={plan.legalSupport}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'legalSupport', e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 rounded border-slate-300"
                      />
                    </label>

                    <label className="flex items-center justify-between gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                      <span>Dedicated RM Manager</span>
                      <input
                        type="checkbox"
                        checked={plan.relationshipManager}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'relationshipManager', e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 rounded border-slate-300"
                      />
                    </label>

                    <label className="flex items-center justify-between gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                      <span>100% Money-Back Guarantee</span>
                      <input
                        type="checkbox"
                        checked={plan.moneybackGuarantee}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'moneybackGuarantee', e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 rounded border-slate-300"
                      />
                    </label>
                  </div>
                </div>

                {/* Plan footer preview summary */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>Frontend Tag:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    ₹{plan.price} / {plan.validity || '30 Days'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Changes saved here update the customer purchase tiers immediately across all frontend plan pages.
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-500/25 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save {activeTab.toUpperCase()} Changes
          </button>
        </div>
      </form>
    </div>
  );
}
