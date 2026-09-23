import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const SITE_URL = "https://ghostwriterhunt.lumexforge.com";
const SITE_DESCRIPTION =
  "GhostWriterHunt connects authors with professional ghostwriters, editors and publishers to turn your idea into a professionally published book — completely confidential, with 100% of the rights and royalties in your name.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GhostWriterHunt — Professional Ghostwriting Services",
    template: "%s | GhostWriterHunt",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "GhostWriterHunt",
    url: SITE_URL,
    title: "GhostWriterHunt — Professional Ghostwriting Services",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/CTA-AUTHOR.webp",
        width: 1920,
        height: 998,
        alt: "GhostWriterHunt — Professional Ghostwriting Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GhostWriterHunt — Professional Ghostwriting Services",
    description: SITE_DESCRIPTION,
    images: ["/images/CTA-AUTHOR.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <Navbar />
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
