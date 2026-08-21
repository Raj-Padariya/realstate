'use client';

import React from 'react';
import Link from 'next/link';
import cmsDataRaw from '@/shared/data/mockCmsData.json';
import { CmsData } from '@/shared/types/cms';
import { useProperties } from '@/shared/context/PropertyContext';
import {
  Building2,
  CheckCircle2,
  Mail,
  Users,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  CreditCard,
  FileText,
} from 'lucide-react';

const cmsData = cmsDataRaw as unknown as CmsData;

export default function AdminDashboardPage() {
  const { properties } = useProperties();
  const listings = properties;
  const verifiedCount = listings.filter((l) => l.badgeText.toLowerCase().includes('verified')).length;

  const stats = [
    { label: 'Total Properties Listed', value: listings.length, change: '+12% this month', icon: Building2, color: '#522AB0' },
    { label: 'Verified Title Owners', value: verifiedCount, change: '100% Direct Owners', icon: CheckCircle2, color: '#0f9d58' },
    { label: 'Contact Inquiries', value: '48 Leads', change: '12 New Callbacks', icon: Mail, color: '#41208C', href: '/admin/leads' },
    { label: 'Registered Users', value: '342 Users', change: '100% OTP Verified', icon: Users, color: '#1B63D5', href: '/admin/leads?tab=signups' },
  ];

  const recentLeads = [
    { name: 'Aarav Patel', type: 'Contact Inquiry', topic: 'General Inquiry', phone: '+91 98XXX XXXXX', date: 'Just now', status: 'New' },
    { name: 'Ramesh Shah', type: 'Contact Inquiry', topic: 'Post Property Help', phone: '+91 98XXX XXXXX', date: '25m ago', status: 'New' },
    { name: 'Rohan Deshmukh', type: 'New User Signup', topic: 'Buyer Account', phone: '+91 98XXX XXXXX', date: '1h ago', status: 'OTP Verified' },
    { name: 'Kavita Patel', type: 'New User Signup', topic: 'Owner Account', phone: '+91 98XXX XXXXX', date: '2h ago', status: 'OTP Verified' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '100%' }}>
      {/* PAGE TITLE & QUICK ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#111827' }}>
            Admin Control Center Overview
          </h1>
          <p style={{ margin: '4px 0 0', color: '#6B7280', fontSize: '14px' }}>
            Manage property listings, contact inquiries, user signups, and owner subscription plans.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            href="/admin/leads"
            style={{
              background: '#41208C',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '13.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(65, 32, 140, 0.25)',
            }}
          >
            <Mail className="w-4 h-4" /> View All Leads &amp; Signups
          </Link>

          <Link
            href="/admin/properties/new"
            style={{
              background: '#522AB0',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '13.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(82, 42, 176, 0.3)',
            }}
          >
            <PlusCircle className="w-4 h-4 text-[#FEDC00]" /> Add New Property
          </Link>
        </div>
      </div>

      {/* STATS CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {stats.map((st, idx) => {
          const IconComponent = st.icon;
          return (
            <div
              key={idx}
              style={{
                background: '#fff',
                border: '1px solid #EBE6F7',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: `${st.color}15`,
                  color: st.color,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                <IconComponent className="w-6 h-6" />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 700, marginBottom: '4px' }}>
                  {st.label}
                </div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', lineHeight: 1 }}>
                  {st.value}
                </div>
                <div style={{ fontSize: '12px', color: '#0F9D58', fontWeight: 700, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp className="w-3.5 h-3.5" /> {st.change}
                </div>
              </div>

              {st.href && (
                <Link
                  href={st.href}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    color: '#9CA3AF',
                    textDecoration: 'none',
                  }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* TWO COLUMN CONTENT SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* LEFT: RECENT INQUIRIES & USER ACTIVITY TABLE */}
        <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock className="w-5 h-5 text-[#522AB0]" /> Recent Inquiries &amp; User Signups
            </h2>
            <Link href="/admin/leads" style={{ fontSize: '13px', fontWeight: 800, color: '#522AB0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EBE6F7', color: '#6B7280', textAlign: 'left' }}>
                <th style={{ padding: '12px 10px', fontWeight: 700 }}>Name</th>
                <th style={{ padding: '12px 10px', fontWeight: 700 }}>Type</th>
                <th style={{ padding: '12px 10px', fontWeight: 700 }}>Phone</th>
                <th style={{ padding: '12px 10px', fontWeight: 700 }}>Time</th>
                <th style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '14px 10px', fontWeight: 800, color: '#111827' }}>{item.name}</td>
                  <td style={{ padding: '14px 10px', color: '#4B5563' }}>
                    <span style={{ background: '#EFE9FB', color: '#522AB0', padding: '3px 10px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 700 }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px', color: '#374151', fontFamily: 'monospace' }}>{item.phone}</td>
                  <td style={{ padding: '14px 10px', color: '#9CA3AF', fontSize: '12.5px' }}>{item.date}</td>
                  <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                    <span style={{ background: '#FEF3C7', color: '#92400E', padding: '3px 10px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 800 }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT: QUICK ADMIN ACTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #1C0A3F 0%, #321670 100%)', color: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(41, 16, 92, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FEDC00', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              <ShieldCheck className="w-4 h-4" /> System Verification Status
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 10px' }}>
              {verifiedCount} Title Checked Properties
            </h3>
            <p style={{ fontSize: '13px', color: '#d9cdf2', margin: '0 0 16px', lineHeight: 1.5 }}>
              All listings on GujjuProperty undergo advocate 7/12 land record &amp; legal title verification.
            </p>
            <Link href="/admin/properties" style={{ display: 'inline-block', background: '#FEDC00', color: '#1C0A3F', padding: '10px 18px', borderRadius: '10px', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
              Manage Listings →
            </Link>
          </div>

          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: '0 0 14px' }}>
              Quick Navigation
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/admin/plans" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F9FAFB', borderRadius: '10px', color: '#374151', textDecoration: 'none', fontWeight: 700, fontSize: '13.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CreditCard className="w-4 h-4 text-[#522AB0]" /> Subscription Plans
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9CA3AF]" />
              </Link>

              <Link href="/admin/rent-agreements" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F9FAFB', borderRadius: '10px', color: '#374151', textDecoration: 'none', fontWeight: 700, fontSize: '13.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText className="w-4 h-4 text-[#522AB0]" /> Rent Agreements
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9CA3AF]" />
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
