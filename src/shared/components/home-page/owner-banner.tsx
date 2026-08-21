import React from 'react';
import { OwnerBannerData } from '@/shared/types/cms';
import Button from '@/shared/ui/button';

export interface OwnerBannerProps {
  data: OwnerBannerData;
}

export function OwnerBanner({ data }: OwnerBannerProps) {
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
}

export default OwnerBanner;
