import type { Metadata } from "next";

import { Msw } from "@/widgets/msw";

export const metadata: Metadata = {
	title: "MSW",
	description:
		"Mock Service Worker setup and patterns for API mocking in development and testing environments"
};

export default function Page() {
	return <Msw />;
}
