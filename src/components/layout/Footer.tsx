import React from 'react';
import Link from 'next/link';
import { FooterData, HeaderData } from '@/types/cms';

export interface FooterProps {
  footerData: FooterData;
  headerData: HeaderData;
}

export const Footer: React.FC<FooterProps> = ({ footerData, headerData }) => {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link className="logo" href="/">
              <span className="mark">{headerData.logoMark}</span>
              <span className="wm">
                {headerData.logoPrefix}
                <em>{headerData.logoSuffix}</em>
              </span>
            </Link>
            <p style={{ maxWidth: '36ch', margin: 0 }}>
              {footerData.brandDescription}
            </p>
          </div>

          {footerData.columns.map((col, idx) => (
            <div key={idx}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="fnote">
          <span>{footerData.copyrightText}</span>
          <span>{footerData.servedCitiesText}</span>
        </div>
      </div>
    </footer>
  );
};
