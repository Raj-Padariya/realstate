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
      title: 'Real Estate Blogs & News',
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
              <span>Contact Us</span>
              <ChevronDown
                className={`chev-icon ${expandedSections.contact ? 'open' : ''} w-4 h-4`}
                style={{
                  transform: expandedSections.contact ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>
            {expandedSections.contact && (
              <div className="drawer-sublinks contact-sublinks">
                <a href="tel:+919876543210" className="drawer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone className="w-3.5 h-3.5 text-[#522AB0]" />
                  <span>+91 98765 43210</span>
                </a>
                <a href="mailto:support@gujjuproperty.com" className="drawer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail className="w-3.5 h-3.5 text-[#522AB0]" />
                  <span>support@gujjuproperty.com</span>
                </a>
                <div className="drawer-contact-item text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
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
