import { Metadata } from "next";
import { PrimaryCtas } from "@/components/site/PrimaryCtas";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceAreas } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Mobile mechanic and window tint service areas in Northern Virginia. Fairfax, Arlington, Alexandria, Falls Church, Vienna, Reston, and more.",
  keywords: [
    "mobile mechanic Fairfax",
    "window tint Arlington",
    "auto repair Alexandria",
    "Northern Virginia auto service",
    "mobile car repair near me",
  ],
};

export default async function ServiceAreasPage() {
  const serviceAreas = await getServiceAreas();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Service Areas</h1>
        <p className="text-lg text-muted-foreground">
          We cover nearby cities and neighborhoods. Call if you are outside the list.
        </p>
        <PrimaryCtas />
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {serviceAreas.map((area) => (
          <Card key={area._id}>
            <CardContent className="space-y-2 pt-6 text-sm">
              <p className="font-semibold">{area.city}</p>
              {area.notes && <p className="text-muted-foreground">{area.notes}</p>}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-12 rounded-xl border border-dashed border-border bg-muted/10 p-8 text-center text-sm text-muted-foreground">
        Map embed placeholder — add a map iframe here when ready.
      </section>

      <section className="mt-12 rounded-xl border border-border bg-muted/20 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Not sure if we serve your area?</h3>
            <p className="text-sm text-muted-foreground">
              Text us your city and we will confirm availability.
            </p>
          </div>
          <PrimaryCtas />
        </div>
      </section>
    </div>
  );
}

