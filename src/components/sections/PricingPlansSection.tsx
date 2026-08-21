import React from 'react';
import { PricingPlansData } from '@/types/cms';
import { PricingCard } from '../common/PricingCard';

export interface PricingPlansSectionProps {
  data: PricingPlansData;
}

export const PricingPlansSection: React.FC<PricingPlansSectionProps> = ({ data }) => {
  return (
    <section
      id="plans"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
        </div>

        <div className="plans">
          {data.plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
