export const MSW_CODE_MOCKS = `import type { TEntityBackend } from "../types";

/** Seed in backend DTO shape — never frontend models */
export const ENTITY_MOCK: TEntityBackend[] = [
	{
		id: "1",
		full_name: "John Doe",
		created_at: "2024-03-22T10:00:00Z",
		status_code: "active"
	},
	{
		id: "2",
		full_name: "Jane Smith",
		created_at: "2024-03-21T10:00:00Z",
		status_code: "pending"
	}
];`;

export const MSW_CODE_STORE = `import type { TEntityBackend, TEntitiesBackend } from "../types";
import { ENTITY_MOCK } from "./entity.mock";

const createStore = () =>
	new Map(ENTITY_MOCK.map((item) => [item.id, structuredClone(item)]));

let store = createStore();

/** Call from Vitest beforeEach for isolation — optional for read-only mocks */
export const resetEntityStore = () => {
	store = createStore();
};

export const listEntitiesBackend = (): TEntitiesBackend => ({
	items: [...store.values()],
	total_count: store.size
});`;

export const MSW_CODE_UTILS = `import { HttpResponse, delay, http } from "msw";
import { ENV } from "@/shared/config";

const BASE_URL = (ENV.VITE_BASE_URL || "").replace(/\\/$/, "");
const MOCK_RESPONSE_DELAY_MS = import.meta.env.MODE === "test" ? 0 : 500;

export const createMockHandler = (endpoint, resolver) =>
	http[endpoint.method.toLowerCase()](
		\`\${BASE_URL}\${endpoint.url}\`,
		async ({ request, params }) => {
			await delay(MOCK_RESPONSE_DELAY_MS);
			let body;
			try {
				body = await request.clone().json();
			} catch {
				/* no body */
			}
			return resolver({
				body,
				query: new URL(request.url).searchParams,
				params,
				request
			});
		}
	);

export const mockValidationError = (loc, msg) =>
	HttpResponse.json(
		{ detail: [{ loc, msg, type: "value_error" }] },
		{ status: 422 }
	);`;

export const MSW_CODE_HANDLERS = `import { HttpResponse } from "msw";
import {
	createMockHandler,
	mockValidationError
} from "@/shared/api/msw/utils";
import { listEntitiesBackend } from "../mock";

/**
 * Return backend DTO. RTK transformResponse + converters map to
 * IPaginationResponse / domain models — do not return { data, total } here.
 */
export const entityHandlers = [
	createMockHandler(
		{ url: "/entities", method: "GET", _types: { body: undefined } },
		({ query }) => {
			const page = Number(query.get("page") ?? 1);
			if (!Number.isInteger(page) || page < 1) {
				return mockValidationError(["query", "page"], "Invalid page");
			}
			return HttpResponse.json(listEntitiesBackend());
		}
	)
];`;

export const MSW_CODE_CONFIG = `import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);`;

export const MSW_CODE_SERVER = `import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/** Vitest / Node tests */
export const server = setupServer(...handlers);`;

export const MSW_CODE_HANDLERS_REGISTRY = `import { entityOneHandlers } from "@/entities/entity-one/handlers";
import { entityTwoHandlers } from "@/entities/entity-two/handlers";

export const handlers = [
	...entityOneHandlers,
	...entityTwoHandlers
];`;

export const MSW_CODE_INIT = `import { ENV } from "@/shared/config";

export const initMsw = async () => {
	if (import.meta.env.DEV && ENV.VITE_ENABLE_MSW === "true") {
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
