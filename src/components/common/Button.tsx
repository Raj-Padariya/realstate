import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'line' | 'yellow' | 'grey';
  size?: 'sm' | 'md';
  badgeText?: string;
  badgeInverted?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  badgeText,
  badgeInverted,
  children,
  className = '',
  ...props
}) => {
  const variantClass = variant === 'primary' ? '' : variant;
  const sizeClass = size === 'sm' ? 'sm' : '';
  const classes = ['btn', variantClass, sizeClass, className].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
      {badgeText && (
        <span className={`tagfree ${badgeInverted ? 'inv' : ''}`}>
          {badgeText}
        </span>
      )}
    </button>
  );
};
