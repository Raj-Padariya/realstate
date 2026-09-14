'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BLOGS, BlogPost } from '@/app/blogs/blogsData';

interface BlogsContextType {
  blogs: BlogPost[];
  addBlog: (blog: Omit<BlogPost, 'id' | 'date'> & { date?: string }) => BlogPost;
  updateBlog: (id: string, updatedFields: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;
  getBlogById: (id: string) => BlogPost | undefined;
  resetToDefaults: () => void;
  voteBlog: (id: string, voteType: 'like' | 'dislike') => { likes: number; dislikes: number; userVote: 'like' | 'dislike' | null };
  getUserVote: (id: string) => 'like' | 'dislike' | null;
}

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'gujjuproperty_blogs_v1';
const LOCAL_VOTES_KEY = 'gujjuproperty_blog_user_votes';

export function BlogsProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((b: BlogPost) => {
              const matchedInitial = INITIAL_BLOGS.find((ib) => ib.id === b.id);
              return {
                ...b,
                likes: b.likes ?? matchedInitial?.likes ?? 0,
                dislikes: b.dislikes ?? matchedInitial?.dislikes ?? 0,
              };
            });
          }
        }
      } catch (err) {
        console.error('Error loading blogs from localStorage:', err);
      }
    }
    return INITIAL_BLOGS;
  });

  const [userVotes, setUserVotes] = useState<Record<string, 'like' | 'dislike'>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlogs(
            parsed.map((b: BlogPost) => {
              const matchedInitial = INITIAL_BLOGS.find((ib) => ib.id === b.id);
              return {
                ...b,
                likes: b.likes ?? matchedInitial?.likes ?? 0,
                dislikes: b.dislikes ?? matchedInitial?.dislikes ?? 0,
              };
            })
          );
        }
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
      }

      const savedVotes = localStorage.getItem(LOCAL_VOTES_KEY);
      if (savedVotes) {
        setUserVotes(JSON.parse(savedVotes));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
      } catch (err) {
        console.error('Failed to persist blogs to localStorage:', err);
      }
    }
  }, [blogs, mounted]);

  const addBlog = (blogData: Omit<BlogPost, 'id' | 'date'> & { date?: string }): BlogPost => {
    const today = new Date();
    const formattedDate = blogData.date || today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    
    const newArticle: BlogPost = {
      ...blogData,
      id: `blog-${Date.now()}`,
      date: formattedDate,
      status: blogData.status || 'Published',
      likes: blogData.likes ?? 0,
      dislikes: blogData.dislikes ?? 0,
    };

    setBlogs((prev) => [newArticle, ...prev]);
    return newArticle;
  };

  const updateBlog = (id: string, updatedFields: Partial<BlogPost>) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const getBlogById = (id: string): BlogPost | undefined => {
    return blogs.find((b) => b.id === id || b.slug === id);
  };

  const voteBlog = (
    id: string,
    voteType: 'like' | 'dislike'
  ): { likes: number; dislikes: number; userVote: 'like' | 'dislike' | null } => {
    const targetBlog = blogs.find((b) => b.id === id || b.slug === id);
    if (!targetBlog) {
      return { likes: 0, dislikes: 0, userVote: null };
    }

    const realId = targetBlog.id;
    const currentVote = userVotes[realId] || null;
    let newUserVote: 'like' | 'dislike' | null = voteType;
    let newLikes = targetBlog.likes ?? 0;
    let newDislikes = targetBlog.dislikes ?? 0;

    if (currentVote === voteType) {
      // Toggle off
      newUserVote = null;
      if (voteType === 'like') {
        newLikes = Math.max(0, newLikes - 1);
      } else {
        newDislikes = Math.max(0, newDislikes - 1);
      }
    } else if (currentVote) {
      // Switch vote
      if (voteType === 'like') {
        newLikes = newLikes + 1;
        newDislikes = Math.max(0, newDislikes - 1);
      } else {
        newDislikes = newDislikes + 1;
        newLikes = Math.max(0, newLikes - 1);
      }
    } else {
      // First vote
      if (voteType === 'like') {
        newLikes = newLikes + 1;
      } else {
        newDislikes = newDislikes + 1;
      }
    }

    setBlogs((prev) =>
      prev.map((b) =>
        b.id === realId ? { ...b, likes: newLikes, dislikes: newDislikes } : b
      )
    );

    setUserVotes((prev) => {
      const updated = { ...prev };
      if (newUserVote === null) {
        delete updated[realId];
      } else {
        updated[realId] = newUserVote;
      }
      try {
        localStorage.setItem(LOCAL_VOTES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    return { likes: newLikes, dislikes: newDislikes, userVote: newUserVote };
  };

  const getUserVote = (id: string): 'like' | 'dislike' | null => {
    const targetBlog = blogs.find((b) => b.id === id || b.slug === id);
    const realId = targetBlog ? targetBlog.id : id;
    return userVotes[realId] || null;
  };

  const resetToDefaults = () => {
    setBlogs(INITIAL_BLOGS);
    setUserVotes({});
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
      localStorage.removeItem(LOCAL_VOTES_KEY);
    }
  };

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        getBlogById,
        resetToDefaults,
        voteBlog,
        getUserVote,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
}

export function useBlogs() {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error('useBlogs must be used within a BlogsProvider');
  }
  return context;
}
