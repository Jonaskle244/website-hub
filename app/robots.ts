import type { MetadataRoute } from "next";

const SITE_URL = "https://codemantix.com";

// Für `output: export` erforderlich (statisch generieren, kein Server-Render).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
