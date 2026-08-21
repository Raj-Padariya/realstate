import React from 'react';
import { OwnerBannerData } from '@/types/cms';
import { Button } from '../common/Button';

export interface OwnerBannerSectionProps {
  data: OwnerBannerData;
}

export const OwnerBannerSection: React.FC<OwnerBannerSectionProps> = ({ data }) => {
  return (
    <section>
      <div className="wrap">
        <div className="band">
          <div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <ul>
              {data.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          <div>
            <Button variant="yellow" badgeText={data.badgeText} badgeInverted>
              {data.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
