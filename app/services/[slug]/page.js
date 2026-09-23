import { notFound } from "next/navigation";
import {
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/data/services";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceOverview from "@/components/service/ServiceOverview";
import ServiceApproach from "@/components/service/ServiceApproach";
import ServiceProcess from "@/components/service/ServiceProcess";
import ServicePricing from "@/components/service/ServicePricing";
import ServiceTestimonial from "@/components/service/ServiceTestimonial";
import ServiceFAQ from "@/components/service/ServiceFAQ";
import ServiceCTA from "@/components/service/ServiceCTA";
import Footer from "@/components/Footer";

/**
 * GhostWriterHunt — Dynamic service page
 * Renders unique content per slug from data/services.js
 */

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.heroSubtext,
  };
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return notFound();

  // Even index → images on left in overview (alternating layout)
  const slugs = getAllServiceSlugs();
  const index = slugs.indexOf(service.slug);
  const imagesOnLeft = index % 2 === 1;

  return (
    <main className="m-0 max-w-full overflow-x-hidden p-0">
      <ServiceHero service={service} />
      <ServiceOverview service={service} imagesOnLeft={imagesOnLeft} />
      <ServiceApproach service={service} />
      <ServiceProcess service={service} />
      <ServicePricing service={service} />
      <ServiceTestimonial service={service} />
      <ServiceFAQ service={service} />
      <ServiceCTA service={service} />
      <Footer />
    </main>
  );
}
