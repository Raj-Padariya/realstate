import React from 'react';
import { PricingPlanItem } from '@/types/cms';
import { Button } from './Button';

export interface PricingCardProps {
  plan: PricingPlanItem;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div className={`plan ${plan.isHot ? 'hot' : ''}`}>
      <div className="picon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={plan.iconSvgPath} />
        </svg>
      </div>
      <h3>{plan.title}</h3>
      <p className="pdesc">{plan.description}</p>
      <div className="amt">
        {plan.amount}
        {plan.billingPeriod && <small> {plan.billingPeriod}</small>}
      </div>
      <ul>
        {plan.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <Button variant={plan.buttonVariant}>
        {plan.buttonText}
      </Button>
      <p className="fine">{plan.finePrint}</p>
    </div>
  );
};
