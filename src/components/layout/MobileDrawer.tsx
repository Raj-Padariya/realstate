'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderData } from '@/types/cms';
import { Button } from '../common/Button';

export interface MobileDrawerProps {
  headerData: HeaderData;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ headerData, isOpen, onClose }) => {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className={`scrim ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`} aria-label="Menu">
        <div className="dhead">
          <Link href="/" className="logo" onClick={onClose}>
            <span className="mark">{headerData.logoMark}</span>
            <span className="wm">
              {headerData.logoPrefix}
              <em>{headerData.logoSuffix}</em>
            </span>
          </Link>
          <button className="dclose" type="button" aria-label="Close menu" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="dbody">
          {headerData.menuItems.map((item) => {
            const isAccOpen = !!openAccordions[item.id];
            return (
              <div key={item.id} className={`acc ${isAccOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  aria-expanded={isAccOpen}
                  onClick={() => toggleAccordion(item.id)}
                >
                  {item.label}
                  <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9.5l6 6 6-6" />
                  </svg>
                </button>
                <div className="apanel">
                  {item.type === 'mega' && item.categories && (
                    <>
                      {item.categories.map((cat, idx) => (
                        <div key={idx}>
                          <h4>{cat.title}</h4>
                          {cat.links.map((link, lIdx) => (
                            <Link key={lIdx} href={link.href} onClick={onClose}>
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </>
                  )}
                  {item.type === 'dropdown' && item.dropdownLinks && (
                    <>
                      {item.dropdownLinks.map((link, lIdx) => (
                        <Link key={lIdx} href={link.href} onClick={onClose}>
                          {link.label}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="dfoot">
          <Button badgeText={headerData.postBadgeText}>{headerData.postBtnText}</Button>
          <Button variant="grey">{headerData.loginBtnText}</Button>
        </div>
      </aside>
    </>
  );
};
