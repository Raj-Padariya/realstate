'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BrokerageMeter from './brokerage-meter';
import { Search } from 'lucide-react';

export function HeroSection() {
  const router = useRouter();
  const [deal, setDeal] = useState('sale');
  const [city, setCity] = useState('Pune');
  const [locality, setLocality] = useState('');
  const [budget, setBudget] = useState('Any');

  function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const c = city.toLowerCase().replace(/\s+/g, '-');
    const q = locality.trim();
    router.push(`/properties?deal=${deal}&city=${c}${q ? `&q=${encodeURIComponent(q)}` : ''}`);
  }

  return (
    <section className="hero">
      <div className="wrap">
        <div>
          <div className="hero-tag">
            <span>NEW</span> Dholera SIR plots now listed
          </div>
          <h1>
            Buy, rent or sell property <span className="hl">without a broker</span> in between.
          </h1>
          <p className="hero-sub">
            Every listing comes from a verified owner with clear title papers. You call them, you visit, you decide. Nobody takes a cut.
          </p>

          <div className="sp">
            <div className="sp-tabs" role="tablist">
              <button
                className="sp-tab"
                role="tab"
                aria-selected={deal === 'sale'}
                onClick={() => setDeal('sale')}
                type="button"
              >
                Buy
              </button>
              <button
                className="sp-tab"
                role="tab"
                aria-selected={deal === 'rent'}
                onClick={() => setDeal('rent')}
                type="button"
              >
                Rent
              </button>
              <button
                className="sp-tab"
                role="tab"
                aria-selected={deal === 'commercial'}
                onClick={() => setDeal('commercial')}
                type="button"
              >
                Commercial
              </button>
              <button
                className="sp-tab"
                role="tab"
                aria-selected={deal === 'plot'}
                onClick={() => setDeal('plot')}
                type="button"
              >
                Plots &amp; land
              </button>
              <button
                className="sp-tab"
                role="tab"
                aria-selected={deal === 'project'}
                onClick={() => setDeal('project')}
                type="button"
              >
                New projects
              </button>
            </div>
            <form onSubmit={handleSearch} className="sp-body">
              <div className="fld">
                <label htmlFor="fCity">City</label>
                <select id="fCity" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Ahmedabad</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Delhi NCR</option>
                  <option>Surat</option>
                  <option>Dholera SIR</option>
                </select>
              </div>
              <div className="fld">
                <label htmlFor="fLoc">Locality or project</label>
                <input
                  id="fLoc"
                  type="text"
                  placeholder="e.g. Baner, Kharadi, Rohan Abhilasha"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                />
              </div>
              <div className="fld">
                <label htmlFor="fBud">Budget</label>
                <select id="fBud" value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option>Any</option>
                  <option>Up to ₹50 L</option>
                  <option>₹50 L – ₹1 Cr</option>
                  <option>₹1 Cr – ₹2 Cr</option>
                  <option>Above ₹2 Cr</option>
                </select>
              </div>
              <button type="submit" className="btn btn-p" id="goSearch">
                <Search className="w-[17px] h-[17px]" />
                Search
              </button>
            </form>
          </div>

          <div className="chips">
            <b>Popular</b>
            <a className="chip" href="/properties?deal=sale&city=pune&q=baner">
              Baner, Pune
            </a>
            <a className="chip" href="/properties?deal=sale&city=pune&q=kharadi">
              Kharadi
            </a>
            <a className="chip" href="/properties?deal=sale&city=ahmedabad&q=sg-highway">
              SG Highway
            </a>
            <a className="chip" href="/properties?deal=sale&city=dholera-sir">
              Dholera SIR
            </a>
            <a className="chip" href="/properties?deal=sale&city=ahmedabad&q=gift-city">
              GIFT City
            </a>
            <a className="chip" href="/properties?deal=rent&city=pune&q=hinjewadi">
              Rent in Hinjewadi
            </a>
          </div>
        </div>

        {/* SIGNATURE: Brokerage Meter */}
        <BrokerageMeter />
      </div>
    </section>
  );
}

export default HeroSection;
