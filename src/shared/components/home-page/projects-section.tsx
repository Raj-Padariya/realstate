import React from 'react';
import Link from 'next/link';
import { ProjectsSectionData } from '@/shared/types/cms';
import ProjectCard from '@/shared/ui/project-card';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface ProjectsSectionProps {
  data: ProjectsSectionData;
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      style={{
        background: 'linear-gradient(135deg, #1A0B3B 0%, #2E156D 50%, #41208C 100%)',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden',
        color: '#ffffff',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Background Glow Effect */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254, 220, 0, 0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: '#FEDC00',
                background: 'rgba(254, 220, 0, 0.15)',
                border: '1px solid rgba(254, 220, 0, 0.3)',
                padding: '4px 12px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> {data.eyebrow || 'NEW DEVELOPMENTS'}
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>
              {data.title}
            </h2>
            <p style={{ fontSize: '14.5px', color: '#D1D5DB', margin: '6px 0 0 0', fontWeight: 400 }}>
              {data.description}
            </p>
          </div>

          <Link
            href={data.allProjectsHref}
            style={{
              fontSize: '14px',
              fontWeight: 750,
              color: '#FEDC00',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '8px 18px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{data.allProjectsText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="projs">
          {data.projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              viewProjectText={data.viewProjectText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
