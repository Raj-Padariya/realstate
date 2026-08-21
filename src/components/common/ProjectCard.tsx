import React from 'react';
import { BuilderProjectItem } from '@/types/cms';

export interface ProjectCardProps {
  project: BuilderProjectItem;
  viewProjectText: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewProjectText }) => {
  return (
    <article className="proj">
      <div className="ph">
        <svg
          viewBox="0 0 260 128"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: project.sitePlanSvg }}
        />
        <span className="stage">{project.stage}</span>
      </div>
      <div className="pb">
        <h3>{project.name}</h3>
        <div className="by">{project.builder} · {project.location}</div>
        <div className="cfg">{project.config}</div>
        <div className="pr">
          {project.priceRange} <small>{project.priceNote}</small>
        </div>
        <div className="foot">
          <span className="rera">
            <svg viewBox="0 0 24 24">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            {project.reraText}
          </span>
          <span className="go">{viewProjectText}</span>
        </div>
      </div>
    </article>
  );
};
