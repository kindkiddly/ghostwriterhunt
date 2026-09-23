const SITE_URL = "https://ghostwriterhunt.lumexforge.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
