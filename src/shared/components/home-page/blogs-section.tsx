'use client';

import React from 'react';
import Link from 'next/link';

interface BlogPostSummary {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const FEATURED_BLOGS: BlogPostSummary[] = [
  {
    id: 'blog-1',
    title: 'Top 5 Localities to Buy Property in Pune & Ahmedabad in 2026',
    category: 'Market Insights',
    excerpt: 'Discover high-yield real estate hotspots across Baner, Wakad, SG Highway, and Dholera SIR offering up to 12% rental returns.',
    author: 'Rajesh Patel',
    date: '16 Aug 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-2',
    title: 'How Zero-Brokerage Property Platforms Save You Up to ₹2 Lakhs',
    category: 'Rental Tips',
    excerpt: 'Learn how direct tenant-to-owner connections eliminate unnecessary middleman fees and streamline property agreements.',
    author: 'Priya Sharma',
    date: '14 Aug 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-3',
    title: 'Essential Checklist Before Signing a Rental Agreement in Maharashtra & Gujarat',
    category: 'Legal & Title Advice',
    excerpt: 'Avoid legal loopholes with our expert checklist covering lock-in period, security deposit refund terms, and notice duration.',
    author: 'Adv. Sandeep Joshi',
    date: '10 Aug 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
  },
];

export function BlogsSection() {
  return (
    <section style={{ padding: '60px 0', background: '#fff', borderTop: '1px solid var(--line)' }}>
      <div className="wrap" style={{ maxWidth: '1180px' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              REAL ESTATE INSIGHTS & NEWS
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)', margin: 0, lineHeight: 1.25 }}>
              Latest Property Guides & Market News
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--body)', margin: '4px 0 0', maxWidth: '580px' }}>
              Expert market analysis, legal property checklists, home loan guides, and rental tips.
            </p>
          </div>

          <Link
            href="/blogs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#522AB0',
              fontWeight: 800,
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            View All Blogs & News Articles →
          </Link>
        </div>

        {/* Blog Cards Grid (3 Columns Layout) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {FEATURED_BLOGS.map((blog) => (
            <div
              key={blog.id}
              style={{
                background: '#FAF9FD',
                borderRadius: '16px',
                border: '1px solid #EBE6F7',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease',
              }}
            >
              <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />

              <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>
                      {blog.category}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>{blog.readTime}</span>
                  </div>

                  <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px', lineHeight: 1.35 }}>
                    {blog.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.5, margin: '0 0 18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.excerpt}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #EBE6F7', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
                    {blog.author} • {blog.date}
                  </span>
                  <Link href={`/blogs/${blog.id}`} style={{ color: '#522AB0', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
                    Read Article →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BlogsSection;
