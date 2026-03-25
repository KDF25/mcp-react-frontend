import type { Metadata } from "next";

import { Zod } from "@/widgets/zod";

export const metadata: Metadata = {
	title: "Zod Validation",
	description:
		"Zod schema validation patterns for runtime type checking, form validation, and API response parsing"
};

export default function Page() {
	return <Zod />;
}
