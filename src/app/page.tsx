import React from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/shared/components/home-page/hero-section';
import TrustSection from '@/shared/components/home-page/trust-section';
import OffersSection from '@/shared/components/home-page/offers-section';
import PopularCategoriesShowcase from '@/shared/components/home-page/popular-categories-showcase';
import ExploreByCategorySection from '@/shared/components/home-page/explore-by-category-section';
import StatesSection from '@/shared/components/home-page/states-section';
import FeaturedProperties from '@/shared/components/home-page/featured-properties';
import OwnerBanner from '@/shared/components/home-page/owner-banner';
import ServicesSection from '@/shared/components/home-page/services-section';
import DholeraSection from '@/shared/components/home-page/dholera-section';
import StepsSection from '@/shared/components/home-page/steps-section';
import TestimonialsSection from '@/shared/components/home-page/testimonials-section';
import BlogsSection from '@/shared/components/home-page/blogs-section';
import SeoFooterSection from '@/shared/components/home-page/seo-footer-section';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'GujjuProperty — Buy, rent and sell property without a broker',
    description:
      'Zero-brokerage property portal. Talk directly to verified owners across 380+ Indian cities. Clear-title listings, e-stamped rent agreements, no commission.',
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <OffersSection />
      <PopularCategoriesShowcase />
      <ExploreByCategorySection />
      <StatesSection />
      <FeaturedProperties />
      <OwnerBanner />
      <ServicesSection />
      <DholeraSection />
      <StepsSection />
      <TestimonialsSection />
      <BlogsSection />
      <SeoFooterSection />
    </>
  );
}
