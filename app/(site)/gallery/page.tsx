import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { getGallery } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Recent mobile mechanic and window tint work.",
};

export default async function GalleryPage() {
  const gallery = await getGallery();
  const mechanic = gallery.filter((item) => item.category === "mechanic");
  const tint = gallery.filter((item) => item.category === "tint");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Gallery</h1>
        <p className="text-lg text-muted-foreground">
          Recent mobile repairs and tint installs completed on-site.
        </p>
      </div>

      <Tabs defaultValue="all" className="mt-10">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mechanic">Mechanic</TabsTrigger>
          <TabsTrigger value="tint">Tint</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <GalleryGrid items={gallery} />
        </TabsContent>
        <TabsContent value="mechanic" className="mt-6">
          <GalleryGrid items={mechanic} />
        </TabsContent>
        <TabsContent value="tint" className="mt-6">
          <GalleryGrid items={tint} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

