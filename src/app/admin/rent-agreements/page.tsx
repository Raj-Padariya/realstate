'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  FileText,
  Truck,
  Coins,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  Send,
  X,
  ShieldCheck
} from 'lucide-react';

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
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              E-Stamp Rental Agreements
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-200/60 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800">
              {agreements.length} Active Requests
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track legal agreement generation, government stamp duty compliance, e-signatures, and hardcopy courier delivery.
          </p>
        </div>

        <Link
          href="/rent-agreement"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all self-start sm:self-auto"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" /> Open Rent Agreement Tool
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Drafts</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{agreements.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Doorstep Delivered</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              {agreements.filter((a) => a.status === 'Doorstep Delivered').length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Govt Stamp Duty Avg</div>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">₹ 365</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Coins className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by tenant name, owner name, address, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 text-xs font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Draft Created">Draft Created</option>
          <option value="Stamp Duty Paid">Stamp Duty Paid</option>
          <option value="E-Signed">E-Signed</option>
          <option value="Doorstep Delivered">Doorstep Delivered</option>
        </select>
      </div>

      {/* Agreements Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Tenant &amp; Address</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 px-4">Rent &amp; Deposit</th>
                <th className="py-3.5 px-4">Stamp Duty</th>
                <th className="py-3.5 px-4">Status Pipeline</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredRecords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{item.tenantName}</div>
                    <div className="text-xs text-slate-400 truncate max-w-xs">{item.propertyAddress}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {item.ownerName}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 dark:text-white">{item.rentAmount}/mo</div>
                    <div className="text-xs text-slate-400">Deposit: {item.depositAmount}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                    {item.stampDutyPaid}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <select
                      value={item.status}
                      onChange={(e) => handleUpdateStatus(item.id, e.target.value as RentAgreementRecord['status'])}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer outline-none ${
                        item.status === 'Doorstep Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                          : item.status === 'E-Signed'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800'
                          : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
                      }`}
                    >
                      <option value="Draft Created">Draft Created</option>
                      <option value="Stamp Duty Paid">Stamp Duty Paid</option>
                      <option value="E-Signed">E-Signed</option>
                      <option value="Doorstep Delivered">Doorstep Delivered</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedRecord(item)}
                      className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/50 rounded-lg transition-all"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL DRAWER / MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Agreement Dossier ({selectedRecord.id})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Tenant:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedRecord.tenantName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Owner:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedRecord.ownerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Property:</span>
                <span className="font-bold text-slate-900 dark:text-white text-right max-w-[240px]">{selectedRecord.propertyAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Monthly Rent:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400">{selectedRecord.rentAmount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Security Deposit:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedRecord.depositAmount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Govt Stamp Duty:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedRecord.stampDutyPaid}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Current Status:</span>
                <span className="font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                  {selectedRecord.status}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
