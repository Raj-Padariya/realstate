'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PropertyListingItem } from '@/shared/types/cms';

export interface PropertyListCardProps {
  listing: PropertyListingItem & { photos?: string[] };
  ownerDetailsBtnText?: string;
}

import { NO_PHOTO_PLACEHOLDER, isNoPhotoPlaceholder } from '@/shared/utils/photoPlaceholder';
import { formatPostedOn } from '@/shared/utils/dateUtils';

export function PropertyListCard({
  listing,
  ownerDetailsBtnText = 'Get owner details',
}: PropertyListCardProps) {
  const [isFav, setIsFav] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const hasRealPhotos = Boolean(
    (listing.photos && listing.photos.length > 0 && !isNoPhotoPlaceholder(listing.photos[0])) ||
    (listing.image && !isNoPhotoPlaceholder(listing.image))
  );

  const photosList = hasRealPhotos
    ? (listing.photos && listing.photos.length > 0 ? listing.photos : [listing.image!])
    : [NO_PHOTO_PLACEHOLDER];

  const totalPhotos = hasRealPhotos ? photosList.length : 0;

  const nextPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % totalPhotos);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const currentImgUrl = photosList[activePhotoIdx] || listing.image;

  return (
    <article className="rcard">
      <div className="rpic" style={{ position: 'relative', overflow: 'hidden' }}>
        {currentImgUrl ? (
          <img
            src={currentImgUrl}
            alt={`${listing.title} photo ${activePhotoIdx + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
              transition: 'opacity 0.25s ease-in-out',
            }}
          />
        ) : (
          <svg viewBox="0 0 270 216" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="270" height="216" fill="#EFE9FB" />
            <rect y="168" width="270" height="48" fill="#DCD1F3" />
            <rect x="34" y="46" width="80" height="122" rx="4" fill="#522AB0" />
            <rect x="126" y="70" width="66" height="98" rx="4" fill="#41208C" opacity=".8" />
            <rect x="204" y="96" width="44" height="72" rx="4" fill="#522AB0" opacity=".55" />
            <rect x="66" y="138" width="22" height="30" rx="2" fill="#FEDC00" />
            <circle cx="232" cy="40" r="16" fill="#FEDC00" />
          </svg>
        )}

        {/* LEFT / RIGHT SLIDER ARROWS */}
        {totalPhotos > 1 && (
          <>
            <button
              type="button"
              className="rcard-nav prev"
              onClick={prevPhoto}
              aria-label="Previous image"
              title="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="rcard-nav next"
              onClick={nextPhoto}
              aria-label="Next image"
              title="Next image"
            >
              ›
            </button>
          </>
        )}

        <span className="rbadge" style={listing.isAmberBadge ? { color: '#8a5f00' } : undefined}>
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          {listing.badgeText}
        </span>

        <button
          className={`rheart ${isFav ? 'on' : ''}`}
          type="button"
          aria-label="Shortlist"
          onClick={(e) => {
            e.preventDefault();
            setIsFav(!isFav);
          }}
        >
          {isFav ? '♥' : '♡'}
        </button>

        <span className="rcount">
          {hasRealPhotos ? `${activePhotoIdx + 1} / ${totalPhotos} photos` : 'No Photos'}
        </span>

        {/* INTERACTIVE SLIDER DOTS */}
        <span className="rdots">
          {photosList.slice(0, 5).map((_, idx) => (
            <i
              key={idx}
              className={idx === activePhotoIdx ? 'on' : ''}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActivePhotoIdx(idx);
              }}
              title={`View photo ${idx + 1}`}
            />
          ))}
        </span>
      </div>

      <div className="rbody">
        <div className="rtop">
          <div className="rprice">
            {listing.price}
            {listing.pricePerSqFt && <small>{listing.pricePerSqFt}</small>}
          </div>
        </div>

        <h3>
          <Link href={`/property/${listing.id}`}>{listing.title}</Link>
        </h3>
        {((listing as any).societyName || (listing as any).buildingName) && (
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#522ab0', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            🏢 Scheme: {(listing as any).societyName || (listing as any).buildingName}
          </div>
        )}
        <div className="raddr">{listing.address}</div>

        <div className="rspecs">
          {listing.bhk && (
            <div>
              <b>{listing.bhk}</b>
              <span>BHK</span>
            </div>
          )}
          {listing.areaSqFt && (
            <div>
              <b>{listing.areaSqFt}</b>
              <span>Built-up</span>
            </div>
          )}
          {listing.floorInfo && (
            <div>
              <b>{listing.floorInfo}</b>
              <span>Floor</span>
            </div>
          )}
          {listing.facing && (
            <div>
              <b>{listing.facing}</b>
              <span>Facing</span>
            </div>
          )}
        </div>

        {listing.chips && listing.chips.length > 0 && (
          <div className="rchips">
            {listing.chips.map((chip, i) => (
              <span key={i} className="rchip">
                {chip}
              </span>
            ))}
          </div>
        )}

        <div className="rfoot">
          <span className="rposted">{formatPostedOn((listing as any).createdAt || listing.postedTime)}</span>
          <Link className="btn" href={`/property/${listing.id}`}>
            {ownerDetailsBtnText}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PropertyListCard;
