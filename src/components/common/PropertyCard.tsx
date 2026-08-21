import React from 'react';
import { PropertyListingItem } from '@/types/cms';
import { Badge } from './Badge';
import { Button } from './Button';

export interface PropertyCardProps {
  listing: PropertyListingItem;
  ownerListedText: string;
  ctaText: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  listing,
  ownerListedText,
  ctaText,
}) => {
  return (
    <article className="card">
      <div className="ph" style={{ background: listing.bgColor }}>
        Photo
        <Badge text={listing.badgeText} isAmber={listing.isAmberBadge} />
        <button className="fav" aria-label="Save">♡</button>
      </div>
      <div className="cb">
        <div className="price">
          {listing.price}
          {listing.period && <small>{listing.period}</small>}
        </div>
        <h3>{listing.title}</h3>
        <div className="addr">{listing.location}</div>
        <div className="meta">
          {listing.specs.map((spec, index) => (
            <span key={index}>{spec}</span>
          ))}
        </div>
        <div className="cta-row">
          <span>{ownerListedText}</span>
          <Button size="sm">{ctaText}</Button>
        </div>
      </div>
    </article>
  );
};
