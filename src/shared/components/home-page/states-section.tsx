'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StatesSectionData } from '@/shared/types/cms';
import StateCard from '@/shared/ui/state-card';
import Button from '@/shared/ui/button';

export interface StatesSectionProps {
  statesData: StatesSectionData;
}

export function StatesSection({ statesData }: StatesSectionProps) {
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
}

export default StatesSection;
