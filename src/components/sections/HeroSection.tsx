import React from 'react';
import { HeroSectionData, SearchBarData, StateItem } from '@/types/cms';
import { SearchBar } from './SearchBar';

export interface HeroSectionProps {
  heroData: HeroSectionData;
  searchBarData: SearchBarData;
  states: StateItem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroData,
  searchBarData,
  states,
}) => {
  return (
    <div className="hero">
      <div className="wrap">
        <div className="herotop">
          <div>
            <span className="hpill">
              <i>{heroData.newBadgeText}</i> {heroData.newBadgeMessage}
            </span>
            <h1>
              {heroData.headingPrefix}
              <em>{heroData.headingHighlight}</em>
              {heroData.headingSuffix}
            </h1>
            <p className="sub">{heroData.subtitle}</p>
            <div className="hnote">
              <span className="st">{heroData.ratingStars}</span>{' '}
              <span>
                <b>{heroData.ratingScore}</b> {heroData.ratingCount} · {heroData.ratingOwnerCount}
              </span>
            </div>
          </div>

          <div className="herovis">
            <div className="hstack">
              <span className="hchip a">{heroData.heroCard.chipAText}</span>
              <div className="hcard">
                <div className="pic">
                  <svg viewBox="0 0 260 130" aria-hidden="true">
                    <rect x="14" y="52" width="52" height="62" rx="4" fill="#522AB0" opacity=".55" />
                    <rect x="196" y="64" width="50" height="50" rx="4" fill="#522AB0" opacity=".4" />
                    <path d="M78 62 130 24l52 38v52H78z" fill="#522AB0" />
                    <path d="M130 18 190 62h-12l-48-35-48 35H70z" fill="#41208C" />
                    <rect x="116" y="84" width="28" height="30" rx="2" fill="#FEDC00" />
                    <rect x="92" y="72" width="18" height="16" rx="2" fill="#EFE9FB" />
                    <rect x="150" y="72" width="18" height="16" rx="2" fill="#EFE9FB" />
                    <g fill="#522AB0" opacity=".55">
                      <rect x="24" y="62" width="12" height="10" rx="2" />
                      <rect x="44" y="62" width="12" height="10" rx="2" />
                      <rect x="24" y="80" width="12" height="10" rx="2" />
                      <rect x="44" y="80" width="12" height="10" rx="2" />
                    </g>
                    <g fill="#522AB0" opacity=".4">
                      <rect x="206" y="74" width="12" height="10" rx="2" />
                      <rect x="224" y="74" width="12" height="10" rx="2" />
                      <rect x="206" y="92" width="12" height="10" rx="2" />
                    </g>
                    <rect x="0" y="114" width="260" height="16" fill="#41208C" opacity=".18" />
                  </svg>
                </div>
                <div className="hb">
                  <div className="hp">{heroData.heroCard.price}</div>
                  <div className="ht">{heroData.heroCard.title}</div>
                  <div className="ha">{heroData.heroCard.location}</div>
                  <div className="hm">
                    {heroData.heroCard.specs.map((spec, idx) => (
                      <span key={idx}>{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
              <span className="hchip b">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3l7.4 2.9v5.4c0 4.6-3.1 8-7.4 9.6-4.3-1.6-7.4-5-7.4-9.6V5.9z" />
                  <path d="M8.9 12.1l2.2 2.2 4.2-4.5" />
                </svg>{' '}
                {heroData.heroCard.chipBText}
              </span>
            </div>
          </div>
        </div>

        <SearchBar searchBarData={searchBarData} states={states} />
      </div>
    </div>
  );
};
