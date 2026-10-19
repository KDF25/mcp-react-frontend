import { MswStepEnv } from "./msw-step-env";
import { MswStepHandlers } from "./msw-step-handlers";
import { MswStepInit } from "./msw-step-init";
import { MswStepMocks } from "./msw-step-mocks";
import { MswStepStore } from "./msw-step-store";
import { MswStepUtils } from "./msw-step-utils";

export async function MswSteps() {
	return (
		<div className="flex flex-col gap-6">
			<MswStepMocks />
			<MswStepStore />
			<MswStepUtils />
			<MswStepHandlers />
			<MswStepInit />
			<MswStepEnv />
		</div>
	);
}
