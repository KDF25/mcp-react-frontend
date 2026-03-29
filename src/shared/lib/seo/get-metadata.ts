import type { Metadata } from "next";

import { routing } from "@/i18n/routing";

interface MetaProps {
	locale: string;
	pathname: string;
	title: string;
	description: string;
}

export function getPageMetadata({
	locale,
	pathname,
	title,
	description
}: MetaProps): Metadata {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
	const canonicalUrl = `${baseUrl}/${locale}${pathname}`;

	const alternateLanguages = Object.fromEntries(
		routing.locales.map((l) => [l, `${baseUrl}/${l}${pathname}`])
	);

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: alternateLanguages
		}
	};
}
