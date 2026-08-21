'use client';

import React, { Suspense } from 'react';
import MasterPlansComponent from '@/components/plans/MasterPlansComponent';

export default function TenantPlansPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>Loading plans...</div>}>
      <MasterPlansComponent defaultTab="tenant" />
    </Suspense>
  );
}
