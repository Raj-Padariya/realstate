'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const STATES: [string, string, string, string][] = [
  ['MH', 'Maharashtra', '18,420', 'Pune · Mumbai · Thane · Nashik · Nagpur'],
  ['KA', 'Karnataka', '12,180', 'Bengaluru · Mysuru · Mangaluru · Hubballi'],
  ['TS', 'Telangana', '9,340', 'Hyderabad · Secunderabad · Warangal'],
  ['GJ', 'Gujarat', '8,920', 'Ahmedabad · Surat · Vadodara · Dholera SIR'],
  ['TN', 'Tamil Nadu', '7,610', 'Chennai · Coimbatore · Madurai · Trichy'],
  ['UP', 'Uttar Pradesh', '6,880', 'Noida · Ghaziabad · Lucknow · Kanpur'],
  ['DL', 'Delhi NCR', '6,240', 'New Delhi · Gurugram · Faridabad'],
  ['WB', 'West Bengal', '4,510', 'Kolkata · Howrah · Siliguri · Durgapur'],
  ['RJ', 'Rajasthan', '3,940', 'Jaipur · Jodhpur · Udaipur · Kota'],
  ['KL', 'Kerala', '3,320', 'Kochi · Thiruvananthapuram · Kozhikode'],
  ['MP', 'Madhya Pradesh', '3,180', 'Indore · Bhopal · Jabalpur · Gwalior'],
  ['PB', 'Punjab', '2,470', 'Ludhiana · Mohali · Amritsar · Jalandhar'],
  ['HR', 'Haryana', '2,290', 'Gurugram · Panchkula · Karnal · Hisar'],
  ['AP', 'Andhra Pradesh', '2,140', 'Visakhapatnam · Vijayawada · Guntur'],
  ['OD', 'Odisha', '1,560', 'Bhubaneswar · Cuttack · Rourkela'],
  ['BR', 'Bihar', '1,280', 'Patna · Gaya · Muzaffarpur'],
];

export function StatesSection() {
  const [showMore, setShowMore] = useState(false);

  const initialStates = STATES.slice(0, 4);
  const extraStates = STATES.slice(4);

  return (
    <section className="sec sec--tint">
      <div className="wrap">
        <div className="sec-head sec-head--row">
          <div>
            <span className="eyebrow">Where we operate</span>
            <h2>Live listings across 28 states</h2>
            <p>Strongest coverage in the IT corridors and the emerging smart-city belts.</p>
          </div>
          <Link className="seeall" href="/properties">
            View every state &rarr;
          </Link>
        </div>

        <div className="states">
          {initialStates.map((s) => (
            <Link
              key={s[0]}
              className="state"
              href={`/properties?state=${s[1].toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="state-ab">{s[0]}</span>
              <span>
                <b>{s[1]}</b>
                <em>{s[2]} listings</em>
                <p>{s[3]}</p>
              </span>
            </Link>
          ))}
          {showMore &&
            extraStates.map((s) => (
              <Link
                key={s[0]}
                className="state"
                href={`/properties?state=${s[1].toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="state-ab">{s[0]}</span>
                <span>
                  <b>{s[1]}</b>
                  <em>{s[2]} listings</em>
                  <p>{s[3]}</p>
                </span>
              </Link>
            ))}
        </div>

        <div className="states-more">
          <button
            type="button"
            className="btn btn-o"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show fewer states' : 'Show 12 more states'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default StatesSection;
