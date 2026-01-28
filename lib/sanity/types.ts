export type ServiceType = "mechanic" | "tint";

export type SiteSettings = {
  businessName?: string;
  phone?: string;
  textNumber?: string;
  email?: string;
  address?: string;
  heroSubheadline?: string;
  trustBadges?: string[];
  ctaHeadline?: string;
  ctaSubheadline?: string;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  serviceType: ServiceType;
  serviceList?: string[];
  commonIssues?: string[];
  benefits?: string[];
  tintTiers?: { name?: string; description?: string }[];
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  category: "general" | ServiceType;
};

export type GalleryItem = {
  _id: string;
  title?: string;
  category: ServiceType;
  description?: string;
  createdAt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
};

export type ServiceArea = {
  _id: string;
  city: string;
  notes?: string;
};

export type Hours = {
  title?: string;
  schedule?: {
    day?: string;
    open?: string;
    close?: string;
    closed?: boolean;
  }[];
};

