'use client';

import React from 'react';
import { User, IndianRupee, ShieldCheck, KeyRound } from 'lucide-react';

export function TrustSection() {
  return (
    <section className="trust">
      <div className="wrap">
        <div className="trust-i">
          <User className="w-[26px] h-[26px]" />
          <div>
            <b>Owners only</b>
            <p>Every listing is posted by the person who owns it. No agent reposts.</p>
          </div>
        </div>
        <div className="trust-i">
          <IndianRupee className="w-[26px] h-[26px]" />
          <div>
            <b>No commission</b>
            <p>Nothing to us at any stage — not on a rental, not on a sale.</p>
          </div>
        </div>
        <div className="trust-i">
          <ShieldCheck className="w-[26px] h-[26px]" />
          <div>
            <b>Title checked</b>
            <p>7/12 extract and encumbrance certificate read by a registered advocate.</p>
          </div>
        </div>
        <div className="trust-i">
          <KeyRound className="w-[26px] h-[26px]" />
          <div>
            <b>Ready to move</b>
            <p>Filter for possession-ready homes and skip the construction wait.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
