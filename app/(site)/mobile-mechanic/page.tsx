import { Metadata } from "next";
import { PrimaryCtas } from "@/components/site/PrimaryCtas";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFaqs, getServices } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Mobile Mechanic",
  description:
    "Mobile mechanic services in Northern Virginia. Diagnostics, brakes, battery, oil changes and minor repairs at your location. We come to you!",
  keywords: [
    "mobile mechanic",
    "car repair near me",
    "mobile auto repair",
    "Northern Virginia mechanic",
    "on-site car repair",
    "battery replacement",
    "brake repair",
  ],
};

export default async function MobileMechanicPage() {
  const [services, faqs] = await Promise.all([getServices(), getFaqs()]);
  const mechanic = services.find((service) => service.serviceType === "mechanic");
  const mechanicFaqs = faqs.filter((faq) => faq.category === "mechanic");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold">Mobile Mechanic</h1>
          <p className="text-lg text-muted-foreground">
            We handle on-site diagnostics and minor repairs with clear communication and
            fast response.
          </p>
          <PrimaryCtas />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Why go mobile?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Skip the tow and get service where your car is parked. We bring the tools to
            you.
          </CardContent>
        </Card>
      </div>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">Services we offer</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(mechanic?.serviceList || []).map((service) => (
            <Card key={service}>
              <CardContent className="pt-6 text-sm text-muted-foreground">
                {service}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">Common issues we help with</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(mechanic?.commonIssues || []).map((issue) => (
            <Card key={issue}>
              <CardContent className="pt-6 text-sm text-muted-foreground">
                {issue}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <FaqAccordion items={mechanicFaqs} />
      </section>

      <section className="mt-12 rounded-xl border border-border bg-muted/20 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-sm text-muted-foreground">
              Call, text, or request a quote and we will respond quickly.
            </p>
          </div>
          <PrimaryCtas />
        </div>
      </section>
    </div>
  );
}

