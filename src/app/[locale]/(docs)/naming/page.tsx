import type { Metadata } from "next";

import { Naming } from "@/widgets/naming";

export const metadata: Metadata = {
	title: "Naming Conventions",
	description:
		"File and variable naming conventions: kebab-case files, interface prefixes, backend type suffixes, and hook naming rules"
};

export default function Page() {
	return <Naming />;
}
