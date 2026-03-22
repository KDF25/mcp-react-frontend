"use client";

import { withErrorBoundary } from "@/shared/ui";

import { MswStepEnv } from "./msw-step-env";
import { MswStepHandlers } from "./msw-step-handlers";
import { MswStepInit } from "./msw-step-init";
import { MswStepMocks } from "./msw-step-mocks";

function MswStepsComponent() {
	return (
		<div className="space-y-12">
			<MswStepMocks />
			<MswStepHandlers />
			<MswStepInit />
			<MswStepEnv />
		</div>
	);
}

export const MswSteps = withErrorBoundary(MswStepsComponent);
