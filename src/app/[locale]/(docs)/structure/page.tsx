import type { Metadata } from "next";

import { Structure } from "@/widgets/structure";

export const metadata: Metadata = {
	title: "Project Structure",
	description:
		"Project directory structure rules: model organization, required files, subfolder patterns, and converter conventions"
};

export default function Page() {
	return <Structure />;
}
