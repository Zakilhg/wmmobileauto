import { BUSINESS_NAME, EMAIL_TO, PUBLIC_PHONE, PUBLIC_TEXT_NUMBER } from "@/lib/config";
import type { Faq, Hours, Service, ServiceArea, SiteSettings } from "@/lib/sanity/types";

export const defaultSiteSettings: SiteSettings = {
  businessName: BUSINESS_NAME,
  phone: PUBLIC_PHONE,
  textNumber: PUBLIC_TEXT_NUMBER,
  email: EMAIL_TO,
  address: "Service Area",
  heroSubheadline: "On-site diagnostics, repairs, and tinting with fast response.",
  trustBadges: [
    "Mobile Service",
    "Fast Response",
    "Upfront Quote",
    "Quality Work",
  ],
  ctaHeadline: "Need service fast?",
  ctaSubheadline: "Call or text now and we will get you scheduled.",
};

export const defaultServices: Service[] = [
  {
    _id: "mechanic",
    title: "Mobile Mechanic",
    slug: "mobile-mechanic",
    shortDescription: "Diagnostics and minor repairs at your location.",
    serviceType: "mechanic",
    serviceList: [
      "Check Engine Diagnostics",
      "Brakes",
      "Battery/Starter",
      "Oil Changes",
      "Pre-Purchase Inspections",
      "Minor Repairs",
    ],
    commonIssues: [
      "No-starts and battery issues",
      "Brake noise or vibration",
      "Check engine light concerns",
      "Fluid leaks",
      "Rough idling",
      "Pre-purchase peace of mind",
    ],
  },
  {
    _id: "tint",
    title: "Window Tint",
    slug: "window-tint",
    shortDescription: "Privacy, heat reduction, and a clean finish.",
    serviceType: "tint",
    benefits: [
      "Reduce heat and glare",
      "Enhance privacy",
      "Protect interiors from UV damage",
      "Clean, professional appearance",
    ],
    tintTiers: [
      { name: "Basic", description: "Budget-friendly tint for everyday comfort." },
      { name: "Standard", description: "Balanced performance and heat reduction." },
      { name: "Premium", description: "Maximum clarity and heat rejection." },
    ],
  },
];

export const defaultFaqs: Faq[] = [
  {
    _id: "faq-1",
    question: "Do you come to my home or workplace?",
    answer: "Yes, we are fully mobile and can meet you at home, work, or roadside.",
    category: "general",
  },
  {
    _id: "faq-2",
    question: "How soon can you arrive?",
    answer: "Most requests are handled the same day. Call or text for live availability.",
    category: "general",
  },
  {
    _id: "faq-3",
    question: "What mechanic services do you offer?",
    answer: "Diagnostics, brakes, batteries, starters, oil changes, and minor repairs.",
    category: "mechanic",
  },
  {
    _id: "faq-4",
    question: "Can you inspect a car before I buy it?",
    answer: "Yes. We provide pre-purchase inspections with a clear summary.",
    category: "mechanic",
  },
  {
    _id: "faq-5",
    question: "What tint options are available?",
    answer: "We offer Basic, Standard, and Premium tiers. We will explain the differences.",
    category: "tint",
  },
  {
    _id: "faq-6",
    question: "How long does window tint take?",
    answer: "Most vehicles can be completed in a few hours. Ask for timing details.",
    category: "tint",
  },
];

export const defaultServiceAreas: ServiceArea[] = [
  { _id: "area-1", city: "Fairfax" },
  { _id: "area-2", city: "Arlington" },
  { _id: "area-3", city: "Alexandria" },
  { _id: "area-4", city: "Falls Church" },
  { _id: "area-5", city: "Vienna" },
  { _id: "area-6", city: "Tysons" },
  { _id: "area-7", city: "McLean" },
  { _id: "area-8", city: "Reston" },
  { _id: "area-9", city: "Herndon" },
  { _id: "area-10", city: "Sterling" },
  { _id: "area-11", city: "Chantilly" },
  { _id: "area-12", city: "Centreville" },
  { _id: "area-13", city: "Manassas" },
  { _id: "area-14", city: "Woodbridge" },
  { _id: "area-15", city: "Springfield" },
  { _id: "area-16", city: "Annandale" },
  { _id: "area-17", city: "Burke" },
  { _id: "area-18", city: "Lorton" },
];

export const defaultHours: Hours = {
  title: "Hours",
  schedule: [
    { day: "Monday", open: "8:00 AM", close: "6:00 PM", closed: false },
    { day: "Tuesday", open: "8:00 AM", close: "6:00 PM", closed: false },
    { day: "Wednesday", open: "8:00 AM", close: "6:00 PM", closed: false },
    { day: "Thursday", open: "8:00 AM", close: "6:00 PM", closed: false },
    { day: "Friday", open: "8:00 AM", close: "6:00 PM", closed: false },
    { day: "Saturday", open: "9:00 AM", close: "4:00 PM", closed: false },
    { day: "Sunday", open: "", close: "", closed: true },
  ],
};

