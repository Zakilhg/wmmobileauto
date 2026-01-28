import Link from "next/link";
import Image from "next/image";
import { getHours, getSiteSettings } from "@/lib/sanity/fetch";
import { BUSINESS_NAME, PUBLIC_PHONE } from "@/lib/config";
import { toTelLink } from "@/lib/format";

export async function Footer() {
  const settings = await getSiteSettings();
  const hours = await getHours();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div className="space-y-3">
          <div className="flex items-center">
            <Image
              src="/logo/Logo1.png"
              alt={settings.businessName || BUSINESS_NAME}
              width={180}
              height={65}
              className="h-16 w-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Mobile mechanic services and window tinting that comes to you.
          </p>
          <Link href={toTelLink(settings.phone || PUBLIC_PHONE)} className="text-sm">
            {settings.phone || PUBLIC_PHONE}
          </Link>
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Quick Links</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/mobile-mechanic">Mobile Mechanic</Link>
            <Link href="/window-tint">Window Tint</Link>
            <Link href="/service-areas">Service Areas</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-semibold">{hours.title || "Hours"}</p>
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
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {settings.businessName || BUSINESS_NAME}. All rights
        reserved.
      </div>
    </footer>
  );
}

