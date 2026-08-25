export interface SiteMetadata {
  title: string;
  description: string;
}

export interface TopBarData {
  text: string;
  highlightText: string;
}

export interface MegaMenuLink {
  label: string;
  href: string;
}

export interface MegaMenuCategory {
  title: string;
  links: MegaMenuLink[];
}

export interface MegaMenuPromo {
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export interface NavMenuItem {
  id: string;
  label: string;
  type: 'mega' | 'dropdown' | 'link';
  categories?: MegaMenuCategory[];
  promo?: MegaMenuPromo;
  dropdownLinks?: MegaMenuLink[];
}

export interface HeaderData {
  logoMark: string;
  logoPrefix: string;
  logoSuffix: string;
  loginBtnText: string;
  postBtnText: string;
  postBadgeText: string;
  menuItems: NavMenuItem[];
}

export interface HeroCardData {
  chipAText: string;
  chipBText: string;
  price: string;
  title: string;
  location: string;
  specs: string[];
}

export interface HeroSectionData {
  newBadgeText: string;
  newBadgeMessage: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  subtitle: string;
  ratingStars: string;
  ratingScore: string;
  ratingCount: string;
  ratingOwnerCount: string;
  heroCard: HeroCardData;
}

export interface SearchTabData {
  id: string;
  label: string;
}

export interface BudgetOption {
  label: string;
  value: string;
}

export interface SearchBarData {
  tabs: SearchTabData[];
  stateLabel: string;
  stateDefaultOption: string;
  locationLabel: string;
  locationPlaceholder: string;
  budgetLabel: string;
  budgetOptions: BudgetOption[];
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
  name: string;
  code: string;
  propertyCount: string;
  citiesText: string;
  svgContent: string;
}

export interface StatesSectionData {
  eyebrow: string;
  title: string;
  description: string;
  moreText: string;
  moreHref: string;
  toggleExpandText: string;
  toggleCollapseText: string;
  popularCount: number;
  states: StateItem[];
}

export interface PropertyListingItem {
  id: string;
  price: string;
  period?: string;
  title: string;
  location: string;
  specs: string[];
  badgeText: string;
  isAmberBadge?: boolean;
  bgColor: string;
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
  buttonText: string;
  badgeText: string;
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
  amount: string;
  billingPeriod?: string;
  isHot?: boolean;
  hotBadgeText?: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'line' | 'primary';
  finePrint: string;
  iconSvgPath: string;
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
  priceRange: string;
  priceNote: string;
  config: string;
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

export interface StepItem {
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
  steps: StepItem[];
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
  authorName: string;
  authorRole: string;
  avatarInitial: string;
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

export type SeoCategoryKey = 'buy' | 'rent' | 'plot' | 'comm' | 'pg';

export interface SeoCategoryData {
  key: SeoCategoryKey;
  label: string;
  templates: string[];
}

export interface SeoFooterData {
  categories: SeoCategoryData[];
  cities: string[];
}

export interface FooterColumn {
  title: string;
  links: MegaMenuLink[];
}

export interface FooterData {
  brandDescription: string;
  columns: FooterColumn[];
  copyrightText: string;
  servedCitiesText: string;
}

export interface CmsData {
  siteMetadata: SiteMetadata;
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
}
