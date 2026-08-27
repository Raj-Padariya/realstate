import React from 'react';
import type { Metadata } from 'next';
import cmsDataRaw from '@/shared/data/mockCmsData.json';
import { CmsData } from '@/shared/types/cms';
import HeroSection from '@/shared/components/home-page/hero-section';
import OffersSection from '@/shared/components/home-page/offers-section';
import PopularCategoriesShowcase from '@/shared/components/home-page/popular-categories-showcase';
import TrustSection from '@/shared/components/home-page/trust-section';
import StatesSection from '@/shared/components/home-page/states-section';
import FeaturedProperties from '@/shared/components/home-page/featured-properties';
import OwnerBanner from '@/shared/components/home-page/owner-banner';
import ServicesSection from '@/shared/components/home-page/services-section';
import PricingPlans from '@/shared/components/home-page/pricing-plans';
import ProjectsSection from '@/shared/components/home-page/projects-section';
import StepsSection from '@/shared/components/home-page/steps-section';
import TestimonialsSection from '@/shared/components/home-page/testimonials-section';
import BlogsSection from '@/shared/components/home-page/blogs-section';
import AppDownload from '@/shared/components/home-page/app-download';
import SeoFooterSection from '@/shared/components/home-page/seo-footer-section';

const cmsData = cmsDataRaw as unknown as CmsData;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: cmsData.siteMetadata.title,
    description: cmsData.siteMetadata.description,
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection
        heroData={cmsData.hero}
        searchBarData={cmsData.searchBar}
        states={cmsData.statesSection.states}
      />
      <OffersSection />
      <PopularCategoriesShowcase />
      <TrustSection items={cmsData.trust} />
      <StatesSection statesData={cmsData.statesSection} />
      <FeaturedProperties data={cmsData.featuredProperties} />
      <OwnerBanner data={cmsData.ownerBanner} />
      <ServicesSection data={cmsData.servicesSection} />
      <PricingPlans data={cmsData.pricingPlansSection} />
      <ProjectsSection data={cmsData.projectsSection} />
      <StepsSection data={cmsData.stepsSection} />
      <TestimonialsSection data={cmsData.testimonialsSection} />
      <BlogsSection />
      <AppDownload data={cmsData.appDownload} />
      <SeoFooterSection data={cmsData.seoFooter} />
    </>
  );
}
