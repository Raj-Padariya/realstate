import React from 'react';
import { TestimonialsSectionData } from '@/types/cms';
import { TestimonialCard } from '../common/TestimonialCard';

export interface TestimonialsSectionProps {
  data: TestimonialsSectionData;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
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
};
