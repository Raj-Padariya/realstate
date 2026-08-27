import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
      <span style={{ fontSize: '48px', fontWeight: 900, color: 'var(--brand)', marginBottom: '8px' }}>
        404
      </span>
      <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        style={{
          background: 'var(--brand)',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: '6px',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
