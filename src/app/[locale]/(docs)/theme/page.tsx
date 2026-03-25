import type { Metadata } from "next";

import { Theme } from "@/widgets/theme";

export const metadata: Metadata = {
	title: "Theming",
	description:
		"Theme system configuration with dark mode support, CSS custom properties, and next-themes integration"
};

export default function Page() {
	return <Theme />;
}
