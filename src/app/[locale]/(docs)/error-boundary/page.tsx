import type { Metadata } from "next";

import { ErrorBoundary as ErrorBoundaryWidget } from "@/widgets/error-boundary";

export const metadata: Metadata = {
	title: "Error Boundary",
	description:
		"React Error Boundary patterns for graceful error handling, fallback UI, and error recovery strategies"
};

export default function Page() {
	return <ErrorBoundaryWidget />;
}
