import Link from "next/link";
import { Metadata } from "next";
import { PrimaryCtas } from "@/components/site/PrimaryCtas";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { JsonLd } from "@/components/site/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGallery, getServiceAreas, getServices, getSiteSettings } from "@/lib/sanity/fetch";
import { BUSINESS_NAME, PUBLIC_PHONE, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "We Come To You",
  description: "Mobile mechanic services and window tinting at your location.",
};

export default async function HomePage() {
  const [settings, services, gallery, serviceAreas] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getGallery(),
    getServiceAreas(),
  ]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: settings.businessName || BUSINESS_NAME,
    url: SITE_URL,
    telephone: settings.phone || PUBLIC_PHONE,
    address: settings.address || "Service Area",
    areaServed: serviceAreas.map((area) => area.city),
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <section className="border-b border-border bg-gradient-to-br from-background to-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                Mobile Auto Repair & Window Tint
              </p>
              <h1 className="text-4xl font-semibold md:text-5xl">We Come To You</h1>
              <p className="text-lg text-muted-foreground">
                {settings.heroSubheadline ||
                  "On-site diagnostics, repairs, and tinting with fast response."}
              </p>
              <PrimaryCtas />
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Fast response</p>
              <p className="mt-2 text-2xl font-semibold">Mobile service on your schedule</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Fully mobile mechanic and tint specialist</li>
                <li>• Clear, upfront quotes</li>
                <li>• Flexible scheduling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service._id} className="h-full">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{service.shortDescription}</p>
                <Link href={`/${service.slug}`} className="text-sm font-medium text-primary">
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <h2 className="text-3xl font-semibold">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Call or text us", "Get a quick quote", "We arrive on-site"].map((step) => (
              <Card key={step}>
                <CardContent className="pt-6">
                  <p className="text-sm font-semibold uppercase text-muted-foreground">Step</p>
                  <p className="mt-2 text-lg font-semibold">{step}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          {(settings.trustBadges || []).map((badge) => (
            <Badge key={badge} variant="secondary">
              {badge}
            </Badge>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/10">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Recent work</h2>
            <Link href="/gallery" className="text-sm font-medium text-primary">
              View all →
            </Link>
          </div>
          <div className="mt-6">
            <GalleryGrid items={gallery.slice(0, 6)} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Service areas</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We cover nearby cities and neighborhoods. Call to confirm availability.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {serviceAreas.slice(0, 8).map((area) => (
                <Badge key={area._id} variant="outline">
                  {area.city}
                </Badge>
              ))}
            </div>
          </div>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <p className="text-lg font-semibold">Need help today?</p>
              <p className="text-sm text-muted-foreground">
                Tell us what you need and we will respond quickly with next steps.
              </p>
              <PrimaryCtas />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">
                {settings.ctaHeadline || "Need help today?"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {settings.ctaSubheadline ||
                  "Call or text for fast service and a clear quote."}
              </p>
            </div>
            <PrimaryCtas />
          </div>
        </div>
      </section>
    </>
  );
}

