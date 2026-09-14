'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  ExternalLink, 
  MessageSquare, 
  ChevronRight, 
  MapPin, 
  Building2, 
  Briefcase, 
  FileText, 
  Car, 
  ShieldCheck, 
  Camera, 
  Landmark, 
  Truck, 
  Sparkles,
  X,
  Trash2,
  RefreshCw,
  Lock,
  User,
  Home,
  ArrowRight,
  Share2
} from 'lucide-react';
import { useLeads, LeadItem, LeadType, LeadStatus } from '@/shared/context/LeadsContext';

const TABS: { id: string; label: string; types?: LeadType[] }[] = [
  { id: 'all', label: 'All Inquiries' },
  { id: 'owner-connect', label: 'Owner & Buyer Connects', types: ['owner-connect'] },
  { id: 'site-visit', label: 'Site Visits & Dholera', types: ['site-visit'] },
  { id: 'tenant-verification', label: 'Tenant Police Check', types: ['tenant-verification'] },
  { id: 'photography', label: 'Media & 360° Tours', types: ['photography'] },
  { id: 'home-loan', label: 'Home Loans', types: ['home-loan'] },
  { id: 'packers-movers', label: 'Packers & Movers', types: ['packers-movers'] },
  { id: 'legal', label: 'Title Check & Legal', types: ['title-check', 'rent-agreement'] },
  { id: 'property-management', label: 'Property Care & NRI', types: ['property-management'] },
  { id: 'refer-earn', label: 'Refer & Earn', types: ['refer-earn'] },
  { id: 'contact', label: 'Contact Us', types: ['contact'] },
  { id: 'corporate-careers', label: 'Corporate & Careers', types: ['corporate', 'careers'] },
];

function formatPhoneDisplay(raw?: string): string {
  if (!raw) return '';
  const digits = raw.replace(/[^0-9]/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    const d10 = digits.slice(2);
    return `+91 ${d10.slice(0, 5)} ${d10.slice(5)}`;
  }
  const d10 = digits.slice(0, 10);
  if (d10.length === 10) {
    return `+91 ${d10.slice(0, 5)} ${d10.slice(5)}`;
  }
  return raw.slice(0, 15);
}

