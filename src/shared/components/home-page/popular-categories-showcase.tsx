'use client';

import React from 'react';
import Link from 'next/link';
import mockCmsData from '@/shared/data/mockCmsData.json';


const W = 400;
const H = 200;

function frame(inner: React.ReactNode) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <rect width={W} height={H} fill="#EFE9FB" />
      {inner}
    </svg>
  );
}

function win(x: number, y: number, w: number, hh: number, lit: boolean) {
  return <rect key={`${x}-${y}`} x={x} y={y} width={w} height={hh} fill={lit ? '#FEDC00' : '#6b45c9'} />;
}

function lit(seed: number) {
  return (seed * 7) % 5 < 2;
}

const ART: Record<string, React.ReactNode> = {
  flat: frame(
    <>
      <rect x="52" y="46" width="86" height="132" fill="#522AB0" />
      <rect x="150" y="72" width="74" height="106" fill="#5E33C4" />
      <rect x="236" y="30" width="96" height="148" fill="#41208C" />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2].map((c) => win(64 + c * 24, 60 + r * 24, 14, 14, lit(r * 3 + c)))
      )}
      {[0, 1, 2, 3].map((r) =>
        [0, 1].map((c) => win(162 + c * 26, 86 + r * 24, 14, 14, lit(r * 2 + c + 1)))
      )}
      {[0, 1, 2, 3, 4, 5].map((r) =>
        [0, 1, 2].map((c) => win(248 + c * 28, 44 + r * 23, 15, 14, lit(r * 3 + c + 2)))
      )}
      <rect x="0" y="178" width="400" height="22" fill="#41208C" />
    </>
  ),
  plot: frame(
    <>
      <path d="M0 130 L400 96 L400 200 L0 200Z" fill="#dcd3f3" />
      <path d="M52 152 L196 128 L258 152 L114 178Z" fill="#522AB0" />
      <path d="M208 126 L330 106 L382 128 L260 148Z" fill="#5E33C4" />
      <path d="M52 152 L196 128 M208 126 L330 106" stroke="#FEDC00" strokeWidth="3" />
      <circle cx="196" cy="128" r="5" fill="#FEDC00" />
      <circle cx="330" cy="106" r="5" fill="#FEDC00" />
      <circle cx="52" cy="152" r="5" fill="#FEDC00" />
      <circle cx="208" cy="126" r="5" fill="#FEDC00" />
      <path d="M0 118 L400 84" stroke="#41208C" strokeWidth="11" />
      <path d="M0 101 L400 67" stroke="#8f74e0" strokeWidth="2" strokeDasharray="14 12" />
    </>
  ),
  villa: frame(
    <>
      <rect x="0" y="150" width="400" height="50" fill="#dcd3f3" />
      <path d="M96 92 L200 40 L304 92Z" fill="#41208C" />
      <rect x="118" y="92" width="164" height="70" fill="#522AB0" />
      {win(140, 110, 34, 30, true)}
      {win(186, 110, 34, 30, false)}
      <rect x="232" y="110" width="30" height="52" fill="#41208C" />
      <rect x="60" y="140" width="46" height="22" fill="#5E33C4" />
      <circle cx="330" cy="132" r="20" fill="#5E33C4" />
      <rect x="327" y="132" width="6" height="30" fill="#41208C" />
    </>
  ),
  comm: frame(
    <>
      <rect x="44" y="34" width="120" height="144" fill="#41208C" />
      <rect x="176" y="62" width="88" height="116" fill="#522AB0" />
      <rect x="276" y="20" width="84" height="158" fill="#5E33C4" />
      {[0, 1, 2, 3, 4, 5].map((r) => win(56, 46 + r * 22, 96, 10, lit(r + 1)))}
      {[0, 1, 2, 3, 4].map((r) => win(186, 74 + r * 21, 68, 9, lit(r * 2)))}
      {[0, 1, 2, 3, 4, 5, 6].map((r) => win(286, 32 + r * 21, 64, 9, lit(r * 3 + 1)))}
      <rect x="0" y="178" width="400" height="22" fill="#41208C" />
    </>
  ),
  studio: frame(
    <>
      <rect x="96" y="44" width="208" height="134" fill="#522AB0" />
      {win(118, 66, 76, 52, true)}
      {win(208, 66, 76, 52, false)}
      <rect x="118" y="130" width="166" height="48" fill="#41208C" />
      <rect x="150" y="146" width="46" height="32" fill="#5E33C4" />
      <rect x="0" y="178" width="400" height="22" fill="#41208C" />
    </>
  ),
  floor: frame(
    <>
      <rect x="70" y="52" width="260" height="126" fill="#522AB0" />
      <rect x="70" y="52" width="260" height="26" fill="#41208C" />
      <rect x="70" y="104" width="260" height="4" fill="#EFE9FB" />
      <rect x="70" y="140" width="260" height="4" fill="#EFE9FB" />
      {win(92, 84, 40, 14, true)}
      {win(150, 84, 40, 14, false)}
      {win(208, 84, 40, 14, true)}
      {win(92, 118, 40, 14, false)}
      {win(150, 118, 40, 14, true)}
      {win(266, 118, 40, 14, false)}
      <rect x="0" y="178" width="400" height="22" fill="#41208C" />
    </>
  ),
};

const propertyTypesData = mockCmsData.propertyTypes;

const TYPES = propertyTypesData.types.map((type) => ({
  k: type.art,
  n: type.count,
  t: type.title,
  d: type.description,
  h: type.href,
}));

export function PopularCategoriesShowcase() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head sec-head--row">
          <div>
            <span className="eyebrow">Browse by type</span>
            <h2>Flats, plots, villas and workspaces</h2>
            <p>Verified owner listings sorted by what you are actually looking for.</p>
          </div>
          <Link className="seeall" href="/properties">
            See all listings &rarr;
          </Link>
        </div>

        <div className="types">
          {TYPES.map((t) => (
            <Link key={t.k} className="type" href={t.h}>
              <div className="type-art">{ART[t.k]}</div>
              <div className="type-ct">
                <div className="type-n">{t.n}</div>
                <h3>{t.t}</h3>
                <p>{t.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCategoriesShowcase;
