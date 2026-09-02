'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export function OwnerBanner() {
  return (
    <section className="band">
      <div className="wrap">
        <div>
          <h2>Renting it out or selling it?</h2>
          <p>
            Put it up in about four minutes. Buyers and tenants call you directly — we never hand your number to an agent.
          </p>
          <ul className="ticks">
            <li>
              <Check className="w-[19px] h-[19px] text-[#FEDC00] mt-0.5 flex-shrink-0" />
              Calls come from people who actually want the property
            </li>
            <li>
              <Check className="w-[19px] h-[19px] text-[#FEDC00] mt-0.5 flex-shrink-0" />
              No listing fee, no success fee, no renewal fee
            </li>
            <li>
              <Check className="w-[19px] h-[19px] text-[#FEDC00] mt-0.5 flex-shrink-0" />
              Upload your papers once and carry a verified badge
            </li>
            <li>
              <Check className="w-[19px] h-[19px] text-[#FEDC00] mt-0.5 flex-shrink-0" />
              Every enquiry lands on WhatsApp the moment it comes in
            </li>
          </ul>
          <div className="band-cta">
            <Link className="btn btn-y" href="/post-property">
              Post your property
            </Link>
            <Link className="btn btn-w" href="/tenant-plans?tab=owner">
              Compare owner plans
            </Link>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <b>3,140</b>
            <span>Owners listed this month</span>
          </div>
          <div className="stat">
            <b>48 hrs</b>
            <span>Median time to first genuine enquiry</span>
          </div>
          <div className="stat">
            <b>₹0</b>
            <span>Charged to owners, ever</span>
          </div>
          <div className="stat">
            <b>4.8 / 5</b>
            <span>From 12,400 owner reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OwnerBanner;
