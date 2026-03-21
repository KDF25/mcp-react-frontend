"use client";

import { withErrorBoundary } from "@/shared/ui";

import { ErrorBoundaryPattern } from "./error-boundary-pattern";
import { ErrorBoundaryImplementation } from "./implementation";
import { ErrorBoundaryIntroduction } from "./introduction";

function ErrorBoundaryComponent() {
	return (
		<div className="space-y-20 pb-20">
			<ErrorBoundaryIntroduction />
			<div className="h-px bg-border w-full" />
			<ErrorBoundaryImplementation />
			<div className="h-px bg-border w-full" />
			<ErrorBoundaryPattern />
		</div>
	);
}

export const ErrorBoundary = withErrorBoundary(ErrorBoundaryComponent);
