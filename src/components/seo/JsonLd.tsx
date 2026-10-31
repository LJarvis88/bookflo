import { absoluteUrl } from "@/lib/site";

/** Safe JSON-LD script tag for static export pages. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export type BreadcrumbCrumb = {
  name: string;
  /** Path beginning with `/`, or absolute URL. */
  path: string;
};

/** schema.org BreadcrumbList from ordered crumbs. */
export function breadcrumbList(crumbs: BreadcrumbCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path.startsWith("http")
        ? crumb.path
        : absoluteUrl(crumb.path),
    })),
  };
}
