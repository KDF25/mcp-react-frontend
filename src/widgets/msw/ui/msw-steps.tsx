import { MswStepEnv } from "./msw-step-env";
import { MswStepHandlers } from "./msw-step-handlers";
import { MswStepInit } from "./msw-step-init";
import { MswStepMocks } from "./msw-step-mocks";

export async function MswSteps() {
	return (
		<div className="flex flex-col gap-6">
			<MswStepMocks />
			<MswStepHandlers />
			<MswStepInit />
			<MswStepEnv />
		</div>
	);
}
