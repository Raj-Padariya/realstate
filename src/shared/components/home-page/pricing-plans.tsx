'use client';

import React, { Suspense } from 'react';
import MasterPlansComponent from '@/components/plans/MasterPlansComponent';

export function PricingPlans({ data }: { data?: any }) {
  return (
    <section id="plans" style={{ background: '#FAF9FD', padding: '20px 0' }}>
      <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading pricing plans...</div>}>
        <MasterPlansComponent defaultTab="owner" />
      </Suspense>
    </section>
  );
}

export default PricingPlans;
