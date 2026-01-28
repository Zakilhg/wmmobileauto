import { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/site/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_NAME, PUBLIC_PHONE, SITE_URL } from "@/lib/config";
import { toTelLink } from "@/lib/format";
import { getHours, getSiteSettings } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Contact & Get a Quote",
  description:
    "Get a free quote for mobile mechanic or window tint services in Northern Virginia. Fast response, clear pricing. Call, text, or fill out the form.",
  keywords: [
    "get a quote",
    "mobile mechanic quote",
    "window tint quote",
    "contact auto repair",
    "Northern Virginia auto service",
  ],
};

export default async function ContactPage() {
  const [settings, hours] = await Promise.all([getSiteSettings(), getHours()]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: settings.businessName || BUSINESS_NAME,
    url: SITE_URL,
    telephone: settings.phone || PUBLIC_PHONE,
    address: settings.address || "Service Area",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={localBusinessSchema} />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold">Get a Quote</h1>
          <p className="text-lg text-muted-foreground">
            Share a few details and we will follow up quickly.
          </p>
          <QuoteForm />
        </div>
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-3 pt-6">
              <p className="text-sm text-muted-foreground">Call or text</p>
              <Link href={toTelLink(settings.phone || PUBLIC_PHONE)} className="text-2xl font-semibold">
                {settings.phone || PUBLIC_PHONE}
              </Link>
              <p className="text-sm text-muted-foreground">
                Tap to call on mobile devices.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <p className="text-lg font-semibold">{hours.title || "Hours"}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                {hours.schedule?.map((entry) => (
                  <div key={entry.day} className="flex items-center justify-between">
                    <span>{entry.day}</span>
                    <span>
                      {entry.closed ? "Closed" : `${entry.open || ""} - ${entry.close || ""}`}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 pt-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Service areas</p>
              <p>We serve nearby cities and neighborhoods with mobile service.</p>
              <Link href="/service-areas" className="text-sm font-medium text-primary">
                View service areas →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

