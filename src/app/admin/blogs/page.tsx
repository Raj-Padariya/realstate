'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_BLOGS, BlogPost } from '@/app/blogs/blogsData';
import { ExternalLink, PlusCircle, Search, Trash2, Edit, Newspaper, X } from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Market Insights' as BlogPost['category'],
    excerpt: '',
    content: '',
    author: 'GujjuProperty Research Team',
    authorRole: 'Real Estate Analyst',
    date: 'Today',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  });

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.excerpt) return;

    const created: BlogPost = {
      ...newBlog,
      id: `blog-${Date.now()}`,
    };

    setBlogs([created, ...blogs]);
    setIsAdding(false);
    setNewBlog({
      title: '',
      category: 'Market Insights',
      excerpt: '',
      content: '',
      author: 'GujjuProperty Research Team',
      authorRole: 'Real Estate Analyst',
      date: 'Today',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this article from the blog CMS?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
            News & Real Estate Blogs CMS
          </h1>
          <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '14px' }}>
            Publish market insights, legal guides, home loan advice, and real estate news articles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/blogs"
            target="_blank"
            style={{
              background: '#522AB0',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '13.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ExternalLink className="w-4 h-4 text-[#FEDC00]" /> Open Blogs Page
          </Link>

          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            style={{
              background: '#0F9D58',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isAdding ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4 text-[#FEDC00]" />}
            {isAdding ? 'Close Form' : 'Publish New Article'}
          </button>
        </div>
      </div>

      {/* Add New Article Form */}
      {isAdding && (
        <form onSubmit={handleAddBlog} style={{ background: '#fff', border: '2px solid #522AB0', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '17px', fontWeight: 800, color: '#522AB0', borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
            ✍️ Publish New Real Estate Article
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Article Title *</label>
              <input
                required
                placeholder="e.g. Pune & Ahmedabad Property Rates 2026 Analysis"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Category</label>
              <select
                value={newBlog.category}
                onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value as BlogPost['category'] })}
                style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
              >
                <option value="Market Insights">Market Insights</option>
                <option value="Rental Tips">Rental Tips</option>
                <option value="Legal & Title Advice">Legal & Title Advice</option>
                <option value="Buyer Guides">Buyer Guides</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Author Name</label>
              <input
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Author Designation</label>
              <input
                value={newBlog.authorRole}
                onChange={(e) => setNewBlog({ ...newBlog, authorRole: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Estimated Read Time</label>
              <input
                value={newBlog.readTime}
                onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Short Excerpt (Summary)</label>
            <input
              placeholder="Brief 1-2 sentence overview for blog card"
              value={newBlog.excerpt}
              onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
              style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>Full Article Content *</label>
            <textarea
              required
              rows={6}
              placeholder="Write full article text here..."
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            style={{ padding: '14px 28px', background: '#0F9D58', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', alignSelf: 'flex-start' }}
          >
            🚀 Publish Article Live
          </button>
        </form>
      )}

      {/* Blogs Management Table */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ background: '#FAF8FE', borderBottom: '1px solid var(--line)', color: '#41208C', fontWeight: 800 }}>
              <th style={{ padding: '14px 18px' }}>Article Details</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Author</th>
              <th style={{ padding: '14px 18px' }}>Published Date</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '14px 18px', fontWeight: 700 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={b.image} alt={b.title} style={{ width: '56px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div style={{ maxWidth: '360px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{b.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500 }}>{b.readTime}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '11.5px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>
                    {b.category}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--body)', fontWeight: 600 }}>{b.author}</td>
                <td style={{ padding: '14px 18px', color: 'var(--muted)', fontSize: '12.5px' }}>{b.date}</td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: '#E6F4EA', color: '#137333', fontSize: '11.5px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>
                    ● Published
                  </span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link
                      href={`/blogs/${b.id}`}
                      target="_blank"
                      style={{ padding: '5px 10px', borderRadius: '6px', background: '#f0f1f4', color: 'var(--ink)', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}
                    >
                      👁️ View
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(b.id)}
                      style={{ padding: '5px 10px', borderRadius: '6px', background: '#FCE8E6', color: '#C5221F', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
