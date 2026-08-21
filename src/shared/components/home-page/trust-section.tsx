import React from 'react';
import { TrustBadgeItem } from '@/shared/types/cms';

export interface TrustSectionProps {
  items: TrustBadgeItem[];
}

export function TrustSection({ items }: TrustSectionProps) {
  return (
    <div className="trust">
      <div className="wrap">
        {items.map((item) => (
          <div key={item.id} className="tr">
            <div className="ic">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={item.svgPath} />
              </svg>
            </div>
            <div className="tx">
              <b>{item.title}</b>
              <span>{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustSection;
