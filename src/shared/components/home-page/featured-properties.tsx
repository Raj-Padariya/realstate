'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import mockCmsData from '@/shared/data/mockCmsData.json';

type FeaturedListing = (typeof mockCmsData.featuredProperties.listings)[number];

const data = mockCmsData.featuredProperties;

const listings: FeaturedListing[] = data.listings;

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 6px',
        background: '#fff',
        border: '1px solid #EBE6F7',
        borderRadius: '10px',
        minWidth: 0,
      }}
    >
<span style={{ fontSize: '15px', color: '#1c1f23', fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{value}</span>
      <span style={{ fontSize: '10.5px', color: '#6b7280', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '6px' }}>
        {label}
      </span>
    </div>
  );
}

export function FeaturedProperties() {
  return (
    <section className="sec" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="sec-head sec-head--row">
          <div>
            <span
              className="eyebrow"
              style={{ color: '#522AB0', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, fontSize: '12px' }}
            >
              FEATURED IN PUNE
            </span>
            <h2 style={{ marginTop: '10px' }}>Owner listings worth a visit</h2>
            <p>{data.description}</p>
          </div>
          <Link className="seeall" href={data.seeAllHref}>
            All 248 in Pune &rarr;
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '22px',
          }}
          className="featured-grid"
        >
          {listings.map((p) => {
            const possession = 'Ready';
            return (
              <article
                key={p.id}
                style={{
                  background: '#fff',
                  border: '1px solid #EBE6F7',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    background: '#F1ECFB',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: '#fff',
                      color: '#0f9d58',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    }}
                  >
                    <Check className="w-[14px] h-[14px]" strokeWidth={3} />
                    {p.badgeText}
                  </span>
                </div>

                <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: '#1c1f23' }}>{p.price}</span>
                    <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>{p.pricePerSqFt}</span>
                  </div>

                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1c1f23', lineHeight: 1.35 }}>
                    {p.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#4a5158' }}>{p.address}</p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '8px',
                    }}
                  >
                    <StatBlock value={p.bhk} label="BHK" />
                    <StatBlock value={p.areaSqFt} label="SQ.FT" />
                    <StatBlock value="2" label="BATH" />
                    <StatBlock value={possession} label="POSSESSION" />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#0f9d58',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Check className="w-[14px] h-[14px]" strokeWidth={3} />
                      ₹0 brokerage
                    </span>
                    <Link
                      href={`/properties?id=${p.id}`}
                      className="btn btn-p"
                      style={{ padding: '10px 20px', fontSize: '14px' }}
                    >
                      {data.ctaText}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 980px) {
          .featured-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 640px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export default FeaturedProperties;