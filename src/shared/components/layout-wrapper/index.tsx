'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/shared/components/header';
import Footer from '@/shared/components/footer';
import { TopBarData, HeaderData, FooterData } from '@/shared/types/cms';
import { PropertyProvider } from '@/shared/context/PropertyContext';

export interface ClientLayoutWrapperProps {
  topBarData: TopBarData;
  headerData: HeaderData;
  footerData: FooterData;
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({
  topBarData,
  headerData,
  footerData,
  children,
}: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = mounted
    ? window.location.pathname.startsWith('/admin') || (pathname ? pathname.startsWith('/admin') : false)
    : pathname
    ? pathname.startsWith('/admin')
    : false;

  if (isAdmin) {
    return (
      <PropertyProvider>
        <main style={{ width: '100%', minHeight: '100vh', background: '#f4f6f9' }}>{children}</main>
      </PropertyProvider>
    );
  }

  return (
    <PropertyProvider>
      <Header topBarData={topBarData} headerData={headerData} />
      <main>{children}</main>
      <Footer footerData={footerData} headerData={headerData} />
    </PropertyProvider>
  );
}
