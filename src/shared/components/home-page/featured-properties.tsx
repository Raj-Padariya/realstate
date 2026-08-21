'use client';

import React from 'react';
import Link from 'next/link';
import { FeaturedPropertiesData } from '@/shared/types/cms';
import PropertyCard from '@/shared/ui/property-card';
import { useProperties } from '@/shared/context/PropertyContext';

export interface FeaturedPropertiesProps {
  data: FeaturedPropertiesData;
}

export function FeaturedProperties({ data }: FeaturedPropertiesProps) {
  const { properties } = useProperties();
  const displayListings = properties && properties.length > 0 ? properties.slice(0, 6) : data.listings;

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
          {displayListings.map((listing) => (
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
}

export default FeaturedProperties;
