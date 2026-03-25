import type { MetadataRoute } from "next";

import { ENUM_ROUTES } from "@/shared/config/routes";

import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

	const routes = Object.values(ENUM_ROUTES.MAIN);

	return routes.flatMap((route) =>
		routing.locales.map((locale) => ({
			url: `${baseUrl}/${locale}${route === "/" ? "" : route}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: route === "/" ? 1.0 : 0.8
		}))
	);
}
