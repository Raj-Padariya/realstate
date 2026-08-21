import React from 'react';
import Link from 'next/link';
import { ProjectsSectionData } from '@/types/cms';
import { ProjectCard } from '../common/ProjectCard';

export interface ProjectsSectionProps {
  data: ProjectsSectionData;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data }) => {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">{data.eyebrow}</div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
          <Link href={data.allProjectsHref} className="more">
            {data.allProjectsText}
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
};
