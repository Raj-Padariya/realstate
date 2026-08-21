'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Mail, Users, Zap, CheckCircle2, ArrowUpRight, Eye, Phone, Calendar, Search } from 'lucide-react';

type TabType = 'contact' | 'corporate' | 'signups';

interface ContactLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  date: string;
  status: 'New' | 'In Contact' | 'Resolved';
}

interface CorporateLead {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  employeesCount: string;
  date: string;
  status: 'New' | 'In Contact' | 'Partner Onboarded';
}

interface UserSignupLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'Buyer/Tenant' | 'Owner' | 'Agent/Builder';
  authMethod: 'Mobile OTP' | 'Email & Password' | 'Google 1-Click';
  isVerified: boolean;
  registeredDate: string;
}

const SAMPLE_CONTACT_LEADS: ContactLead[] = [
  { id: 'LEAD-901', name: 'Aarav Patel', phone: '+91 98XXX XXXXX', email: 'aarav.patel@gmail.com', category: 'General Inquiry', message: 'Looking for 3 BHK flat options in Baner Pune under 1.3 Cr.', date: '18 Aug 2026, 03:20 PM', status: 'New' },
  { id: 'LEAD-902', name: 'Ramesh Shah', phone: '+91 98XXX XXXXX', email: 'ramesh.shah@outlook.com', category: 'Post Property Help', message: 'Need help posting my 2 BHK flat in Satellite Ahmedabad.', date: '18 Aug 2026, 02:45 PM', status: 'New' },
  { id: 'LEAD-903', name: 'Priya Sharma', phone: '+91 97XXX XXXXX', email: 'priya.sharma@yahoo.com', category: 'Subscription Plans', message: 'Want to know more about the MoneyBack Buyer Plan refund guarantee terms.', date: '18 Aug 2026, 01:10 PM', status: 'In Contact' },
  { id: 'LEAD-904', name: 'Vikram Mehta', phone: '+91 94XXX XXXXX', email: 'vikram.m@gmail.com', category: 'Rental Agreement', message: 'Interested in doorstep rental agreement draft delivery in Wakad Pune.', date: '17 Aug 2026, 06:15 PM', status: 'Resolved' },
  { id: 'LEAD-905', name: 'Ananya Joshi', phone: '+91 99XXX XXXXX', email: 'ananya.j@gmail.com', category: 'General Inquiry', message: 'Do you have commercial office space listings in Balewadi High Street?', date: '17 Aug 2026, 04:30 PM', status: 'Resolved' },
];

const SAMPLE_CORPORATE_LEADS: CorporateLead[] = [
  { id: 'CORP-101', name: 'Rajesh Sharma', company: 'TCS Corporate', phone: '+91 98XXX XXXXX', email: 'rajesh.s@tcs.com', city: 'Pune', employeesCount: '200-1000 Employees', date: '19 Aug 2026, 10:15 AM', status: 'New' },
  { id: 'CORP-102', name: 'Nisha Agarwal', company: 'Infosys Ltd', phone: '+91 98XXX XXXXX', email: 'nisha.a@infosys.com', city: 'Bengaluru', employeesCount: '1000+ Employees', date: '19 Aug 2026, 09:30 AM', status: 'New' },
  { id: 'CORP-103', name: 'Sunil Verma', company: 'Tech Mahindra', phone: '+91 97XXX XXXXX', email: 'sunil.v@techmahindra.com', city: 'Ahmedabad', employeesCount: '50-200 Employees', date: '18 Aug 2026, 05:40 PM', status: 'In Contact' },
  { id: 'CORP-104', name: 'Hardik Patel', company: 'Adani Group', phone: '+91 94XXX XXXXX', email: 'hardik.p@adani.com', city: 'Ahmedabad', employeesCount: '1000+ Employees', date: '17 Aug 2026, 02:15 PM', status: 'Partner Onboarded' },
];

