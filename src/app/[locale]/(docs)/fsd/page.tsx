import type { Metadata } from "next";

import { Fsd } from "@/widgets/fsd";

export const metadata: Metadata = {
	title: "FSD Architecture",
	description:
		"Feature-Sliced Design architecture rules, layer boundaries, and dependency guidelines for scalable frontend projects"
};

export default function Page() {
	return <Fsd />;
}
