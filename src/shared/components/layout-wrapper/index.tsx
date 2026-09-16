'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/shared/components/header';
import Footer from '@/shared/components/footer';
import { TopBarData, HeaderData, FooterData } from '@/shared/types/cms';
import { PropertyProvider } from '@/shared/context/PropertyContext';
import { LeadsProvider } from '@/shared/context/LeadsContext';
import { BlogsProvider } from '@/shared/context/BlogsContext';

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
        <LeadsProvider>
          <BlogsProvider>
            {children}
          </BlogsProvider>
        </LeadsProvider>
      </PropertyProvider>
    );
  }

  return (
    <PropertyProvider>
      <LeadsProvider>
        <BlogsProvider>
          <Header topBarData={topBarData} headerData={headerData} />
          <main>{children}</main>
          <Footer footerData={footerData} headerData={headerData} />
        </BlogsProvider>
      </LeadsProvider>
    </PropertyProvider>
  );
}
