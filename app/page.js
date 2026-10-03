import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const LogoTicker = dynamic(() => import("@/components/LogoTicker"));
const StatsCounter = dynamic(() => import("@/components/StatsCounter"));
const NarrativeBlock1 = dynamic(() => import("@/components/NarrativeBlock1"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const NarrativeBlock2 = dynamic(() => import("@/components/NarrativeBlock2"));
const ServicesGrid = dynamic(() => import("@/components/ServicesGrid"));
const TrustBlock = dynamic(() => import("@/components/TrustBlock"));
const BookCoversGallery = dynamic(() => import("@/components/BookCoversGallery"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Comparison = dynamic(() => import("@/components/Comparison"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const NarrativeBlock3 = dynamic(() => import("@/components/NarrativeBlock3"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));
const Footer = dynamic(() => import("@/components/Footer"));

export const metadata = {
  title: "Professional Ghostwriting & Book Publishing Services | GhostWriterHunt",
  description:
    "Turn your idea into a professionally published book. Our vetted ghostwriters, editors and publishing team handle everything. Completely confidential, with 100% of the rights and royalties in your name.",
};

export default function Home() {
  return (
    <main className="m-0 max-w-full overflow-x-hidden p-0">
      <Hero />
      <LogoTicker />
      <StatsCounter />
      <NarrativeBlock1 />
      <HowItWorks />
      <NarrativeBlock2 />
      <ServicesGrid />
      <TrustBlock />
      <BookCoversGallery />
      <Testimonials />
      <Comparison />
      <Pricing />
      <NarrativeBlock3 />
      <FAQ />
      <ContactForm />
      <CTABanner />
      <Footer />
    </main>
  );
}