const SAMPLE_USER_SIGNUPS: UserSignupLead[] = [
  { id: 'USR-401', name: 'Rohan Deshmukh', phone: '+91 98XXX XXXXX', email: 'rohan.d@gmail.com', role: 'Buyer/Tenant', authMethod: 'Mobile OTP', isVerified: true, registeredDate: '18 Aug 2026, 03:14 PM' },
  { id: 'USR-402', name: 'Kavita Patel', phone: '+91 98XXX XXXXX', email: 'kavita.p@gmail.com', role: 'Owner', authMethod: 'Mobile OTP', isVerified: true, registeredDate: '18 Aug 2026, 02:50 PM' },
  { id: 'USR-403', name: 'Sanjay Kumar', phone: '+91 97XXX XXXXX', email: 'sanjay.k@hotmail.com', role: 'Agent/Builder', authMethod: 'Google 1-Click', isVerified: true, registeredDate: '18 Aug 2026, 12:30 PM' },
  { id: 'USR-404', name: 'Meera Iyer', phone: '+91 94XXX XXXXX', email: 'meera.iyer@gmail.com', role: 'Buyer/Tenant', authMethod: 'Email & Password', isVerified: true, registeredDate: '17 Aug 2026, 08:22 PM' },
  { id: 'USR-405', name: 'Deepak Trivedi', phone: '+91 99XXX XXXXX', email: 'deepak.t@gmail.com', role: 'Owner', authMethod: 'Mobile OTP', isVerified: true, registeredDate: '17 Aug 2026, 05:10 PM' },
];

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('contact');
  const [contactLeads, setContactLeads] = useState<ContactLead[]>(SAMPLE_CONTACT_LEADS);
  const [corporateLeads, setCorporateLeads] = useState<CorporateLead[]>(SAMPLE_CORPORATE_LEADS);
  const [userSignups] = useState<UserSignupLead[]>(SAMPLE_USER_SIGNUPS);

  const [selectedContactLead, setSelectedContactLead] = useState<ContactLead | null>(null);
  const [selectedCorporateLead, setSelectedCorporateLead] = useState<CorporateLead | null>(null);

  const handleUpdateContactStatus = (id: string, newStatus: ContactLead['status']) => {
    setContactLeads(contactLeads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  const handleUpdateCorporateStatus = (id: string, newStatus: CorporateLead['status']) => {
    setCorporateLeads(corporateLeads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
            Leads &amp; Corporate Partnerships Manager
          </h1>
          <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '14px' }}>
            View and manage contact inquiries, B2B corporate solutions forms, and registered user accounts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/corporate-solutions"
            target="_blank"
            style={{
              background: '#522AB0',
              color: '#fff',
              padding: '9px 16px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Building2 className="w-4 h-4 text-[#FEDC00]" /> Open Corporate Form <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            target="_blank"
            style={{
              background: '#1c1f23',
              color: '#fff',
              padding: '9px 16px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Mail className="w-4 h-4 text-[#FEDC00]" /> Open Contact Form <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' }}>Contact Inquiries</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#522AB0', marginTop: '4px' }}>{contactLeads.length} Leads</div>
          <div style={{ fontSize: '12px', color: '#B78103', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap className="w-3.5 h-3.5" /> {contactLeads.filter((l) => l.status === 'New').length} New Callbacks Pending
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' }}>Corporate B2B Inquiries</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#41208C', marginTop: '4px' }}>{corporateLeads.length} Partners</div>
          <div style={{ fontSize: '12px', color: '#0f9d58', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Building2 className="w-3.5 h-3.5" /> {corporateLeads.filter((l) => l.status === 'New').length} New Corporate Requests
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' }}>Registered Users</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f9d58', marginTop: '4px' }}>{userSignups.length} Users</div>
          <div style={{ fontSize: '12px', color: '#0f9d58', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Mobile OTP Verified
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div style={{ display: 'flex', gap: '10px', background: '#fff', padding: '8px', borderRadius: '12px', border: '1px solid var(--line)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'contact' ? '#522AB0' : 'transparent',
            color: activeTab === 'contact' ? '#fff' : 'var(--ink)',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          📬 Contact Inquiries ({contactLeads.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('corporate')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'corporate' ? '#522AB0' : 'transparent',
            color: activeTab === 'corporate' ? '#fff' : 'var(--ink)',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          🏢 Corporate B2B Inquiries ({corporateLeads.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('signups')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'signups' ? '#522AB0' : 'transparent',
            color: activeTab === 'signups' ? '#fff' : 'var(--ink)',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          👥 Registered Accounts ({userSignups.length})
        </button>
      </div>

      {/* TAB 1: CONTACT FORM INQUIRIES TABLE */}
      {activeTab === 'contact' && (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#FAF8FE', borderBottom: '1px solid var(--line)', color: '#41208C', fontWeight: 800 }}>
                <th style={{ padding: '14px 18px' }}>Lead Ref</th>
                <th style={{ padding: '14px 18px' }}>User Name</th>
                <th style={{ padding: '14px 18px' }}>Contact Info</th>
                <th style={{ padding: '14px 18px' }}>Topic</th>
                <th style={{ padding: '14px 18px' }}>Message Preview</th>
                <th style={{ padding: '14px 18px' }}>Submitted Date</th>
                <th style={{ padding: '14px 18px' }}>Status</th>
                <th style={{ padding: '14px 18px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {contactLeads.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#522AB0' }}>{item.id}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)' }}>{item.name}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700 }}>{item.phone}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.email}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '11.5px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', maxWidth: '240px', color: 'var(--body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.message}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '12.5px', color: 'var(--muted)', fontWeight: 600 }}>{item.date}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <select
                      value={item.status}
                      onChange={(e) => handleUpdateContactStatus(item.id, e.target.value as ContactLead['status'])}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid var(--line)',
                        fontSize: '12.5px',
                        fontWeight: 800,
                        background:
                          item.status === 'Resolved'
                            ? '#E6F4EA'
                            : item.status === 'In Contact'
                            ? '#EFE9FB'
                            : '#FFF8E1',
                        color:
                          item.status === 'Resolved'
                            ? '#137333'
                            : item.status === 'In Contact'
                            ? '#522AB0'
                            : '#B78103',
                      }}
                    >
                      <option value="New">New</option>
                      <option value="In Contact">In Contact</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedContactLead(item)}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: '#522AB0', color: '#fff', border: 'none', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: CORPORATE B2B PARTNERSHIP INQUIRIES TABLE */}
      {activeTab === 'corporate' && (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#FAF8FE', borderBottom: '1px solid var(--line)', color: '#41208C', fontWeight: 800 }}>
                <th style={{ padding: '14px 18px' }}>Corp Ref</th>
                <th style={{ padding: '14px 18px' }}>Company Name</th>
                <th style={{ padding: '14px 18px' }}>Contact Person</th>
                <th style={{ padding: '14px 18px' }}>Official Email & Phone</th>
                <th style={{ padding: '14px 18px' }}>City</th>
                <th style={{ padding: '14px 18px' }}>Employee Count</th>
                <th style={{ padding: '14px 18px' }}>Submitted Date</th>
                <th style={{ padding: '14px 18px' }}>B2B Status</th>
                <th style={{ padding: '14px 18px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {corporateLeads.map((corp) => (
                <tr key={corp.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#41208C' }}>{corp.id}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#522AB0' }}>{corp.company}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)' }}>{corp.name}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700 }}>{corp.phone}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{corp.email}</div>
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 600 }}>📍 {corp.city}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '11.5px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>
                      {corp.employeesCount}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '12.5px', color: 'var(--muted)', fontWeight: 600 }}>{corp.date}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <select
                      value={corp.status}
                      onChange={(e) => handleUpdateCorporateStatus(corp.id, e.target.value as CorporateLead['status'])}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid var(--line)',
                        fontSize: '12.5px',
                        fontWeight: 800,
                        background:
                          corp.status === 'Partner Onboarded'
                            ? '#E6F4EA'
                            : corp.status === 'In Contact'
                            ? '#EFE9FB'
                            : '#FFF8E1',
                        color:
                          corp.status === 'Partner Onboarded'
                            ? '#137333'
                            : corp.status === 'In Contact'
                            ? '#522AB0'
                            : '#B78103',
                      }}
                    >
                      <option value="New">New Request</option>
                      <option value="In Contact">In Contact</option>
                      <option value="Partner Onboarded">Partner Onboarded</option>
                    </select>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedCorporateLead(corp)}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: '#41208C', color: '#fff', border: 'none', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: REGISTERED USER ACCOUNTS TABLE */}
      {activeTab === 'signups' && (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#FAF8FE', borderBottom: '1px solid var(--line)', color: '#41208C', fontWeight: 800 }}>
                <th style={{ padding: '14px 18px' }}>User ID</th>
                <th style={{ padding: '14px 18px' }}>Full Name</th>
                <th style={{ padding: '14px 18px' }}>Phone / Mobile</th>
                <th style={{ padding: '14px 18px' }}>Email Address</th>
                <th style={{ padding: '14px 18px' }}>Selected Role</th>
                <th style={{ padding: '14px 18px' }}>Auth Method</th>
                <th style={{ padding: '14px 18px' }}>Verification Status</th>
                <th style={{ padding: '14px 18px' }}>Registered Date</th>
              </tr>
            </thead>
            <tbody>
              {userSignups.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#522AB0' }}>{user.id}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--ink)' }}>{user.name}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700 }}>{user.phone}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--body)' }}>{user.email}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      style={{
                        background:
                          user.role === 'Owner'
                            ? '#FFF8E1'
                            : user.role === 'Buyer/Tenant'
                            ? '#EFE9FB'
                            : '#E6F4EA',
                        color:
                          user.role === 'Owner'
                            ? '#B78103'
                            : user.role === 'Buyer/Tenant'
                            ? '#522AB0'
                            : '#0F9D58',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--body)' }}>{user.authMethod}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ background: '#E6F4EA', color: '#137333', fontSize: '11.5px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>
                      ✓ OTP Verified
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '12.5px', color: 'var(--muted)', fontWeight: 600 }}>{user.registeredDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONTACT LEAD DETAILS POPUP MODAL */}
      {selectedContactLead && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', maxWidth: '520px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#41208C' }}>
                Contact Inquiry Details ({selectedContactLead.id})
              </div>
              <button type="button" onClick={() => setSelectedContactLead(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>User Name</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)' }}>{selectedContactLead.name}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Phone Number</div>
                <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#522AB0' }}>{selectedContactLead.phone}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Email</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>{selectedContactLead.email}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  alert(`Calling lead ${selectedContactLead.name} at ${selectedContactLead.phone}...`);
                  setSelectedContactLead(null);
                }}
                style={{ flex: 1, padding: '12px', background: '#0F9D58', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}
              >
                📞 Call Lead Now
              </button>
              <button
                type="button"
                onClick={() => setSelectedContactLead(null)}
                style={{ padding: '12px 20px', background: '#f0f1f4', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CORPORATE B2B LEAD DETAILS POPUP MODAL */}
      {selectedCorporateLead && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', maxWidth: '520px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#41208C' }}>
                Corporate B2B Request ({selectedCorporateLead.id})
              </div>
              <button type="button" onClick={() => setSelectedCorporateLead(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Company Name</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#522AB0' }}>{selectedCorporateLead.company}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Contact Representative</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)' }}>{selectedCorporateLead.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>City / Location</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>📍 {selectedCorporateLead.city}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Phone Number</div>
                <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#522AB0' }}>{selectedCorporateLead.phone}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Work Email</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>{selectedCorporateLead.email}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Workforce Scale</div>
              <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '12.5px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', display: 'inline-block', marginTop: '4px' }}>
                👥 {selectedCorporateLead.employeesCount}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  alert(`Connecting with ${selectedCorporateLead.company} representative ${selectedCorporateLead.name} at ${selectedCorporateLead.phone}...`);
                  setSelectedCorporateLead(null);
                }}
                style={{ flex: 1, padding: '12px', background: '#0F9D58', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}
              >
                📞 Contact B2B Representative
              </button>
              <button
                type="button"
                onClick={() => setSelectedCorporateLead(null)}
                style={{ padding: '12px 20px', background: '#f0f1f4', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
