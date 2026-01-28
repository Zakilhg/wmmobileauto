import { client } from "@/lib/sanity/client";
import {
  faqsQuery,
  galleryQuery,
  hoursQuery,
  serviceAreasQuery,
  servicesQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";
import type {
  Faq,
  GalleryItem,
  Hours,
  Service,
  ServiceArea,
  SiteSettings,
} from "@/lib/sanity/types";
import {
  defaultFaqs,
  defaultHours,
  defaultServiceAreas,
  defaultServices,
  defaultSiteSettings,
} from "@/lib/content/defaults";

function cleanString(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function cleanStringArray(values?: (string | null | undefined)[]) {
  if (!values?.length) return undefined;
  const cleaned = values
    .map((value) => cleanString(value))
    .filter((value): value is string => Boolean(value));
  return cleaned.length ? cleaned : undefined;
}

function mergeSiteSettings(settings: SiteSettings | null): SiteSettings {
  return {
    ...defaultSiteSettings,
    ...settings,
    businessName: cleanString(settings?.businessName) || defaultSiteSettings.businessName,
    phone: cleanString(settings?.phone) || defaultSiteSettings.phone,
    textNumber: cleanString(settings?.textNumber) || defaultSiteSettings.textNumber,
    email: cleanString(settings?.email) || defaultSiteSettings.email,
    address: cleanString(settings?.address) || defaultSiteSettings.address,
    heroSubheadline:
      cleanString(settings?.heroSubheadline) || defaultSiteSettings.heroSubheadline,
    trustBadges: cleanStringArray(settings?.trustBadges) || defaultSiteSettings.trustBadges,
    ctaHeadline: cleanString(settings?.ctaHeadline) || defaultSiteSettings.ctaHeadline,
    ctaSubheadline:
      cleanString(settings?.ctaSubheadline) || defaultSiteSettings.ctaSubheadline,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await client.fetch<SiteSettings | null>(siteSettingsQuery);
    return mergeSiteSettings(data);
  } catch (error) {
    return defaultSiteSettings;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await client.fetch<Service[]>(servicesQuery);
    if (!data?.length) return defaultServices;
    const defaultsByType = new Map(defaultServices.map((service) => [service.serviceType, service]));

    const merged = data.map((service) => {
      const base = defaultsByType.get(service.serviceType);
      const serviceList = cleanStringArray(service.serviceList) || base?.serviceList;
      const commonIssues = cleanStringArray(service.commonIssues) || base?.commonIssues;
      const benefits = cleanStringArray(service.benefits) || base?.benefits;
      const tintTiers =
        service.tintTiers
          ?.map((tier) => ({
            name: cleanString(tier?.name),
            description: cleanString(tier?.description),
          }))
          .filter((tier) => tier.name || tier.description) || undefined;

      return {
        ...base,
        ...service,
        _id: cleanString(service._id) || base?._id || service.serviceType,
        title: cleanString(service.title) || base?.title || service.serviceType,
        slug: cleanString(service.slug) || base?.slug || service.serviceType,
        shortDescription:
          cleanString(service.shortDescription) || base?.shortDescription,
        serviceList,
        commonIssues,
        benefits,
        tintTiers: tintTiers || base?.tintTiers,
      };
    });

    return merged.length ? merged : defaultServices;
  } catch (error) {
    return defaultServices;
  }
}

export async function getFaqs(): Promise<Faq[]> {
  try {
    const data = await client.fetch<Faq[]>(faqsQuery);
    if (!data?.length) return defaultFaqs;
    const cleaned = data
      .map((faq) => ({
        ...faq,
        question: cleanString(faq.question) || "",
        answer: cleanString(faq.answer) || "",
      }))
      .filter((faq) => faq.question && faq.answer);
    return cleaned.length ? cleaned : defaultFaqs;
  } catch (error) {
    return defaultFaqs;
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const data = await client.fetch<GalleryItem[]>(galleryQuery);
    return data || [];
  } catch (error) {
    return [];
  }
}

export async function getServiceAreas(): Promise<ServiceArea[]> {
  try {
    const data = await client.fetch<ServiceArea[]>(serviceAreasQuery);
    if (!data?.length) return defaultServiceAreas;
    const cleaned = data
      .map((area) => ({
        ...area,
        city: cleanString(area.city) || "",
        notes: cleanString(area.notes),
      }))
      .filter((area) => area.city);
    return cleaned.length ? cleaned : defaultServiceAreas;
  } catch (error) {
    return defaultServiceAreas;
  }
}

export async function getHours(): Promise<Hours> {
  try {
    const data = await client.fetch<Hours | null>(hoursQuery);
    if (!data) return defaultHours;
    const schedule =
      data.schedule
        ?.map((entry) => ({
          day: cleanString(entry.day),
          open: cleanString(entry.open),
          close: cleanString(entry.close),
          closed: entry.closed,
        }))
        .filter((entry) => entry.day) || undefined;

    const hasSchedule = schedule?.length;
    return {
      ...defaultHours,
      ...data,
      title: cleanString(data.title) || defaultHours.title,
      schedule: hasSchedule ? schedule : defaultHours.schedule,
    };
  } catch (error) {
    return defaultHours;
  }
}

