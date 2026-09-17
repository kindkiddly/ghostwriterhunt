import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import StatsCounter from "@/components/StatsCounter";
import HowItWorks from "@/components/HowItWorks";
import ServicesGrid from "@/components/ServicesGrid";
import WriterProfiles from "@/components/WriterProfiles";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoTicker />
      <StatsCounter />
      <HowItWorks />
      <ServicesGrid />
      <WriterProfiles />
    </main>
  );
}
