'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeaderData, TopBarData } from '@/types/cms';
import { Button } from '../common/Button';
import { MobileDrawer } from './MobileDrawer';
import { useProperties } from '@/shared/context/PropertyContext';
import { ShortlistDrawer } from '../common/ShortlistDrawer';
import { Heart } from 'lucide-react';

export interface HeaderProps {
  topBarData: TopBarData;
  headerData: HeaderData;
}

export const Header: React.FC<HeaderProps> = ({ topBarData, headerData }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { savedIds } = useProperties();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const hasSaved = mounted && savedIds.length > 0;

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>{topBarData.text}</span>
        </div>
      </div>

      <header>
        <div className="wrap nav">
          <Link className="logo" href="/">
            <span className="mark">{headerData.logoMark}</span>
            <span className="wm">
              {headerData.logoPrefix}
              <em>{headerData.logoSuffix}</em>
            </span>
          </Link>

          <ul className="menu" id="menu">
            {headerData.menuItems.map((item) => {
              const isOpen = openMenuId === item.id;
              const isMega = item.type === 'mega';
              const isDropdown = item.type === 'dropdown';

              return (
                <li
                  key={item.id}
                  className={`${isMega ? 'has-mega' : ''} ${isDropdown ? 'has-dd' : ''} ${isOpen ? 'open' : ''}`}
                  onMouseEnter={() => setOpenMenuId(item.id)}
                  onMouseLeave={() => setOpenMenuId(null)}
                >
                  <button
                    className="mtrig"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleMenu(item.id)}
                  >
                    {item.label}
                    <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 9.5l6 6 6-6" />
                    </svg>
                  </button>

                  {isMega && item.categories && (
                    <div className="mega">
                      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '36px', padding: '24px 28px' }}>
                        <div style={{ display: 'flex', gap: '36px', flex: 1, minWidth: 0, flexWrap: 'wrap' }}>
                          {item.categories.map((cat, idx) => (
                            <div key={idx} className="mcol" style={{ minWidth: '170px', maxWidth: '240px' }}>
                              <h4>{cat.title}</h4>
                              {cat.links.map((link, lIdx) => (
                                <Link key={lIdx} href={link.href}>
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>

                        {(() => {
                          const showcase = {
                            builderName: 'Mahadev Group',
                            builderLogo: 'MG',
                            builderSubtitle: 'View Projects',
                            projectTitle: 'Mahadev Glory',
                            location: 'Bopal, Ahmedabad',
                            price: 'Price on Request',
                            specs: '2, 3 BHK Apartments',
                            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
                            ctaText: 'Contact',
                            ctaHref: '/properties?city=ahmedabad',
                          };
                          return (
                            <Link
                              href={showcase.ctaHref}
                              className="mpromo-showcase"
                              onClick={() => setOpenMenuId(null)}
                              style={{ width: '480px', flexShrink: 0 }}
                            >
                              <div className="mpromo-info">
                                <div className="mpromo-builder">
                                  <div className="mpromo-logo">
                                    {showcase.builderLogo}
                                  </div>
                                  <div className="mpromo-builder-text">
                                    <b>{showcase.builderName}</b>
                                    <span>{showcase.builderSubtitle}</span>
                                  </div>
                                </div>

                                <div className="mpromo-title">{showcase.projectTitle}</div>
                                <div className="mpromo-loc">📍 {showcase.location}</div>
                                <div className="mpromo-price">{showcase.price}</div>
                                <div className="mpromo-specs">{showcase.specs}</div>

                                <span className="mpromo-btn">
                                  {showcase.ctaText}
                                </span>
                              </div>

                              <div className="mpromo-imgbox">
                                <img
                                  src={showcase.image}
                                  alt={showcase.projectTitle}
                                />
                              </div>
                            </Link>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {isDropdown && item.dropdownLinks && (
                    <div className="dd">
                      {item.dropdownLinks.map((link, lIdx) => (
                        <Link key={lIdx} href={link.href}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <span className="grow"></span>

          {/* Shortlist Heart Button */}
          <button
            type="button"
            onClick={() => setIsShortlistOpen(true)}
            aria-label="Shortlisted Properties"
            title="View Shortlisted Properties"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1.5px solid #E2E8F0',
              background: hasSaved ? '#FAF5FF' : '#FFFFFF',
              color: hasSaved ? '#E11D48' : '#64748B',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginRight: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#C4B5FD';
              e.currentTarget.style.background = '#F5F3FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.background = hasSaved ? '#FAF5FF' : '#FFFFFF';
            }}
          >
            <Heart
              style={{
                width: 20,
                height: 20,
                fill: hasSaved ? '#E11D48' : 'none',
                color: hasSaved ? '#E11D48' : '#64748B',
                transition: 'all 0.2s ease',
              }}
            />
            {hasSaved && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#E11D48',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 800,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(225, 29, 72, 0.4)',
                  lineHeight: 1,
                }}
              >
                {savedIds.length}
              </span>
            )}
          </button>

          <Link href="/login">
            <Button variant="grey" size="sm">
              {headerData.loginBtnText}
            </Button>
          </Link>
          <Button size="sm">
            {headerData.postBtnText}
          </Button>
          <button
            className="burger"
            type="button"
            aria-label="Open menu"
            aria-expanded={isDrawerOpen}
            onClick={() => setIsDrawerOpen(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileDrawer
        headerData={headerData}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <ShortlistDrawer
        isOpen={isShortlistOpen}
        onClose={() => setIsShortlistOpen(false)}
      />
    </>
  );
};
