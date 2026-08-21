import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import './index.css';
import cmsDataRaw from '@/shared/data/mockCmsData.json';
import { CmsData } from '@/shared/types/cms';
import ClientLayoutWrapper from '@/shared/components/layout-wrapper';

const cmsData = cmsDataRaw as unknown as CmsData;

export const metadata: Metadata = {
  title: cmsData.siteMetadata.title,
  description: cmsData.siteMetadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayoutWrapper
          topBarData={cmsData.topBar}
          headerData={cmsData.header}
          footerData={cmsData.footer}
        >
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
