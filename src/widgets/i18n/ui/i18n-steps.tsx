"use client";

import { withErrorBoundary } from "@/shared/ui";

import { I18nStepConfigBlocks } from "./i18n-step-config-blocks";
import { I18nStepConfigHub } from "./i18n-step-config-hub";
import { I18nStepInfraKey } from "./i18n-step-infra-key";
import { I18nStepInfraTypes } from "./i18n-step-infra-types";
import { I18nStepInitChecker } from "./i18n-step-init-checker";
import { I18nStepInitCore } from "./i18n-step-init-core";
import { I18nStepSwitching } from "./i18n-step-switching";
import { I18nStepUsage } from "./i18n-step-usage";

function I18nStepsComponent() {
	return (
		<div className="space-y-12">
			<I18nStepInfraKey />
			<I18nStepInfraTypes />
			<I18nStepConfigHub />
			<I18nStepConfigBlocks />
			<I18nStepInitCore />
			<I18nStepInitChecker />
			<I18nStepUsage />
			<I18nStepSwitching />
		</div>
	);
}

export const I18nSteps = withErrorBoundary(I18nStepsComponent);
