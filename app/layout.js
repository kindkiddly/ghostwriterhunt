import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatWidgetGate from "@/components/ChatWidgetGate";
import { servicesByCategory } from "@/data/services";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Navbar only needs slug + title; passing this slim list keeps the full
// service content out of the client bundle shared by every page.
const navServicesByCategory = Object.fromEntries(
  Object.entries(servicesByCategory).map(([category, items]) => [
    category,
    items.map(({ slug, title }) => ({ slug, title })),
  ])
);

const SITE_URL = "https://ghostwriterhunt.lumexforge.com";
const SITE_DESCRIPTION =
  "GhostWriterHunt connects authors with professional ghostwriters, editors and publishers to turn your idea into a professionally published book. Completely confidential, with 100% of the rights and royalties in your name.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GhostWriterHunt | Professional Ghostwriting Services",
    template: "%s | GhostWriterHunt",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "GhostWriterHunt",
    url: SITE_URL,
    title: "GhostWriterHunt | Professional Ghostwriting Services",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/CTA-AUTHOR.webp",
        width: 1920,
        height: 998,
        alt: "GhostWriterHunt | Professional Ghostwriting Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GhostWriterHunt | Professional Ghostwriting Services",
    description: SITE_DESCRIPTION,
    images: ["/images/CTA-AUTHOR.webp"],
  },
  other: {
    "trustpilot-one-time-domain-verification-id":
      "59371f65-fc72-4e47-9e02-ad27aa8ba836",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <Navbar servicesByCategory={navServicesByCategory} />
        {children}
        <ChatWidgetGate />
        <Analytics />
      </body>
    </html>
  );
}
