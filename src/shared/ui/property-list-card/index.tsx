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

import { useProperties } from '@/shared/context/PropertyContext';

export interface PropertyListCardProps {
  listing: PropertyListingItem & { photos?: string[] };
  ownerDetailsBtnText?: string;
}

export function PropertyListCard({
  listing,
  ownerDetailsBtnText = 'Get Owner Details',
}: PropertyListCardProps) {
  const { isPropertySaved, toggleSaveProperty } = useProperties();
  const isFav = isPropertySaved(listing.id);
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
        display: 'flex',
        flexDirection: 'row',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        minHeight: '210px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#C4B5FD';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(82, 42, 176, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#E2E8F0';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
      }}
    >
      {/* LEFT IMAGE CONTAINER (Fixed 240px width) */}
      <div
        style={{
          position: 'relative',
          width: '240px',
          minWidth: '240px',
          maxWidth: '240px',
          background: '#F1ECFB',
          overflow: 'hidden',
          flexShrink: 0,
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
            <Home style={{ width: 44, height: 44, opacity: 0.4 }} />
          </div>
        )}

        {/* TOP-LEFT VERIFIED BADGE */}
        <span
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(6px)',
            color: listing.isAmberBadge ? '#D97706' : '#059669',
            fontSize: '11px',
            fontWeight: 800,
            padding: '4px 9px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            zIndex: 3,
            whiteSpace: 'nowrap',
          }}
        >
          <Check style={{ width: 12, height: 12, strokeWidth: 3 }} />
          {listing.badgeText || 'Verified Owner'}
        </span>

        {/* TOP-RIGHT HEART SHORTLIST BUTTON */}
        <button
          type="button"
          aria-label={isFav ? 'Remove from Shortlist' : 'Save Property'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveProperty(listing.id);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            zIndex: 3,
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Heart
            style={{
              width: 16,
              height: 16,
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
                left: '6px',
                transform: 'translateY(-50%)',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                zIndex: 4,
                color: '#1E293B',
              }}
            >
              <ChevronLeft style={{ width: 16, height: 16 }} />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Next photo"
              style={{
                position: 'absolute',
                top: '50%',
                right: '6px',
                transform: 'translateY(-50%)',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                zIndex: 4,
                color: '#1E293B',
              }}
            >
              <ChevronRight style={{ width: 16, height: 16 }} />
            </button>
          </>
        )}

        {/* BOTTOM-LEFT PHOTO COUNT */}
        <span
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#FFFFFF',
            fontSize: '10.5px',
            fontWeight: 700,
            padding: '2px 7px',
            borderRadius: '5px',
            zIndex: 3,
          }}
        >
          {hasRealPhotos ? `📸 ${activePhotoIdx + 1} / ${totalPhotos}` : 'No Photos'}
        </span>
      </div>

      {/* RIGHT BODY CONTAINER */}
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px',
          flex: 1,
          minWidth: 0,
        }}
      >
        <div>
          {/* TOP ROW: PRICE (Single Line) + ZERO BROKERAGE BADGE */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'nowrap' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
                {listing.price}
              </span>
              {listing.pricePerSqFt && (
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}>
                  {listing.pricePerSqFt}
                </span>
              )}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#059669',
                padding: '3px 9px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 800,
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              <ShieldCheck style={{ width: 13, height: 13 }} />
              <span>₹0 Brokerage</span>
            </div>
          </div>

          {/* TITLE */}
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 800, lineHeight: 1.35 }}>
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
                fontSize: '12px',
                fontWeight: 700,
                color: '#522AB0',
                marginBottom: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Building2 style={{ width: 12, height: 12 }} />
              <span>Scheme: {(listing as any).societyName || (listing as any).buildingName}</span>
            </div>
          )}

          {/* ADDRESS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748B', marginBottom: '10px' }}>
            <MapPin style={{ width: 13, height: 13, color: '#522AB0', flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{listing.address}</span>
          </div>

          {/* HORIZONTAL INLINE SPECS BAR */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#F8FAFC',
              border: '1px solid #EEF2F6',
              borderRadius: '10px',
              padding: '8px 14px',
              marginBottom: '10px',
              flexWrap: 'wrap',
            }}
          >
            {/* Config / BHK */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Home style={{ width: 13, height: 13, color: '#522AB0', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', fontWeight: 750, color: '#1E293B' }}>
                {listing.bhk || 'Plot/Land'}
              </span>
            </div>

            {/* Built-up Area */}
            {listing.areaSqFt && (
              <>
                <div style={{ width: '1px', height: '14px', background: '#CBD5E1' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Ruler style={{ width: 13, height: 13, color: '#522AB0', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 750, color: '#1E293B' }}>
                    {listing.areaSqFt}
                  </span>
                </div>
              </>
            )}

            {/* Floor Info */}
            {listing.floorInfo && (
              <>
                <div style={{ width: '1px', height: '14px', background: '#CBD5E1' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Layers style={{ width: 13, height: 13, color: '#522AB0', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 750, color: '#1E293B' }}>
                    {listing.floorInfo}
                  </span>
                </div>
              </>
            )}

            {/* Facing */}
            {listing.facing && (
              <>
                <div style={{ width: '1px', height: '14px', background: '#CBD5E1' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Compass style={{ width: 13, height: 13, color: '#522AB0', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 750, color: '#1E293B' }}>
                    {listing.facing}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* CHIPS */}
          {listing.chips && listing.chips.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {listing.chips.slice(0, 4).map((chip, i) => (
                <span
                  key={i}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    borderRadius: '5px',
                    padding: '2px 7px',
                    fontSize: '11px',
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

        {/* CARD FOOTER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            borderTop: '1px solid #F1F5F9',
            paddingTop: '10px',
            marginTop: 'auto',
          }}
        >
          <span style={{ fontSize: '12px', color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Clock style={{ width: 12, height: 12 }} />
            {formatPostedOn((listing as any).createdAt || listing.postedTime)}
          </span>

          <Link
            href={`/property/${listing.id}`}
            style={{
              background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
              color: '#FFFFFF',
              padding: '9px 18px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 750,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 3px 10px rgba(82, 42, 176, 0.25)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(82, 42, 176, 0.4)';
              e.currentTarget.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 3px 10px rgba(82, 42, 176, 0.25)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span>{ownerDetailsBtnText}</span>
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PropertyListCard;

