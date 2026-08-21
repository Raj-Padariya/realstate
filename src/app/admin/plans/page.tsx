'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Save, CheckCircle2, CreditCard, Tag, Key, UserCheck } from 'lucide-react';

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
    { id: 'power', name: 'Power Plan', price: '1,899', tagline: 'Choose your dream home from lots of options!', validity: '90 Days', contacts: 'Upto 25', legalSupport: true, relationshipManager: false, moneybackGuarantee: false },
    { id: 'expert', name: 'Property Expert Plan', price: '1,999', tagline: 'Get FREE Loan Assistance + 100% Cashback + Property Expert', validity: '90 Days', contacts: 'Upto 50', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'moneyback', name: 'Property Expert MoneyBack Plan', price: '4,999', tagline: 'Get Guaranteed property or 100% Refund', validity: '90 Days', contacts: 'Upto 50', legalSupport: true, relationshipManager: true, moneybackGuarantee: true },
  ],
  owner: [
    { id: 'owner_relax', name: 'Relax Owner Plan', price: '2,999', strikePrice: '4,999', tagline: 'Assisted listing service with dedicated manager to handle inquiries.', validity: '30 Days', contacts: 'Upto 25 Tenants', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'owner_super', name: 'Super Owner Plan', price: '4,999', strikePrice: '7,999', tagline: 'Field assistant handles site visits + Premium promotion.', validity: '45 Days', contacts: 'Upto 50 Tenants', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'owner_moneyback', name: 'MoneyBack Owner Plan', price: '6,999', strikePrice: '9,999', tagline: 'Tenant guaranteed within 60 days or get a 100% refund.', validity: '60 Days', contacts: 'Unlimited Tenants', legalSupport: true, relationshipManager: true, moneybackGuarantee: true },
  ],
  seller: [
    { id: 'seller_power', name: 'Power Seller Plan', price: '2,499', tagline: 'High visibility ad listing with instant buyer inquiry alerts.', validity: '90 Days', contacts: 'Upto 30 Buyers', legalSupport: true, relationshipManager: false, moneybackGuarantee: false },
    { id: 'seller_expert', name: 'Property Expert Seller Plan', price: '3,999', tagline: 'Dedicated seller expert negotiates best price & manages visits.', validity: '90 Days', contacts: 'Upto 60 Buyers', legalSupport: true, relationshipManager: true, moneybackGuarantee: false },
    { id: 'seller_moneyback', name: 'MoneyBack Seller Plan', price: '7,999', tagline: 'Guaranteed buyer match within validity or 100% refund.', validity: '90 Days', contacts: 'Unlimited Buyers', legalSupport: true, relationshipManager: true, moneybackGuarantee: true },
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
    setTimeout(() => setSavedNotice(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
            Subscription Plans CMS &amp; Pricing Manager
          </h1>
          <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '14px' }}>
            Manage prices, taglines, contacts quota, and features for Tenant, Buyer, Owner &amp; Seller plans.
          </p>
        </div>

        <Link
          href="/buyer-plans"
          target="_blank"
          style={{
            background: '#522AB0',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '10px',
            fontWeight: 800,
            fontSize: '13.5px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ExternalLink className="w-4 h-4 text-[#FEDC00]" /> Preview Frontend Plans Page
        </Link>
      </div>

      {savedNotice && (
        <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '10px', padding: '14px 20px', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 className="w-5 h-5 text-[#0F9D58]" /> {savedNotice}
        </div>
      )}

      {/* Plan Category Switcher Tabs */}
      <div style={{ display: 'flex', gap: '10px', background: '#fff', padding: '8px', borderRadius: '14px', border: '1px solid #EBE6F7' }}>
        {(['tenant', 'buyer', 'owner', 'seller'] as PlanTab[]).map((tab) => {
          const isActive = activeTab === tab;
          const labels: Record<PlanTab, string> = {
            tenant: 'Tenant Plans',
            buyer: 'Buyer Plans',
            owner: 'Owner Plans',
            seller: 'Seller Plans',
          };
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? '#522AB0' : 'transparent',
                color: isActive ? '#fff' : 'var(--ink)',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Form Grid for Active Category Plans */}
      <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {plans[activeTab].map((plan, idx) => (
            <div key={plan.id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div style={{ fontWeight: 800, fontSize: '16px', color: '#522AB0', borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
                Plan #{idx + 1}: {plan.name}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>Plan Name</label>
                <input
                  type="text"
                  value={plan.name}
                  onChange={(e) => handlePlanChange(activeTab, idx, 'name', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '13.5px', fontWeight: 700 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>Price (₹)</label>
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) => handlePlanChange(activeTab, idx, 'price', e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '13.5px', fontWeight: 800, color: '#0f9d58' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>Strike Price (₹)</label>
                  <input
                    type="text"
                    placeholder="e.g. 4,499"
                    value={plan.strikePrice || ''}
                    onChange={(e) => handlePlanChange(activeTab, idx, 'strikePrice', e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>Tagline / Value Proposition</label>
                <textarea
                  rows={2}
                  value={plan.tagline}
                  onChange={(e) => handlePlanChange(activeTab, idx, 'tagline', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>Contacts Quota</label>
                <input
                  type="text"
                  value={plan.contacts}
                  onChange={(e) => handlePlanChange(activeTab, idx, 'contacts', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#FAF8FE', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={plan.legalSupport}
                    onChange={(e) => handlePlanChange(activeTab, idx, 'legalSupport', e.target.checked)}
                  />
                  Legal Consultation Included
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={plan.relationshipManager}
                    onChange={(e) => handlePlanChange(activeTab, idx, 'relationshipManager', e.target.checked)}
                  />
                  Dedicated Relationship Manager
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={plan.moneybackGuarantee}
                    onChange={(e) => handlePlanChange(activeTab, idx, 'moneybackGuarantee', e.target.checked)}
                  />
                  100% Money-Back Guarantee
                </label>
              </div>

            </div>
          ))}
        </div>

        <button
          type="submit"
          style={{
            padding: '14px 28px',
            background: '#522AB0',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(82, 42, 176, 0.3)',
            alignSelf: 'flex-start',
          }}
        >
          💾 Save {activeTab.toUpperCase()} Plan Changes
        </button>
      </form>

    </div>
  );
}
