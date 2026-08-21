import React from 'react';
import { StateItem } from '@/types/cms';

export interface StateCardProps {
  stateItem: StateItem;
  isHidden?: boolean;
  onClick?: () => void;
}

export const StateCard: React.FC<StateCardProps> = ({ stateItem, isHidden, onClick }) => {
  return (
    <button
      className={`citycard ${isHidden ? 'is-hidden' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="thumb">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <rect width="100" height="100" fill="#EFE9FB" />
          <rect y="80" width="100" height="20" fill="#DCD1F3" />
          <g dangerouslySetInnerHTML={{ __html: stateItem.svgContent }} />
        </svg>
        <span className="code">{stateItem.code}</span>
      </span>
      <span className="txt">
        <b>{stateItem.name}</b>
        <span className="cnt">{stateItem.propertyCount} properties</span>
        <span className="cities">{stateItem.citiesText}</span>
      </span>
    </button>
  );
};
