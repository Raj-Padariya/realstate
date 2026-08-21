import React from 'react';
import Link from 'next/link';
import { FooterData, HeaderData } from '@/shared/types/cms';

export interface FooterProps {
  footerData?: FooterData;
  headerData?: HeaderData;
}

const DEFAULT_FOOTER_DATA: FooterData = {
  brandDescription: "GujjuProperty is India's leading zero-brokerage direct owner real estate portal.",
  copyrightText: "© 2026 GujjuProperty. All rights reserved.",
  servedCitiesText: "Serving Pune, Mumbai, Ahmedabad, Dholera SIR, Bengaluru, Delhi NCR, Hyderabad & 380+ cities.",
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Dholera SIR", href: "/dholera-sir" },
        { label: "Blogs & News", href: "/blogs" },
        { label: "Contact Us", href: "/contact" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Title Verification", href: "/services/title-check" },
        { label: "Property Management", href: "/services/property-management" },
        { label: "Home Loan Assistance", href: "/services/home-loan" },
        { label: "Packers & Movers", href: "/services/packers-movers" },
        { label: "Rent Agreement", href: "/rent-agreement" }
      ]
    },
    {
      title: "Plans & Legal",
      links: [
        { label: "Buyer Plans", href: "/buyer-plans" },
        { label: "Tenant Plans", href: "/tenant-plans" },
        { label: "Owner Dashboard", href: "/owner" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" }
      ]
    }
  ]
};

export function Footer({ footerData = DEFAULT_FOOTER_DATA, headerData }: FooterProps) {
  const data = footerData || DEFAULT_FOOTER_DATA;
  const logoMark = headerData?.logoMark || "GP";
  const logoPrefix = headerData?.logoPrefix || "Gujju";
  const logoSuffix = headerData?.logoSuffix || "Property";

  return (
    <footer>
      <div className="wrap">
        <div className="fttop">
          <div className="ftbrand">
            <Link className="logo" href="/">
              <span className="mark">{logoMark}</span>
              <span className="wm">
                {logoPrefix}
                <em>{logoSuffix}</em>
              </span>
            </Link>
            <p>{data.brandDescription}</p>
          </div>

          {(data.columns || []).map((col, idx) => (
            <div key={idx} className="ftcol">
              <h4>{col.title}</h4>
              <ul>
                {(col.links || []).map((link: any, lIdx: number) => (
                  <li key={lIdx}>
                    <Link href={link.href || '#'}>{link.label || link.title || 'Link'}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ftbot">
          <div>{data.copyrightText}</div>
          <div>{data.servedCitiesText}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
