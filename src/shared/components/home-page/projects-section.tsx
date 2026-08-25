'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProjectsSectionData } from '@/shared/types/cms';
import ProjectCard from '@/shared/ui/project-card';
import { ArrowRight, Sparkles, Building2, MapPin } from 'lucide-react';

export interface ProjectsSectionProps {
  data: ProjectsSectionData;
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  return (
    <section
      id="projects"
      style={{
        background: 'linear-gradient(135deg, #12062B 0%, #240F52 45%, #3C1A83 100%)',
        padding: '68px 0',
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
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#FEDC00',
                background: 'rgba(254, 220, 0, 0.12)',
                border: '1.5px solid rgba(254, 220, 0, 0.3)',
                padding: '5px 14px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '10px',
                boxShadow: '0 0 16px rgba(254, 220, 0, 0.2)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FEDC00]" /> {data.eyebrow || 'NEW DEVELOPMENTS'}
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>
              {data.title || 'Top RERA Registered Projects'}
            </h2>
            <p style={{ fontSize: '15px', color: '#D1D5DB', margin: '6px 0 0 0', fontWeight: 400 }}>
              {data.description || 'Verified builder projects with pre-launch offers, sample flat photos, and possession dates.'}
            </p>
          </div>

          <Link
            href={data.allProjectsHref || '/properties'}
            style={{
              fontSize: '14px',
              fontWeight: 750,
              color: '#FEDC00',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              padding: '10px 20px',
              borderRadius: '24px',
              border: '1.5px solid rgba(254, 220, 0, 0.3)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{data.allProjectsText || 'View all projects'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
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
                  padding: '7px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1.5px solid #FEDC00' : '1px solid rgba(255, 255, 255, 0.16)',
                  background: isActive ? '#FEDC00' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#1A0B3B' : '#E5E7EB',
                  boxShadow: isActive ? '0 4px 14px rgba(254, 220, 0, 0.35)' : 'none',
                }}
              >
                {tab.id !== 'all' && <MapPin className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4-Card Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              viewProjectText={data.viewProjectText || 'View Project Details'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
