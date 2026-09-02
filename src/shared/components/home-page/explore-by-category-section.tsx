'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight, LandPlot, Building2, Castle, Home } from 'lucide-react';

type CategoryCard = {
  id: string;
  title: string;
  description: string;
  count: string;
  href: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
  iconColor: string;
  image: string;
};

const CATEGORIES: CategoryCard[] = [
  {
    id: 'land-plots',
    title: 'Residential Land & Plots',
    description: 'NA + NOC Clear Title Plots',
    count: '880+ Properties',
    href: '/properties?category=plots',
    icon: <LandPlot className="w-6 h-6" />,
    bgColor: '#E8F5EC',
    iconBg: '#FFFFFF',
    iconColor: '#16A34A',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'flats-apartments',
    title: 'Flats & Apartments',
    description: '1, 2, 3 & 4 BHK Gated Homes',
    count: '1,240+ Properties',
    href: '/properties?category=apartments',
    icon: <Building2 className="w-6 h-6" />,
    bgColor: '#F1ECFB',
    iconBg: '#FFFFFF',
    iconColor: '#522AB0',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'builder-floors',
    title: 'Builder Floors & Penthouses',
    description: 'Independent Low-Rise Residences',
    count: '340+ Properties',
    href: '/properties?category=builder-floor',
    icon: <Home className="w-6 h-6" />,
    bgColor: '#FFF8DC',
    iconBg: '#FFFFFF',
    iconColor: '#B45309',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'villas-bungalows',
    title: 'Villas & Bungalows',
    description: 'Private Lawn & Luxury Lifestyle',
    count: '210+ Properties',
    href: '/properties?category=villas',
    icon: <Castle className="w-6 h-6" />,
    bgColor: '#FBE7EE',
    iconBg: '#FFFFFF',
    iconColor: '#BE185D',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
  },
];

export function ExploreByCategorySection() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  function scrollBy(direction: 'left' | 'right') {
    const node = scrollContainerRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.8;
    node.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  return (
    <section className="sec" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="sec-head sec-head--row">
          <div>
            <span
              className="eyebrow"
              style={{
                background: '#EFE9FB',
                color: '#522AB0',
                padding: '6px 14px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ✨ EXPLORE BY CATEGORY
            </span>
            <h2 style={{ marginTop: '14px' }}>Apartments, Villas, Land &amp; More</h2>
            <p>Discover verified zero-brokerage properties organized by category across Gujarat</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              aria-label="Previous categories"
              onClick={() => scrollBy('left')}
              className="nav-arrow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next categories"
              onClick={() => scrollBy('right')}
              className="nav-arrow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '20px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '4px',
          }}
          className="explore-cat-grid"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="explore-cat-card"
              style={{
                background: cat.bgColor,
                scrollSnapAlign: 'start',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: cat.iconBg,
                    display: 'grid',
                    placeItems: 'center',
                    color: cat.iconColor,
                    boxShadow: '0 4px 12px rgba(28,31,35,0.06)',
                  }}
                >
                  {cat.icon}
                </div>
                <span
                  style={{
                    background: '#522AB0',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat.count}
                </span>
              </div>

              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#1c1f23', margin: '18px 0 6px', lineHeight: 1.25 }}>
                {cat.title}
              </h3>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#4a5158' }}>{cat.description}</p>

              <div
                style={{
                  marginTop: '18px',
                  height: '170px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#e3e6ea',
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '12px',
                    bottom: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: '0 6px 16px rgba(28,31,35,0.16)',
                  }}
                  aria-hidden="true"
                >
                  <ArrowUpRight className="w-4 h-4" style={{ color: '#1c1f23' }} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .explore-cat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 820px) {
          .explore-cat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 560px) {
          .explore-cat-grid {
            grid-template-columns: 85% !important;
          }
        }
        .explore-cat-card {
          display: block;
          padding: 20px;
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .explore-cat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(28, 31, 35, 0.08);
        }
        .nav-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #fff;
          border: 1.5px solid #e3e6ea;
          color: #1c1f23;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.16s;
        }
        .nav-arrow:hover {
          border-color: #522ab0;
          color: #522ab0;
        }
      `}</style>
    </section>
  );
}

export default ExploreByCategorySection;
