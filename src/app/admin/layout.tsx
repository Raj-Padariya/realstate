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
  ChevronRight,
  Sparkles,
  ChevronLeft,
  Home,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useLeads } from '@/shared/context/LeadsContext';

interface NavGroup {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
    isPrimary?: boolean;
  }[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { stats } = useLeads();

  const navGroups: NavGroup[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Property Manager',
      items: [
        { label: 'All Properties', href: '/admin/properties', icon: Building2 },
        { label: 'Add New Property', href: '/admin/properties/new', icon: PlusCircle, isPrimary: true },
      ],
    },
    {
      title: 'CRM & Inquiries',
      items: [
        {
          label: 'Leads & Inquiries',
          href: '/admin/leads',
          icon: Users,
          badge: stats.newCount > 0 ? `${stats.newCount} New` : undefined,
        },
        { label: 'Rent Agreements', href: '/admin/rent-agreements', icon: FileText },
      ],
    },
    {
      title: 'Content & Monetization',
      items: [
        { label: 'News & Blogs Studio', href: '/admin/blogs', icon: Newspaper },
        { label: 'Subscription Plans', href: '/admin/plans', icon: CreditCard },
      ],
    },
  ];

  const getBreadcrumbs = () => {
    if (pathname === '/admin') return [{ label: 'Admin', href: '/admin' }, { label: 'Dashboard' }];
    if (pathname === '/admin/properties') return [{ label: 'Admin', href: '/admin' }, { label: 'Properties' }];
    if (pathname === '/admin/properties/new') return [{ label: 'Admin', href: '/admin' }, { label: 'Properties', href: '/admin/properties' }, { label: 'Create New' }];
    if (pathname?.startsWith('/admin/properties/edit')) return [{ label: 'Admin', href: '/admin' }, { label: 'Properties', href: '/admin/properties' }, { label: 'Edit' }];
    if (pathname === '/admin/leads') return [{ label: 'Admin', href: '/admin' }, { label: 'Leads & CRM' }];
    if (pathname === '/admin/plans') return [{ label: 'Admin', href: '/admin' }, { label: 'Subscription Plans' }];
    if (pathname === '/admin/rent-agreements') return [{ label: 'Admin', href: '/admin' }, { label: 'Rent Agreements' }];
    if (pathname === '/admin/blogs') return [{ label: 'Admin', href: '/admin' }, { label: 'Blogs & News CMS' }];
    return [{ label: 'Admin', href: '/admin' }, { label: 'Control Center' }];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        background: '#0B0F19',
        fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* MOBILE BACKDROP */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 15, 25, 0.8)',
            backdropFilter: 'blur(6px)',
            zIndex: 9998,
          }}
        />
      )}

      {/* LUXURY DARK SIDEBAR */}
      <aside
        style={{
          width: isCollapsed ? '76px' : '260px',
          height: '100vh',
          background: 'linear-gradient(180deg, #110A26 0%, #0F091E 60%, #090414 100%)',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 9999,
          transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* BRAND HEADER */}
        <div
          style={{
            padding: isCollapsed ? '16px 12px' : '16px 18px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            flexShrink: 0,
          }}
        >
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                color: '#FEDC00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '16px',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
                flexShrink: 0,
              }}
            >
              GP
            </div>

            {!isCollapsed && (
              <div>
                <div style={{ fontWeight: 900, fontSize: '15.5px', color: '#FFFFFF', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
                  Gujju<span style={{ color: '#FEDC00' }}>Property</span>
                </div>
                <div style={{ fontSize: '10px', color: '#A78BFA', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '1px' }}>
                  ADMIN SUITE 2.0
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* NAVIGATION STREAM */}
        <nav
          style={{
            padding: isCollapsed ? '12px 6px' : '12px 10px',
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              {!isCollapsed && (
                <div
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 800,
                    color: 'rgba(255, 255, 255, 0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0 8px 4px',
                  }}
                >
                  {group.title}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      title={isCollapsed ? item.label : undefined}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isCollapsed ? 'center' : 'space-between',
                        padding: isCollapsed ? '10px' : '8px 12px',
                        borderRadius: '9px',
                        fontSize: '13px',
                        fontWeight: isActive ? 800 : 600,
                        color: isActive ? '#FFFFFF' : '#94A3B8',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(91, 33, 182, 0.95) 100%)'
                          : 'transparent',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? '0 4px 14px rgba(124, 58, 237, 0.35)' : 'none',
                        border: isActive ? '1px solid rgba(196, 181, 253, 0.3)' : '1px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.color = '#FFFFFF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#94A3B8';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon
                          style={{
                            width: '16px',
                            height: '16px',
                            color: isActive ? '#FEDC00' : '#818CF8',
                            flexShrink: 0,
                          }}
                        />
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>

                      {!isCollapsed && item.badge && (
                        <span
                          style={{
                            background: '#EF4444',
                            color: '#FFFFFF',
                            fontSize: '9.5px',
                            fontWeight: 900,
                            padding: '2px 6px',
                            borderRadius: '999px',
                            boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* SIDEBAR BOTTOM FOOTER */}
        <div
          style={{
            padding: '10px 12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flexShrink: 0,
          }}
        >
          {/* Collapse/Expand button */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '8px',
              padding: '7px 10px',
              borderRadius: '7px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94A3B8',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!isCollapsed && <span>Collapse Sidebar</span>}
          </button>

          {/* View Live Website Link */}
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(82, 42, 176, 0.3) 0%, rgba(65, 32, 140, 0.45) 100%)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 800,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FEDC00')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.3)')}
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FEDC00]" />
            {!isCollapsed && <span>View Live Site</span>}
          </Link>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <div
        style={{
          flex: 1,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#0B0F19',
          minWidth: 0,
        }}
      >
        {/* LUXURY SEAMLESS TOPBAR (Replaced <header> to prevent global css white styling) */}
        <div
          style={{
            background: 'linear-gradient(180deg, #130C2B 0%, #0F091E 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            gap: '16px',
            zIndex: 10,
          }}
        >
          {/* LEFT: BREADCRUMBS & MOBILE TRIGGER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Toggle menu"
              style={{
                display: 'none',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
              }}
            >
              <Menu className="w-5 h-5 text-[#FEDC00]" />
            </button>

            {/* Breadcrumb Trail */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#94A3B8' }}>
              <Home className="w-4 h-4 text-[#A78BFA]" />
              {breadcrumbs.map((b, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  {b.href ? (
                    <Link href={b.href} style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>
                      {b.label}
                    </Link>
                  ) : (
                    <span style={{ color: '#FFFFFF', fontWeight: 800 }}>{b.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* RIGHT: LIVE STATUS, NOTIFICATIONS & ADMIN PROFILE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Live System Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(6, 78, 59, 0.4)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '11.5px',
                color: '#34D399',
                fontWeight: 800,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 8px #10B981',
                }}
              />
              <span>Production Live</span>
            </div>

            {/* Quick Add Button */}
            <Link
              href="/admin/properties/new"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #522AB0 100%)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.35)',
              }}
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#FEDC00]" />
              <span>Add Property</span>
            </Link>

            {/* Notification Bell */}
            <Link
              href="/admin/leads"
              title="Recent Inquiries"
              style={{
                position: 'relative',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                textDecoration: 'none',
              }}
            >
              <Bell className="w-4 h-4" />
              {stats.newCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    background: '#EF4444',
                    color: '#FFFFFF',
                    fontSize: '9px',
                    fontWeight: 900,
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                  }}
                >
                  {stats.newCount}
                </span>
              )}
            </Link>

            {/* Admin Profile Chip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '3px 10px 3px 4px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #522AB0 100%)',
                  color: '#FEDC00',
                  fontWeight: 900,
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                SA
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#F1F5F9' }}>
                Super Admin
              </div>
            </div>
          </div>
        </div>

        {/* SCROLLABLE MAIN CANVAS */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px',
            background: '#0B0F19',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
