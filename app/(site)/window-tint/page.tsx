import { Metadata } from "next";
import { PrimaryCtas } from "@/components/site/PrimaryCtas";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFaqs, getGallery, getServices } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Window Tint",
  description:
    "Professional window tinting in Northern Virginia. Mobile service - we come to you! Privacy, heat reduction, UV protection. Basic, Standard & Premium options.",
  keywords: [
    "window tint",
    "car tint",
    "window tinting near me",
    "Northern Virginia window tint",
    "mobile tint service",
    "car window film",
    "UV protection tint",
  ],
};

export default async function WindowTintPage() {
  const [services, faqs, gallery] = await Promise.all([
    getServices(),
    getFaqs(),
    getGallery(),
  ]);
  const tint = services.find((service) => service.serviceType === "tint");
  const tintFaqs = faqs.filter((faq) => faq.category === "tint");
  const tintGallery = gallery.filter((item) => item.category === "tint");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold">Window Tint</h1>
          <p className="text-lg text-muted-foreground">
            Improve comfort, privacy, and appearance with professional tinting.
          </p>
          <PrimaryCtas />
          <p className="text-sm text-muted-foreground">
            Tint laws vary by state—ask for compliant options.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {(tint?.benefits || []).map((benefit) => (
              <div key={benefit}>• {benefit}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">Tint options</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(tint?.tintTiers || []).map((tier) => (
            <Card key={tier.name}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {tier.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Tint gallery</h2>
        </div>
        <GalleryGrid items={tintGallery} />
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <FaqAccordion items={tintFaqs} />
      </section>

      <section className="mt-12 rounded-xl border border-border bg-muted/20 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Ready for a quote?</h3>
            <p className="text-sm text-muted-foreground">
              Tell us about your vehicle and desired tint level.
            </p>
          </div>
          <PrimaryCtas />
        </div>
      </section>
    </div>
  );
}

