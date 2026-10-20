/** Shared templates that scaffold assumes exist in the consumer project. */

export const PAGINATION_TYPES_CODE = `export interface IPaginationRequest<T extends string = string> {
	page: number;
	limit: number;
	search?: string;
	status?: T;
}

export interface IPaginationResponse<T> {
	data: T[];
	total: number;
}
`;

export const MSW_UTILS_CODE = `import { HttpResponse, type PathParams, delay, http } from "msw";

import { ENV } from "@/shared/config";

const BASE_URL = (ENV.VITE_BASE_URL || "").replace(/\\/$/, "");
/** Instant responses in Vitest; slight delay for manual browser checks */
const MOCK_RESPONSE_DELAY_MS = import.meta.env.MODE === "test" ? 0 : 500;

const HTTP_HANDLERS = {
	GET: http.get,
	POST: http.post,
	PUT: http.put,
	PATCH: http.patch,
	DELETE: http.delete
} as const;

export interface IMockEndpoint<TBody> {
	url: string;
	method: keyof typeof HTTP_HANDLERS;
	_types: { body: TBody };
}

interface IMockResolverArgs<TBody> {
	body: TBody | undefined;
	query: URLSearchParams;
	params: PathParams;
	cookies: Record<string, string>;
	request: Request;
}

/** OpenAPI path params ({id}) → MSW path params (:id) */
const toMswPath = (url: string) => url.replace(/\\{(\\w+)\\}/g, ":$1");

/**
 * Shared MSW handler factory: BASE_URL + delay + JSON body parse.
 * Pass generated PATHS entries ({ url, method, _types }) directly.
 */
export const createMockHandler = <TBody>(
	endpoint: IMockEndpoint<TBody>,
	resolver: (args: IMockResolverArgs<TBody>) => Promise<Response> | Response
) =>
	HTTP_HANDLERS[endpoint.method](
		\`\${BASE_URL}\${toMswPath(endpoint.url)}\`,
		async ({ request, params, cookies }) => {
			await delay(MOCK_RESPONSE_DELAY_MS);

			let body: TBody | undefined;
			try {
				body = (await request.clone().json()) as TBody;
			} catch {
				// GET/DELETE without JSON body
			}

			return resolver({
				body,
				query: new URL(request.url).searchParams,
				params,
				cookies,
				request
			});
		}
	);

export const mockValidationError = (loc: (string | number)[], msg: string) =>
	HttpResponse.json(
		{ detail: [{ loc, msg, type: "value_error" }] },
		{ status: 422 }
	);

export const mockNotFound = (detail: string) =>
	HttpResponse.json({ detail }, { status: 404 });

export const mockSuccess = () =>
	HttpResponse.json({ success: true });
`;

export const MSW_SERVER_CODE = `import { setupServer } from "msw/node";

import { handlers } from "./handlers";

/** Node server for Vitest / Playwright component tests */
export const server = setupServer(...handlers);
`;
