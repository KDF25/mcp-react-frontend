"use client";

import { withErrorBoundary } from "@/shared/ui";

import { MswStepInitApp } from "./msw-step-init-app";
import { MswStepInitBrowser } from "./msw-step-init-browser";
import { MswStepInitHandlers } from "./msw-step-init-handlers";
import { MswStepInitMain } from "./msw-step-init-main";

function MswStepInitComponent() {
	return (
		<>
			<MswStepInitBrowser />
			<MswStepInitHandlers />
			<MswStepInitApp />
			<MswStepInitMain />
		</>
	);
}

export const MswStepInit = withErrorBoundary(MswStepInitComponent);
