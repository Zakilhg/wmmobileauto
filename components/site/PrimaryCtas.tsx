import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PUBLIC_PHONE, PUBLIC_TEXT_NUMBER } from "@/lib/config";
import { toSmsLink, toTelLink } from "@/lib/format";

type Props = {
  quoteHref?: string;
  stacked?: boolean;
};

export function PrimaryCtas({ quoteHref = "/contact", stacked }: Props) {
  return (
    <div className={stacked ? "grid gap-3 sm:flex sm:flex-wrap" : "flex flex-wrap gap-3"}>
      <Button asChild size="lg">
        <Link href={toTelLink(PUBLIC_PHONE)}>Call Now</Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link href={toSmsLink(PUBLIC_TEXT_NUMBER)}>Text Now</Link>
      </Button>
      <Button asChild size="lg" variant="secondary">
        <Link href={quoteHref}>Get a Quote</Link>
      </Button>
    </div>
  );
}

