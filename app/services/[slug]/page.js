import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import {
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/data/services";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceOverview from "@/components/service/ServiceOverview";

const ServiceApproach = dynamic(() => import("@/components/service/ServiceApproach"));
const ServiceProcess = dynamic(() => import("@/components/service/ServiceProcess"));
const ServiceTestimonial = dynamic(() => import("@/components/service/ServiceTestimonial"));
const ServiceFAQ = dynamic(() => import("@/components/service/ServiceFAQ"));
const ServiceCTA = dynamic(() => import("@/components/service/ServiceCTA"));
const Footer = dynamic(() => import("@/components/Footer"));

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
      <ServiceTestimonial service={service} />
      <ServiceFAQ service={service} />
      <ServiceCTA service={service} />
      <Footer />
    </main>
  );
}
