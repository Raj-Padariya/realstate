'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_BLOGS, BlogPost } from './blogsData';
export type { BlogPost };

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Market Insights', 'Rental Tips', 'Legal & Title Advice', 'Buyer Guides'];

  const filteredBlogs = INITIAL_BLOGS.filter((blog) => {
    const matchesCat = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredBlog = INITIAL_BLOGS.find((b) => b.isFeatured) || INITIAL_BLOGS[0];

  return (
    <div style={{ background: '#F8F9FC', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #1C0A3F 0%, #321670 50%, #522AB0 100%)', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, background: 'rgba(254,220,0,0.2)', color: '#FEDC00', padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Real Estate Knowledge Hub
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '14px 0', lineHeight: 1.25 }}>
            Insights, Guides & Legal Tips for Property Buyers & Owners
          </h1>
          <p style={{ fontSize: '16px', color: '#d9cdf2', margin: '0 0 28px', lineHeight: 1.6 }}>
            Stay updated with Western India real estate trends, 7/12 title verification advice, and smart investment strategies.
          </p>

          {/* SEARCH BAR */}
          <div style={{ maxWidth: '580px', margin: '0 auto', display: 'flex', background: '#fff', borderRadius: '14px', padding: '6px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
            <input
              type="text"
              placeholder="Search articles e.g. Dholera SIR, Title verification, Rental tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', padding: '12px 16px', fontSize: '14px', outline: 'none', color: '#111827', borderRadius: '10px' }}
            />
          </div>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: '1200px', margin: '40px auto 0' }}>
        
        {/* CATEGORY TABS */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '32px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: 'none',
                background: selectedCategory === cat ? '#522AB0' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#4B5563',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: selectedCategory === cat ? '0 4px 14px rgba(82,42,176,0.3)' : '0 2px 6px rgba(0,0,0,0.03)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED BLOG CARD */}
        {selectedCategory === 'All' && !searchQuery && featuredBlog && (
          <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #EBE6F7', boxShadow: '0 8px 30px rgba(41,16,92,0.06)', marginBottom: '48px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0' }}>
            <div style={{ padding: '44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '11.5px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                  {featuredBlog.category}
                </span>
                <span style={{ fontSize: '12.5px', color: '#6B7280' }}>• {featuredBlog.readTime}</span>
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', margin: '0 0 14px', lineHeight: 1.3 }}>
                <Link href={`/blogs/${featuredBlog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {featuredBlog.title}
                </Link>
              </h2>
              <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 24px' }}>
                {featuredBlog.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '13px', color: '#374151' }}>
                  By <strong>{featuredBlog.author}</strong> ({featuredBlog.authorRole})
                </div>
                <Link href={`/blogs/${featuredBlog.id}`} style={{ background: '#522AB0', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
                  Read Article →
                </Link>
              </div>
            </div>
            <div style={{ minHeight: '320px', background: `url(${featuredBlog.image}) center/cover no-repeat` }} />
          </div>
        )}

        {/* BLOG GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {filteredBlogs.map((blog) => (
            <div key={blog.id} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', border: '1px solid #EBE6F7', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', background: `url(${blog.image}) center/cover no-repeat`, position: 'relative' }}>
                <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(255,255,255,0.92)', color: '#41208C', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                  {blog.category}
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>{blog.date} • {blog.readTime}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 10px', lineHeight: 1.35 }}>
                    <Link href={`/blogs/${blog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.55, margin: '0 0 20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.excerpt}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '14px' }}>
                  <span style={{ fontSize: '12.5px', color: '#374151', fontWeight: 600 }}>By {blog.author}</span>
                  <Link href={`/blogs/${blog.id}`} style={{ color: '#522AB0', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
                    Read →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
