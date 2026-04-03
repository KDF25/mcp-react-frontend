import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

// Namespaces matching the current public/locales structure
const namespaces = [
	"common",
	"creator",
	"structure",
	"styles",
	"zod",
	"naming",
	"reference",
	"home",
	"fsd",
	"i18n",
	"memoization",
	"error_boundary",
	"rtk_query",
	"converters",
	"msw",
	"theme",
	"not_found",
	"entities"
];

export default getRequestConfig(async ({ requestLocale }) => {
	// Typically corresponds to the `[locale]` segment
	let locale = await requestLocale;

	// Ensure that a valid locale is used
	if (!locale || !routing.locales.includes(locale as any)) {
		locale = routing.defaultLocale;
	}

	const messages: Record<string, any> = {};

	// Dynamically load all namespaces to avoid a single huge JSON
	await Promise.all(
		namespaces.map(async (ns) => {
			try {
				const msg = (
					await import(`../../public/locales/${locale}/${ns}.json`)
				).default;
				messages[ns] = msg;
			} catch (e) {
				console.warn(
					`Namespace "${ns}" not found for locale "${locale}"`
				);
			}
		})
	);

	return {
		locale,
		messages
	};
});
