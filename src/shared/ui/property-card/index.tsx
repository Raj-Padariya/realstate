'use client';

import React from 'react';
import Link from 'next/link';
import { PropertyListingItem } from '@/shared/types/cms';
import Badge from '@/shared/ui/badge';
import Button from '@/shared/ui/button';
import { Heart, MapPin } from 'lucide-react';

export interface PropertyCardProps {
  listing: PropertyListingItem;
  ownerListedText: string;
  ctaText: string;
}

export function PropertyCard({ listing, ownerListedText, ctaText }: PropertyCardProps) {
  const [isFav, setIsFav] = React.useState(false);

  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Standard 16:10 Ratio Image Container (215px height) */}
      <div
        className="ph"
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '215px',
          aspectRatio: '16/10',
          background: '#f3f4f6',
        }}
      >
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              position: 'absolute',
              inset: 0,
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#9CA3AF' }}>
            No Photo Available
          </div>
        )}

        {/* Top Badges */}
        <Badge text={listing.badgeText} isAmber={listing.isAmberBadge} />

        <button
          className={`fav ${isFav ? 'active' : ''}`}
          aria-label="Save property"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsFav(!isFav);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
          }}
        >
          <Heart
            className="w-4 h-4"
            style={{
              color: isFav ? '#EF4444' : '#6B7280',
              fill: isFav ? '#EF4444' : 'none',
            }}
          />
        </button>
      </div>

      <div className="cb" style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div className="price" style={{ fontSize: '19px', fontWeight: 850, color: '#1F2937' }}>
            {listing.price}
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 750, color: '#1F2937', margin: '4px 0 6px 0', lineHeight: 1.35 }}>
            <Link href={`/property/${listing.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {listing.title}
            </Link>
          </h3>
          <div className="addr" style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            <MapPin className="w-3.5 h-3.5 text-[#6D28D9] flex-shrink-0" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {listing.address}
            </span>
          </div>
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
        </div>

        <div className="cta-row" style={{ marginTop: 'auto', paddingTop: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 650, color: '#059669' }}>{ownerListedText}</span>
          <Link href={`/property/${listing.id}`}>
            <Button size="sm">{ctaText}</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
