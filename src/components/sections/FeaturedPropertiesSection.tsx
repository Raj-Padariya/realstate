import React from 'react';
import Link from 'next/link';
import { FeaturedPropertiesData } from '@/types/cms';
import { PropertyCard } from '../common/PropertyCard';

export interface FeaturedPropertiesSectionProps {
  data: FeaturedPropertiesData;
}

export const FeaturedPropertiesSection: React.FC<FeaturedPropertiesSectionProps> = ({ data }) => {
  return (
    <section
      id="listings"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
          <Link href={data.seeAllHref} className="more">
            {data.seeAllText}
          </Link>
        </div>

        <div className="cards">
          {data.listings.map((listing) => (
            <PropertyCard
              key={listing.id}
              listing={listing}
              ownerListedText={data.ownerListedText}
              ctaText={data.ctaText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
