import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import StatsCounter from "@/components/StatsCounter";
import HowItWorks from "@/components/HowItWorks";
import ServicesGrid from "@/components/ServicesGrid";
import WriterProfiles from "@/components/WriterProfiles";
import BookCoversGallery from "@/components/BookCoversGallery";
import Testimonials from "@/components/Testimonials";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoTicker />
      <StatsCounter />
      <HowItWorks />
      <ServicesGrid />
      <WriterProfiles />
      <BookCoversGallery />
      <Testimonials />
      <Comparison />
      <Pricing />
    </main>
  );
}
