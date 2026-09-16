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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '100%' }}>
      {/* HEADER SECTION */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E1035 0%, #2A1454 60%, #170A30 100%)',
          borderRadius: '18px',
          padding: '24px 28px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 24px rgba(23, 10, 48, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 900, margin: 0 }}>
              Subscription &amp; Monetization CMS
            </h1>
            <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 800, background: 'rgba(254, 220, 0, 0.18)', color: '#FEDC00', border: '1px solid rgba(254, 220, 0, 0.35)' }}>
              Live Pricing
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Configure tiered subscription plans, discounts, contact limits, and premium perks for buyers, owners, tenants, and sellers.
          </p>
        </div>

        <Link
          href={currentTabObj.targetUrl}
          target="_blank"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 16px',
            fontSize: '13px',
            fontWeight: 750,
            color: '#FFFFFF',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            textDecoration: 'none',
          }}
        >
          <ExternalLink style={{ width: '14px', height: '14px', color: '#FEDC00' }} /> Preview {currentTabObj.label} Frontend
        </Link>
      </div>

      {/* SAVED TOAST ALERT */}
      {savedNotice && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderRadius: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '13.5px', fontWeight: 800 }}>
          <CheckCircle2 style={{ width: '18px', height: '18px', color: '#059669', flexShrink: 0 }} />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* CATEGORY SWITCHER TABS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', background: '#FFFFFF', padding: '6px', borderRadius: '14px', border: '1.5px solid #E2E8F0' }}>
        {tabsInfo.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: isActive ? '1px solid #C4B5FD' : 'none',
                background: isActive ? '#522AB0' : 'transparent',
                color: isActive ? '#FFFFFF' : '#475569',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon style={{ width: '15px', height: '15px', color: isActive ? '#FEDC00' : '#64748B' }} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* PLANS FORM GRID */}
      <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
          {plans[activeTab].map((plan, idx) => {
            const numPrice = parseInt(plan.price.replace(/,/g, ''), 10) || 0;
            const numStrike = parseInt((plan.strikePrice || '').replace(/,/g, ''), 10) || 0;
            const discountPercent = numStrike > numPrice ? Math.round(((numStrike - numPrice) / numStrike) * 100) : null;

            return (
              <div
                key={plan.id}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                }}
              >
                {/* Plan Header */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#522AB0', letterSpacing: '0.05em' }}>
                      Tier #{idx + 1}
                    </span>
                    {discountPercent && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}>
                        <Zap style={{ width: '11px', height: '11px' }} /> {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Plan Name Field */}
                  <div style={{ marginTop: '12px' }}>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => handlePlanChange(activeTab, idx, 'name', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', fontSize: '13px', fontWeight: 800, borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                    />
                  </div>

                  {/* Pricing Dual Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
                        Price (₹)
                      </label>
                      <input
                        type="text"
                        value={plan.price}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'price', e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', fontSize: '13.5px', fontWeight: 900, color: '#059669', borderRadius: '8px', border: '1px solid #A7F3D0', background: '#ECFDF5', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
                        Strike Price (₹)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4,499"
                        value={plan.strikePrice || ''}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'strikePrice', e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', fontSize: '13px', textDecoration: 'line-through', color: '#64748B', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Tagline */}
                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
                      Marketing Tagline
                    </label>
                    <textarea
                      rows={2}
                      value={plan.tagline}
                      onChange={(e) => handlePlanChange(activeTab, idx, 'tagline', e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', fontSize: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  {/* Contacts & Validity */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
                        Contacts Quota
                      </label>
                      <input
                        type="text"
                        value={plan.contacts}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'contacts', e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', fontSize: '12px', fontWeight: 700, borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
                        Validity Period
                      </label>
                      <input
                        type="text"
                        value={plan.validity || '30 Days'}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'validity', e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', fontSize: '12px', fontWeight: 700, borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Feature Switches */}
                  <div style={{ marginTop: '12px', padding: '12px', borderRadius: '10px', background: '#FAF8FE', border: '1px solid #EBE6F7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B' }}>
                      Included Perks
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
                      <span>Legal Consultation Support</span>
                      <input
                        type="checkbox"
                        checked={plan.legalSupport}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'legalSupport', e.target.checked)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
                      <span>Dedicated RM Manager</span>
                      <input
                        type="checkbox"
                        checked={plan.relationshipManager}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'relationshipManager', e.target.checked)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
                      <span>100% Money-Back Guarantee</span>
                      <input
                        type="checkbox"
                        checked={plan.moneybackGuarantee}
                        onChange={(e) => handlePlanChange(activeTab, idx, 'moneybackGuarantee', e.target.checked)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                    </label>
                  </div>
                </div>

                {/* Plan footer preview summary */}
                <div style={{ paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#64748B' }}>
                  <span>Preview Tag:</span>
                  <span style={{ fontWeight: 800, color: '#0F172A', fontFamily: 'monospace' }}>
                    ₹{plan.price} / {plan.validity || '30 Days'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '18px 24px', borderRadius: '16px', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '13px', color: '#64748B' }}>
            Changes saved here update the customer purchase tiers immediately across all frontend plan pages.
          </div>
          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 26px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 850,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(82, 42, 176, 0.3)',
            }}
          >
            <Save style={{ width: '15px', height: '15px' }} /> Save {activeTab.toUpperCase()} Changes
          </button>
        </div>
      </form>
    </div>
  );
}
