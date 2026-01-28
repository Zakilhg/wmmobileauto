import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PUBLIC_PHONE, PUBLIC_TEXT_NUMBER } from "@/lib/config";
import { toSmsLink, toTelLink } from "@/lib/format";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-2 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2">
        <Button asChild size="sm" className="flex-1">
          <Link href={toTelLink(PUBLIC_PHONE)}>Call</Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1">
          <Link href={toSmsLink(PUBLIC_TEXT_NUMBER)}>Text</Link>
        </Button>
        <Button asChild size="sm" variant="secondary" className="flex-1">
          <Link href="/contact">Quote</Link>
        </Button>
      </div>
    </div>
  );
}

