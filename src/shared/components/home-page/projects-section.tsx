'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ProjectsSectionData } from '@/shared/types/cms';
import ProjectCard from '@/shared/ui/project-card';
import { ArrowRight, Sparkles, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ProjectsSectionProps {
  data: ProjectsSectionData;
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const sliderRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { id: 'all', label: 'All Developments' },
    { id: 'Ahmedabad', label: 'Ahmedabad' },
    { id: 'Dholera', label: 'Dholera SIR' },
    { id: 'Gandhinagar', label: 'GIFT City' },
    { id: 'Pune', label: 'Pune' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? data.projects
    : data.projects.filter((p) => (p.city || p.location).toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleSlide = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      style={{
        background: 'linear-gradient(135deg, #12062B 0%, #240F52 45%, #3C1A83 100%)',
        padding: '72px 0',
        position: 'relative',
        overflow: 'hidden',
        color: '#ffffff',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Background Floating Orbs */}
      <div className="glowing-orb-purple" style={{ top: '-100px', left: '-100px', width: '380px', height: '380px' }} />
      <div className="glowing-orb-gold" style={{ bottom: '-120px', right: '-80px', width: '400px', height: '400px' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            {/* Redesigned Luxury Live Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(254, 220, 0, 0.4)',
                padding: '6px 16px',
                borderRadius: '30px',
                marginBottom: '12px',
                boxShadow: '0 0 20px rgba(254, 220, 0, 0.18)',
              }}
            >
              <span className="pulse-green-dot" />
              <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#FEDC00' }}>
                {data.eyebrow || 'RERA CERTIFIED DEVELOPMENTS'}
              </span>
            </div>

            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>
              {data.title || 'Top RERA Registered Projects'}
            </h2>
            <p style={{ fontSize: '15px', color: '#D1D5DB', margin: '6px 0 0 0', fontWeight: 400 }}>
              {data.description || 'Verified builder projects with pre-launch offers, sample flat photos, and possession dates.'}
            </p>
          </div>

          {/* Right Action: Slider Navigation Arrows + View All Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href={data.allProjectsHref || '/properties'}
              style={{
                fontSize: '13.5px',
                fontWeight: 750,
                color: '#FEDC00',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                padding: '9px 18px',
                borderRadius: '24px',
                border: '1.5px solid rgba(254, 220, 0, 0.35)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{data.allProjectsText || 'View all'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Slider Left Arrow */}
            <button
              type="button"
              onClick={() => handleSlide('left')}
              aria-label="Previous Projects"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEDC00';
                e.currentTarget.style.color = '#12062B';
                e.currentTarget.style.borderColor = '#FEDC00';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slider Right Arrow */}
            <button
              type="button"
              onClick={() => handleSlide('right')}
              aria-label="Next Projects"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEDC00';
                e.currentTarget.style.color = '#12062B';
                e.currentTarget.style.borderColor = '#FEDC00';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Integrated Frosted Glass Filter Segmented Bar */}
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '6px',
              borderRadius: '16px',
              flexWrap: 'wrap',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}
          >
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '12px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 800 : 650,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: 'none',
                    background: isActive ? 'linear-gradient(135deg, #FEDC00 0%, #F59E0B 100%)' : 'transparent',
                    color: isActive ? '#12062B' : '#E5E7EB',
                    boxShadow: isActive ? '0 4px 14px rgba(254, 220, 0, 0.35)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#E5E7EB';
                    }
                  }}
                >
                  {tab.id !== 'all' ? <MapPin className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Smooth Slider Container */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '16px',
            scrollBehavior: 'smooth',
          }}
        >
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              style={{
                flex: '0 0 360px',
                scrollSnapAlign: 'start',
                minWidth: '280px',
              }}
            >
              <ProjectCard
                project={proj}
                viewProjectText={data.viewProjectText || 'View Project Details'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
