import React from 'react';
import { PricingPlanItem } from '@/shared/types/cms';
import Button from '@/shared/ui/button';

export interface PricingCardProps {
  plan: PricingPlanItem;
}

export function PricingCard({ plan }: PricingCardProps) {
  const planAny = plan as any;
  const amount = planAny.amount || plan.price || '₹0';
  const period = planAny.billingPeriod || plan.periodText || '';
  const ctaText = planAny.buttonText || plan.ctaText || 'Get started';
  const iconPath = planAny.iconSvgPath || (plan.isHot ? 'M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4z' : 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6');

  return (
    <div className={`plan ${plan.isHot ? 'hot' : ''}`}>
      <div className="picon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={iconPath} />
        </svg>
      </div>
      <h3>{plan.title}</h3>
      <p className="pdesc">{plan.description}</p>
      <div className="amt">
        {amount}
        {period && <small> {period}</small>}
      </div>
      <ul>
        {plan.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <Button variant={plan.isHot ? 'yellow' : 'line'}>
        {ctaText}
      </Button>
      {plan.finePrint && <p className="fine">{plan.finePrint}</p>}
    </div>
  );
}

export default PricingCard;
