'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, FileText, Truck, Coins, Search, Eye, CheckCircle2 } from 'lucide-react';

interface RentAgreementRecord {
  id: string;
  tenantName: string;
  ownerName: string;
  propertyAddress: string;
  rentAmount: string;
  depositAmount: string;
  stampDutyPaid: string;
  agreementDate: string;
  status: 'Draft Created' | 'Stamp Duty Paid' | 'E-Signed' | 'Doorstep Delivered';
}

const SAMPLE_AGREEMENTS: RentAgreementRecord[] = [
  { id: 'AGR-801', tenantName: 'Rahul Varma', ownerName: 'Sanjay Patel', propertyAddress: 'B-304, Shivalik Shilp, Bopal, Ahmedabad', rentAmount: '₹22,000', depositAmount: '₹50,000', stampDutyPaid: '₹300', agreementDate: '18 Aug 2026', status: 'Doorstep Delivered' },
  { id: 'AGR-802', tenantName: 'Pooja Hegde', ownerName: 'Meenakshi Iyer', propertyAddress: '102, Rohan Abhilasha, Baner Road, Pune', rentAmount: '₹32,000', depositAmount: '₹80,000', stampDutyPaid: '₹500', agreementDate: '17 Aug 2026', status: 'E-Signed' },
  { id: 'AGR-803', tenantName: 'Manish Jain', ownerName: 'Vikram Mehta', propertyAddress: 'A-701, Godrej Garden City, Gota, Ahmedabad', rentAmount: '₹18,500', depositAmount: '₹40,000', stampDutyPaid: '₹300', agreementDate: '15 Aug 2026', status: 'Stamp Duty Paid' },
  { id: 'AGR-804', tenantName: 'Sneha Kulkarni', ownerName: 'Amit Shah', propertyAddress: '404, Solitaire Business Hub, Viman Nagar, Pune', rentAmount: '₹55,000', depositAmount: '₹1,50,000', stampDutyPaid: '₹500', agreementDate: '12 Aug 2026', status: 'Draft Created' },
];

export default function AdminRentAgreementsPage() {
  const [agreements, setAgreements] = useState<RentAgreementRecord[]>(SAMPLE_AGREEMENTS);
  const [selectedRecord, setSelectedRecord] = useState<RentAgreementRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = agreements.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch =
      item.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: RentAgreementRecord['status']) => {
    setAgreements(agreements.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
            E-Stamp Rental Agreements Management
          </h1>
          <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '14px' }}>
            Manage E-Stamp rental agreement drafts, stamp duty payments, e-signing, and doorstep delivery logs.
          </p>
        </div>

        <Link
          href="/rent-agreement"
          target="_blank"
          style={{
            background: '#522AB0',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '10px',
            fontWeight: 800,
            fontSize: '13.5px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ExternalLink className="w-4 h-4 text-[#FEDC00]" /> Open Rent Agreement Form
        </Link>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' }}>
            <FileText className="w-4 h-4 text-[#522AB0]" /> Total Draft Requests
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#41208C', marginTop: '4px' }}>{agreements.length}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' }}>
            <Truck className="w-4 h-4 text-[#0f9d58]" /> Doorstep Delivered
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f9d58', marginTop: '4px' }}>
            {agreements.filter((a) => a.status === 'Doorstep Delivered').length}
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #EBE6F7', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' }}>
            <Coins className="w-4 h-4 text-[#522AB0]" /> Avg Stamp Duty Fee
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#522AB0', marginTop: '4px' }}>₹ 365</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', background: '#fff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #EBE6F7' }}>
        <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
          <input
            placeholder="Search by tenant, owner, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #EBE6F7', fontSize: '13.5px', outline: 'none' }}
          />
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #EBE6F7', fontSize: '13.5px', fontWeight: 800, background: '#FAF9FD', color: '#522AB0', cursor: 'pointer' }}
          >
            <option value="All">All Statuses</option>
            <option value="Draft Created">Draft Created</option>
            <option value="Stamp Duty Paid">Stamp Duty Paid</option>
            <option value="E-Signed">E-Signed</option>
            <option value="Doorstep Delivered">Doorstep Delivered</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #EBE6F7', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ background: '#FAF9FD', borderBottom: '1px solid #EBE6F7', color: '#41208C', fontWeight: 800 }}>
              <th style={{ padding: '14px 18px' }}>Ref ID</th>
              <th style={{ padding: '14px 18px' }}>Tenant Name</th>
              <th style={{ padding: '14px 18px' }}>Owner Name</th>
              <th style={{ padding: '14px 18px' }}>Rent &amp; Deposit</th>
              <th style={{ padding: '14px 18px' }}>Stamp Duty</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 18px', fontWeight: 800, color: '#522AB0' }}>{item.id}</td>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#111827' }}>
                  <div>{item.tenantName}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 400 }}>{item.propertyAddress}</div>
                </td>
                <td style={{ padding: '14px 18px', color: '#374151' }}>{item.ownerName}</td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 700, color: '#111827' }}>{item.rentAmount}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>Deposit: {item.depositAmount}</div>
                </td>
                <td style={{ padding: '14px 18px', fontWeight: 800, color: '#0f9d58' }}>{item.stampDutyPaid}</td>
                <td style={{ padding: '14px 18px' }}>
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value as RentAgreementRecord['status'])}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #EBE6F7',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      background:
                        item.status === 'Doorstep Delivered'
                          ? '#E6F4EA'
                          : item.status === 'E-Signed'
                          ? '#EFE9FB'
                          : '#FEF3C7',
                      color:
                        item.status === 'Doorstep Delivered'
                          ? '#137333'
                          : item.status === 'E-Signed'
                          ? '#522AB0'
                          : '#92400E',
                    }}
                  >
                    <option value="Draft Created">Draft Created</option>
                    <option value="Stamp Duty Paid">Stamp Duty Paid</option>
                    <option value="E-Signed">E-Signed</option>
                    <option value="Doorstep Delivered">Doorstep Delivered</option>
                  </select>
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedRecord(item)}
                    style={{ padding: '6px 14px', borderRadius: '8px', background: '#522AB0', color: '#fff', border: 'none', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {selectedRecord && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', maxWidth: '520px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 16px' }}>
              Agreement Details ({selectedRecord.id})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#374151' }}>
              <div><strong>Tenant:</strong> {selectedRecord.tenantName}</div>
              <div><strong>Owner:</strong> {selectedRecord.ownerName}</div>
              <div><strong>Property Address:</strong> {selectedRecord.propertyAddress}</div>
              <div><strong>Monthly Rent:</strong> {selectedRecord.rentAmount}</div>
              <div><strong>Security Deposit:</strong> {selectedRecord.depositAmount}</div>
              <div><strong>Stamp Duty Paid:</strong> {selectedRecord.stampDutyPaid}</div>
              <div><strong>Date Initiated:</strong> {selectedRecord.agreementDate}</div>
              <div><strong>Current Status:</strong> <span style={{ color: '#522AB0', fontWeight: 800 }}>{selectedRecord.status}</span></div>
            </div>
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                style={{ padding: '10px 20px', borderRadius: '10px', background: '#111827', color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer' }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
