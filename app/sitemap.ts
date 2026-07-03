import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";

const SITE_URL = "https://codemantix.com";

// Für `output: export` erforderlich (statisch generieren, kein Server-Render).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projekte/`, changeFrequency: "monthly", priority: 0.8 },
  ];
  const projectRoutes: MetadataRoute.Sitemap = getProjects().map((p) => ({
    url: `${SITE_URL}/projekte/${p.slug}/`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticRoutes, ...projectRoutes];
}
