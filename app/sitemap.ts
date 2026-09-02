import type { MetadataRoute } from "next";

const baseUrl = "https://nova-ashen-three.vercel.app/";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/flights",
    "/journey",
    "/plan",
    "/airport",
    "/airport/map",
    "/airport/dining",
    "/airport/shopping",
    "/airport/lounges",
    "/explore",
    "/explore/destinations",
    "/explore/experience",
    "/experience",
    "/support",
    "/support/lost-and-found",
    "/accessibility",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}