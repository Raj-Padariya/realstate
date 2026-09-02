'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type TabKey = 'sale' | 'rent' | 'plot' | 'comm';

const LOC: Record<TabKey, [string, string][]> = {
  sale: [
    ['Flats for sale in Baner, Pune', '/buy/flats-baner-pune'],
    ['Flats for sale in Wakad, Pune', '/buy/flats-wakad-pune'],
    ['Flats for sale in Hinjewadi, Pune', '/buy/flats-hinjewadi-pune'],
    ['Flats for sale in Kharadi, Pune', '/buy/flats-kharadi-pune'],
    ['Flats for sale in Kothrud, Pune', '/buy/flats-kothrud-pune'],
    ['Flats for sale in Andheri, Mumbai', '/buy/flats-andheri-mumbai'],
    ['Flats for sale in Thane West', '/buy/flats-thane-west'],
    ['Flats for sale in Powai, Mumbai', '/buy/flats-powai-mumbai'],
    ['Flats for sale in SG Highway, Ahmedabad', '/buy/flats-sg-highway-ahmedabad'],
    ['Flats for sale in Bopal, Ahmedabad', '/buy/flats-bopal-ahmedabad'],
    ['Flats for sale in Whitefield, Bengaluru', '/buy/flats-whitefield-bengaluru'],
    ['Flats for sale in Sarjapur Road', '/buy/flats-sarjapur-road-bengaluru'],
    ['Flats for sale in Gachibowli, Hyderabad', '/buy/flats-gachibowli-hyderabad'],
    ['Flats for sale in Kondapur, Hyderabad', '/buy/flats-kondapur-hyderabad'],
    ['Flats for sale in Sector 150, Noida', '/buy/flats-sector-150-noida'],
    ['Flats for sale in New Town, Kolkata', '/buy/flats-new-town-kolkata'],
  ],
  rent: [
    ['Flats for rent in Hinjewadi, Pune', '/rent/flats-hinjewadi-pune'],
    ['Flats for rent in Baner, Pune', '/rent/flats-baner-pune'],
    ['Flats for rent in Wakad, Pune', '/rent/flats-wakad-pune'],
    ['Flats for rent in Viman Nagar, Pune', '/rent/flats-viman-nagar-pune'],
    ['1 BHK for rent in Kothrud, Pune', '/rent/1bhk-kothrud-pune'],
    ['Flats for rent in Andheri East, Mumbai', '/rent/flats-andheri-east-mumbai'],
    ['Flats for rent in Malad, Mumbai', '/rent/flats-malad-mumbai'],
    ['Flats for rent in Satellite, Ahmedabad', '/rent/flats-satellite-ahmedabad'],
    ['Flats for rent in Vastrapur, Ahmedabad', '/rent/flats-vastrapur-ahmedabad'],
    ['Flats for rent in Marathahalli, Bengaluru', '/rent/flats-marathahalli-bengaluru'],
    ['Flats for rent in HSR Layout, Bengaluru', '/rent/flats-hsr-layout-bengaluru'],
    ['Flats for rent in Madhapur, Hyderabad', '/rent/flats-madhapur-hyderabad'],
    ['Bachelor-friendly flats in Pune', '/rent/bachelor-flats-pune'],
    ['Fully furnished flats in Bengaluru', '/rent/furnished-flats-bengaluru'],
    ['Family flats for rent in Ahmedabad', '/rent/family-flats-ahmedabad'],
    ['Flats for rent in Sector 62, Noida', '/rent/flats-sector-62-noida'],
  ],
  plot: [
    ['Residential plots in Dholera SIR', '/buy/plots-dholera-sir'],
    ['NA plots near Dholera expressway', '/buy/na-plots-dholera-expressway'],
    ['Plots in Sanand, Ahmedabad', '/buy/plots-sanand-ahmedabad'],
    ['Plots in Sus Gaon, Pune', '/buy/plots-sus-gaon-pune'],
    ['Plots in Wagholi, Pune', '/buy/plots-wagholi-pune'],
    ['Farmland near Nashik', '/buy/farmland-nashik'],
    ['Plots in Devanahalli, Bengaluru', '/buy/plots-devanahalli-bengaluru'],
    ['Plots in Shadnagar, Hyderabad', '/buy/plots-shadnagar-hyderabad'],
    ['Plots in Kharghar, Navi Mumbai', '/buy/plots-kharghar-navi-mumbai'],
    ['Plots in Jagatpura, Jaipur', '/buy/plots-jagatpura-jaipur'],
    ['Plots in Kelambakkam, Chennai', '/buy/plots-kelambakkam-chennai'],
    ['Plots in Yamuna Expressway', '/buy/plots-yamuna-expressway'],
    ['Corner plots under ₹25 lakh', '/buy/plots-under-25-lakh'],
    ['Gated-community plots in Gujarat', '/buy/gated-plots-gujarat'],
    ['Industrial land in Sanand GIDC', '/buy/industrial-land-sanand'],
    ['Title-checked plots in Pune', '/buy/title-checked-plots-pune'],
  ],
  comm: [
    ['Shops for sale in Baner, Pune', '/commercial/shops-baner-pune'],
    ['Office space for rent in Kharadi', '/commercial/offices-kharadi-pune'],
    ['Showrooms on SG Highway, Ahmedabad', '/commercial/showrooms-sg-highway'],
    ['Office space in GIFT City', '/commercial/offices-gift-city'],
    ['Coworking desks in Hinjewadi', '/commercial/coworking-hinjewadi-pune'],
    ['Shops for rent in Prahlad Nagar', '/commercial/shops-prahlad-nagar'],
    ['Warehouses near Bhiwandi, Mumbai', '/commercial/warehouse-bhiwandi'],
    ['Office space in BKC, Mumbai', '/commercial/offices-bkc-mumbai'],
    ['Retail space in Koramangala', '/commercial/retail-koramangala-bengaluru'],
    ['Office space in HITEC City', '/commercial/offices-hitec-city-hyderabad'],
    ['Shops for sale in Surat', '/commercial/shops-surat'],
    ['Godowns near Sanand GIDC', '/commercial/godown-sanand'],
    ['Clinics and medical space in Pune', '/commercial/medical-space-pune'],
    ['Restaurant space in Viman Nagar', '/commercial/restaurant-space-viman-nagar'],
    ['Grade A offices in Noida', '/commercial/grade-a-offices-noida'],
    ['Shops for rent in New Town, Kolkata', '/commercial/shops-new-town-kolkata'],
  ],
};

const TABS: { id: TabKey; label: string }[] = [
  { id: 'sale', label: 'Flats for sale' },
  { id: 'rent', label: 'Flats for rent' },
  { id: 'plot', label: 'Plots & land' },
  { id: 'comm', label: 'Commercial' },
];

export function SeoFooterSection() {
  const [activePane, setActivePane] = useState<TabKey>('sale');

  return (
    <section className="farm">
      <div className="wrap">
        <div className="farm-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              className="farm-tab"
              role="tab"
              aria-selected={activePane === t.id}
              onClick={() => setActivePane(t.id)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="farm-links">
          {LOC[activePane].map((l, idx) => (
            <Link key={idx} href={l[1]}>
              {l[0]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeoFooterSection;
