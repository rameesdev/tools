import { NextResponse } from "next/server";
import sitemap from "../sitemap";

export async function GET() {
  const sitemapData = sitemap();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapData
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>${
      item.lastModified
        ? `\n    <lastmod>${
            item.lastModified instanceof Date
              ? item.lastModified.toISOString()
              : item.lastModified
          }</lastmod>`
        : ""
    }${
      item.changeFrequency
        ? `\n    <changefreq>${item.changeFrequency}</changefreq>`
        : ""
    }${
      item.priority !== undefined
        ? `\n    <priority>${item.priority.toFixed(1)}</priority>`
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
