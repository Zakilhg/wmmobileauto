import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { GalleryItem } from "@/lib/sanity/types";

type Props = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: Props) {
  if (!items.length) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted text-sm text-muted-foreground"
          >
            Gallery photo coming soon
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item._id} className="overflow-hidden rounded-lg border border-border">
          {item.image ? (
            <Image
              src={urlFor(item.image).width(800).height(600).url()}
              alt={item.title || "Gallery image"}
              width={800}
              height={600}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="flex h-48 items-center justify-center bg-muted text-sm text-muted-foreground">
              Image coming soon
            </div>
          )}
          <div className="space-y-1 p-3">
            <p className="text-sm font-medium">{item.title || "Project"}</p>
            <p className="text-xs text-muted-foreground">
              {item.description || "Mobile service completed on-site."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

