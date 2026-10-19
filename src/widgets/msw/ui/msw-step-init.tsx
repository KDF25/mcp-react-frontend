import { MswStepInitApp } from "./msw-step-init-app";
import { MswStepInitBrowser } from "./msw-step-init-browser";
import { MswStepInitHandlers } from "./msw-step-init-handlers";
import { MswStepInitMain } from "./msw-step-init-main";
import { MswStepInitServer } from "./msw-step-init-server";

export async function MswStepInit() {
	return (
		<div className="flex flex-col gap-6">
			<MswStepInitBrowser />
			<MswStepInitServer />
			<MswStepInitHandlers />
			<MswStepInitApp />
			<MswStepInitMain />
		</div>
	);
}
