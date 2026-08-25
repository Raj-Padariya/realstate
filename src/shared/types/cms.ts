// Header & TopBar Schemas
export interface TopBarData {
  highlightText: string;
  middleText: string;
  endText: string;
}

export interface MegaMenuItem {
  title: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuItem[];
}

export interface MegaMenuPromo {
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export interface MegaMenuSection {
  columns: MegaMenuColumn[];
  promo: MegaMenuPromo;
}

export interface HeaderData {
  logoMark: string;
  logoPrefix: string;
  logoSuffix: string;
  buyMenu: MegaMenuSection;
  rentMenu: MegaMenuSection;
  commercialMenu: MegaMenuSection;
  newProjectsMenu: MegaMenuSection;
  servicesMenu: MegaMenuSection;
  forOwnersLinks: MegaMenuItem[];
  loginBtnText: string;
  postPropertyBtnText: string;
  postPropertyBadgeText: string;
}

// Footer Schema
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterData {
  brandDescription: string;
  columns: FooterColumn[];
  copyrightText: string;
  servedCitiesText: string;
}

// Home Page Schemas
export interface HeroCardData {
  chipAText: string;
  price: string;
  title: string;
  location: string;
  specs: string[];
  chipBText: string;
}

export interface HeroSectionData {
  newBadgeText: string;
  newBadgeMessage: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  subtitle: string;
  ratingScore: string;
  ratingCount: string;
  ratingOwnerCount: string;
  ratingStars: string;
  heroCard: HeroCardData;
}

export interface SearchTabOption {
  id: string;
  label: string;
}

export interface SearchBarData {
  tabs: SearchTabOption[];
  stateLabel: string;
  stateDefaultOption: string;
  locationLabel: string;
  locationPlaceholder: string;
  budgetLabel: string;
  budgetOptions: { label: string; value: string }[];
  searchBtnText: string;
  quickChips: string[];
}

export interface TrustBadgeItem {
  id: string;
  title: string;
  description: string;
  svgPath: string;
}

export interface StateItem {
  code: string;
  name: string;
  cityCountText: string;
  propertyCountText: string;
  popularCitiesText: string;
}

export interface StatesSectionData {
  eyebrow: string;
  title: string;
  description: string;
  moreText: string;
  moreHref: string;
  popularCount: number;
  toggleExpandText: string;
  toggleCollapseText: string;
  states: StateItem[];
}

export interface PropertyListingItem {
  id: string;
  image?: string;
  badgeText: string;
  isAmberBadge?: boolean;
  price: string;
  pricePerSqFt?: string;
  title: string;
  address: string;
  bhk?: string;
  baths?: string;
  areaSqFt?: string;
  floorInfo?: string;
  facing?: string;
  propertyType?: string;
  specs?: string[];
  chips: string[];
  postedTime: string;
  sitePlanSvg?: string;
  photoCount?: number;
}

export interface FeaturedPropertiesData {
  title: string;
  description: string;
  seeAllText: string;
  seeAllHref: string;
  ownerListedText: string;
  ctaText: string;
  listings: PropertyListingItem[];
}

export interface OwnerBannerData {
  title: string;
  description: string;
  bullets: string[];
  badgeText: string;
  buttonText: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ServicesSectionData {
  title: string;
  description: string;
  allServicesText: string;
  allServicesHref: string;
  services: ServiceItem[];
}

export interface PricingPlanItem {
  id: string;
  title: string;
  description: string;
  price: string;
  periodText: string;
  isHot?: boolean;
  hotBadgeText?: string;
  features: string[];
  ctaText: string;
  finePrint: string;
}

export interface PricingPlansData {
  title: string;
  description: string;
  plans: PricingPlanItem[];
}

export interface BuilderProjectItem {
  id: string;
  name: string;
  builder: string;
  location: string;
  city?: string;
  config: string;
  priceRange: string;
  priceNote: string;
  stage: string;
  reraText: string;
  sitePlanSvg: string;
  imageUrl?: string;
}

export interface ProjectsSectionData {
  eyebrow: string;
  title: string;
  description: string;
  allProjectsText: string;
  allProjectsHref: string;
  viewProjectText: string;
  projects: BuilderProjectItem[];
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  tip: string;
  iconSvgPath: string;
}

export interface StepsSectionData {
  eyebrow: string;
  title: string;
  description: string;
  steps: HowItWorksStep[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaSearchBtnText: string;
  ctaListBtnText: string;
  ctaListBadgeText: string;
}

export interface TestimonialItem {
  id: string;
  stars: string;
  quote: string;
  avatarInitial: string;
  authorName: string;
  authorRole: string;
}

export interface TestimonialsSectionData {
  title: string;
  testimonials: TestimonialItem[];
}

export interface AppDownloadData {
  title: string;
  description: string;
  appStoreSubtitle: string;
  appStoreTitle: string;
  appStoreHref: string;
  googlePlaySubtitle: string;
  googlePlayTitle: string;
  googlePlayHref: string;
  qrTextLine1: string;
  qrTextLine2: string;
}

export type SeoCategoryKey = 'buy' | 'rent' | 'commercial' | 'projects';

export interface SeoCategory {
  key: SeoCategoryKey;
  label: string;
  templates: string[];
}

export interface SeoFooterData {
  categories: SeoCategory[];
  cities: string[];
}

// ================= LISTING & SEARCH PAGE SCHEMAS =================
export interface FilterOptionGroup {
  id: string;
  title: string;
  options: { label: string; value: string; count?: number; isSelected?: boolean }[];
}

export interface QuickLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface PropertyListingPageData {
  breadcrumb: { label: string; href: string }[];
  searchTag: string;
  searchPlaceholder: string;
  totalResultsCount: number;
  resultsSubTitle: string;
  bhkTypes: string[];
  priceRange: { min: number; max: number; label: string };
  propertyStatusOptions: string[];
  furnishingOptions: string[];
  propertyTypes: { name: string; count: number }[];
  quickLinkCards: { title: string; sections: QuickLinkGroup[] }[];
  listings: PropertyListingItem[];
}

// ================= PROPERTY DETAIL PAGE SCHEMAS =================
export interface PropertyDetailSpec {
  key: string;
  value: string;
  icon?: string;
}

export interface PropertyDetailOverview {
  label: string;
  value: string;
}

export interface PropertyDetailItem {
  id: string;
  title: string;
  address: string;
  price: string;
  pricePerSqFt: string;
  estimatedEmi: string;
  builtUpArea: string;
  isResale: boolean;
  ownerVerified: boolean;
  photos: string[];
  nearbyHighlights: string[];
  overview: PropertyDetailOverview[];
  amenities: string[];
  description: string;
  specs: PropertyDetailSpec[];
  ownerInfo: {
    name: string;
    role: string;
    avatarInitial: string;
    phone: string;
    isVerified: boolean;
    note: string;
  };
  reportOptions: string[];
  similarProperties: PropertyListingItem[];
}

// Root CMS Data Contract
export interface CmsData {
  siteMetadata: {
    title: string;
    description: string;
  };
  topBar: TopBarData;
  header: HeaderData;
  hero: HeroSectionData;
  searchBar: SearchBarData;
  trust: TrustBadgeItem[];
  statesSection: StatesSectionData;
  featuredProperties: FeaturedPropertiesData;
  ownerBanner: OwnerBannerData;
  servicesSection: ServicesSectionData;
  pricingPlansSection: PricingPlansData;
  projectsSection: ProjectsSectionData;
  stepsSection: StepsSectionData;
  testimonialsSection: TestimonialsSectionData;
  appDownload: AppDownloadData;
  seoFooter: SeoFooterData;
  footer: FooterData;
  listingPage: PropertyListingPageData;
  propertyDetail: PropertyDetailItem;
}
