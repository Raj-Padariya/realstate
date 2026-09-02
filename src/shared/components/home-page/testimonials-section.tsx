'use client';

import React from 'react';

export function TestimonialsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">From people who closed</span>
          <h2>What buyers and owners tell us</h2>
        </div>
        <div className="quotes">
          <div className="quote">
            <div className="stars">★★★★★</div>
            <p>
              Bought a 3 BHK in Baner straight from the owner. The brokerage I did not pay covered my registration, stamp duty and the modular kitchen.
            </p>
            <div className="who">
              <div className="who-av">R</div>
              <div>
                <b>Rajesh Sharma</b>
                <span>Software engineer, Pune</span>
              </div>
            </div>
          </div>
          <div className="quote">
            <div className="stars">★★★★★</div>
            <p>
              Listed my flat on a Tuesday, had a tenant by Thursday. Not one agent called me pretending to be a tenant, which is what killed the last portal for me.
            </p>
            <div className="who">
              <div className="who-av">P</div>
              <div>
                <b>Pooja Mehta</b>
                <span>Owner, Baner</span>
              </div>
            </div>
          </div>
          <div className="quote">
            <div className="stars">★★★★★</div>
            <p>
              The title check was the part I did not know I needed. The advocate found an unreleased bank lien and I walked away before paying the token.
            </p>
            <div className="who">
              <div className="who-av">A</div>
              <div>
                <b>Amit Patel</b>
                <span>Business owner, Ahmedabad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
