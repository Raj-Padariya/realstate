'use client';

import React from 'react';
import Link from 'next/link';
import { useProperties } from '@/shared/context/PropertyContext';
import {
  Heart,
  X,
  Trash2,
  Building2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Home,
} from 'lucide-react';

interface ShortlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({ isOpen, onClose }) => {
  const { savedProperties, savedIds, toggleSaveProperty, clearAllSaved } = useProperties();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Scrim */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Slide-Over Drawer Container */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shortlisted Properties"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '440px',
          background: '#FFFFFF',
          zIndex: 9999,
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #EEF2F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #FAF9FD 0%, #F5F3FF 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#EDE9FE',
                color: '#522AB0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart style={{ width: 20, height: 20, fill: '#522AB0' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Shortlisted Properties
              </h2>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {savedProperties.length > 0 && (
              <button
                type="button"
                onClick={clearAllSaved}
                title="Clear all saved"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E11D48')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                Clear All
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Drawer"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>

        {/* Drawer Body Stream */}
        <div style={{ padding: '18px 20px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {savedProperties.length > 0 ? (
            savedProperties.map((prop) => (
              <div
                key={prop.id}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '12px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C4B5FD';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(82, 42, 176, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '12px',
                    background: '#F1ECFB',
                    overflow: 'hidden',
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <img
                    src={prop.image || (prop.photos && prop.photos[0]) || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'}
                    alt={prop.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      background: 'rgba(5, 150, 105, 0.95)',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '4px',
                    }}
                  >
                    0% Fee
                  </span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 900, color: '#0F172A' }}>
                      {prop.price}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 650 }}>
                      {prop.bhk || prop.areaSqFt}
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: '0 0 4px 0',
                      fontSize: '13.5px',
                      fontWeight: 750,
                      color: '#1E293B',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {prop.title}
                  </h3>

                  <div style={{ fontSize: '11.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '8px' }}>
                    <MapPin style={{ width: 12, height: 12, color: '#522AB0', flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {prop.address}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link
                      href={`/property/${prop.id}`}
                      onClick={onClose}
                      style={{
                        fontSize: '12px',
                        fontWeight: 750,
                        color: '#522AB0',
                        background: '#EDE9FE',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>View Details</span>
                      <ArrowRight style={{ width: 11, height: 11 }} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleSaveProperty(prop.id)}
                      title="Remove from shortlist"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94A3B8',
                        padding: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#E11D48')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                    >
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto 0',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#F1ECFB',
                  color: '#522AB0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Heart style={{ width: 30, height: 30, color: '#522AB0' }} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                No Shortlisted Properties Yet
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '280px', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                Click the heart icon on any property listing or project card to save it here for quick access.
              </p>
              <Link
                href="/properties"
                onClick={onClose}
                style={{
                  background: '#522AB0',
                  color: '#FFFFFF',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 750,
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(82, 42, 176, 0.25)',
                }}
              >
                Explore Properties
              </Link>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {savedProperties.length > 0 && (
          <div
            style={{
              padding: '18px 20px',
              borderTop: '1px solid #EEF2F6',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Link
              href="/saved-properties"
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #522AB0 0%, #41208C 100%)',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 750,
                textAlign: 'center',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(82, 42, 176, 0.25)',
              }}
            >
              <span>View All on Saved Page ({savedProperties.length})</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default ShortlistDrawer;
