import type { Metadata } from "next";

import { I18n } from "@/widgets/i18n";

export const metadata: Metadata = {
	title: "Internationalization",
	description:
		"i18n system with typed keys, language validation, and strict localization patterns for multi-language applications"
};

export default function Page() {
	return <I18n />;
}
