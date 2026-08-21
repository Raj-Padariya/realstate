import React from 'react';

export interface BadgeProps {
  text: string;
  isAmber?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, isAmber, className = '' }) => {
  return (
    <span className={`badge ${isAmber ? 'amber' : ''} ${className}`}>
      {text}
    </span>
  );
};
