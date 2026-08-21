import React from 'react';
import { PropertyListingItem } from '@/shared/types/cms';
import Badge from '@/shared/ui/badge';
import Button from '@/shared/ui/button';

export interface PropertyCardProps {
  listing: PropertyListingItem;
  ownerListedText: string;
  ctaText: string;
}

export function PropertyCard({ listing, ownerListedText, ctaText }: PropertyCardProps) {
  return (
    <article className="card">
      <div className="ph" style={{ position: 'relative', overflow: 'hidden', minHeight: '158px' }}>
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
        ) : (
          <span>Photo</span>
        )}
        <Badge text={listing.badgeText} isAmber={listing.isAmberBadge} />
        <button className="fav" aria-label="Save">♡</button>
      </div>
      <div className="cb">
        <div className="price">
          {listing.price}
        </div>
        <h3>{listing.title}</h3>
        <div className="addr">{listing.address}</div>
        <div className="meta">
          {listing.specs ? (
            listing.specs.map((spec, index) => (
              <span key={index}>{spec}</span>
            ))
          ) : (
            <>
              {listing.bhk && <span>{listing.bhk}</span>}
              {listing.areaSqFt && <span>{listing.areaSqFt}</span>}
            </>
          )}
        </div>
        <div className="cta-row">
          <span>{ownerListedText}</span>
          <Button size="sm">{ctaText}</Button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
