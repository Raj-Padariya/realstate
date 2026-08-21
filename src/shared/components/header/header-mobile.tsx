'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderData } from '@/shared/types/cms';

export interface HeaderMobileProps {
  headerData: HeaderData;
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderMobile({ headerData, isOpen, onClose }: HeaderMobileProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    contact: true, // Contact Us open by default as in screenshot
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { title: 'Post Your Property', href: '/post-property', highlight: true },
    { title: 'Rental Agreement', href: '/rent-agreement' },
    { title: 'Painting & Cleaning', href: '/properties?category=Services' },
    { title: 'Packers and Movers', href: '/properties?category=Services' },
    { title: 'Refer & Earn', href: '/refer-earn' },
    { title: 'Rent Receipts', href: '/rent-receipts' },
    { title: 'Tenant Plans', href: '/tenant-plans' },
    { title: 'Owner Plans', href: '/tenant-plans?tab=owner' },
    { title: 'Buyer Plans', href: '/buyer-plans' },
    { title: 'Seller Plans', href: '/buyer-plans?tab=seller' },
    {
      title: 'Real Estate Blogs & News',
      key: 'blogs',
      hasDropdown: true,
      subLinks: [
        { title: '📑 All Articles & Guides', href: '/blogs' },
        { title: '📈 Market Insights 2026', href: '/blogs' },
        { title: '⚖️ Legal & 7/12 Extract Advice', href: '/blogs' },
        { title: '🔑 Rental Tips & Direct Deals', href: '/blogs' },
        { title: '💡 First-Time Buyer Checklist', href: '/blogs' },
      ],
    },
    { title: 'Corporate Partnership', href: '/corporate-solutions' },
    {
      title: 'Commercial Plans',
      key: 'commercial',
      hasDropdown: true,
      subLinks: [
        { title: 'Commercial Rent', href: '/post-property/commercial?type=Rent' },
        { title: 'Commercial Sale', href: '/post-property/commercial?type=Sale' },
        { title: 'Office Space', href: '/properties?type=Office+Space' },
        { title: 'Shop & Showroom', href: '/properties?type=Shop+%26+Showroom' },
      ],
    },
    { title: 'Contact Us', href: '/contact' },
    { title: 'Careers', href: '/careers' },
  ];

  return (
    <>
      <div className={`scrim ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`} aria-label="Side Menu">
        <div className="dhead">
          <Link href="/" className="logo" onClick={onClose}>
            <span className="mark">{headerData?.logoMark || "GP"}</span>
            <span className="wm">
              {headerData?.logoPrefix || "Gujju"}
              <em>{headerData?.logoSuffix || "Property"}</em>
            </span>
          </Link>
          <button className="dclose" type="button" aria-label="Close menu" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="dbody-menu">
          {menuItems.map((item, idx) => {
            if (item.hasDropdown) {
              const isExpanded = !!expandedSections[item.key!];
              return (
                <div key={idx} className="drawer-item-group">
                  <button
                    type="button"
                    className="drawer-item-btn"
                    onClick={() => toggleSection(item.key!)}
                  >
                    <span>{item.title}</span>
                    <svg
                      className={`chev-icon ${isExpanded ? 'open' : ''}`}
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M6 9.5l6 6 6-6" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="drawer-sublinks">
                      {item.subLinks?.map((sub, sIdx) => (
                        <Link key={sIdx} href={sub.href} onClick={onClose}>
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href || '#'}
                className={`drawer-link ${item.highlight ? 'highlight' : ''}`}
                onClick={onClose}
              >
                {item.title}
              </Link>
            );
          })}

          {/* Contact Us Accordion */}
          <div className="drawer-item-group">
            <button
              type="button"
              className="drawer-item-btn"
              onClick={() => toggleSection('contact')}
            >
              <span>Contact Us</span>
              <svg
                className={`chev-icon ${expandedSections['contact'] ? 'open' : ''}`}
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M6 9.5l6 6 6-6" />
              </svg>
            </button>
            {expandedSections['contact'] && (
              <div className="drawer-contact-body">
                <div className="contact-info">
                  <span className="contact-label">Email</span>
                  <a href="mailto:assist@gujjuproperty.in" className="contact-email">
                    assist@gujjuproperty.in
                  </a>
                </div>
                <div className="contact-socials">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle"
                    aria-label="Facebook"
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.77-1.61 1.56V12h2.74l-.44 3h-2.3v6.8c4.56-.93 8-4.96 8-9.8z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle"
                    aria-label="Twitter"
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle"
                    aria-label="Instagram"
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default HeaderMobile;
