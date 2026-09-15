'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Shield,
  Landmark,
  Truck,
  UserCheck,
  Camera,
  Receipt,
  MapPin,
} from 'lucide-react';

const SERVICES = [
  {
    h: '/rent-agreement',
    ic: <FileText className="w-[21px] h-[21px]" />,
    t: 'Rent agreement',
    d: 'E-stamped draft, biometric verification at your door, done inside 24 hours.',
  },
  {
    h: '/services/title-check',
    ic: <Shield className="w-[21px] h-[21px]" />,
    t: 'Title & 7/12 check',
    d: 'An advocate reads the ownership chain and EC before you pay any token.',
  },
  {
    h: '/services/home-loan',
    ic: <Landmark className="w-[21px] h-[21px]" />,
    t: 'Home loan',
    d: 'Pre-approval from SBI, HDFC, ICICI and Axis without running between branches.',
  },
  {
    h: '/services/packers-movers',
    ic: <Truck className="w-[21px] h-[21px]" />,
    t: 'Packers & movers',
    d: 'Vetted crews with a damage guarantee, quoted before the truck arrives.',
  },
  {
    h: '/services/tenant-verification',
    ic: <UserCheck className="w-[21px] h-[21px]" />,
    t: 'Tenant verification',
    d: 'Police-format check plus employment confirmation before you hand over keys.',
  },
  {
    h: '/services/photography',
    ic: <Camera className="w-[21px] h-[21px]" />,
    t: 'Listing photos',
    d: 'A photographer visits and shoots the place properly. Listings with photos move faster.',
  },
  {
    h: '/rent-receipts',
    ic: <Receipt className="w-[21px] h-[21px]" />,
    t: 'Rent receipts',
    d: 'Generate a year of HRA-ready receipts with revenue stamps for your filing.',
  },
  {
    h: '/services/site-visit',
    ic: <MapPin className="w-[21px] h-[21px]" />,
    t: 'Site visit booking',
    d: 'Pick a slot that suits you and the owner. Useful for out-of-city and NRI buyers.',
  },
];

export function ServicesSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head sec-head--row">
          <div>
            <span className="eyebrow">Optional add-ons</span>
            <h2>The paperwork nobody enjoys</h2>
            <p>Use them if you want them. Skip them and the listing still costs you nothing.</p>
          </div>
          <Link className="seeall" href="/services">
            All services &rarr;
          </Link>
        </div>

        <div className="svcs">
          {SERVICES.map((s, idx) => (
            <Link key={idx} className="svc" href={s.h}>
              <div className="svc-ic">{s.ic}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
