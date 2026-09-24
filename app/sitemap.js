import { getAllServiceSlugs } from "@/data/services";

const SITE_URL = "https://ghostwriterhunt.lumexforge.com";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/about",
    "/privacy-policy",
    "/terms-of-use",
    "/cookie-policy",
    "/legal",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes];
}
