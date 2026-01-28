import type { Metadata } from "next";
import { Inter, Oswald, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { BUSINESS_NAME, SITE_URL } from "@/lib/config";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS_NAME} | Mobile Mechanic & Window Tint`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    "Mobile mechanic services and window tinting in Northern Virginia with fast response. We come to you - call, text, or request a quote.",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "mobile mechanic",
    "window tint",
    "auto repair",
    "Northern Virginia",
    "Fairfax",
    "Arlington",
    "Alexandria",
    "car repair near me",
    "mobile auto repair",
  ],
  openGraph: {
    title: `${BUSINESS_NAME} | We Come To You`,
    description:
      "Fast mobile mechanic services and window tinting in Northern Virginia. Call or text for a quick quote.",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo/Logo1.png",
        width: 512,
        height: 512,
        alt: BUSINESS_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: BUSINESS_NAME,
    description: "Mobile mechanic & window tint services. We come to you!",
    images: ["/logo/Logo1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/logo/Logo1.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} ${robotoMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
