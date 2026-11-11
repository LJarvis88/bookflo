import type { MetadataRoute } from "next";
import { listTenantSlugs } from "@/data/tenants";
import { absoluteUrl } from "@/lib/site";

/** Required for `output: "export"` — emit a static sitemap.xml at build. */
export const dynamic = "force-static";

/**
 * Static-export friendly XML sitemap for https://bookflo.app.
 * Keep auth / dashboard / onboarding out — they are noindex or disallowed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const marketing: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/join/first-50"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const booking: MetadataRoute.Sitemap = listTenantSlugs().map((slug) => ({
    url: absoluteUrl(`/book/${slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const quizzes: MetadataRoute.Sitemap = listTenantSlugs().map((slug) => ({
    url: absoluteUrl(`/quiz/${slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...marketing, ...booking, ...quizzes];
}
