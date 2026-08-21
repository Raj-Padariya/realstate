'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export type PlanTab = 'tenant' | 'buyer' | 'owner' | 'seller';

const ICONS = {
  headset: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#522AB0" strokeWidth="1.8">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f9d58" strokeWidth="2.6">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cross: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2.6">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

interface PlanItem {
  key: string;
  name: string;
  badge?: string;
  tag: string;
  price: string;
  strikePrice?: string;
  validity?: string;
  gstNote?: boolean;
  headerBg: string;
  btnBg: string;
  btnHover?: string;
  expert?: string[];
  feats: [string, string][];
  note?: string;
}

const CATEGORY_DATA: Record<
  PlanTab,
  {
    title: string;
    subtitle: string;
    helpline: string;
    plans: PlanItem[];
    faqs: [string, string][];
  }
> = {
  tenant: {
    title: 'GujjuProperty Tenant Plans',
    subtitle: 'Select any plan and save 100% on brokerage — find your home fast with zero commission.',
    helpline: '+91-89-XXX-XXXX',
    plans: [
      {
        key: 'freedom',
        name: 'Freedom Plan',
        tag: 'Get genuine house owner contacts matching your requirements — reach out directly.',
        price: '999',
        strikePrice: '₹1,499',
        validity: 'Valid for 15 Days',
        headerBg: 'linear-gradient(135deg, #0c8a58, #0f9d58)',
        btnBg: '#0f9d58',
        feats: [
          ['Premium Filters', 'check'],
          ['Number of Contacts', 'Upto 25'],
          ['Instant Property Alerts', 'check'],
          ['Rental Agreement Assistance', 'check'],
          ['Dedicated Relationship Manager', 'cross'],
          ['Rent Negotiation', 'cross'],
        ],
      },
      {
        key: 'relax',
        name: 'Relax Plan',
        badge: 'MOST POPULAR',
        tag: 'Get a Relationship Manager to help you SAVE time & money on your search.',
        price: '2,999',
        strikePrice: '₹4,499',
        validity: 'Valid for 30 Days',
        headerBg: 'linear-gradient(135deg, #083f52, #0c5f7a)',
        btnBg: '#0c5f7a',
        expert: [
          'Contacts owners & fixes meetings',
          'Negotiates rent on your behalf',
          'Provides locality-level expertise',
        ],
        feats: [
          ['Premium Filters', 'check'],
          ['Number of Contacts', 'Upto 50'],
          ['Instant Property Alerts', 'check'],
          ['Rental Agreement Assistance', 'check'],
          ['Dedicated Relationship Manager', 'check'],
          ['Rent Negotiation', 'check'],
        ],
      },
      {
        key: 'assure',
        name: 'Assure Plan',
        tag: 'Find a home through us, or get a 100% money-back refund guarantee.',
        price: '5,499',
        strikePrice: '₹6,999',
        validity: 'Valid for 45 Days',
        headerBg: 'linear-gradient(135deg, #c22c4c, #E23F62)',
        btnBg: '#E23F62',
        expert: [
          'Contacts owners & fixes meetings',
          'Negotiates rent on your behalf',
          'Supports move-in with packers & movers',
        ],
        feats: [
          ['Premium Filters', 'check'],
          ['Number of Contacts', 'Upto 50'],
          ['Instant Property Alerts', 'check'],
          ['Rental Agreement Assistance', 'check'],
          ['Money-Back Guarantee', 'check'],
          ['Rent Negotiation', 'check'],
        ],
      },
    ],
    faqs: [
      ['How does the Assure / Relax / Freedom plan compare?', 'Relax and Assure plan subscribers get a dedicated Relationship Manager and up to 50 qualified owner contacts, while Freedom plan subscribers get up to 25 owner contacts they reach out to on their own. All plans include help creating your rental agreement.'],
      ['What services come with the Relax plan?', 'A dedicated Relationship Manager who works your requirement personally, up to 50 owner contacts, and instant alerts for new properties matching what you are looking for.'],
      ['Will you help me negotiate the rent?', "Rent and deposit are ultimately the owner's call, but on Relax and Assure plans your Relationship Manager will try to negotiate on your behalf."],
      ['How soon can I get a property after subscribing?', 'Most subscribers close within about 3 weeks depending on their location and requirements.'],
    ],
  },

  buyer: {
    title: 'Choose a Buyer Plan and SAVE LAKHS on brokerage.',
    subtitle: 'Get dedicated property experts, price negotiation & verified title listings.',
    helpline: '+91-89-XXX-XXXX',
    plans: [
      {
        key: 'power',
        name: 'Power Plan',
        tag: 'Choose your dream home from lots of options!',
        price: '1,899',
        gstNote: true,
        headerBg: '#1A8F82',
        btnBg: '#1A8F82',
        feats: [
          ['Number of Contacts', 'Upto 25'],
          ['Complimentary legal consultation with experts', 'check'],
          ['Loan Assistance', 'check'],
          ['On-Demand Support', 'check'],
        ],
      },
      {
        key: 'expert',
        name: 'Property Expert Plan',
        badge: 'BEST VALUE',
        tag: 'Get FREE Loan Assistance + 100% Cashback on plan amount* + Property Expert',
        price: '1,999',
        gstNote: true,
        headerBg: '#41208C',
        btnBg: '#41208C',
        expert: [
          'Negotiates to get you the BEST PRICE for the property',
          'FREE Loan Assistance',
          'Finds you the BEST PROPERTY and schedules property visits',
          'FREE Interior Consultation and Design Inspection after finalising property',
        ],
        feats: [
          ['Number of Contacts', 'Upto 50'],
          ['Complimentary legal consultation with experts', 'check'],
          ['FREE Loan Assistance', 'check'],
          ['FREE Interior Design Consultation', 'check'],
        ],
        note: '*100% Cashback T&C Apply',
      },
      {
        key: 'moneyback',
        name: 'Property Expert MoneyBack Plan',
        tag: 'Get Guaranteed property or 100% Refund',
        price: '4,999',
        gstNote: true,
        headerBg: '#522AB0',
        btnBg: '#522AB0',
        expert: [
          'Negotiates to get you the BEST PRICE for the property',
          'FREE Loan Assistance',
          'Finds you the BEST PROPERTY and schedules property visits',
          'FREE Interior Consultation and Design Inspection after finalising property',
        ],
        feats: [
          ['Number of Contacts', 'Upto 50'],
          ['Complimentary legal consultation with experts', 'check'],
          ['FREE Loan Assistance', 'check'],
          ['FREE Interior Design Consultation', 'check'],
        ],
      },
    ],
    faqs: [
      ['What does a Property Expert do?', "Your Property Expert understands your requirements, shortlists matching homes, contacts owners on your behalf, schedules visits and helps negotiate the price — so you don't have to chase leads yourself."],
      ['How does the Property Expert Plan work?', 'Once you subscribe, a dedicated expert is assigned to you within 24 hours. They stay with you through the search, from shortlisting to closing the deal.'],
      ["What if I don't find a house after subscribing to the Expert Plan?", 'Your plan stays active for the full 3-month validity, and your expert keeps sending fresh matches. The MoneyBack Plan additionally guarantees a property or a 100% refund.'],
      ['Are there any hidden charges in the subscription plans?', "No. The listed plan price plus 18% GST is the full cost — there's no brokerage or additional fee."],
    ],
  },

  owner: {
    title: 'GujjuProperty Owner Plans',
    subtitle: 'Get tenants 3x faster without paying any brokerage — verified profiles only.',
    helpline: '+91-89-XXX-XXXX',
    plans: [
      {
        key: 'owner_relax',
        name: 'Relax Owner Plan',
        tag: 'Assisted listing service with dedicated manager to handle tenant inquiries.',
        price: '2,999',
        strikePrice: '₹4,999',
        validity: 'Valid for 30 Days',
        headerBg: 'linear-gradient(135deg, #083f52, #0c5f7a)',
        btnBg: '#0c5f7a',
        expert: [
          'Filters tenant calls as per your preferences',
          'Schedules tenant visits to your house',
          'Rental Agreement assistance',
        ],
        feats: [
          ['Verified Tenant Contacts', 'Upto 25'],
          ['Relationship Manager', 'check'],
          ['Property Promotion Tag', 'check'],
          ['Tenant Background Verification', 'check'],
        ],
      },
      {
        key: 'owner_super',
        name: 'Super Owner Plan',
        badge: 'MOST POPULAR',
        tag: 'Field assistant handles site visits + Premium promotion for top visibility.',
        price: '4,999',
        strikePrice: '₹7,999',
        validity: 'Valid for 45 Days',
        headerBg: 'linear-gradient(135deg, #41208C, #522AB0)',
        btnBg: '#522AB0',
        expert: [
          'Dedicated field assistant shows house to tenants',
          'Professional HD photoshoot of property',
          'Complete rent negotiation & agreement',
        ],
        feats: [
          ['Verified Tenant Contacts', 'Upto 50'],
          ['Field Assistant for Visits', 'check'],
          ['HD Photo & Video Shoot', 'check'],
          ['Tenant Background Check', 'check'],
        ],
      },
      {
        key: 'owner_moneyback',
        name: 'MoneyBack Owner Plan',
        tag: 'Tenant guaranteed within 60 days or get a 100% refund guarantee.',
        price: '6,999',
        strikePrice: '₹9,999',
        validity: 'Valid for 60 Days',
        headerBg: 'linear-gradient(135deg, #c22c4c, #E23F62)',
        btnBg: '#E23F62',
        expert: [
          'Full hands-free rental management',
          'Field assistant handles all site visits',
          '100% Money-back guarantee',
        ],
        feats: [
          ['Verified Tenant Contacts', 'Unlimited'],
          ['Field Assistant for Visits', 'check'],
          ['Money-Back Guarantee', 'check'],
          ['Complete Agreement Support', 'check'],
        ],
      },
    ],
    faqs: [
      ['How quickly will my property be rented out?', 'Over 85% of owner plan subscribers find verified tenants within 2 to 3 weeks.'],
      ['Does a field assistant accompany tenants for visits?', 'Yes, on Super and MoneyBack owner plans, our representative handles physical property visits for you.'],
      ['Are tenant background checks included?', 'Yes, identity checks are included with all owner plans.'],
    ],
  },

  seller: {
    title: 'GujjuProperty Seller Plans',
    subtitle: 'Sell your property faster at maximum market value — 0% commission.',
    helpline: '+91-89-XXX-XXXX',
    plans: [
      {
        key: 'seller_power',
        name: 'Power Seller Plan',
        tag: 'High visibility ad listing with instant buyer inquiry alerts.',
        price: '2,499',
        gstNote: true,
        headerBg: '#1A8F82',
        btnBg: '#1A8F82',
        feats: [
          ['Verified Buyer Inquiries', 'Upto 30'],
          ['3D Virtual Tour / HD Photoshoot', 'check'],
          ['Legal Document Check', 'check'],
          ['On-Demand Support', 'check'],
        ],
      },
      {
        key: 'seller_expert',
        name: 'Property Expert Seller Plan',
        badge: 'TOP CHOICE',
        tag: 'Dedicated seller expert negotiates best price & manages buyer visits.',
        price: '3,999',
        gstNote: true,
        headerBg: '#41208C',
        btnBg: '#41208C',
        expert: [
          'Dedicated seller manager handles buyer inquiries',
          'Expert price negotiation for maximum valuation',
          'Legal title verification assistance',
        ],
        feats: [
          ['Verified Buyer Inquiries', 'Upto 60'],
          ['Dedicated Seller Manager', 'check'],
          ['Buyer Price Negotiation', 'check'],
          ['Legal & Loan Support for Buyer', 'check'],
        ],
      },
      {
        key: 'seller_moneyback',
        name: 'MoneyBack Seller Plan',
        tag: 'Guaranteed buyer match within validity or 100% money-back refund.',
        price: '7,999',
        gstNote: true,
        headerBg: '#522AB0',
        btnBg: '#522AB0',
        expert: [
          'Full dedicated sales management',
          'Field representative manages site visits',
          '100% money-back guarantee',
        ],
        feats: [
          ['Verified Buyer Inquiries', 'Unlimited'],
          ['Dedicated Seller Manager', 'check'],
          ['Money-Back Guarantee', 'check'],
          ['End-to-End Legal Sale Deed', 'check'],
        ],
      },
    ],
    faqs: [
      ['How do seller plans help me get a higher price?', 'Our property experts evaluate market trends and negotiate directly with serious buyers to get you optimal value.'],
      ['Is there any brokerage charged after sale?', 'No, 0% brokerage. You only pay the one-time plan subscription.'],
    ],
  },
};

export default function MasterPlansComponent({ defaultTab = 'buyer' }: { defaultTab?: PlanTab }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabQuery = searchParams ? (searchParams.get('tab') as PlanTab) : null;
  const initialTab: PlanTab = tabQuery && CATEGORY_DATA[tabQuery] ? tabQuery : defaultTab;

  const [activeTab, setActiveTab] = useState<PlanTab>(initialTab);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (tabQuery && CATEGORY_DATA[tabQuery]) {
      setActiveTab(tabQuery);
    }
  }, [tabQuery]);

  const handleTabChange = (tab: PlanTab) => {
    setActiveTab(tab);
    setOpenFaqIndex(0);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `?tab=${tab}`);
    }
  };

  const data = CATEGORY_DATA[activeTab];

  return (
    <div style={{ background: '#FAF9FD', minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Open Sans', Arial, sans-serif" }}>
      
      {/* HEADER SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #1C0A3F 0%, #321670 50%, #522AB0 100%)', color: '#fff', padding: '56px 20px 48px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Main Category Switcher Tabs */}
          <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', padding: '6px', borderRadius: '999px', border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '32px', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
            {(['tenant', 'buyer', 'owner', 'seller'] as PlanTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  border: 'none',
                  background: activeTab === tab ? '#FEDC00' : 'transparent',
                  color: activeTab === tab ? '#321670' : '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === tab ? '0 4px 14px rgba(254, 220, 0, 0.4)' : 'none',
                }}
              >
                {tab === 'tenant' && 'Tenant Plans'}
                {tab === 'buyer' && 'Buyer Plans'}
                {tab === 'owner' && 'Owner Plans'}
                {tab === 'seller' && 'Seller Plans'}
              </button>
            ))}
          </div>

          <h1 style={{ fontSize: '34px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.25 }}>
            {data.title}
          </h1>

          <p style={{ fontSize: '16px', color: '#d9cdf2', margin: '0 0 24px', lineHeight: 1.6, maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>
            {data.subtitle}
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', padding: '8px 20px', borderRadius: '999px', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '13.5px' }}>
            <span>Need Help Choosing? Call Expert Helpline:</span>
            <strong style={{ color: '#FEDC00' }}>{data.helpline}</strong>
          </div>

        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1200px', marginTop: '48px' }}>
        
        {/* CARDS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
          {data.plans.map((plan) => (
            <div
              key={plan.key}
              style={{
                background: '#fff',
                borderRadius: '24px',
                border: plan.badge ? '2px solid #522AB0' : '1px solid #EBE6F7',
                boxShadow: plan.badge ? '0 12px 40px rgba(82, 42, 176, 0.15)' : '0 6px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#FEDC00', color: '#321670', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.5px' }}>
                  {plan.badge}
                </div>
              )}

              {/* Card Top Header */}
              <div style={{ background: plan.headerBg, color: '#fff', padding: '28px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px' }}>{plan.name}</h3>
                  <p style={{ fontSize: '13px', opacity: 0.9, margin: 0, lineHeight: 1.4 }}>{plan.tag}</p>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 800 }}>₹{plan.price}</span>
                  {plan.strikePrice && <span style={{ fontSize: '14px', textDecoration: 'line-through', opacity: 0.7 }}>{plan.strikePrice}</span>}
                  {plan.validity && <span style={{ fontSize: '12px', opacity: 0.8, marginLeft: 'auto' }}>{plan.validity}</span>}
                  {plan.gstNote && <span style={{ fontSize: '12px', opacity: 0.8 }}>+ 18% GST</span>}
                </div>
              </div>

              {/* Expert Included List */}
              {plan.expert && (
                <div style={{ background: '#EFE9FB', padding: '16px 24px', borderBottom: '1px solid #EBE6F7' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', marginBottom: '8px' }}>
                    What your relationship expert does:
                  </div>
                  {plan.expert.map((exp, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '12.5px', color: '#41208C', marginBottom: '4px', fontWeight: 600 }}>
                      <span>✓</span>
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Feature List */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  {plan.feats.map(([label, val], idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', color: 'var(--ink)' }}>
                      <span>{label}</span>
                      <span>
                        {val === 'check' && ICONS.check}
                        {val === 'cross' && ICONS.cross}
                        {val !== 'check' && val !== 'cross' && <strong style={{ color: '#522AB0' }}>{val}</strong>}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  {plan.note && <div style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center', marginBottom: '12px' }}>{plan.note}</div>}
                  <Link
                    href={`/contact?plan=${plan.key}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      background: plan.btnBg,
                      color: '#fff',
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '14.5px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Subscribe Now →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* FAQs SECTION */}
        <div style={{ marginTop: '64px', background: '#fff', borderRadius: '24px', padding: '40px', border: '1px solid #EBE6F7', boxShadow: '0 6px 24px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#41208C', margin: '0 0 24px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
            {data.faqs.map(([q, a], idx) => (
              <div key={idx} style={{ border: '1px solid #EBE6F7', borderRadius: '12px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: '#FAF9FD',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 800,
                    fontSize: '15px',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{q}</span>
                  <span style={{ fontSize: '18px', color: '#522AB0' }}>{openFaqIndex === idx ? '−' : '+'}</span>
                </button>

                {openFaqIndex === idx && (
                  <div style={{ padding: '20px', fontSize: '14px', color: 'var(--body)', lineHeight: 1.6, background: '#fff', borderTop: '1px solid #EBE6F7' }}>
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
