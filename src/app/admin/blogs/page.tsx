'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useBlogs } from '@/shared/context/BlogsContext';
import { BlogPost, BlogFAQ } from '@/app/blogs/blogsData';
import {
  ExternalLink,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
  Clock,
  Calendar,
  Sparkles,
  HelpCircle,
  BookOpen,
  Layers,
  FileText,
  Tag,
  Share2,
  Check,
  ChevronRight,
  ShieldCheck,
  Lightbulb,
  Newspaper,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';

const CURATED_PRESETS = [
  {
    id: 'preset-skyline',
    title: 'Apartment Skyline',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    badge: 'City Views',
  },
  {
    id: 'preset-villa',
    title: 'Modern Luxury Villa',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Luxury Living',
  },
  {
    id: 'preset-interior',
    title: 'Living Room Interior',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    badge: 'Interiors',
  },
  {
    id: 'preset-loan',
    title: 'Home Loan & Finance',
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Banking & EMI',
  },
  {
    id: 'preset-legal',
    title: 'Legal Papers & 7/12',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Legal & Stamp',
  },
  {
    id: 'preset-highway',
    title: 'Smart City Highway',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    badge: 'Dholera & Tech',
  },
  {
    id: 'preset-plot',
    title: 'Plot & Open Land',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    badge: 'Land Investment',
  },
  {
    id: 'preset-keys',
    title: 'Keys & Moving In',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    badge: 'Possession',
  },
];

const INITIAL_FORM = {
  title: '',
  category: 'Market Insights' as BlogPost['category'],
  excerpt: '',
  content: '',
  author: 'GujjuProperty Research Team',
  authorRole: 'Real Estate Analyst',
  date: 'Today',
  readTime: '5 min read',
  status: 'Published' as 'Published' | 'Draft',
  isFeatured: false,
  image: CURATED_PRESETS[0].url,
  tags: 'Pune, Ahmedabad, Real Estate, Investment',
  keyTakeaways: [
    'Analyze infrastructure growth catalysts before booking.',
    'Verify RERA number and title documents directly.',
    'Compare 5-year capital appreciation trends.',
  ],
  faqs: [
    {
      question: 'Is it the right time to invest in 2026?',
      answer: 'Yes, with mega infrastructure projects and expanding Metro connectivity, key growth corridors offer high rental liquidity and capital upside.',
    },
  ],
};

export default function AdminBlogsPage() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form State
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [imageTab, setImageTab] = useState<'upload' | 'presets' | 'url'>('presets');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  // Filtered blogs for table
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchCat = categoryFilter === 'All' || b.category === categoryFilter;
      const matchSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.tags && b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCat && matchSearch;
    });
  }, [blogs, categoryFilter, searchQuery]);

  // Handle local file upload (converts to base64 data URL)
  const handleFileChange = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, or WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Content formatting toolbar helpers
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end) || 'text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent =
      formData.content.substring(0, start) +
      replacement +
      formData.content.substring(end);

    setFormData((prev) => ({ ...prev, content: newContent }));

    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  // Word count & read time calculator
  const calculateWordCount = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return `${minutes} min read`;
  };

  const handleAutoReadTime = () => {
    const calculated = calculateWordCount(formData.content);
    setFormData((prev) => ({ ...prev, readTime: calculated }));
  };

  // Key Takeaways management
  const handleAddTakeaway = () => {
    setFormData((prev) => ({
      ...prev,
      keyTakeaways: [...prev.keyTakeaways, ''],
    }));
  };

  const handleUpdateTakeaway = (index: number, val: string) => {
    const updated = [...formData.keyTakeaways];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, keyTakeaways: updated }));
  };

  const handleRemoveTakeaway = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyTakeaways: prev.keyTakeaways.filter((_, i) => i !== index),
    }));
  };

  // FAQs management
  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    const updated = [...formData.faqs];
    updated[index][field] = val;
    setFormData((prev) => ({ ...prev, faqs: updated }));
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  // Submit article (Create or Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter an article title.');
      return;
    }
    if (!formData.content.trim()) {
      alert('Please write article content.');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const cleanTakeaways = formData.keyTakeaways.map((t) => t.trim()).filter(Boolean);
    const cleanFaqs = formData.faqs.filter((f) => f.question.trim() && f.answer.trim());

    if (editingId) {
      // Update existing post
      updateBlog(editingId, {
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt || formData.content.slice(0, 160) + '...',
        content: formData.content,
        author: formData.author,
        authorRole: formData.authorRole,
        readTime: formData.readTime,
        status: formData.status,
        isFeatured: formData.isFeatured,
        image: formData.image,
        tags: tagsArray,
        keyTakeaways: cleanTakeaways,
        faqs: cleanFaqs,
      });
      alert('Article successfully updated!');
    } else {
      // Create new post
      addBlog({
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt || formData.content.slice(0, 160) + '...',
        content: formData.content,
        author: formData.author,
        authorRole: formData.authorRole,
        readTime: formData.readTime,
        status: formData.status,
        isFeatured: formData.isFeatured,
        image: formData.image,
        tags: tagsArray,
        keyTakeaways: cleanTakeaways,
        faqs: cleanFaqs,
      });
      alert('🎉 New Real Estate Article Published Live!');
    }

    setIsAdding(false);
    setEditingId(null);
    setFormData(INITIAL_FORM);
  };

  // Start editing existing blog
  const handleStartEdit = (b: BlogPost) => {
    setEditingId(b.id);
    setFormData({
      title: b.title,
      category: b.category,
      excerpt: b.excerpt || '',
      content: b.content || '',
      author: b.author || 'GujjuProperty Editorial',
      authorRole: b.authorRole || 'Real Estate Analyst',
      date: b.date || 'Today',
      readTime: b.readTime || '5 min read',
      status: b.status || 'Published',
      isFeatured: Boolean(b.isFeatured),
      image: b.image || CURATED_PRESETS[0].url,
      tags: b.tags ? b.tags.join(', ') : 'Pune, Ahmedabad, Real Estate',
      keyTakeaways: b.keyTakeaways && b.keyTakeaways.length > 0 ? b.keyTakeaways : ['Market insights overview'],
      faqs: b.faqs && b.faqs.length > 0 ? b.faqs : [{ question: 'Key summary', answer: b.excerpt }],
    });
    setIsAdding(true);

    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(INITIAL_FORM);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article? This will remove it from the live website.')) {
      deleteBlog(id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', maxWidth: '100%', fontFamily: "'Open Sans', Arial, sans-serif" }}>
      
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFE9FB', color: '#522AB0', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Newspaper className="w-3.5 h-3.5" /> Editorial Publishing CMS
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1E1B4B', margin: 0 }}>
            News &amp; Real Estate Blogs Studio
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13.5px' }}>
            Publish market insights, legal guides, home loan advice, and real estate news with featured cover photos &amp; SEO metadata.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link
            href="/blogs"
            target="_blank"
            style={{
              background: '#fff',
              color: '#522AB0',
              border: '1.5px solid #522AB0',
              padding: '10px 16px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '13px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ExternalLink className="w-4 h-4" /> Open Public Blogs
          </Link>

          <button
            type="button"
            onClick={() => {
              if (isAdding) {
                handleCancelEdit();
              } else {
                setEditingId(null);
                setFormData(INITIAL_FORM);
                setIsAdding(true);
              }
            }}
            style={{
              background: isAdding ? '#EF4444' : '#059669',
              color: '#fff',
              padding: '11px 20px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '13.5px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isAdding ? 'none' : '0 4px 14px rgba(5, 150, 105, 0.3)',
            }}
          >
            {isAdding ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4 text-[#FEDC00]" />}
            {isAdding ? 'Close Editor' : 'Publish New Article'}
          </button>
        </div>
      </div>

      {/* KPI OVERVIEW STATS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Total Articles</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#1E1B4B' }}>{blogs.length}</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>● {blogs.filter(b => b.status !== 'Draft').length} Published Live</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ThumbsUp className="w-3.5 h-3.5 text-[#059669]" /> Reader Likes (Helpful)
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#059669' }}>
            {blogs.reduce((acc, b) => acc + (b.likes || 0), 0)}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Across all published articles</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ThumbsDown className="w-3.5 h-3.5 text-[#DC2626]" /> Needs Improvement
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#DC2626' }}>
            {blogs.reduce((acc, b) => acc + (b.dislikes || 0), 0)}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Constructive reader feedback</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Reader Approval Ratio</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#522AB0' }}>
            {(() => {
              const totalL = blogs.reduce((acc, b) => acc + (b.likes || 0), 0);
              const totalD = blogs.reduce((acc, b) => acc + (b.dislikes || 0), 0);
              const total = totalL + totalD;
              return total > 0 ? `${Math.round((totalL / total) * 100)}%` : '100%';
            })()}
          </div>
          <div style={{ fontSize: '12px', color: '#522AB0', marginTop: '4px', fontWeight: 600 }}>Positive Reader Sentiment</div>
        </div>
      </div>

      {/* FORM TOP ANCHOR */}
      <div ref={formTopRef} />

      {/* BLOG PUBLISHING & EDITING STUDIO FORM */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#fff',
            border: '2px solid #522AB0',
            borderRadius: '20px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '26px',
            boxShadow: '0 16px 40px rgba(82, 42, 176, 0.08)',
          }}
        >
          {/* Form Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EFE9FB', color: '#522AB0', display: 'grid', placeItems: 'center' }}>
                <Edit className="w-5 h-5" />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1E1B4B', margin: 0 }}>
                  {editingId ? `Edit Real Estate Article: "${formData.title || 'Untitled'}"` : 'Publish New Real Estate Article'}
                </h2>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  {editingId ? 'Modify content, replace cover image, or update tags' : 'Fill in the details below to publish live on GujjuProperty'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  color: '#334155',
                  border: '1px solid #CBD5E1',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Eye className="w-4 h-4 text-[#522AB0]" /> Live Preview
              </button>
            </div>
          </div>

          {/* SECTION 1: COVER IMAGE STUDIO */}
          <div style={{ background: '#FAF9FD', border: '1.5px solid #E4DCFA', borderRadius: '16px', padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ImageIcon className="w-5 h-5 text-[#522AB0]" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1E1B4B' }}>
                  Featured Cover Image *
                </span>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                  (Shown as hero header &amp; blog listing card thumbnail)
                </span>
              </div>

              {/* Cover Source Tabs */}
              <div style={{ display: 'flex', gap: '6px', background: '#fff', padding: '4px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '7px',
                    border: 'none',
                    background: imageTab === 'upload' ? '#522AB0' : 'transparent',
                    color: imageTab === 'upload' ? '#fff' : '#64748B',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Upload className="w-3.5 h-3.5" /> Upload File
                </button>

                <button
                  type="button"
                  onClick={() => setImageTab('presets')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '7px',
                    border: 'none',
                    background: imageTab === 'presets' ? '#522AB0' : 'transparent',
                    color: imageTab === 'presets' ? '#fff' : '#64748B',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Curated Presets (8)
                </button>

                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '7px',
                    border: 'none',
                    background: imageTab === 'url' ? '#522AB0' : 'transparent',
                    color: imageTab === 'url' ? '#fff' : '#64748B',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  🔗 Direct URL
                </button>
              </div>
            </div>

            {/* TAB 1: LOCAL FILE UPLOAD (DRAG & DROP) */}
            {imageTab === 'upload' && (
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/webp"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: dragActive ? '2px dashed #522AB0' : '2px dashed #CBD5E1',
                    background: dragActive ? '#EDE9FE' : '#fff',
                    borderRadius: '12px',
                    padding: '28px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F1F5F9', color: '#522AB0', display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
                    <Upload className="w-6 h-6" />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1E1B4B' }}>
                    Click to browse or drag &amp; drop your cover photo
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                    Supports JPG, PNG, WebP (Recommended size: 1200 × 630 px)
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CURATED PRESETS */}
            {imageTab === 'presets' && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                  {CURATED_PRESETS.map((preset) => {
                    const isSelected = formData.image === preset.url;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => setFormData((prev) => ({ ...prev, image: preset.url }))}
                        style={{
                          borderRadius: '10px',
                          overflow: 'hidden',
                          border: isSelected ? '2.5px solid #522AB0' : '1px solid #CBD5E1',
                          cursor: 'pointer',
                          position: 'relative',
                          boxShadow: isSelected ? '0 4px 12px rgba(82, 42, 176, 0.25)' : 'none',
                          transform: isSelected ? 'scale(1.02)' : 'none',
                          transition: 'all 0.15s ease',
                          background: '#fff',
                        }}
                      >
                        <div style={{ height: '70px', background: `url(${preset.url}) center/cover no-repeat` }} />
                        <div style={{ padding: '6px 8px', fontSize: '11px', fontWeight: 700, color: isSelected ? '#522AB0' : '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {preset.title}
                        </div>
                        {isSelected && (
                          <span style={{ position: 'absolute', top: '4px', right: '4px', background: '#522AB0', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'grid', placeItems: 'center', fontSize: '10px', fontWeight: 900 }}>
                            ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: DIRECT URL INPUT */}
            {imageTab === 'url' && (
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="url"
                  placeholder="Paste image link e.g. https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px', background: '#fff' }}
                />
              </div>
            )}

            {/* LIVE COVER IMAGE PREVIEW BAR */}
            {formData.image && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 16px' }}>
                <div style={{ width: '110px', height: '64px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #CBD5E1' }}>
                  <img src={formData.image} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ background: '#ECFDF5', color: '#065F46', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                      Active Cover
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      {formData.category} • {formData.readTime}
                    </span>
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {formData.title || 'Your Article Title Preview'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                  style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Clear Photo
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: TITLE, CATEGORY, READ TIME & SLUG */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, marginBottom: '6px', color: '#1E293B' }}>
                Article Title *
              </label>
              <input
                required
                placeholder="e.g. Top 5 Localities to Buy Property in Pune & Ahmedabad 2026"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #CBD5E1', borderRadius: '10px', fontSize: '14.5px', fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, marginBottom: '6px', color: '#1E293B' }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as BlogPost['category'] })}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #CBD5E1', borderRadius: '10px', fontSize: '14px', background: '#fff', fontWeight: 600 }}
              >
                <option value="Market Insights">Market Insights</option>
                <option value="Rental Tips">Rental Tips</option>
                <option value="Legal & Title Advice">Legal &amp; Title Advice</option>
                <option value="Buyer Guides">Buyer Guides</option>
              </select>
            </div>
          </div>

          {/* SECTION 3: AUTHOR INFO & PUBLISH STATUS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>Author Name</label>
              <input
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '13.5px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>Author Designation</label>
              <input
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '13.5px' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>Read Time</label>
                <button
                  type="button"
                  onClick={handleAutoReadTime}
                  style={{ background: 'none', border: 'none', color: '#522AB0', fontSize: '11px', fontWeight: 800, cursor: 'pointer', padding: 0 }}
                >
                  ⚡ Auto
                </button>
              </div>
              <input
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '13.5px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>Publish Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Draft' })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '13.5px', background: '#fff', fontWeight: 700, color: formData.status === 'Published' ? '#059669' : '#D97706' }}
              >
                <option value="Published">● Published</option>
                <option value="Draft">◌ Draft</option>
              </select>
            </div>
          </div>

          {/* SECTION 4: SHORT EXCERPT & TAGS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>
                Short Summary (Card Excerpt) *
              </label>
              <input
                placeholder="Brief 1-2 sentence overview for social snippets & blog cards"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '13.5px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>
                Tags / Focus Keywords (Comma separated)
              </label>
              <input
                placeholder="e.g. Pune, Dholera SIR, Title Search, 7/12"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '13.5px' }}
              />
            </div>
          </div>

          {/* SECTION 5: KEY TAKEAWAYS (BULLET POINTS) */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '14px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400E', fontSize: '13.5px', fontWeight: 800 }}>
                ⚡ Executive Key Takeaways (Bullet Highlights)
              </div>
              <button
                type="button"
                onClick={handleAddTakeaway}
                style={{ background: '#F59E0B', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
              >
                + Add Point
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {formData.keyTakeaways.map((point, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#D97706', fontWeight: 800 }}>#{idx + 1}</span>
                  <input
                    placeholder={`Key takeaway point ${idx + 1}...`}
                    value={point}
                    onChange={(e) => handleUpdateTakeaway(idx, e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #FCD34D', fontSize: '13px', background: '#fff' }}
                  />
                  {formData.keyTakeaways.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTakeaway(idx)}
                      style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '16px', padding: '0 6px' }}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: ARTICLE CONTENT WITH RICH FORMATTING TOOLBAR */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, color: '#1E1B4B' }}>
                Full Article Content *
              </label>

              {/* Formatting Toolbar */}
              <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '4px', borderRadius: '8px', border: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  title="Bold"
                  onClick={() => insertFormatting('**', '**')}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#fff', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}
                >
                  B
                </button>
                <button
                  type="button"
                  title="Italic"
                  onClick={() => insertFormatting('*', '*')}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#fff', fontStyle: 'italic', fontSize: '12px', cursor: 'pointer' }}
                >
                  I
                </button>
                <button
                  type="button"
                  title="Heading 2"
                  onClick={() => insertFormatting('\n\n## ', '\n')}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#fff', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}
                >
                  H2
                </button>
                <button
                  type="button"
                  title="Heading 3"
                  onClick={() => insertFormatting('\n\n### ', '\n')}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#fff', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}
                >
                  H3
                </button>
                <button
                  type="button"
                  title="Bullet Item"
                  onClick={() => insertFormatting('\n- ')}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
                >
                  • Bullet
                </button>
                <button
                  type="button"
                  title="Pro Tip Box"
                  onClick={() => insertFormatting('\n> 💡 Pro-Tip: ')}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
                >
                  💡 Pro-Tip
                </button>
                <button
                  type="button"
                  title="Quote"
                  onClick={() => insertFormatting('\n> "')}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
                >
                  "Quote"
                </button>
                <button
                  type="button"
                  title="Divider"
                  onClick={() => insertFormatting('\n\n---\n\n')}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
                >
                  ― Divider
                </button>
              </div>
            </div>

            <textarea
              ref={contentTextareaRef}
              required
              rows={12}
              placeholder="Write or paste your comprehensive real estate article here. Markdown headings, bullets, and paragraphs are supported..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              style={{
                width: '100%',
                padding: '16px',
                border: '1.5px solid #CBD5E1',
                borderRadius: '12px',
                fontSize: '14.5px',
                lineHeight: 1.7,
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>

          {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQS BUILDER) */}
          <div style={{ background: '#FAF9FD', border: '1px solid #E4DCFA', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#522AB0', fontSize: '13.5px', fontWeight: 800 }}>
                <HelpCircle className="w-4 h-4" /> FAQ Schema Builder (Boosts Google Ranking)
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                style={{ background: '#522AB0', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
              >
                + Add FAQ
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {formData.faqs.map((faq, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#522AB0' }}>Question #{idx + 1}</span>
                    {formData.faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    placeholder="e.g. How long does the 7/12 title check take?"
                    value={faq.question}
                    onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', marginBottom: '8px' }}
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer for the reader..."
                    value={faq.answer}
                    onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 8: FORM ACTION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '20px', flexWrap: 'wrap', gap: '14px' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13.5px', fontWeight: 700, color: '#1E293B' }}>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#522AB0' }}
              />
              ⭐ Feature as Top Headline on Blog Hub
            </label>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: '#F1F5F9',
                  color: '#334155',
                  border: '1px solid #CBD5E1',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Eye className="w-4 h-4 text-[#522AB0]" /> Preview Layout
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '10px',
                    background: '#fff',
                    color: '#64748B',
                    border: '1px solid #CBD5E1',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel Edit
                </button>
              )}

              <button
                type="submit"
                style={{
                  padding: '12px 28px',
                  background: editingId ? '#522AB0' : '#059669',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: editingId ? '0 4px 14px rgba(82, 42, 176, 0.3)' : '0 4px 14px rgba(5, 150, 105, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {editingId ? '💾 Save Changes' : '🚀 Publish Article Live'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FILTER & SEARCH ROW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {['All', 'Market Insights', 'Rental Tips', 'Legal & Title Advice', 'Buyer Guides'].map((cat) => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '999px',
                  border: isActive ? '1.5px solid #522AB0' : '1px solid #E2E8F0',
                  background: isActive ? '#522AB0' : '#fff',
                  color: isActive ? '#fff' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '300px' }}>
          <Search className="w-4 h-4 text-[#94A3B8]" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search articles, authors, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#fff' }}
          />
        </div>
      </div>

      {/* BLOGS MANAGEMENT TABLE */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ background: '#FAF9FD', borderBottom: '1px solid #E2E8F0', color: '#41208C', fontWeight: 800 }}>
              <th style={{ padding: '14px 18px', width: '38%' }}>Article Details &amp; Cover</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Author</th>
              <th style={{ padding: '14px 18px' }}>Reader Feedback</th>
              <th style={{ padding: '14px 18px' }}>Published</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94A3B8', fontSize: '14px' }}>
                  No articles found matching your search.
                </td>
              </tr>
            ) : (
              filteredBlogs.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '64px', height: '46px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #E2E8F0' }}>
                        <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ minWidth: 0, maxWidth: '380px' }}>
                        <div style={{ fontWeight: 800, color: '#1E1B4B', fontSize: '14px', lineHeight: 1.35, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {b.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span>⏱️ {b.readTime}</span>
                          {b.isFeatured && (
                            <span style={{ color: '#D97706', fontWeight: 800, background: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', fontSize: '10.5px' }}>
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '11.5px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                      {b.category}
                    </span>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155', fontWeight: 600 }}>
                    <div>{b.author}</div>
                    <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>{b.authorRole}</div>
                  </td>

                  <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ECFDF5', color: '#047857', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 800 }}>
                          👍 {b.likes ?? 0}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FEF2F2', color: '#B91C1C', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 800 }}>
                          👎 {b.dislikes ?? 0}
                        </span>
                      </div>
                      {((b.likes ?? 0) + (b.dislikes ?? 0)) > 0 ? (
                        <div style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                          ⭐ {Math.round(((b.likes ?? 0) / ((b.likes ?? 0) + (b.dislikes ?? 0))) * 100)}% Helpful
                        </div>
                      ) : (
                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>No votes yet</div>
                      )}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748B', fontSize: '12.5px', whiteSpace: 'nowrap' }}>
                    {b.date}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span
                      style={{
                        background: b.status === 'Draft' ? '#FEF3C7' : '#ECFDF5',
                        color: b.status === 'Draft' ? '#92400E' : '#065F46',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {b.status === 'Draft' ? '◌ Draft' : '● Published'}
                    </span>
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(b)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: '#EFE9FB',
                          color: '#522AB0',
                          border: 'none',
                          fontSize: '12.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>

                      <Link
                        href={`/blogs/${b.id}`}
                        target="_blank"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: '#F1F5F9',
                          color: '#334155',
                          border: 'none',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(b.id)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          background: '#FEE2E2',
                          color: '#DC2626',
                          border: 'none',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* LIVE PREVIEW MODAL */}
      {isPreviewOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPreviewOpen(false);
          }}
        >
          <div
            style={{
              background: '#F8F9FC',
              borderRadius: '24px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            {/* Top Modal Bar */}
            <div style={{ position: 'sticky', top: 0, background: '#fff', padding: '14px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#EFE9FB', color: '#522AB0', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px' }}>
                  Live Article Preview
                </span>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  How readers will see your post on the website
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#64748B' }}
              >
                &times;
              </button>
            </div>

            {/* Article Content Simulation */}
            <div style={{ padding: '30px' }}>
              {/* Category & Badges */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span style={{ background: '#522AB0', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                  {formData.category}
                </span>
                <span style={{ fontSize: '12.5px', color: '#64748B' }}>
                  ⏱️ {formData.readTime}
                </span>
                <span style={{ fontSize: '12.5px', color: '#64748B' }}>
                  📅 Published {formData.date}
                </span>
              </div>

              {/* Title */}
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: '0 0 16px', lineHeight: 1.3 }}>
                {formData.title || 'Untitled Article Title'}
              </h1>

              {/* Author Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0', marginBottom: '24px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#522AB0', color: '#FEDC00', fontSize: '18px', fontWeight: 800, display: 'grid', placeItems: 'center' }}>
                  {(formData.author || 'G').charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>
                    {formData.author}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {formData.authorRole}
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {formData.image && (
                <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
                  <img src={formData.image} alt={formData.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }} />
                </div>
              )}

              {/* Key Takeaways */}
              {formData.keyTakeaways.length > 0 && formData.keyTakeaways.some((t) => t.trim()) && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#92400E', marginBottom: '10px' }}>
                    ⚡ Key Executive Takeaways
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.keyTakeaways.filter(Boolean).map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: '#78350F' }}>
                        <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', marginBottom: '24px', lineHeight: 1.8, fontSize: '15px', color: '#1E293B', whiteSpace: 'pre-line' }}>
                {formData.content || 'Article content will appear here...'}
              </div>

              {/* FAQs */}
              {formData.faqs.length > 0 && formData.faqs.some((f) => f.question.trim()) && (
                <div style={{ background: '#FAF9FD', border: '1px solid #E4DCFA', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#522AB0', marginBottom: '12px' }}>
                    Frequently Asked Questions
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {formData.faqs.filter((f) => f.question.trim()).map((faq, i) => (
                      <div key={i} style={{ background: '#fff', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '12px 16px' }}>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E1B4B', marginBottom: '4px' }}>
                          Q: {faq.question}
                        </div>
                        <div style={{ fontSize: '13px', color: '#475569' }}>
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '16px 24px', background: '#fff', borderTop: '1px solid #E2E8F0', textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                style={{ padding: '10px 20px', borderRadius: '8px', background: '#522AB0', color: '#fff', border: 'none', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
