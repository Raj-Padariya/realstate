'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HeaderData, TopBarData } from '@/shared/types/cms';
import Button from '@/shared/ui/button';
import HeaderMobile from './header-mobile';

export interface HeaderProps {
  topBarData: TopBarData;
  headerData: HeaderData;
}

export function Header({ topBarData, headerData }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div className="topbar">
        <div style={{ width: '100%', maxWidth: '100%', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '32px', textAlign: 'center' }}>
          <span>
            <b>{topBarData?.highlightText || 'ZERO BROKERAGE PLATFORM'}</b> &nbsp;|&nbsp; {topBarData?.middleText || 'Connect directly with verified property owners.'}{' '}
            &nbsp;|&nbsp; {topBarData?.endText || 'Post property FREE →'}
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
                <Link href="/" className="mtrig" style={{ fontWeight: 700, color: 'var(--ink)' }}>
                  Home
                </Link>
              </li>

              {navMenus.map((menu) => {
                const isOpen = openMenu === menu.key;
                return (
                  <li
                    key={menu.key}
                    className={`has-mega ${isOpen ? 'open' : ''}`}
                    onMouseEnter={() => setOpenMenu(menu.key)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      className="mtrig"
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
                      <div className="wrap megagrid">
                        {menu.data?.columns?.map((col, cIdx) => (
                          <div key={cIdx} className="mcol">
                            <h4>{col.title}</h4>
                            {col.links?.map((link, lIdx) => (
                              <Link key={lIdx} href={link.href} onClick={() => setOpenMenu(null)}>
                                {link.title || (link as any).label}
                              </Link>
                            ))}
                          </div>
                        ))}

                        {menu.data?.promo && (
                          <div className="mpromo">
                            <span className="mk">{menu.data.promo.badge}</span>
                            <b>{menu.data.promo.title}</b>
                            <p>{menu.data.promo.description}</p>
                            <Link href={menu.data.promo.ctaHref || '/properties'} className="mcta" onClick={() => setOpenMenu(null)}>
                              {menu.data.promo.ctaText}
                            </Link>
                          </div>
                        )}
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
                  className="mtrig"
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
                  className="mtrig dholera-nav-item"
                  type="button"
                  aria-expanded={openMenu === 'dholera'}
                  onClick={() => toggleMenu('dholera')}
                  style={{
                    fontWeight: 800,
                    borderBottom: '2.5px solid currentColor',
                    paddingBottom: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    lineHeight: 1.2
                  }}
                >
                  <span>Dholera SIR</span>
                  <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
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
                  <Link href="/dholera-sir" onClick={() => setOpenMenu(null)}>
                    🏙️ Dholera SIR Overview
                  </Link>
                  <Link href="/dholera-sir#plots" onClick={() => setOpenMenu(null)}>
                    📐 Residential &amp; Commercial Plots
                  </Link>
                  <Link href="/dholera-sir#infra" onClick={() => setOpenMenu(null)}>
                    🏭 Semiconductor &amp; Smart Infrastructure
                  </Link>
                  <Link href="/properties?search=Dholera" onClick={() => setOpenMenu(null)}>
                    🔍 View Dholera Listings
                  </Link>
                  <Link href="/contact?subject=Dholera+SIR+Visit" onClick={() => setOpenMenu(null)}>
                    📅 Book Dholera Site Visit
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
              <Button size="sm" badgeText={headerData.postPropertyBadgeText}>
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
    </>
  );
}

export default Header;
