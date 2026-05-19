import { MetadataRoute } from "next";
import { categories, tools } from "@/lib/tools.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tools.ramzradio.in";

  // Category pages
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Individual tool pages
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...categoryUrls,
    ...toolUrls,
  ];
}
