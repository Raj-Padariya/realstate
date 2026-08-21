'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SeoCategoryKey, SeoFooterData } from '@/shared/types/cms';

export interface SeoFooterSectionProps {
  data: SeoFooterData;
}

export function SeoFooterSection({ data }: SeoFooterSectionProps) {
  const [activeCategory, setActiveCategory] = useState<SeoCategoryKey>(
    data.categories[0]?.key || 'buy'
  );

  const currentCategoryObj = data.categories.find((cat) => cat.key === activeCategory);

  const links = React.useMemo(() => {
    if (!currentCategoryObj) return [];
    return data.cities.flatMap((city) =>
      currentCategoryObj.templates.map((tpl) => tpl.replace('{city}', city))
    );
  }, [currentCategoryObj, data.cities]);

  return (
    <div className="seo">
      <div className="wrap">
        <div className="seotabs" role="tablist">
          {data.categories.map((cat) => (
            <button
              key={cat.key}
              className="seotab"
              role="tab"
              aria-selected={activeCategory === cat.key}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="seolist">
          {links.map((linkText, idx) => (
            <Link key={idx} href={`/search?q=${encodeURIComponent(linkText)}`}>
              {linkText}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeoFooterSection;
