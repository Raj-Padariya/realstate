import React from 'react';
import Link from 'next/link';
import { AppDownloadData } from '@/shared/types/cms';

export interface AppDownloadProps {
  data: AppDownloadData;
}

export function AppDownload({ data }: AppDownloadProps) {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="app">
          <div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <div className="store">
              <Link href={data.appStoreHref} aria-label="Download on the App Store">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.5 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.4-.1 0-2.2-.9-2.2-3.3z" />
                  <path d="M14.4 6.2c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-.9 2.7 1 .1 2-.5 2.6-1.3z" />
                </svg>
                <span>
                  <small>{data.appStoreSubtitle}</small>
                  <b>{data.appStoreTitle}</b>
                </span>
              </Link>
              <Link href={data.googlePlayHref} aria-label="Get it on Google Play">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.4 2.5a1.2 1.2 0 0 0-.6 1v17a1.2 1.2 0 0 0 .6 1l9-9.5z" />
                  <path d="M4.6 1.9 15.3 8l-2.4 2.6z" />
                  <path d="m12.9 13.4 2.4 2.6L4.6 22.1z" />
                  <path d="m16.4 8.6-2.6 2.8 2.6 2.8 3.7-2.1c.9-.5.9-1.8 0-2.3z" />
                </svg>
                <span>
                  <small>{data.googlePlaySubtitle}</small>
                  <b>{data.googlePlayTitle}</b>
                </span>
              </Link>
            </div>
          </div>
          <div className="qr">
            {data.qrTextLine1}
            <br />
            {data.qrTextLine2}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppDownload;
