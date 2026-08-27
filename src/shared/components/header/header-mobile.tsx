'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderData } from '@/shared/types/cms';
import {
  Building2,
  Ruler,
  Factory,
  Search,
  Calendar,
  FileText,
  TrendingUp,
  Scale,
  Key,
  Lightbulb,
  Building,
  Store,
  Phone,
  Mail,
  Clock,
  Briefcase,
  ChevronDown
} from 'lucide-react';

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
    { title: 'Blogs', href: '/blogs' },
    {
      title: 'Dholera SIR Smart City',
      key: 'dholera',
      hasDropdown: true,
      subLinks: [
        { title: 'Dholera SIR Overview', href: '/dholera-sir', icon: <Building2 className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Residential & Commercial Plots', href: '/dholera-sir#plots', icon: <Ruler className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Semiconductor & Infrastructure', href: '/dholera-sir#infra', icon: <Factory className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'View Dholera Listings', href: '/properties?search=Dholera', icon: <Search className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Book Dholera Site Visit', href: '/contact?subject=Dholera+SIR+Visit', icon: <Calendar className="w-4 h-4 text-[#522AB0]" /> },
      ],
    },
    {
      title: 'Real Estate Blogs & Articles',
      key: 'blogs',
      hasDropdown: true,
      subLinks: [
        { title: 'All Articles & Guides', href: '/blogs', icon: <FileText className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Market Insights 2026', href: '/blogs', icon: <TrendingUp className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Legal & 7/12 Extract Advice', href: '/blogs', icon: <Scale className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Rental Tips & Direct Deals', href: '/blogs', icon: <Key className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'First-Time Buyer Checklist', href: '/blogs', icon: <Lightbulb className="w-4 h-4 text-[#522AB0]" /> },
      ],
    },
    { title: 'Corporate Partnership', href: '/corporate-solutions' },
    {
      title: 'Commercial Plans',
      key: 'commercial',
      hasDropdown: true,
      subLinks: [
        { title: 'Commercial Rent', href: '/post-property/commercial?type=Rent', icon: <Key className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Commercial Sale', href: '/post-property/commercial?type=Sale', icon: <Building className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Office Space', href: '/properties?type=Office+Space', icon: <Briefcase className="w-4 h-4 text-[#522AB0]" /> },
        { title: 'Shop & Showroom', href: '/properties?type=Shop+%26+Showroom', icon: <Store className="w-4 h-4 text-[#522AB0]" /> },
      ],
    },
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
                    <ChevronDown
                      className={`chev-icon ${isExpanded ? 'open' : ''} w-4 h-4`}
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>
                  {isExpanded && (
                    <div className="drawer-sublinks">
                      {item.subLinks?.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={onClose}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          {sub.icon}
                          <span>{sub.title}</span>
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
              <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Contact Us</span>
              <ChevronDown
                className={`chev-icon ${expandedSections.contact ? 'open' : ''} w-4 h-4`}
                style={{
                  transform: expandedSections.contact ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>
            {expandedSections.contact && (
              <div className="drawer-contact-body" style={{ padding: '16px 18px', background: '#fafbfc' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  <a
                    href="tel:+919876543210"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      background: '#ffffff',
                      border: '1px solid var(--line)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-lt)', display: 'grid', placeItems: 'center', color: 'var(--brand)', flexShrink: 0 }}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Toll Free Helpline</span>
                      <b style={{ fontSize: '13.5px', color: 'var(--brand)', fontWeight: 800 }}>+91 98765 43210</b>
                    </div>
                  </a>

                  <a
                    href="mailto:support@gujjuproperty.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      background: '#ffffff',
                      border: '1px solid var(--line)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-lt)', display: 'grid', placeItems: 'center', color: 'var(--brand)', flexShrink: 0 }}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email Support</span>
                      <b style={{ fontSize: '12.5px', color: 'var(--ink)', fontWeight: 700 }}>support@gujjuproperty.com</b>
                    </div>
                  </a>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: '#F3F4F6',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      color: 'var(--muted)',
                      fontWeight: 600,
                    }}
                  >
                    <Clock className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                    <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
                  </div>
                </div>

                {/* SOCIAL MEDIA SECTION */}
                <div>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Follow Us
                  </span>
                  <div className="contact-socials" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* Facebook */}
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-circle"
                      title="Facebook"
                      style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: '#1877F2', background: '#fff', transition: 'all 0.15s' }}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-circle"
                      title="Instagram"
                      style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: '#E4405F', background: '#fff', transition: 'all 0.15s' }}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-circle"
                      title="YouTube"
                      style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: '#FF0000', background: '#fff', transition: 'all 0.15s' }}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-circle"
                      title="LinkedIn"
                      style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: '#0A66C2', background: '#fff', transition: 'all 0.15s' }}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-circle"
                      title="WhatsApp"
                      style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: '#25D366', background: '#fff', transition: 'all 0.15s' }}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </a>
                  </div>
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
