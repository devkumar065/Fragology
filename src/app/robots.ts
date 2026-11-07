import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fragology.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/my-account/", "/checkout/", "/cart/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
