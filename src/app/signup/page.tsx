'use client';

import React, { Suspense } from 'react';
import AuthContent from '@/components/auth/AuthContent';

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>Loading signup...</div>}>
      <AuthContent defaultMode="signup" />
    </Suspense>
  );
}
