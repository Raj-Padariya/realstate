import React from 'react';
import Link from 'next/link';
import { ServicesSectionData } from '@/shared/types/cms';

export interface ServicesSectionProps {
  data: ServicesSectionData;
}

export function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section id="services" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
          <Link href={data.allServicesHref} className="more">
            {data.allServicesText}
          </Link>
        </div>

        <div className="svcs">
          {data.services.map((svc) => (
            <div key={svc.id} className="svc">
              <div className="ic">{svc.icon}</div>
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
