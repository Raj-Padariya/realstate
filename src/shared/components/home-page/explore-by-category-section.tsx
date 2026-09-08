'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  LandPlot,
  Building2,
  Castle,
  Home,
  Store,
  Briefcase,
  Trees,
  Sparkles,
} from 'lucide-react';

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
  pillBg: string;
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
    pillBg: '#16A34A',
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
    pillBg: '#522AB0',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'builder-floors',
    title: 'Builder Floors & Penthouses',
    description: 'Independent Low-Rise Residences',
    count: '340+ Properties',
    href: '/properties?category=builder-floor',
    icon: <Home className="w-6 h-6" />,
    bgColor: '#FFF6D6',
    iconBg: '#FFFFFF',
    iconColor: '#B45309',
    pillBg: '#B45309',
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
    pillBg: '#BE185D',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'commercial-shops',
    title: 'Commercial Shops & Showrooms',
    description: 'High-Footfall Main Road Retail Spaces',
    count: '410+ Properties',
    href: '/properties?category=commercial',
    icon: <Store className="w-6 h-6" />,
    bgColor: '#E0F2FE',
    iconBg: '#FFFFFF',
    iconColor: '#0284C7',
    pillBg: '#0284C7',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'office-spaces',
    title: 'Office Spaces & IT Parks',
    description: 'Grade-A Furnished Modern Workspaces',
    count: '380+ Properties',
    href: '/properties?category=commercial',
    icon: <Briefcase className="w-6 h-6" />,
    bgColor: '#F3E8FF',
    iconBg: '#FFFFFF',
    iconColor: '#7E22CE',
    pillBg: '#7E22CE',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'farm-houses',
    title: 'Farm Houses & Weekend Villas',
    description: 'Serene Greenery & Private Living',
    count: '160+ Properties',
    href: '/properties?category=villas',
    icon: <Trees className="w-6 h-6" />,
    bgColor: '#ECFDF5',
    iconBg: '#FFFFFF',
    iconColor: '#059669',
    pillBg: '#059669',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'studio-apartments',
    title: 'Studio Apartments & 1 RK',
    description: 'Compact Units with High Rental Yield',
    count: '95+ Properties',
    href: '/properties?category=studio',
    icon: <Sparkles className="w-6 h-6" />,
    bgColor: '#FEF3C7',
    iconBg: '#FFFFFF',
    iconColor: '#D97706',
    pillBg: '#D97706',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
  },
];

export function ExploreByCategorySection() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Drag-to-scroll interaction state
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeftStart = React.useRef(0);
  const hasMoved = React.useRef(false);

  const checkScroll = React.useCallback(() => {
    const node = scrollContainerRef.current;
    if (!node) return;
    const { scrollLeft, scrollWidth, clientWidth } = node;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  React.useEffect(() => {
    const node = scrollContainerRef.current;
    if (!node) return;

    checkScroll();
    node.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      node.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  function scroll(direction: 'left' | 'right') {
    const node = scrollContainerRef.current;
    if (!node) return;

    const firstCard = node.querySelector<HTMLElement>('.explore-cat-card');
    const cardStep = firstCard ? firstCard.offsetWidth + 20 : 300;
    const distance = window.innerWidth < 768 ? cardStep : cardStep * 2;

    if (direction === 'left') {
      if (node.scrollLeft <= 10) {
        // Loop to the end if already at the beginning
        node.scrollTo({ left: node.scrollWidth - node.clientWidth, behavior: 'smooth' });
      } else {
        node.scrollBy({ left: -distance, behavior: 'smooth' });
      }
    } else {
      if (node.scrollLeft + node.clientWidth >= node.scrollWidth - 10) {
        // Loop back to start if at the end
        node.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        node.scrollBy({ left: distance, behavior: 'smooth' });
      }
    }
  }

  // Mouse drag support for desktop slider
  const handleMouseDown = (e: React.MouseEvent) => {
    const node = scrollContainerRef.current;
    if (!node) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - node.offsetLeft;
    scrollLeftStart.current = node.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const node = scrollContainerRef.current;
    if (!node) return;
    e.preventDefault();
    const x = e.pageX - node.offsetLeft;
    const walk = (x - startX.current) * 1.3;
    if (Math.abs(walk) > 4) {
      hasMoved.current = true;
    }
    node.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

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
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              ✨ EXPLORE BY CATEGORY
            </span>
            <h2 style={{ marginTop: '14px', marginBottom: '6px', fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 800 }}>
              Apartments, Villas, Land &amp; More
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '15px' }}>
              Discover verified zero-brokerage properties organized by category across Gujarat
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              aria-label="Previous categories"
              onClick={() => scroll('left')}
              className="nav-arrow"
              title="Previous categories"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next categories"
              onClick={() => scroll('right')}
              className="nav-arrow"
              title="Next categories"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="explore-cat-grid"
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '16px',
            paddingTop: '6px',
            scrollBehavior: 'smooth',
            cursor: 'grab',
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="explore-cat-card"
              onClick={(e) => {
                if (hasMoved.current) {
                  e.preventDefault();
                }
              }}
              style={{
                background: cat.bgColor,
                scrollSnapAlign: 'start',
              }}
            >
              {/* Top Row: Icon & Count Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: cat.iconBg,
                    display: 'grid',
                    placeItems: 'center',
                    color: cat.iconColor,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    flexShrink: 0,
                  }}
                >
                  {cat.icon}
                </div>
                <span
                  style={{
                    background: cat.pillBg,
                    color: '#fff',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                  }}
                >
                  {cat.count}
                </span>
              </div>

              {/* Title & Description Container - Guaranteed Uniform Heights */}
              <div style={{ marginBottom: '18px', flexShrink: 0 }}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#1c1f23',
                    margin: '0 0 6px 0',
                    lineHeight: 1.25,
                    minHeight: '50px',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13.5px',
                    color: '#4a5158',
                    lineHeight: 1.4,
                    minHeight: '38px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {cat.description}
                </p>
              </div>

              {/* Card Image Container - Always aligned across all cards */}
              <div
                className="explore-cat-img-wrap"
                style={{
                  marginTop: 'auto',
                  height: '240px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#e3e6ea',
                  flexShrink: 0,
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="explore-cat-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
                <span className="explore-cat-arrow" aria-hidden="true">
                  <ArrowUpRight className="explore-arrow-icon" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}

export default ExploreByCategorySection;
