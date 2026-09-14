'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LeadType = 
  | 'contact'
  | 'site-visit'
  | 'tenant-verification'
  | 'photography'
  | 'home-loan'
  | 'packers-movers'
  | 'title-check'
  | 'property-management'
  | 'refer-earn'
  | 'corporate'
  | 'careers'
  | 'rent-agreement'
  | 'owner-connect';

export type LeadStatus = 'New' | 'In Contact' | 'Follow Up' | 'Completed' | 'Cancelled';

export interface LeadItem {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  source: string;
  details: Record<string, any>;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

interface LeadsContextType {
  leads: LeadItem[];
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }) => LeadItem;
  updateLeadStatus: (id: string, newStatus: LeadStatus) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;
  getLeadsByType: (type?: LeadType | 'all') => LeadItem[];
  stats: {
    total: number;
    newCount: number;
    inContactCount: number;
    completedCount: number;
  };
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LEADS_STORAGE_KEY = 'gujjuproperty_leads_store_v1';

const INITIAL_SAMPLE_LEADS: LeadItem[] = [
  {
    id: 'CONNECT-2026-772',
    type: 'owner-connect',
    name: 'Kunal Singhania (Buyer)',
    phone: '+91 98255 12345',
    email: 'kunal.singhania@gmail.com',
    city: 'Ahmedabad',
    source: 'Direct Owner Connect (Baner Luxury 3 BHK)',
    details: {
      buyerIntent: 'Immediate Purchase (Self Use)',
      buyerMessage: 'Interested in making a token advance if Title 7/12 is clear.',
      ownerName: 'Vikram Joshi (Owner)',
      ownerPhone: '+91 98790 66554',
      propertyId: 'prop-1',
      propertyTitle: '3 BHK High-Floor Luxury Apartment in Baner',
      propertyPrice: '₹ 1.25 Cr',
      propertyLocation: 'Baner, Pune',
      propertyType: 'Residential Apartment',
    },
    status: 'New',
    createdAt: '14 Sep 2026, 11:30 AM',
    notes: 'Buyer verified. Ready to speak with owner Vikram Joshi.',
  },
  {
    id: 'CONNECT-2026-519',
    type: 'owner-connect',
    name: 'Dhaval Shah (Investor)',
    phone: '+91 97241 88990',
    email: 'dhaval.shah@investor.in',
    city: 'Dholera SIR',
    source: 'Direct Owner Connect (Dholera Commercial Plot)',
    details: {
      buyerIntent: 'Investment & Plot Visit',
      buyerMessage: 'Looking for TP Scheme 2 land. Need registry assistance.',
      ownerName: 'Jitin Vora (Plot Owner)',
      ownerPhone: '+91 98765 43210',
      propertyId: 'prop-3',
      propertyTitle: '2000 sq.yd Commercial NA Plot in Dholera SIR TP 2',
      propertyPrice: '₹ 45.00 L',
      propertyLocation: 'TP Scheme 2, Dholera SIR, Gujarat',
      propertyType: 'Commercial Land / Plot',
    },
    status: 'In Contact',
    createdAt: '13 Sep 2026, 03:15 PM',
    notes: 'Both parties contacted. Facilitating WhatsApp conference intro.',
  },
  {
    id: 'VISIT-2026-891',
    type: 'site-visit',
    name: 'Aarav Patel',
    phone: '+91 98251 44520',
    email: 'aarav.patel@gmail.com',
    city: 'Dholera SIR',
    source: 'Assisted Site Visit Form',
    details: {
      propertyType: 'Residential Plots / Land',
      budget: '₹50 Lakh - ₹1 Crore',
      visitDate: '2026-09-15',
      pickupAddress: 'Terminal 1, Ahmedabad Airport',
    },
    status: 'New',
    createdAt: '09 Sep 2026, 09:40 AM',
    notes: 'Visiting from Dubai for a 2-day plot investment tour.',
  },
  {
    id: 'VERIF-2026-442',
    type: 'tenant-verification',
    name: 'Suresh Patel (Owner)',
    phone: '+91 98790 12345',
    email: 'suresh.patel@outlook.com',
    city: 'Ahmedabad',
    source: 'Tenant Police Verification',
    details: {
      tenantName: 'Rahul Sharma',
      tenantPhone: '+91 98980 67890',
      propertyType: '2 BHK Apartment',
      package: 'Police Intimation Package (₹999)',
    },
    status: 'In Contact',
    createdAt: '08 Sep 2026, 04:15 PM',
    notes: 'Aadhaar copy submitted. Local police intimation form draft prepared.',
  },
  {
    id: 'LOAN-2026-309',
    type: 'home-loan',
    name: 'Priya Sharma',
    phone: '+91 97240 88991',
    email: 'priya.sharma@yahoo.com',
    city: 'Pune',
    source: 'Home Loan Assistance Desk',
    details: {
      loanAmount: '₹ 65,00,000',
      monthlyIncome: '₹ 1,10,000',
      employmentType: 'Salaried (IT Professional)',
      bank: 'HDFC Bank / SBI',
    },
    status: 'New',
    createdAt: '08 Sep 2026, 02:30 PM',
    notes: 'Pre-approval needed for Baner 3 BHK flat booking.',
  },
  {
    id: 'PHOTO-2026-118',
    type: 'photography',
    name: 'Vikram Mehta',
    phone: '+91 94260 77112',
    email: 'vikram.m@gmail.com',
    city: 'Surat',
    source: 'Listing Photography Booking',
    details: {
      propertyType: '4+ BHK Penthouse / Villa',
      package: '360° Virtual Tour + HDR (₹2,999)',
      preferredDate: '2026-09-12',
      preferredTime: 'Sunset Golden Hour (4:30 PM)',
    },
    status: 'Follow Up',
    createdAt: '07 Sep 2026, 06:10 PM',
    notes: 'Photographer assigned for Vesu location shoot.',
  },
  {
    id: 'LEAD-2026-105',
    type: 'contact',
    name: 'Rohan Deshmukh',
    phone: '+91 99090 33214',
    email: 'rohan.d@gmail.com',
    city: 'Ahmedabad',
    source: 'Contact Us Page',
    details: {
      category: 'General Inquiry',
      message: 'Looking for verified independent bungalow in Bopal or Satellite.',
    },
    status: 'Completed',
    createdAt: '06 Sep 2026, 11:20 AM',
    notes: 'Shared 4 direct owner bungalow listings on WhatsApp.',
  },
  {
    id: 'CORP-2026-041',
    type: 'corporate',
    name: 'Rajesh Sharma',
    phone: '+91 98240 55667',
    email: 'rajesh.s@tcs.com',
    city: 'Pune',
    source: 'Corporate Solutions Form',
    details: {
      company: 'TCS Corporate Hinjewadi',
      employeesCount: '1000+ Employees',
      message: 'Looking for verified employee relocation rental housing partnership.',
    },
    status: 'In Contact',
    createdAt: '05 Sep 2026, 10:00 AM',
    notes: 'Meeting scheduled with HR head for customized corporate tier.',
  },
  {
    id: 'REFER-2026-019',
    type: 'refer-earn',
    name: 'Hardik Shah (Referrer)',
    phone: '+91 98250 99882',
    email: 'hardik.s@gmail.com',
    city: 'Ahmedabad',
    source: 'Refer & Earn Program',
    details: {
      referralName: 'Ketan Patel',
      referralPhone: '+91 97123 44556',
      propertyCity: 'Ahmedabad',
      interest: 'Selling 3 BHK Flat in Prahlad Nagar',
    },
    status: 'New',
    createdAt: '04 Sep 2026, 03:45 PM',
    notes: 'Lead verified. Owner Ketan Patel contacted for listing.',
  },
];

