"use client";

import { withErrorBoundary } from "@/shared/ui";

import { RtkQueryStepAuthApi } from "./rtk-query-step-auth-api";
import { RtkQueryStepAuthQuery } from "./rtk-query-step-auth-query";
import { RtkQueryStepBase } from "./rtk-query-step-base";
import { RtkQueryStepInject } from "./rtk-query-step-inject";
import { RtkQueryStepTags } from "./rtk-query-step-tags";

function RtkQueryStepsComponent() {
	return (
		<div className="flex flex-col gap-6">
			<RtkQueryStepTags />
			<RtkQueryStepBase />
			<RtkQueryStepAuthQuery />
			<RtkQueryStepAuthApi />
			<RtkQueryStepInject />
		</div>
	);
}

export const RtkQuerySteps = withErrorBoundary(RtkQueryStepsComponent);
