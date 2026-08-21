import React from 'react';
import { TestimonialItem } from '@/types/cms';

export interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="quote">
      <div className="stars">{testimonial.stars}</div>
      <p>{testimonial.quote}</p>
      <div className="who">
        <div className="av">{testimonial.avatarInitial}</div>
        <div>
          <b>{testimonial.authorName}</b>
          <span>{testimonial.authorRole}</span>
        </div>
      </div>
    </div>
  );
};
