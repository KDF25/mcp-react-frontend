import type { Metadata } from "next";

import { Reference } from "@/widgets/reference";

export const metadata: Metadata = {
	title: "Reference",
	description:
		"API reference and documentation index for MCP Orchestrator tools and configurations"
};

export default function Page() {
	return <Reference />;
}
