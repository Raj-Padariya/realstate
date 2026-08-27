'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderData, TopBarData } from '@/shared/types/cms';
import Button from '@/shared/ui/button';
import HeaderMobile from './header-mobile';
import { Building2, Ruler, Factory, Search, Calendar, ChevronDown } from 'lucide-react';

export interface HeaderProps {
  topBarData: TopBarData;
  headerData: HeaderData;
}

const PROMO_SHOWCASES: Record<string, {
  badge: string;
  headline: string;
  subtitle: string;
  caption: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}> = {
  buy: {
    badge: '#1 NEW RELEASE',
    headline: 'MAKE EVERY MOVE COUNT.',
    subtitle: 'Mahadev Glory, Bopal · 2 & 3 BHK from ₹45 L',
    caption: 'Mahadev Glory · Bopal',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    ctaText: 'EXPLORE RAINMAKER',
    ctaHref: '/properties?city=ahmedabad',
  },
  rent: {
    badge: 'ZERO BROKERAGE',
    headline: 'RENT DIRECT FROM OWNERS.',
    subtitle: 'Godrej Garden City · Furnished 2 & 3 BHK Homes',
    caption: 'Godrej Garden City · SG Highway',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    ctaText: 'BROWSE RENTALS',
    ctaHref: '/properties?deal=rent&city=ahmedabad',
  },
  commercial: {
    badge: 'GRADE A HUBS',
    headline: 'SCALE YOUR BUSINESS.',
    subtitle: 'Mondeal Heights, SG Highway · Retail & Offices',
    caption: 'Mondeal Heights · SG Highway',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    ctaText: 'EXPLORE SPACES',
    ctaHref: '/properties?type=commercial',
  },
  newProjects: {
    badge: 'RERA VERIFIED',
    headline: 'FUTURE OF LUXURY LIVING.',
    subtitle: 'Adani Shantigram · 600-Acre Golf Township',
    caption: 'Adani Shantigram · Ahmedabad',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    ctaText: 'VIEW LAUNCHES',
    ctaHref: '/projects',
  },
  services: {
    badge: 'DOORSTEP EXPRESS',
    headline: 'LEGAL MADE SIMPLE.',
    subtitle: 'Government Verified E-Stamp & Rental Agreement in 24h',
    caption: 'Govt E-Stamp Verified',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    ctaText: 'GET AGREEMENT',
    ctaHref: '/services',
  },
};

