'use client';

import React from 'react';
import Link from 'next/link';
import { BuilderProjectItem } from '@/shared/types/cms';
import { MapPin, ShieldCheck, ArrowRight, Building, CheckCircle2 } from 'lucide-react';

export interface ProjectCardProps {
  project: BuilderProjectItem;
  viewProjectText: string;
}

export function ProjectCard({ project, viewProjectText }: ProjectCardProps) {
  const stageBadgeColor: Record<string, { bg: string; text: string }> = {
    'New Launch': { bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', text: '#ffffff' },
    'Under Construction': { bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', text: '#ffffff' },
    'Ready to Move': { bg: 'linear-gradient(135deg, #6D28D9 0%, #522AB0 100%)', text: '#ffffff' },
    'Ready to Register': { bg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', text: '#ffffff' },
  };

  const currentBadge = stageBadgeColor[project.stage] || {
    bg: 'linear-gradient(135deg, #6D28D9 0%, #522AB0 100%)',
    text: '#ffffff',
  };

  const defaultProjectImage = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';
  const imgUrl = project.imageUrl || defaultProjectImage;

  return (
    <article
      style={{
        background: '#ffffff',
        borderRadius: '22px',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.45)';
        e.currentTarget.style.borderColor = '#FEDC00';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.28)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
      }}
    >
      {/* Project Image Header */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
        <img
          src={imgUrl}
          alt={project.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />

        {/* Gradient Shadow Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            right: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              background: currentBadge.bg,
              color: currentBadge.text,
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {project.stage}
          </span>

          <span
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              color: '#10B981',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(16, 185, 129, 0.4)',
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> RERA Verified
          </span>
        </div>

        {/* Bottom Builder Tag on Image */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            color: '#1F2937',
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '11.5px',
            fontWeight: 750,
          }}
        >
          <Building className="w-3 h-3 text-[#522AB0]" />
          <span>{project.builder}</span>
          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
        </div>
      </div>

      {/* Card Body Info */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1F2937', margin: '0 0 6px 0', lineHeight: 1.3 }}>
            {project.name}
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '13px',
              color: '#6B7280',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            <MapPin className="w-3.5 h-3.5 text-[#6D28D9] flex-shrink-0" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {project.location}
            </span>
          </div>

          <div
            style={{
              background: '#FAF9FD',
              border: '1px solid #EFE9FB',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '12.5px',
              fontWeight: 700,
              color: '#522AB0',
              marginBottom: '14px',
            }}
          >
            {project.config}
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid #F3F4F6',
              marginBottom: '14px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>Price Range</div>
              <div style={{ fontSize: '18px', fontWeight: 850, color: '#1F2937' }}>{project.priceRange}</div>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 650, color: '#059669', textAlign: 'right' }}>
              {project.priceNote}
            </div>
          </div>

          <Link
            href={`/properties?search=${encodeURIComponent(project.name)}`}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #522AB0 0%, #6D28D9 100%)',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '13.5px',
              fontWeight: 750,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(82, 42, 176, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #431E9E 0%, #5B21B6 100%)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(82, 42, 176, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #522AB0 0%, #6D28D9 100%)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(82, 42, 176, 0.25)';
            }}
          >
            <span>{viewProjectText || 'View Project Details'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
