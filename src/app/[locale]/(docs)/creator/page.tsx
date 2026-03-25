import type { Metadata } from "next";

import { Creator } from "@/widgets/creator";

export const metadata: Metadata = {
	title: "Creator",
	description:
		"Automated code generator for creating FSD-compliant modules, slices, and boilerplate structures"
};

export default function Page() {
	return <Creator />;
}
