'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderData, TopBarData } from '@/types/cms';
import { Button } from '../common/Button';
import { MobileDrawer } from './MobileDrawer';

export interface HeaderProps {
  topBarData: TopBarData;
  headerData: HeaderData;
}

export const Header: React.FC<HeaderProps> = ({ topBarData, headerData }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

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
                      <div className="wrap megagrid">
                        {item.categories.map((cat, idx) => (
                          <div key={idx} className="mcol">
                            <h4>{cat.title}</h4>
                            {cat.links.map((link, lIdx) => (
                              <Link key={lIdx} href={link.href}>
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))}

                        {item.promo && (
                          <div className="mpromo">
                            <span className="mk">{item.promo.badge}</span>
                            <b>{item.promo.title}</b>
                            <p>{item.promo.description}</p>
                            <Link href={item.promo.ctaHref} className="mcta">
                              {item.promo.ctaText}
                            </Link>
                          </div>
                        )}
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
          <Link href="/login">
            <Button variant="grey" size="sm">
              {headerData.loginBtnText}
            </Button>
          </Link>
          <Button size="sm" badgeText={headerData.postBadgeText}>
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
    </>
  );
};
