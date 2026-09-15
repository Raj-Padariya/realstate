'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PropertyListingItem } from '@/shared/types/cms';
import {
  Building2,
  MapPin,
  ShieldCheck,
  Check,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Compass,
  Layers,
  Ruler,
  Clock,
  KeyRound,
  Home,
} from 'lucide-react';
import { NO_PHOTO_PLACEHOLDER, isNoPhotoPlaceholder } from '@/shared/utils/photoPlaceholder';
import { formatPostedOn } from '@/shared/utils/dateUtils';

export interface PropertyListCardProps {
  listing: PropertyListingItem & { photos?: string[] };
  ownerDetailsBtnText?: string;
}

export function PropertyListCard({
  listing,
  ownerDetailsBtnText = 'Get Owner Details',
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
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = '#C4B5FD';
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(82, 42, 176, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#E2E8F0';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.04)';
      }}
    >
      {/* LEFT IMAGE CONTAINER */}
      <div
        style={{
          position: 'relative',
          minHeight: '250px',
          background: '#F1ECFB',
          overflow: 'hidden',
        }}
      >
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
              display: 'block',
              transition: 'transform 0.4s ease, opacity 0.2s ease',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F1ECFB',
              color: '#522AB0',
            }}
          >
            <Home style={{ width: 48, height: 48, opacity: 0.5 }} />
          </div>
        )}

        {/* Subtle Vignette Overlay at bottom of image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* TOP-LEFT VERIFIED BADGE */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            color: listing.isAmberBadge ? '#D97706' : '#059669',
            fontSize: '11px',
            fontWeight: 800,
            padding: '5px 10px',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            zIndex: 3,
          }}
        >
          <Check style={{ width: 13, height: 13, strokeWidth: 3 }} />
          {listing.badgeText || 'Verified Owner'}
        </span>

        {/* TOP-RIGHT HEART SHORTLIST BUTTON */}
        <button
          type="button"
          aria-label="Save Property"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFav(!isFav);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 3,
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Heart
            style={{
              width: 17,
              height: 17,
              color: isFav ? '#E11D48' : '#4B5563',
              fill: isFav ? '#E11D48' : 'none',
              transition: 'all 0.15s ease',
            }}
          />
        </button>

        {/* SLIDER NAVIGATION ARROWS */}
        {totalPhotos > 1 && (
          <>
            <button
              type="button"
              onClick={prevPhoto}
              aria-label="Previous photo"
              style={{
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 4,
                color: '#1E293B',
              }}
            >
              <ChevronLeft style={{ width: 18, height: 18 }} />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Next photo"
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 4,
                color: '#1E293B',
              }}
            >
              <ChevronRight style={{ width: 18, height: 18 }} />
            </button>
          </>
        )}

        {/* BOTTOM-LEFT PHOTO COUNT */}
        <span
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '6px',
            zIndex: 3,
          }}
        >
          {hasRealPhotos ? `📸 ${activePhotoIdx + 1} / ${totalPhotos}` : 'No Photos'}
        </span>

        {/* BOTTOM-RIGHT SLIDER DOTS */}
        {totalPhotos > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '10px',
              display: 'flex',
              gap: '4px',
              zIndex: 3,
            }}
          >
            {photosList.slice(0, 5).map((_, idx) => (
              <span
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActivePhotoIdx(idx);
                }}
                style={{
                  width: idx === activePhotoIdx ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background: idx === activePhotoIdx ? '#FEDC00' : 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT BODY CONTAINER */}
      <div
        style={{
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px',
          flex: 1,
        }}
      >
        <div>
          {/* PRICE + ZERO BROKERAGE HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.4px' }}>
                  {listing.price}
                </span>
                {listing.pricePerSqFt && (
                  <span style={{ fontSize: '13px', fontWeight: 650, color: '#64748B' }}>
                    {listing.pricePerSqFt}
                  </span>
                )}
              </div>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#059669',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.02em',
                flexShrink: 0,
              }}
            >
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>₹0 Brokerage</span>
            </div>
          </div>

          {/* TITLE */}
          <h3 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: 800, lineHeight: 1.35 }}>
            <Link
              href={`/property/${listing.id}`}
              style={{ color: '#1E293B', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#522AB0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1E293B')}
            >
              {listing.title}
            </Link>
          </h3>

          {/* SOCIETY / SCHEME BADGE */}
          {((listing as any).societyName || (listing as any).buildingName) && (
            <div
              style={{
                fontSize: '12.5px',
                fontWeight: 750,
                color: '#522AB0',
                marginBottom: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#F5F3FF',
                padding: '3px 9px',
                borderRadius: '6px',
                border: '1px solid #DDD6FE',
              }}
            >
              <Building2 style={{ width: 13, height: 13 }} />
              <span>Scheme: {(listing as any).societyName || (listing as any).buildingName}</span>
            </div>
          )}

          {/* ADDRESS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13.5px', color: '#64748B', marginBottom: '14px' }}>
            <MapPin style={{ width: 14, height: 14, color: '#522AB0', flexShrink: 0 }} />
            <span>{listing.address}</span>
          </div>

          {/* SLEEK INTEGRATED SPECS GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              background: '#F8FAFC',
              border: '1px solid #EEF2F6',
              borderRadius: '12px',
              padding: '10px 14px',
              marginBottom: '12px',
            }}
          >
            {/* BHK / Type */}
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 650, color: '#94A3B8', textTransform: 'uppercase' }}>
                Config
              </span>
              <b style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Home style={{ width: 13, height: 13, color: '#522AB0' }} />
                <span>{listing.bhk || 'Plot/Land'}</span>
              </b>
            </div>

            {/* Built-up Area */}
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 650, color: '#94A3B8', textTransform: 'uppercase' }}>
                Built-Up
              </span>
              <b style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Ruler style={{ width: 13, height: 13, color: '#522AB0' }} />
                <span>{listing.areaSqFt || 'N/A'}</span>
              </b>
            </div>

            {/* Floor Info */}
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 650, color: '#94A3B8', textTransform: 'uppercase' }}>
                Floor
              </span>
              <b style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Layers style={{ width: 13, height: 13, color: '#522AB0' }} />
                <span>{listing.floorInfo || 'Ground'}</span>
              </b>
            </div>

            {/* Facing / Status */}
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 650, color: '#94A3B8', textTransform: 'uppercase' }}>
                Facing
              </span>
              <b style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Compass style={{ width: 13, height: 13, color: '#522AB0' }} />
                <span>{listing.facing || 'East Facing'}</span>
              </b>
            </div>
          </div>

          {/* HIGHLIGHT CHIPS */}
          {listing.chips && listing.chips.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
              {listing.chips.map((chip, i) => (
                <span
                  key={i}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '11.5px',
                    fontWeight: 650,
                    color: '#475569',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CARD FOOTER: POSTED DATE + CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            borderTop: '1px solid #F1F5F9',
            paddingTop: '14px',
            marginTop: 'auto',
          }}
        >
          <span style={{ fontSize: '12px', color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Clock style={{ width: 13, height: 13 }} />
            {formatPostedOn((listing as any).createdAt || listing.postedTime)}
          </span>

          <Link
            href={`/property/${listing.id}`}
            style={{
              background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: 750,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(82, 42, 176, 0.25)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(82, 42, 176, 0.4)';
              e.currentTarget.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(82, 42, 176, 0.25)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span>{ownerDetailsBtnText}</span>
            <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PropertyListCard;