export function sanitizePhone10(raw: string): string {
  if (!raw) return '';
  const digits = raw.replace(/[^0-9]/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  return digits.slice(0, 10);
}

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<LeadItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LEADS_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.error('Failed to load leads from localStorage', err);
      }
    }
    return INITIAL_SAMPLE_LEADS;
  });

  // Persist to localStorage whenever leads change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
      } catch (err) {
        console.error('Failed to save leads to localStorage', err);
      }
    }
  }, [leads]);

  const addLead = (leadInput: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }): LeadItem => {
    const typePrefixMap: Record<LeadType, string> = {
      'site-visit': 'VISIT',
      'tenant-verification': 'VERIF',
      'photography': 'PHOTO',
      'home-loan': 'LOAN',
      'packers-movers': 'SHIFT',
      'title-check': 'LEGAL',
      'property-management': 'CARE',
      'refer-earn': 'REFER',
      'corporate': 'CORP',
      'careers': 'HIRE',
      'rent-agreement': 'AGR',
      'contact': 'LEAD',
      'owner-connect': 'CONNECT',
    };

    const prefix = typePrefixMap[leadInput.type] || 'LEAD';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `${prefix}-2026-${randomNum}`;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ', ' + now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Sanitize phone to maximum 10 digits
    const cleanPhone = sanitizePhone10(leadInput.phone) || leadInput.phone;

    // Sanitize any nested phone fields in details
    const cleanDetails: Record<string, any> = { ...(leadInput.details || {}) };
    if (cleanDetails.ownerPhone) cleanDetails.ownerPhone = sanitizePhone10(cleanDetails.ownerPhone);
    if (cleanDetails.tenantPhone) cleanDetails.tenantPhone = sanitizePhone10(cleanDetails.tenantPhone);
    if (cleanDetails.referralPhone) cleanDetails.referralPhone = sanitizePhone10(cleanDetails.referralPhone);
    if (cleanDetails['Mobile Number']) cleanDetails['Mobile Number'] = sanitizePhone10(cleanDetails['Mobile Number']);
    if (cleanDetails['Phone']) cleanDetails['Phone'] = sanitizePhone10(cleanDetails['Phone']);

    const newLead: LeadItem = {
      ...leadInput,
      phone: cleanPhone,
      details: cleanDetails,
      id: newId,
      status: leadInput.status || 'New',
      createdAt: formattedDate,
    };

    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (id: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, notes } : l))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const getLeadsByType = (type?: LeadType | 'all') => {
    if (!type || type === 'all') return leads;
    return leads.filter((l) => l.type === type);
  };

  const stats = {
    total: leads.length,
    newCount: leads.filter((l) => l.status === 'New').length,
    inContactCount: leads.filter((l) => l.status === 'In Contact' || l.status === 'Follow Up').length,
    completedCount: leads.filter((l) => l.status === 'Completed').length,
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        deleteLead,
        getLeadsByType,
        stats,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
}
