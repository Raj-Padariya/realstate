'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px' }}>
        Something went wrong!
      </h2>
      <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '400px' }}>
        An unexpected error occurred while loading this page.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => reset()}
          style={{
            background: 'var(--brand)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            background: '#fff',
            color: 'var(--ink)',
            border: '1px solid var(--line)',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
