'use client';

import React, { Suspense } from 'react';
import AuthContent from '@/components/auth/AuthContent';

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold' }}>Loading login...</div>}>
      <AuthContent defaultMode="login" />
    </Suspense>
  );
}
