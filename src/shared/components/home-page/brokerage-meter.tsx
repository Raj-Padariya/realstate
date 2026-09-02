'use client';

import React, { useState } from 'react';

function inr(n: number): string {
  const s = Math.round(n).toString();
  let last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  if (rest) last3 = ',' + last3;
  return '₹' + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + last3;
}

function crLakh(lakh: number): string {
  return lakh >= 100
    ? '₹' + (lakh / 100).toFixed(2).replace(/\.00$/, '') + ' Cr'
    : '₹' + lakh + ' L';
}

export default function BrokerageMeter() {
  const [lakh, setLakh] = useState<number>(125);

  const fee = lakh * 100000 * 0.02;

  return (
    <aside className="meter">
      <div className="meter-k">Brokerage meter</div>
      <h3>What a broker would cost you</h3>
      <p className="meter-note">
        Drag to your budget. Standard agent commission in India is 2% of the deal value, from both sides.
      </p>

      <div className="meter-val">
        <span>Property value</span>
        <b>{crLakh(lakh)}</b>
      </div>
      <input
        type="range"
        min="10"
        max="500"
        step="5"
        value={lakh}
        onChange={(e) => setLakh(Number(e.target.value))}
        aria-label="Property value in lakh rupees"
      />

      <div className="meter-rows">
        <div className="meter-row">
          <span>Through an agent (2%)</span>
          <b>{inr(fee)}</b>
        </div>
        <div className="meter-row meter-row--us">
          <span>Through GujjuProperty</span>
          <b>₹0</b>
        </div>
      </div>

      <div className="meter-save">
        You keep <b>{inr(fee)}</b> in your own pocket
      </div>
      <p className="meter-fine">Owner listings are free to post and free to contact.</p>
    </aside>
  );
}