export default function AdminLeadsPage() {
  const { leads, updateLeadStatus, updateLeadNotes, deleteLead, stats } = useLeads();
  
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [leadNoteInput, setLeadNoteInput] = useState('');

  // LOCK BACKGROUND BODY SCROLL WHEN DRAWER / MODAL IS OPEN
  useEffect(() => {
    if (selectedLead) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || '';
      };
    }
  }, [selectedLead]);

  const activeTabConfig = TABS.find((t) => t.id === activeTab);

  const filteredLeads = leads.filter((lead) => {
    // 1. Tab filter
    if (activeTabConfig?.types && !activeTabConfig.types.includes(lead.type)) {
      return false;
    }

    // 2. Status filter
    if (statusFilter !== 'All' && lead.status !== statusFilter) {
      return false;
    }

    // 3. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchPhone = lead.phone.toLowerCase().includes(q);
      const matchEmail = (lead.email || '').toLowerCase().includes(q);
      const matchCity = (lead.city || '').toLowerCase().includes(q);
      const matchId = lead.id.toLowerCase().includes(q);
      const matchSource = lead.source.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail && !matchCity && !matchId && !matchSource) {
        return false;
      }
    }

    return true;
  });

  const handleOpenDetail = (lead: LeadItem) => {
    setSelectedLead(lead);
    setLeadNoteInput(lead.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedLead) {
      updateLeadNotes(selectedLead.id, leadNoteInput);
      setSelectedLead({ ...selectedLead, notes: leadNoteInput });
    }
  };

  const getTypeBadge = (type: LeadType) => {
    switch (type) {
      case 'owner-connect':
        return { bg: '#EFE9FB', color: '#522AB0', label: 'Owner Connect' };
      case 'site-visit':
        return { bg: '#EFF6FF', color: '#1D4ED8', label: 'Site Visit' };
      case 'tenant-verification':
        return { bg: '#ECFDF5', color: '#047857', label: 'Police Check' };
      case 'photography':
        return { bg: '#FAF5FF', color: '#7E22CE', label: 'Photography' };
      case 'home-loan':
        return { bg: '#FEF3C7', color: '#B45309', label: 'Home Loan' };
      case 'packers-movers':
        return { bg: '#F0FDF4', color: '#15803D', label: 'Packers & Movers' };
      case 'title-check':
        return { bg: '#FDF2F8', color: '#BE185D', label: '7/12 Title Check' };
      case 'property-management':
        return { bg: '#EEF2FF', color: '#4338CA', label: 'Property Care' };
      case 'refer-earn':
        return { bg: '#FFF7ED', color: '#C2410C', label: 'Refer & Earn' };
      case 'corporate':
        return { bg: '#F8FAFC', color: '#334155', label: 'Corporate B2B' };
      case 'careers':
        return { bg: '#F0FDFA', color: '#0F766E', label: 'Career Hire' };
      case 'rent-agreement':
        return { bg: '#E0E7FF', color: '#3730A3', label: 'Rent Agreement' };
      default:
        return { bg: '#F1F5F9', color: '#475569', label: 'Contact Us' };
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' };
      case 'In Contact':
        return { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' };
      case 'Follow Up':
        return { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' };
      case 'Completed':
        return { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' };
      case 'Cancelled':
        return { bg: '#F1F5F9', color: '#64748B', border: '#CBD5E1' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '100%' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1E1B4B', margin: 0, letterSpacing: '-0.5px' }}>
            Universal Leads &amp; Customer Inquiries Hub
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13.5px' }}>
            Real-time incoming leads submitted across all website forms (Site Visits, Legal, Loans, Tenant Verification, Contact, Referrals).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '8px',
              background: '#fff',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              fontWeight: 700,
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            }}
          >
            <RefreshCw className="w-4 h-4" /> Refresh Leads
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Total Inquiries</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#1E1B4B', marginTop: '4px' }}>{stats.total}</div>
          <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> All platform channels active
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #FECACA', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(220,38,38,0.03)' }}>
          <div style={{ fontSize: '12px', color: '#DC2626', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DC2626', display: 'inline-block' }} />
            New / Uncontacted
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#DC2626', marginTop: '4px' }}>{stats.newCount}</div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>Requires immediate agent callback</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: '#522AB0', fontWeight: 700, textTransform: 'uppercase' }}>In Progress / Follow Up</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#522AB0', marginTop: '4px' }}>{stats.inContactCount}</div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>Active conversations underway</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>Completed / Converted</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#059669', marginTop: '4px' }}>{stats.completedCount}</div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>Deals closed or resolved</div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '9px 16px',
                borderRadius: '999px',
                border: isActive ? '1.5px solid #522AB0' : '1px solid #E2E8F0',
                background: isActive ? '#522AB0' : '#fff',
                color: isActive ? '#fff' : '#475569',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search & Status Filter Bar */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', background: '#fff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search style={{ position: 'absolute', left: '12px', width: '16px', height: '16px', color: '#94A3B8', pointerEvents: 'none' }} />
          <input
            placeholder="Search by name, phone, email, city, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '13.5px',
              outline: 'none',
              color: '#0F172A',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              fontWeight: 700,
              background: '#F8FAFC',
              color: '#1E1B4B',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="All">All Statuses</option>
            <option value="New">🔴 New (Uncontacted)</option>
            <option value="In Contact">🟣 In Contact</option>
            <option value="Follow Up">🟡 Follow Up</option>
            <option value="Completed">🟢 Completed</option>
            <option value="Cancelled">⚪ Cancelled</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        {filteredLeads.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <Users className="w-12 h-12 text-slate-300" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
              No leads found in this view
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Try adjusting your search query or selecting another tab.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '14px 18px' }}>Ref ID &amp; Type</th>
                  <th style={{ padding: '14px 18px' }}>Prospect Name</th>
                  <th style={{ padding: '14px 18px' }}>Contact Details</th>
                  <th style={{ padding: '14px 18px' }}>Location</th>
                  <th style={{ padding: '14px 18px' }}>Source Channel</th>
                  <th style={{ padding: '14px 18px' }}>Status</th>
                  <th style={{ padding: '14px 18px' }}>Received At</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const typeBadge = getTypeBadge(lead.type);
                  const statusBadge = getStatusBadge(lead.status);

                  return (
                    <tr
                      key={lead.id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#FBFBFE')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                    >
                      {/* ID & Type */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 800, color: '#522AB0', fontFamily: 'monospace' }}>{lead.id}</div>
                        <span style={{ fontSize: '11px', fontWeight: 700, background: typeBadge.bg, color: typeBadge.color, padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '3px' }}>
                          {typeBadge.label}
                        </span>
                      </td>

                      {/* Name */}
                      <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0F172A' }}>
                        {lead.name}
                      </td>

                      {/* Phone & Email */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Phone className="w-3 h-3 text-slate-400" /> {formatPhoneDisplay(lead.phone)}
                        </div>
                        {lead.email && (
                          <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                            <Mail className="w-3 h-3 text-slate-400" /> {lead.email}
                          </div>
                        )}
                      </td>

                      {/* Location */}
                      <td style={{ padding: '14px 18px', color: '#475569' }}>
                        {lead.city ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {lead.city}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>

                      {/* Source */}
                      <td style={{ padding: '14px 18px', color: '#334155', fontSize: '13px' }}>
                        {lead.source}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 18px' }}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '11.5px',
                            fontWeight: 800,
                            background: statusBadge.bg,
                            color: statusBadge.color,
                            border: `1px solid ${statusBadge.border}`,
                            cursor: 'pointer',
                            outline: 'none',
                          }}
                        >
                          <option value="New">New</option>
                          <option value="In Contact">In Contact</option>
                          <option value="Follow Up">Follow Up</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Timestamp */}
                      <td style={{ padding: '14px 18px', fontSize: '12px', color: '#64748B', whiteSpace: 'nowrap' }}>
                        {lead.createdAt}
                      </td>

                      {/* Action */}
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(lead)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: '#F5F3FF',
                            border: '1px solid #DDD6FE',
                            color: '#522AB0',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal / Drawer */}
      {selectedLead && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '28px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, fontFamily: 'monospace', color: '#522AB0' }}>
                    {selectedLead.id}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      background: getTypeBadge(selectedLead.type).bg,
                      color: getTypeBadge(selectedLead.type).color,
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {selectedLead.source}
                  </span>
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>
                  {selectedLead.name}
                </h2>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                  Received on {selectedLead.createdAt}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              <a
                href={`tel:${selectedLead.phone.replace(/[^0-9+]/g, '')}`}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#522AB0',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <Phone className="w-4 h-4" /> Call Prospect
              </a>

              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedLead.name}, thank you for your inquiry on GujjuProperty regarding ${selectedLead.source}. How can we assist you?`)}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#25D366',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Chat
              </a>
            </div>

            {/* Status Selector */}
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Pipeline Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as LeadStatus;
                    updateLeadStatus(selectedLead.id, newStatus);
                    setSelectedLead({ ...selectedLead, status: newStatus });
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    background: '#fff',
                    color: '#0F172A',
                    outline: 'none',
                  }}
                >
                  <option value="New">🔴 New (Uncontacted)</option>
                  <option value="In Contact">🟣 In Contact</option>
                  <option value="Follow Up">🟡 Follow Up</option>
                  <option value="Completed">🟢 Completed / Closed</option>
                  <option value="Cancelled">⚪ Cancelled</option>
                </select>
              </div>
            </div>

            {/* Custom Form Submission Fields */}
            {selectedLead.type === 'owner-connect' ? (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ background: '#FAF5FF', border: '1.5px solid #DDD6FE', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5B21B6', fontWeight: 800, fontSize: '13.5px', marginBottom: '4px' }}>
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    GujjuProperty Privacy Concierge Match (Vaya-Vaya Intermediary)
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6D28D9', lineHeight: 1.5 }}>
                    Owner phone is masked on public frontend. Admin receives both buyer & owner numbers to verify, negotiate, and connect safely.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  {/* Box 1: Inquiring Buyer / Tenant */}
                  <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1E40AF', fontWeight: 800, fontSize: '12.5px', marginBottom: '8px' }}>
                        <User className="w-4 h-4 text-blue-600" /> Buyer / Prospect
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                        {selectedLead.name}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#1D4ED8', fontFamily: 'monospace', marginBottom: '4px' }}>
                        📞 {formatPhoneDisplay(selectedLead.phone)}
                      </div>
                      {selectedLead.email && (
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginBottom: '4px' }}>
                          ✉️ {selectedLead.email}
                        </div>
                      )}
                      {selectedLead.city && (
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginBottom: '4px' }}>
                          📍 City: {selectedLead.city}
                        </div>
                      )}
                      {selectedLead.details?.buyerIntent && (
                        <div style={{ fontSize: '11px', color: '#1E3A8A', background: '#DBEAFE', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', fontWeight: 700, marginTop: '4px', marginBottom: '4px' }}>
                          Intent: {String(selectedLead.details.buyerIntent)}
                        </div>
                      )}
                      {selectedLead.details?.preferredTime && (
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                          🕒 Preferred: {String(selectedLead.details.preferredTime)}
                        </div>
                      )}
                      {selectedLead.details?.message && (
                        <div style={{ fontSize: '11.5px', color: '#334155', background: '#fff', border: '1px dashed #BFDBFE', padding: '6px 8px', borderRadius: '6px', marginTop: '8px', fontStyle: 'italic' }}>
                          "{String(selectedLead.details.message)}"
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                      <a
                        href={`tel:${selectedLead.phone.replace(/[^0-9+]/g, '')}`}
                        style={{ flex: 1, padding: '7px 8px', background: '#2563EB', color: '#fff', fontSize: '11.5px', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                      >
                        <Phone className="w-3 h-3" /> Call Buyer
                      </a>
                      <a
                        href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedLead.name}, this is GujjuProperty regarding your request to connect with the owner of "${selectedLead.details?.propertyTitle || 'the property'}".`)}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ flex: 1, padding: '7px 8px', background: '#16A34A', color: '#fff', fontSize: '11.5px', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                      >
                        <MessageSquare className="w-3 h-3" /> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Box 2: Property & Owner Details */}
                  <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#065F46', fontWeight: 800, fontSize: '12.5px', marginBottom: '8px' }}>
                        <Home className="w-4 h-4 text-emerald-600" /> Property & Owner
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '2px', lineHeight: 1.3 }}>
                        {selectedLead.details?.propertyTitle ? String(selectedLead.details.propertyTitle) : 'Direct Listing'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#047857', fontWeight: 700, marginBottom: '2px' }}>
                        Owner: {selectedLead.details?.ownerName ? String(selectedLead.details.ownerName) : 'Property Owner'}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669', fontFamily: 'monospace', marginBottom: '4px' }}>
                        📞 {formatPhoneDisplay(selectedLead.details?.ownerPhone)}
                      </div>
                      {selectedLead.details?.propertyLocation && (
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginBottom: '4px' }}>
                          📍 {String(selectedLead.details.propertyLocation)}
                        </div>
                      )}
                      {selectedLead.details?.propertyPrice && (
                        <div style={{ fontSize: '11.5px', color: '#047857', fontWeight: 800, marginBottom: '4px' }}>
                          💰 Price: {String(selectedLead.details.propertyPrice)}
                        </div>
                      )}
                      {selectedLead.details?.propertyId && (
                        <div style={{ marginTop: '4px' }}>
                          <Link
                            href={`/property/${selectedLead.details.propertyId}`}
                            target="_blank"
                            style={{ fontSize: '11px', color: '#059669', textDecoration: 'underline', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                          >
                            View Property Listing <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>

                    {selectedLead.details?.ownerPhone && (
                      <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                        <a
                          href={`tel:${String(selectedLead.details.ownerPhone).replace(/[^0-9+]/g, '')}`}
                          style={{ flex: 1, padding: '7px 8px', background: '#059669', color: '#fff', fontSize: '11.5px', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                        >
                          <Phone className="w-3 h-3" /> Call Owner
                        </a>
                        <a
                          href={`https://wa.me/${String(selectedLead.details.ownerPhone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedLead.details.ownerName || 'Sir/Madam'}, we have a verified buyer (${selectedLead.name}, Phone: ${selectedLead.phone}) interested in your property "${selectedLead.details?.propertyTitle || ''}" on GujjuProperty.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ flex: 1, padding: '7px 8px', background: '#16A34A', color: '#fff', fontSize: '11.5px', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                        >
                          <MessageSquare className="w-3 h-3" /> WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>
                  Submitted Form Information
                </h4>
                <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#6B21A8', fontWeight: 600 }}>Phone Number:</span>
                    <span style={{ fontWeight: 700, color: '#1E1B4B' }}>{formatPhoneDisplay(selectedLead.phone)}</span>
                  </div>
                  {selectedLead.email && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: '#6B21A8', fontWeight: 600 }}>Email Address:</span>
                      <span style={{ fontWeight: 700, color: '#1E1B4B' }}>{selectedLead.email}</span>
                    </div>
                  )}
                  {selectedLead.city && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: '#6B21A8', fontWeight: 600 }}>City:</span>
                      <span style={{ fontWeight: 700, color: '#1E1B4B' }}>{selectedLead.city}</span>
                    </div>
                  )}

                  {/* Additional dynamic form properties */}
                  {Object.entries(selectedLead.details || {}).map(([key, val]) => {
                    if (val === undefined || val === null || val === '') return null;
                    const label = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());
                    const isPhoneField = key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile');
                    return (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderTop: '1px dashed #E9D5FF', paddingTop: '8px' }}>
                        <span style={{ color: '#6B21A8', fontWeight: 600 }}>{label}:</span>
                        <span style={{ fontWeight: 700, color: '#1E1B4B', textAlign: 'right', maxWidth: '65%' }}>
                          {isPhoneField ? formatPhoneDisplay(String(val)) : String(val)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Admin Notes Box */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Admin Follow-up Notes:
              </label>
              <textarea
                rows={3}
                value={leadNoteInput}
                onChange={(e) => setLeadNoteInput(e.target.value)}
                placeholder="Add notes about prospect requirements, callbacks, or quote sent..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', resize: 'vertical' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  style={{
                    background: '#522AB0',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Save Notes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete lead ${selectedLead.id}?`)) {
                      deleteLead(selectedLead.id);
                      setSelectedLead(null);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Lead
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
