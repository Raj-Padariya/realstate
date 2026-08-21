'use client';

import React from 'react';
import MasterPlansComponent from '@/components/plans/MasterPlansComponent';

export function PricingPlans({ data }: { data?: any }) {
  return (
    <section id="plans" style={{ background: '#FAF9FD', padding: '20px 0' }}>
      <MasterPlansComponent defaultTab="owner" />
    </section>
  );
}

export default PricingPlans;
