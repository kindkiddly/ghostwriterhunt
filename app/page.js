import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import StatsCounter from "@/components/StatsCounter";
import NarrativeBlock1 from "@/components/NarrativeBlock1";
import HowItWorks from "@/components/HowItWorks";
import NarrativeBlock2 from "@/components/NarrativeBlock2";
import ServicesGrid from "@/components/ServicesGrid";
import TrustBlock from "@/components/TrustBlock";
import BookCoversGallery from "@/components/BookCoversGallery";
import Testimonials from "@/components/Testimonials";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import NarrativeBlock3 from "@/components/NarrativeBlock3";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

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
