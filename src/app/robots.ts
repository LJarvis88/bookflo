import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/** Required for `output: "export"` — emit a static robots.txt at build. */
export const dynamic = "force-static";

/**
 * Static-export friendly — emitted as /robots.txt at build time.
 * Disallow owner-app surfaces; marketing, legal, and public booking stay crawlable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/onboarding/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
