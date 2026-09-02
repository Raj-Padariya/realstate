'use client';

import React from 'react';

export function StepsSection() {
  return (
    <section className="sec sec--tint">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Three steps, no middleman</span>
          <h2>How a deal actually closes here</h2>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-n">1</div>
            <h3>Filter down to a shortlist</h3>
            <p>
              Narrow by locality, BHK, budget and possession status until you have five or six worth your Saturday.
            </p>
            <span className="step-tag">Owner-posted only</span>
          </div>
          <div className="step">
            <div className="step-n">2</div>
            <h3>Call the owner yourself</h3>
            <p>
              Numbers are unlocked directly. Fix the visit at a time that works for both of you, without a third person setting the agenda.
            </p>
            <span className="step-tag">No agent in the loop</span>
          </div>
          <div className="step">
            <div className="step-n">3</div>
            <h3>Verify papers, then pay</h3>
            <p>
              Get the title read by an advocate before any token money moves. Then negotiate straight with the owner.
            </p>
            <span className="step-tag">Advocate-checked</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StepsSection;
