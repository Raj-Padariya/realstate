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
        <div className="wrap">
          <span>
            <b>{topBarData?.highlightText || 'ZERO BROKERAGE PLATFORM'}</b> &nbsp;|&nbsp; {topBarData?.middleText || 'Connect directly with verified property owners.'}{' '}
            &nbsp;|&nbsp; {topBarData?.endText || 'Post property FREE →'}
          </span>
        </div>
      </div>

      <header ref={headerRef}>
        <div className="wrap nav">
          <Link className="logo" href="/">
            <span className="mark">{headerData.logoMark}</span>
            <span className="wm">
              {headerData.logoPrefix}
              <em>{headerData.logoSuffix}</em>
            </span>
          </Link>

          <ul className="menu" id="menu">
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

            {/* BLOGS & NEWS DROPDOWN */}
            <li
              className={`has-dd ${openMenu === 'blogs' ? 'open' : ''}`}
              onMouseEnter={() => setOpenMenu('blogs')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                className="mtrig"
                type="button"
                aria-expanded={openMenu === 'blogs'}
                onClick={() => toggleMenu('blogs')}
              >
                Blogs &amp; News
                <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9.5l6 6 6-6" />
                </svg>
              </button>

              <div
                className="dd"
                style={
                  openMenu === 'blogs'
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
                <Link href="/blogs" onClick={() => setOpenMenu(null)}>
                  📑 All Articles &amp; Guides
                </Link>
                <Link href="/blogs" onClick={() => setOpenMenu(null)}>
                  📈 Market Insights 2026
                </Link>
                <Link href="/blogs" onClick={() => setOpenMenu(null)}>
                  ⚖️ Legal &amp; 7/12 Extract Advice
                </Link>
                <Link href="/blogs" onClick={() => setOpenMenu(null)}>
                  🔑 Rental Tips &amp; Direct Deals
                </Link>
                <Link href="/blogs" onClick={() => setOpenMenu(null)}>
                  💡 First-Time Buyer Checklist
                </Link>
              </div>
            </li>
          </ul>

          <span className="grow" />
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
