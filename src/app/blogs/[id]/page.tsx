'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { INITIAL_BLOGS, BlogPost } from '../blogsData';
import {
  Calendar,
  Clock,
  User,
  Share2,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Building2,
  ShieldCheck,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id as string;

  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  const article: BlogPost = INITIAL_BLOGS.find((b) => b.id === blogId) || INITIAL_BLOGS[0];
  const relatedArticles = INITIAL_BLOGS.filter((b) => b.id !== article.id).slice(0, 3);
  const trendingArticles = INITIAL_BLOGS.slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ background: '#F8F9FC', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif", paddingBottom: '80px' }}>
      
      {/* TOP BREADCRUMB HEADER */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EBE6F7', padding: '14px 20px' }}>
        <div className="wrap" style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6B7280', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blogs" style={{ color: '#522AB0', textDecoration: 'none', fontWeight: 600 }}>Real Estate News &amp; Blogs</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: '#522AB0', fontWeight: 600 }}>{article.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: '#111827', fontWeight: 700, maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {article.title}
          </span>
        </div>
      </div>

      {/* ARTICLE HERO & HEADER CONTAINER */}
      <div style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F3FB 100%)', borderBottom: '1px solid #EBE6F7', padding: '40px 20px 32px' }}>
        <div className="wrap" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span style={{ background: '#522AB0', color: '#fff', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
              {article.category}
            </span>
            <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock className="w-3.5 h-3.5 text-[#522AB0]" /> {article.readTime}
            </span>
            <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Calendar className="w-3.5 h-3.5 text-[#522AB0]" /> Published {article.date}
            </span>
            <span style={{ background: '#E6F4EA', color: '#137333', fontSize: '12px', fontWeight: 800, padding: '3px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck className="w-3.5 h-3.5" /> GujjuProperty Verified Guide
            </span>
          </div>

          <h1 style={{ fontSize: '34px', fontWeight: 800, color: '#111827', margin: '0 0 20px', lineHeight: 1.25, maxWidth: '1000px' }}>
            {article.title}
          </h1>

          {/* AUTHOR & SOCIAL SHARE BAR */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', paddingTop: '16px', borderTop: '1px solid #EBE6F7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #522AB0 0%, #321670 100%)', color: '#FEDC00', fontSize: '20px', fontWeight: 800, display: 'grid', placeItems: 'center', boxShadow: '0 4px 12px rgba(82,42,176,0.2)' }}>
                {article.author.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {article.author} <CheckCircle2 className="w-4 h-4 text-[#0f9d58]" />
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>{article.authorRole}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Share2 className="w-4 h-4 text-[#522AB0]" /> Share:
              </span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#25D366', color: '#fff', padding: '7px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '12.5px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                WhatsApp
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                style={{ background: '#fff', border: '1px solid #D1D5DB', color: '#374151', padding: '7px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#0f9d58]" /> : <Copy className="w-3.5 h-3.5 text-[#522AB0]" />}
                {copied ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN CONTENT AREA: 2 COLUMN LAYOUT (70% ARTICLE + 30% SIDEBAR) */}
      <div className="wrap" style={{ maxWidth: '1240px', margin: '36px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
          
          {/* LEFT ARTICLE COLUMN (8 COLUMNS / ~70%) */}
          <main style={{ gridColumn: 'span 8', minWidth: 0 }}>
            
            {/* ARTICLE COVER IMAGE */}
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', marginBottom: '32px', background: '#fff', border: '1px solid #EBE6F7' }}>
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', height: 'auto', maxHeight: '460px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '12px 20px', background: '#FAF9FD', borderTop: '1px solid #EBE6F7', fontSize: '12.5px', color: '#6B7280', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>📸 Featured Analysis: {article.title}</span>
                <span style={{ fontWeight: 700, color: '#522AB0' }}>GujjuProperty Editorial</span>
              </div>
            </div>

            {/* TABLE OF CONTENTS (INDEX BOX) */}
            {article.toc && article.toc.length > 0 && (
              <div style={{ background: '#FAF9FD', border: '1px solid #E4DCFA', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#522AB0', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen className="w-5 h-5 text-[#522AB0]" /> Table of Contents (Quick Index)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {article.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      style={{ color: '#374151', textDecoration: 'none', fontSize: '14px', fontWeight: 700, transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#522AB0')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#374151')}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* KEY TAKEAWAYS HIGHLIGHT BOX */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '16px', padding: '24px', marginBottom: '36px' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#92400E', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚡ Key Executive Takeaways
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {article.keyTakeaways.map((point, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: '#78350F', lineHeight: 1.55 }}>
                      <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ARTICLE OVERVIEW INTRO CONTENT */}
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', padding: '32px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '16.5px', color: '#1F2937', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
                {article.content}
              </div>
            </div>

            {/* DYNAMIC ARTICLE SECTIONS */}
            {article.sections?.map((sec) => (
              <div
                id={sec.id}
                key={sec.id}
                style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', padding: '32px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
              >
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 16px', borderLeft: '4px solid #522AB0', paddingLeft: '14px', lineHeight: 1.35 }}>
                  {sec.heading}
                </h2>

                <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.8, margin: '0 0 20px' }}>
                  {sec.text}
                </p>

                {/* LIST ITEMS IF PRESENT */}
                {sec.list && sec.list.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', paddingLeft: '8px' }}>
                    {sec.list.map((li, lIdx) => (
                      <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#1F2937', lineHeight: 1.6 }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#522AB0', marginTop: '9px', flexShrink: 0 }} />
                        <span>{li}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* PRO TIP / LEGAL ALERT CALLOUT BOX */}
                {sec.proTip && (
                  <div style={{ background: '#F5F3FB', border: '1px solid #DCD0F9', borderRadius: '14px', padding: '20px', margin: '20px 0', fontSize: '14.5px', color: '#41208C', fontWeight: 700, lineHeight: 1.6 }}>
                    {sec.proTip}
                  </div>
                )}

                {/* DATA TABLE IF PRESENT */}
                {sec.table && (
                  <div style={{ overflowX: 'auto', margin: '24px 0 12px', border: '1px solid #EBE6F7', borderRadius: '12px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                      <thead>
                        <tr style={{ background: '#FAF9FD', borderBottom: '2px solid #EBE6F7', color: '#41208C', fontWeight: 800 }}>
                          {sec.table.headers.map((th, hIdx) => (
                            <th key={hIdx} style={{ padding: '14px 18px' }}>{th}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} style={{ borderBottom: '1px solid #F3F4F6', background: rIdx % 2 === 0 ? '#fff' : '#FAF9FD' }}>
                            {row.map((td, cIdx) => (
                              <td key={cIdx} style={{ padding: '14px 18px', fontWeight: cIdx === 0 ? 800 : 500, color: '#111827' }}>
                                {td}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            ))}

            {/* FREQUENTLY ASKED QUESTIONS (FAQS) */}
            {article.faqs && article.faqs.length > 0 && (
              <div id="faqs" style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', padding: '32px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <HelpCircle className="w-6 h-6 text-[#522AB0]" /> Frequently Asked Questions (FAQs)
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {article.faqs.map((faq, fIdx) => (
                    <div key={fIdx} style={{ border: '1px solid #EBE6F7', borderRadius: '12px', padding: '20px', background: '#FAF9FD' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                        Q: {faq.question}
                      </div>
                      <div style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: 1.6 }}>
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ARTICLE HELPFUL FEEDBACK BOX */}
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', padding: '28px', marginBottom: '32px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 12px' }}>
                Was this real estate guide helpful?
              </h3>
              {feedback ? (
                <div style={{ color: '#0f9d58', fontWeight: 800, fontSize: '14.5px' }}>
                  🎉 Thank you for your feedback! We continuously update our guides to serve home buyers across Western India.
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setFeedback('yes')}
                    style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', padding: '10px 24px', borderRadius: '999px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <ThumbsUp className="w-4 h-4" /> Yes, Very Helpful
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedback('no')}
                    style={{ background: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB', padding: '10px 24px', borderRadius: '999px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <ThumbsDown className="w-4 h-4" /> Needs Improvement
                  </button>
                </div>
              )}
            </div>

            {/* AUTHOR CREDENTIALS BIO CARD */}
            <div style={{ background: 'linear-gradient(135deg, #1C0A3F 0%, #321670 100%)', borderRadius: '20px', padding: '32px', color: '#fff', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#FEDC00', color: '#1C0A3F', fontSize: '28px', fontWeight: 800, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                {article.author.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#FEDC00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Article Author &amp; Analyst
                </div>
                <div style={{ fontSize: '20px', fontWeight: 800, margin: '4px 0' }}>{article.author}</div>
                <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                  {article.authorRole} at GujjuProperty Research. Specializing in Tier-1 city real estate trends, land revenue Title reports, and direct owner investment strategies.
                </div>
              </div>
            </div>

          </main>

          {/* RIGHT SIDEBAR COLUMN (4 COLUMNS / ~30%) */}
          <aside style={{ gridColumn: 'span 4' }}>
            <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* STICKY ADVISORY CALL-TO-ACTION CARD */}
              <div style={{ background: 'linear-gradient(135deg, #522AB0 0%, #321670 100%)', borderRadius: '20px', padding: '28px', color: '#fff', boxShadow: '0 10px 30px rgba(82,42,176,0.25)' }}>
                <div style={{ background: 'rgba(254,220,0,0.2)', color: '#FEDC00', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', display: 'inline-block', marginBottom: '14px', textTransform: 'uppercase' }}>
                  Zero Brokerage Support
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.3 }}>
                  Need Help Verifying Title or Buying Property?
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, margin: '0 0 20px' }}>
                  Connect with GujjuProperty legal advisors &amp; market experts for direct owner deals without brokerage fees.
                </p>
                <Link
                  href="/contact"
                  style={{
                    background: '#FEDC00',
                    color: '#1C0A3F',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(254,220,0,0.3)',
                  }}
                >
                  Request Free Callback <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* TRENDING ARTICLES WIDGET */}
              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 18px', borderBottom: '2px solid #522AB0', paddingBottom: '8px' }}>
                  Trending News &amp; Guides
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {trendingArticles.map((tBlog) => (
                    <Link
                      key={tBlog.id}
                      href={`/blogs/${tBlog.id}`}
                      style={{ textDecoration: 'none', display: 'flex', gap: '12px', alignItems: 'center' }}
                    >
                      <img
                        src={tBlog.image}
                        alt={tBlog.title}
                        style={{ width: '70px', height: '60px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {tBlog.title}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '4px', fontWeight: 600 }}>
                          {tBlog.readTime}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* POPULAR CATEGORIES TAG CLOUD */}
              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 16px' }}>
                  Popular Real Estate Topics
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Dholera SIR', '7/12 Extract', 'Zero Brokerage', 'Baner Pune', 'SG Highway', 'Title Search', 'Rental Agreement'].map((tag, tIdx) => (
                    <Link
                      key={tIdx}
                      href="/blogs"
                      style={{ background: '#FAF9FD', border: '1px solid #EBE6F7', color: '#522AB0', fontSize: '12.5px', fontWeight: 700, padding: '6px 12px', borderRadius: '8px', textDecoration: 'none' }}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* BOTTOM RELATED ARTICLES SECTION */}
      <div className="wrap" style={{ maxWidth: '1240px', margin: '60px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', margin: 0 }}>
              Related Real Estate News &amp; Guides
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0' }}>
              Explore more market insights and expert advice for buyers, sellers, and tenants.
            </p>
          </div>
          <Link href="/blogs" style={{ color: '#522AB0', fontWeight: 800, fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {relatedArticles.map((rBlog) => (
            <div
              key={rBlog.id}
              style={{ background: '#fff', borderRadius: '20px', border: '1px solid #EBE6F7', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}
            >
              <img src={rBlog.image} alt={rBlog.title} style={{ width: '100%', height: '190px', objectFit: 'cover' }} />
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#522AB0', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                  {rBlog.category}
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 10px', lineHeight: 1.35 }}>
                  <Link href={`/blogs/${rBlog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {rBlog.title}
                  </Link>
                </h3>
                <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.55, margin: '0 0 20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {rBlog.excerpt}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 600 }}>{rBlog.readTime}</span>
                  <Link href={`/blogs/${rBlog.id}`} style={{ color: '#522AB0', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
                    Read Article →
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
