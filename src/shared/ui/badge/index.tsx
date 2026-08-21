import React from 'react';

export interface BadgeProps {
  text: string;
  isAmber?: boolean;
  className?: string;
}

export function Badge({ text, isAmber, className = '' }: BadgeProps) {
  return (
    <span className={`badge ${isAmber ? 'amber' : ''} ${className}`}>
      {text}
    </span>
  );
}

export default Badge;