export function Header({ topBarData, headerData }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = (menuKey: string) => {
    setOpenMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navMenus = [
    { key: 'buy', label: 'Buy', data: headerData.buyMenu, isMega: true },
    { key: 'rent', label: 'Rent', data: headerData.rentMenu, isMega: true },
    { key: 'commercial', label: 'Commercial', data: headerData.commercialMenu, isMega: true },
    { key: 'newProjects', label: 'New Projects', data: headerData.newProjectsMenu, isMega: true },
    { key: 'services', label: 'Services', data: headerData.servicesMenu, isMega: true },
  ];

  const isMenuRouteActive = (key: string) => {
    if (!pathname) return false;
    if (key === 'buy') {
      return pathname.startsWith('/properties') && !pathname.includes('category=Services') && !pathname.includes('commercial');
    }
    if (key === 'rent') {
      return pathname.startsWith('/rent-agreement') || pathname.startsWith('/tenant-plans');
    }
    if (key === 'commercial') {
      return pathname.includes('/commercial');
    }
    if (key === 'newProjects') {
      return pathname.startsWith('/projects');
    }
    if (key === 'services') {
      return pathname.startsWith('/services') || pathname.includes('category=Services');
    }
    return false;
  };

  return (
    <>
      <div className="topbar">
        <div style={{ width: '100%', maxWidth: '100%', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '32px', textAlign: 'center' }}>
          <span>
            <b>{topBarData?.highlightText || 'ZERO BROKERAGE PLATFORM'}</b> &nbsp;|&nbsp; {topBarData?.middleText || 'Connect directly with verified property owners.'}{' '}
            &nbsp;|&nbsp; {topBarData?.endText || 'Post property →'}
          </span>
        </div>
      </div>

      <header ref={headerRef}>
        <div style={{ width: '100%', maxWidth: '100%', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px', gap: '16px' }}>
          
          {/* LOGO - EXTREME LEFT */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
            <Link className="logo" href="/">
              <span className="mark">{headerData.logoMark}</span>
              <span className="wm">
                {headerData.logoPrefix}
                <em>{headerData.logoSuffix}</em>
              </span>
            </Link>
          </div>

          {/* MENU - CENTER ALIGNED WITH HOME & HIGHLIGHTED DHOLERA SIR */}
          <div className="header-nav-center" style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
            <ul className="menu" id="menu" style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}>
              
              {/* HOME LINK */}
              <li>
                <Link 
                  href="/" 
                  className={`mtrig ${pathname === '/' ? 'active-nav-link' : ''}`}
                  style={{ fontWeight: 700, color: 'var(--ink)' }}
                >
                  Home
                </Link>
              </li>

              {navMenus.map((menu) => {
                const isOpen = openMenu === menu.key;
                const isActive = isMenuRouteActive(menu.key);
                return (
                  <li
                    key={menu.key}
                    className={`has-mega ${isOpen ? 'open' : ''}`}
                    onMouseEnter={() => setOpenMenu(menu.key)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      className={`mtrig ${isActive ? 'active-nav-link' : ''}`}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleMenu(menu.key)}
                    >
                      {menu.label}
                      <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 9.5l6 6 6-6" />
                      </svg>
                    </button>

                    <div
                      className="mega"
                      style={
                        isOpen
                          ? {
                              display: 'block',
                              opacity: 1,
                              visibility: 'visible',
                              pointerEvents: 'auto',
                              transform: 'none',
                            }
                          : undefined
                      }
                    >
                      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: '36px', padding: '26px 32px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, minWidth: 0 }}>
                          {/* Link Columns */}
                          <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
                            {menu.data?.columns?.map((col, cIdx) => (
                              <div key={cIdx} className="mcol" style={{ minWidth: '170px', maxWidth: '240px' }}>
                                <h4>{col.title}</h4>
                                {col.links?.map((link, lIdx) => (
                                  <Link key={lIdx} href={link.href} onClick={() => setOpenMenu(null)}>
                                    {link.title || (link as any).label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>

                          {/* DOWNLOAD APP STRIP */}
                          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '14px', marginTop: 'auto' }}>
                            <div style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                              Download the GujjuProperty App:
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <a href="https://apple.com/app-store" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', height: '32px' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" style={{ height: '32px', width: 'auto' }} />
                              </a>
                              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', height: '32px' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: '32px', width: 'auto' }} />
                              </a>
                            </div>
                          </div>
                        </div>

                        {(() => {
                          const showcase = PROMO_SHOWCASES[menu.key] || PROMO_SHOWCASES.buy;
                          return (
                            <Link
                              href={showcase.ctaHref}
                              className="mpromo-cinematic"
                              onClick={() => setOpenMenu(null)}
                              style={{ width: '520px', flexShrink: 0 }}
                            >
                              <div className="mpromo-neon-badge">
                                {showcase.badge}
                              </div>

                              <div className="mpromo-visual">
                                <img
                                  src={showcase.image}
                                  alt={showcase.headline}
                                />
                                <div className="mpromo-visual-overlay">
                                  <span className="mpromo-visual-caption">
                                    {showcase.caption}
                                  </span>
                                </div>
                              </div>

                              <div className="mpromo-cinematic-body">
                                <h4 className="mpromo-cinematic-headline">
                                  {showcase.headline}
                                </h4>
                                <p className="mpromo-cinematic-sub">
                                  {showcase.subtitle}
                                </p>
                                <span className="mpromo-cinematic-btn">
                                  {showcase.ctaText} →
                                </span>
                              </div>
                            </Link>
                          );
                        })()}
                      </div>
                    </div>
                  </li>
                );
              })}

              {/* FOR OWNERS DROPDOWN */}
              <li
                className={`has-dd ${openMenu === 'owners' ? 'open' : ''}`}
                onMouseEnter={() => setOpenMenu('owners')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`mtrig ${pathname === '/owner' ? 'active-nav-link' : ''}`}
                  type="button"
                  aria-expanded={openMenu === 'owners'}
                  onClick={() => toggleMenu('owners')}
                >
                  For Owners
                  <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9.5l6 6 6-6" />
                  </svg>
                </button>

                <div
                  className="dd"
                  style={
                    openMenu === 'owners'
                      ? {
                          display: 'block',
                          opacity: 1,
                          visibility: 'visible',
                          pointerEvents: 'auto',
                          transform: 'none',
                        }
                      : undefined
                  }
                >
                  {headerData.forOwnersLinks.map((link, lIdx) => (
                    <Link key={lIdx} href={link.href} onClick={() => setOpenMenu(null)}>
                      {link.title}
                    </Link>
                  ))}
                </div>
              </li>

              {/* DHOLERA SIR HIGHLIGHTED DROPDOWN BUTTON */}
              <li
                className={`has-dd ${openMenu === 'dholera' ? 'open' : ''}`}
                onMouseEnter={() => setOpenMenu('dholera')}
                onMouseLeave={() => setOpenMenu(null)}
                style={{ marginLeft: '4px' }}
              >
                <button
                  className={`dholera-nav-highlight ${pathname?.startsWith('/dholera-sir') ? 'active-nav-link' : ''}`}
                  type="button"
                  aria-expanded={openMenu === 'dholera'}
                  onClick={() => toggleMenu('dholera')}
                >
                  <span className="pulse-green-dot" style={{ marginRight: '4px' }} />
                  <span>Dholera SIR</span>
                  <svg className="chev" viewBox="0 0 24 24" aria-hidden="true" style={{ width: '14px', height: '14px', marginLeft: '2px' }}>
                    <path d="M6 9.5l6 6 6-6" />
                  </svg>
                </button>

                <div
                  className="dd"
                  style={
                    openMenu === 'dholera'
                      ? {
                          display: 'block',
                          opacity: 1,
                          visibility: 'visible',
                          pointerEvents: 'auto',
                          transform: 'none',
                        }
                      : undefined
                  }
                >
                  <Link href="/dholera-sir" onClick={() => setOpenMenu(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 className="w-4 h-4 text-[#522AB0]" />
                    <span>Dholera SIR Overview</span>
                  </Link>
                  <Link href="/dholera-sir#plots" onClick={() => setOpenMenu(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Ruler className="w-4 h-4 text-[#522AB0]" />
                    <span>Residential &amp; Commercial Plots</span>
                  </Link>
                  <Link href="/dholera-sir#infra" onClick={() => setOpenMenu(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Factory className="w-4 h-4 text-[#522AB0]" />
                    <span>Semiconductor &amp; Smart Infrastructure</span>
                  </Link>
                  <Link href="/properties?search=Dholera" onClick={() => setOpenMenu(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search className="w-4 h-4 text-[#522AB0]" />
                    <span>View Dholera Listings</span>
                  </Link>
                  <Link href="/contact?subject=Dholera+SIR+Visit" onClick={() => setOpenMenu(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar className="w-4 h-4 text-[#522AB0]" />
                    <span>Book Dholera Site Visit</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* ACTION BUTTONS - EXTREME RIGHT */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/login">
              <Button variant="grey" size="sm">
                {headerData.loginBtnText}
              </Button>
            </Link>
            <Link href="/post-property">
              <Button size="sm">
                {headerData.postPropertyBtnText}
              </Button>
            </Link>

            <button
              className="menu-btn"
              type="button"
              aria-label="Open side menu"
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <span>Menu</span>
            </button>
          </div>

        </div>
      </header>

      <HeaderMobile
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        headerData={headerData}
      />

      {/* BLURRY SCRIM BACKDROP FOR WEBPAGE ONLY */}
      <div
        className={`mega-backdrop ${openMenu ? 'open' : ''}`}
        onClick={() => setOpenMenu(null)}
      />
    </>
  );
}

export default Header;
