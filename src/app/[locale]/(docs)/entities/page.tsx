import type { Metadata } from "next";

import { Entities } from "@/widgets/entities";

export const metadata: Metadata = {
	title: "Entities",
	description:
		"Entity layer patterns: presentation components, data models, and entity-level business logic organization"
};

export default function Page() {
	return <Entities />;
}
