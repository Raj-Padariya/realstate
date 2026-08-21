'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building2,
  PlusCircle,
  CreditCard,
  FileText,
  Newspaper,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Bell,
  Search,
  UserCheck,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Leads & Users', href: '/admin/leads', icon: Users, badge: '5' },
    { label: 'All Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Add New Listing', href: '/admin/properties/new', icon: PlusCircle },
    { label: 'Subscription Plans', href: '/admin/plans', icon: CreditCard },
    { label: 'Rent Agreements', href: '/admin/rent-agreements', icon: FileText },
    { label: 'News & Blogs CMS', href: '/admin/blogs', icon: Newspaper },
  ];

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Admin Dashboard';
    if (pathname === '/admin/leads') return 'Leads & User Management';
    if (pathname === '/admin/properties') return 'Property Listings Manager';
    if (pathname === '/admin/properties/new') return 'Create New Property Listing';
    if (pathname?.startsWith('/admin/properties/edit')) return 'Edit Property Details';
    if (pathname === '/admin/plans') return 'Subscription Plans Management';
    if (pathname === '/admin/rent-agreements') return 'Rental Agreement Requests';
    if (pathname === '/admin/blogs') return 'Real Estate Blogs & News CMS';
    return 'Admin Control Panel';
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#f4f6f9',
        fontFamily: '"Open Sans", sans-serif',
      }}
    >
      {/* MOBILE BACKDROP */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 99,
          }}
        />
      )}

      {/* FIXED ADMIN SIDEBAR */}
      <aside
        style={{
          width: '260px',
          height: '100vh',
          background: '#1A0B36',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          zIndex: 100,
          transition: 'all 0.3s ease',
        }}
      >
        {/* BRAND HEADER */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '38px',
                height: '38px',
                background: 'linear-gradient(135deg, #522AB0, #41208C)',
                color: '#FEDC00',
                borderRadius: '10px',
                display: 'grid',
                placeItems: 'center',
                fontWeight: '800',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(82,42,176,0.5)',
              }}
            >
              GP
            </span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '16px', lineHeight: '1.2', color: '#fff' }}>
                GujjuProperty
              </div>
              <div style={{ fontSize: '11px', color: '#FEDC00', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Admin Control
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav style={{ padding: '20px 12px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', padding: '0 12px 6px', letterSpacing: '0.5px' }}>
            Main Menu
          </div>

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: isActive ? '800' : '600',
                  color: isActive ? '#fff' : '#c3b7e0',
                  background: isActive ? 'linear-gradient(135deg, #522AB0, #41208C)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(82,42,176,0.4)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#FEDC00]' : 'text-[#a493cf]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{ background: '#FEDC00', color: '#1A0B36', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px' }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER LIVE SITE LINK */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <ExternalLink className="w-4 h-4 text-[#FEDC00]" />
            <span>View Live Website</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        style={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          background: '#F4F5F8',
        }}
      >
        {/* TOP BAR HEADER */}
        <header
          style={{
            background: '#fff',
            borderBottom: '1px solid #EBE6F7',
            padding: '16px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              style={{
                display: 'none',
                background: '#FAF9FD',
                border: '1px solid #EBE6F7',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
              }}
            >
              <Menu className="w-5 h-5 text-[#522AB0]" />
            </button>

            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0, lineHeight: 1.2 }}>
                {getPageTitle()}
              </h1>
              <div style={{ fontSize: '12.5px', color: '#6B7280', marginTop: '2px' }}>
                GujjuProperty Admin Portal • Pan-India System
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* System Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#E6F4EA', padding: '6px 14px', borderRadius: '999px', fontSize: '12.5px', color: '#0F9D58', fontWeight: 700 }}>
              <ShieldCheck className="w-4 h-4 text-[#0F9D58]" />
              <span>System Live &amp; Healthy</span>
            </div>

            {/* Admin Profile Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FAF9FD', border: '1px solid #EBE6F7', padding: '6px 14px', borderRadius: '999px' }}>
              <div style={{ width: '28px', height: '28px', background: '#522AB0', color: '#fff', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '12px' }}>
                AD
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                Admin Officer
              </div>
            </div>
          </div>
        </header>

        {/* PAGE BODY CONTENT */}
        <div style={{ padding: '32px 36px', flex: 1 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
