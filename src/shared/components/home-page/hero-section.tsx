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
    if (deal === 'dholera') {
      router.push('/dholera-sir');
      return;
    }
    const c = city.toLowerCase().replace(/\s+/g, '-');
    const q = locality.trim();
    const params = new URLSearchParams();
    params.set('deal', deal);
    params.set('city', c);
    if (q) params.set('q', q);
    if (budget !== 'Any') params.set('budget', budget);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="hero">
      <div className="wrap">
        <div className="herotop">
          <div>
            <div className="hpill">
              <i>NEW</i>
              <span>Dholera SIR Smart City Plots Now Live &bull; Zero Brokerage</span>
            </div>
            <h1>
              Buy, rent or sell property <em>without a broker</em> in between.
            </h1>
            <p className="sub">
              Every listing comes from a verified owner with clear title papers. You call them, you visit, you decide. Nobody takes a cut.
            </p>
          </div>

          <div>
            <BrokerageMeter />
          </div>
        </div>

        <div className="searchbox">
          <div className="tabs" role="tablist">
            <button
              className="tab"
              role="tab"
              aria-selected={deal === 'sale'}
              onClick={() => setDeal('sale')}
              type="button"
            >
              Buy
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected={deal === 'rent'}
              onClick={() => setDeal('rent')}
              type="button"
            >
              Rent
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected={deal === 'commercial'}
              onClick={() => setDeal('commercial')}
              type="button"
            >
              Commercial
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected={deal === 'plot'}
              onClick={() => setDeal('plot')}
              type="button"
            >
              Plots &amp; land
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected={deal === 'dholera'}
              onClick={() => router.push('/dholera-sir')}
              type="button"
              style={{ color: '#41208C', fontWeight: 800 }}
            >
              ⚡ Dholera SIR
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected={deal === 'project'}
              onClick={() => setDeal('project')}
              type="button"
            >
              New projects
            </button>
          </div>
          <form onSubmit={handleSearch} className="srow">
            <div className="fld">
              <label htmlFor="fCity">City</label>
              <select id="fCity" value={city} onChange={(e) => setCity(e.target.value)}>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Ahmedabad</option>
                <option>Dholera SIR</option>
                <option>Bengaluru</option>
                <option>Hyderabad</option>
                <option>Delhi NCR</option>
                <option>Surat</option>
                <option>Vadodara</option>
              </select>
            </div>
            <div className="fld">
              <label htmlFor="fLoc">Locality, Landmark or Project</label>
              <input
                id="fLoc"
                type="text"
                placeholder="e.g. Baner, Kharadi, SG Highway..."
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
            <div className="gobox">
              <button type="submit" className="btn btn-p" id="goSearch" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <Search className="w-[17px] h-[17px]" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div className="chips">
          <b style={{ alignSelf: 'center', color: 'var(--brand)', marginRight: '4px' }}>Popular:</b>
          <a className="chip" href="/properties?deal=sale&city=pune&q=baner">
            Baner, Pune
          </a>
          <a className="chip" href="/properties?deal=sale&city=pune&q=kharadi">
            Kharadi
          </a>
          <a className="chip" href="/properties?deal=sale&city=ahmedabad&q=sg-highway">
            SG Highway
          </a>
          <a className="chip" href="/dholera-sir">
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
    </section>
  );
}

export default HeroSection;
