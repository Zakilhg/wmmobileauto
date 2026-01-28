export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  businessName,
  phone,
  textNumber,
  email,
  address,
  heroSubheadline,
  trustBadges,
  ctaHeadline,
  ctaSubheadline
}`;

export const servicesQuery = `*[_type == "service"]|order(serviceType asc){
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  serviceType,
  serviceList,
  commonIssues,
  benefits,
  tintTiers
}`;

export const faqsQuery = `*[_type == "faq"]|order(category asc){
  _id,
  question,
  answer,
  category
}`;

export const galleryQuery = `*[_type == "galleryItem"]|order(createdAt desc, _createdAt desc){
  _id,
  title,
  category,
  description,
  "createdAt": coalesce(createdAt, _createdAt),
  image
}`;

export const serviceAreasQuery = `*[_type == "serviceArea"]|order(city asc){
  _id,
  city,
  notes
}`;

export const hoursQuery = `*[_type == "hours"][0]{
  title,
  schedule
}`;

