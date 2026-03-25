import type { Metadata } from "next";

import { Converters } from "@/widgets/converters";

export const metadata: Metadata = {
	title: "Converters",
	description:
		"Data converters pattern for backend-to-frontend data transformation with strict typing and validation"
};

export default function Page() {
	return <Converters />;
}
