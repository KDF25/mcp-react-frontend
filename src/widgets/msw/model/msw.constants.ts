export const MSW_CODE_MOCKS = `import { type IEntity } from "../types";

export const ENTITY_MOCK: IEntity[] = [
	{
		id: "1",
		fullName: "John Doe",
		date: "2024-03-22",
		status: "active"
	},
	{
		id: "2",
		fullName: "Jane Smith",
		date: "2024-03-21",
		status: "pending"
	}
];`;

export const MSW_CODE_HANDLERS = `import { HttpResponse, http } from "msw";
import { ENV } from "@/shared/config";
import { ENTITY_MOCK } from "../mock";

export const entityHandlers = [
	http.get(\`\${ENV.VITE_API_URL}/entity/list\`, () => {
		return HttpResponse.json({
			data: ENTITY_MOCK
		});
	}),

	http.post(\`\${ENV.VITE_API_URL}/entity/update\`, async ({ request }) => {
		const body = await request.json();
		return HttpResponse.json({ success: true, data: body });
	})
];`;

export const MSW_CODE_CONFIG = `import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);`;

export const MSW_CODE_HANDLERS_REGISTRY = `import { entityOneHandlers } from "@/entities/entity-one/handlers";
import { entityTwoHandlers } from "@/entities/entity-two/handlers";

export const handlers = [
	...entityOneHandlers,
	...entityTwoHandlers
];`;

export const MSW_CODE_INIT = `import { ENV } from "@/shared/config";

export const initMsw = async () => {
	if (import.meta.env.DEV || ENV.VITE_ENABLE_MSW === "true") {
		const { worker } = await import("@/shared/api/msw/browser");
		return worker.start({
			onUnhandledRequest: "bypass"
		});
	}
	return Promise.resolve();
};`;

export const MSW_CODE_MAIN = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initMsw } from "./app/init/msw";
import App from "./app";

const container = document.getElementById("root");

if (container) {
	const root = createRoot(container);

	initMsw().then(() => {
		root.render(
			<StrictMode>
				<App />
			</StrictMode>
		);
	});
}`;
