import type { Metadata } from "next";

import { Styles } from "@/widgets/styles";

export const metadata: Metadata = {
	title: "Styling Guidelines",
	description:
		"CSS and Tailwind styling rules: allowed utility prefixes, forbidden colors, required cn utility usage"
};

export default function Page() {
	return <Styles />;
}
