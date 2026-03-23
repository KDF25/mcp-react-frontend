import { MswStepInitApp } from "./msw-step-init-app";
import { MswStepInitBrowser } from "./msw-step-init-browser";
import { MswStepInitHandlers } from "./msw-step-init-handlers";
import { MswStepInitMain } from "./msw-step-init-main";

export async function MswStepInit() {
	return (
		<>
			<MswStepInitBrowser />
			<MswStepInitHandlers />
			<MswStepInitApp />
			<MswStepInitMain />
		</>
	);
}
