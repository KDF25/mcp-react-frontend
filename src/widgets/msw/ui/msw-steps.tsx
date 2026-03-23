import { MswStepEnv } from "./msw-step-env";
import { MswStepHandlers } from "./msw-step-handlers";
import { MswStepInit } from "./msw-step-init";
import { MswStepMocks } from "./msw-step-mocks";

export async function MswSteps() {
	return (
		<div className="space-y-12">
			<MswStepMocks />
			<MswStepHandlers />
			<MswStepInit />
			<MswStepEnv />
		</div>
	);
}
