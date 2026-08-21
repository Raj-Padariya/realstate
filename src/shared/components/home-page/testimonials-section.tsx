import React from 'react';
import { TestimonialsSectionData } from '@/shared/types/cms';
import TestimonialCard from '@/shared/ui/testimonial-card';

export interface TestimonialsSectionProps {
  data: TestimonialsSectionData;
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  return (
    <section>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>{data.title}</h2>
          </div>
        </div>

        <div className="quotes">
          {data.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
