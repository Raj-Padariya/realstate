import React from 'react';
import { StateItem } from '@/shared/types/cms';

export interface StateCardProps {
  stateItem: StateItem;
  isHidden?: boolean;
  onClick?: () => void;
}

export function StateCard({ stateItem, isHidden, onClick }: StateCardProps) {
  const itemAny = stateItem as any;
  const countText = stateItem.propertyCountText || (itemAny.propertyCount ? `${itemAny.propertyCount} properties` : '');
  const citiesText = stateItem.popularCitiesText || itemAny.citiesText || '';

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
          {itemAny.svgContent && (
            <g dangerouslySetInnerHTML={{ __html: itemAny.svgContent }} />
          )}
        </svg>
        <span className="code">{stateItem.code}</span>
      </span>
      <span className="txt">
        <b>{stateItem.name}</b>
        <span className="cnt">{countText}</span>
        <span className="cities">{citiesText}</span>
      </span>
    </button>
  );
}

export default StateCard;
