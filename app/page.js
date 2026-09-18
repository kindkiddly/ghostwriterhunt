import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import StatsCounter from "@/components/StatsCounter";
import NarrativeBlock1 from "@/components/NarrativeBlock1";
import HowItWorks from "@/components/HowItWorks";
import NarrativeBlock2 from "@/components/NarrativeBlock2";
import ServicesGrid from "@/components/ServicesGrid";
import TrustBlock from "@/components/TrustBlock";
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
      <NarrativeBlock1 />
      <HowItWorks />
      <NarrativeBlock2 />
      <ServicesGrid />
      <TrustBlock />
      <WriterProfiles />
      <BookCoversGallery />
      <Testimonials />
      <Comparison />
      <Pricing />
    </main>
  );
}
