'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StatesSectionData } from '@/types/cms';
import { StateCard } from '../common/StateCard';
import { Button } from '../common/Button';

export interface StatesSectionProps {
  statesData: StatesSectionData;
}

export const StatesSection: React.FC<StatesSectionProps> = ({ statesData }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleStates = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section id="states">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">{statesData.eyebrow}</div>
            <h2>{statesData.title}</h2>
            <p>{statesData.description}</p>
          </div>
          <Link href={statesData.moreHref} className="more">
            {statesData.moreText}
          </Link>
        </div>

        <div className="citygrid" id="stategrid">
          {statesData.states.map((st, idx) => (
            <StateCard
              key={st.code}
              stateItem={st}
              isHidden={!showAll && idx >= statesData.popularCount}
            />
          ))}
        </div>

        <div className="morerow">
          <Button variant="grey" onClick={toggleStates}>
            {showAll ? statesData.toggleCollapseText : statesData.toggleExpandText}
          </Button>
        </div>
      </div>
    </section>
  );
};
