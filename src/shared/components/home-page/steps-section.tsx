import React from 'react';
import { StepsSectionData } from '@/shared/types/cms';
import Button from '@/shared/ui/button';

export interface StepsSectionProps {
  data: StepsSectionData;
}

export function StepsSection({ data }: StepsSectionProps) {
  return (
    <section
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">{data.eyebrow}</div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
        </div>

        <div className="steps">
          {data.steps.map((step) => (
            <div key={step.stepNumber} className="step">
              <div className="n">{step.stepNumber}</div>
              <div className="sic">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={step.iconSvgPath} />
                </svg>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="tip">{step.tip}</span>
            </div>
          ))}
        </div>

        <div className="stepcta">
          <div className="ct">
            <b>{data.ctaTitle}</b>
            <span>{data.ctaSubtitle}</span>
          </div>
          <div className="acts">
            <Button>{data.ctaSearchBtnText}</Button>
            <Button variant="line" badgeText={data.ctaListBadgeText}>
              {data.ctaListBtnText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StepsSection;
