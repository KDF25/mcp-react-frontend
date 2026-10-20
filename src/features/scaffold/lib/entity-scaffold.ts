import {
	converterMethodNames,
	toCamelCase,
	toConstantCase,
	toPascalCase,
	toPluralPascal
} from "./entity-naming";

export interface IScaffoldFile {
	path: string;
	content: string;
}

export interface IScaffoldEntityResult {
	entityPath: string;
	files: IScaffoldFile[];
	summary: string;
}

/**
 * Generates FSD entity file contents aligned with Blogix-style conventions:
 * - Zod schemas without z.infer; inferred types live in types/
 * - Converters use operation-specific map*ToFrontend / map*ToBackend names
 * - List UI uses IPaginationRequest / IPaginationResponse; backend wire mapped in converters
 * - MSW returns backend DTO shapes (converters still run in RTK transformResponse)
 */
export const scaffoldEntity = (
	name: string,
	relativePath: string
): IScaffoldEntityResult => {
	const entityName = name.trim().toLowerCase();
	const pascal = toPascalCase(entityName);
	const pluralPascal = toPluralPascal(pascal);
	const camel = toCamelCase(entityName);
	const methods = converterMethodNames(entityName);
	const base =
		`src/entities/${relativePath.replace(/^\/|\/$/g, "")}/${entityName}`
			.replace(/\/+/g, "/")
			.replace("entities/entities", "entities");

	const files: IScaffoldFile[] = [
		{
			path: `${base}/types/${entityName}-backend.interface.ts`,
			content: backendTypes(pascal, pluralPascal, entityName)
		},
		{
			path: `${base}/types/${entityName}.interface.ts`,
			content: frontendTypes(pascal, pluralPascal)
		},
		{
			path: `${base}/types/${entityName}-create-form.types.ts`,
			content: formTypes(pascal, "create")
		},
		{
			path: `${base}/types/${entityName}-update-form.types.ts`,
			content: formTypes(pascal, "update")
		},
		{
			path: `${base}/types/index.ts`,
			content: `export * from "./${entityName}-backend.interface";
export * from "./${entityName}.interface";
export * from "./${entityName}-create-form.types";
export * from "./${entityName}-update-form.types";
`
		},
		{
			path: `${base}/schema/${entityName}-create.schema.ts`,
			content: createSchema(pascal, entityName)
		},
		{
			path: `${base}/schema/${entityName}-update.schema.ts`,
			content: updateSchema(pascal, entityName)
		},
		{
			path: `${base}/schema/index.ts`,
			content: `export * from "./${entityName}-create.schema";
export * from "./${entityName}-update.schema";
`
		},
		{
			path: `${base}/converters/${entityName}.converters.ts`,
			content: converters(pascal, pluralPascal, methods)
		},
		{
			path: `${base}/converters/index.ts`,
			content: `export * from "./${entityName}.converters";
`
		},
		{
			path: `${base}/api/${entityName}.service.ts`,
			content: service(pascal, pluralPascal, camel, entityName, methods)
		},
		{
			path: `${base}/api/index.ts`,
			content: `export * from "./${entityName}.service";
`
		},
		{
			path: `${base}/mock/${entityName}.mock.ts`,
			content: mockSeed(pascal)
		},
		{
			path: `${base}/mock/${entityName}.store.ts`,
			content: mockStore(pascal, pluralPascal, camel, entityName)
		},
		{
			path: `${base}/mock/index.ts`,
			content: `export * from "./${entityName}.mock";
export * from "./${entityName}.store";
`
		},
		{
			path: `${base}/handlers/${entityName}.handlers.ts`,
			content: handlers(pascal, pluralPascal, camel, entityName)
		},
		{
			path: `${base}/handlers/index.ts`,
			content: `export * from "./${entityName}.handlers";
`
		},
		{
			path: `${base}/index.ts`,
			content: `export * from "./api";
export * from "./schema";
export * from "./types";
// converters are internal — imported only by api/*.service.ts, not from UI
`
		}
	];

	const summary = `
Scaffolding entity "${entityName}" in "${base}":
1. types/ — domain I*, backend T*Backend, ${entityName}-[op]-form.types.ts (ENUM_FORM_* + z.infer, not in schema/)
2. schema/ — ${entityName}-create.schema.ts + ${entityName}-update.schema.ts (runtime only, one pair per operation; ENUM_FORM_* imported by direct file path)
3. converters/ — ${methods.listToFrontend}, ${methods.queryToBackend}, ${methods.itemToFrontend}, …
4. api/ — RTK injectEndpoints with transformResponse via converters
5. mock/ — backend DTO seed + optional mutable store with reset for tests
6. handlers/ — createMockHandler returning backend DTO (not frontend models)

Shared prerequisite: src/shared/types/pagination.types.ts (IPaginationRequest / IPaginationResponse)
MSW utils: src/shared/api/msw/utils.ts (createMockHandler)

Manual steps:
- add ${toConstantCase(pluralPascal)} to ENUM_API_TAGS in src/shared/api/backend/tags.config.ts
- align schema names in types/${entityName}-backend.interface.ts with backend.types.ts and paths/${entityName}.paths.ts
- align PATHS keys used by api/ and handlers/ (list${pluralPascal}, create${pascal}, get${pascal}, update${pascal}) with ${toConstantCase(pascal)}_PATHS

Not validated yet: run analyze_project on the generated files to check them.
`.trim();

	return { entityPath: base, files, summary };
};

const backendTypes = (
	pascal: string,
	pluralPascal: string,
	entityName: string
) => `/**
 * STRICT: Raw OpenAPI / backend.types.ts schema types are imported ONLY in this types segment.
 * Converters and api must use these T*Backend aliases — never import from generated/backend.types directly.
 * Rename the schema names below to the ones your OpenAPI spec actually generates.
 */
import type {
	${pascal}Response,
	${pascal}ListResponse,
	Create${pascal}Request
} from "@/shared/api/generated/backend.types";
import type { ${toConstantCase(pascal)}_PATHS } from "@/shared/api/generated/paths/${entityName}.paths";

export type T${pascal}Backend = ${pascal}Response;
export type T${pluralPascal}Backend = ${pascal}ListResponse;
export type TCreate${pascal}RequestBackend = Create${pascal}Request;
/** GET list → query string params (see api: params: map*QueryToBackend) */
export type T${pluralPascal}QueryBackend =
	(typeof ${toConstantCase(pascal)}_PATHS)["list${pluralPascal}"]["_types"]["query"];
`;

const frontendTypes = (
	pascal: string,
	pluralPascal: string
) => `import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

export interface I${pascal} {
	id: string;
	fullName: string;
	date: string;
	status: string;
}

export type T${pluralPascal}Page = IPaginationResponse<I${pascal}>;

export interface I${pluralPascal}Query extends IPaginationRequest {}
`;

type TFormOperation = "create" | "update";

/** One form.types file per operation, paired with `[entity]-[op].schema.ts` */
const formTypes = (pascal: string, operation: TFormOperation) => {
	const OP = operation.toUpperCase();
	const Op = `${operation.charAt(0).toUpperCase()}${operation.slice(1)}`;
	const enumName = `ENUM_FORM_${toConstantCase(pascal)}_${OP}`;
	const schemaName = `${toConstantCase(pascal)}_${OP}_SCHEMA`;

	return `import type { FieldValues } from "react-hook-form";
import { z } from "zod";

/** type-only: schema → form.types stays the only runtime direction */
import type { ${schemaName} } from "../schema";

export const ${enumName} = {
	FULL_NAME: "fullName",
	STATUS: "status"
} as const;

export type ${enumName}_TYPE =
	(typeof ${enumName})[keyof typeof ${enumName}];

/** Inferred form types live in types/, never next to the Zod schema export */
export type T${pascal}${Op}Schema = z.infer<typeof ${schemaName}> &
	FieldValues;
`;
};

const createSchema = (pascal: string, entityName: string) => {
	const enumName = `ENUM_FORM_${toConstantCase(pascal)}_CREATE`;
	const schemaName = `${toConstantCase(pascal)}_CREATE_SCHEMA`;

	return `import { z } from "zod";

import { type T${pascal}PageKeys, i18nKey } from "@/shared/config";

/** Direct file path, not the ../types barrel — avoids a schema ↔ types cycle */
import { ${enumName} } from "../types/${entityName}-create-form.types";

const msg = i18nKey<T${pascal}PageKeys>();
const F = ${enumName};

/** Runtime validation only — inferred form types belong in types/ */
export const ${schemaName} = z.object({
	[F.FULL_NAME]: z
		.string()
		.trim()
		.min(1, { message: msg("form.errors.fullName.required") }),
	[F.STATUS]: z.string().min(1, { message: msg("form.errors.status.required") })
});
`;
};

const updateSchema = (pascal: string, entityName: string) => {
	const enumName = `ENUM_FORM_${toConstantCase(pascal)}_UPDATE`;
	const schemaName = `${toConstantCase(pascal)}_UPDATE_SCHEMA`;

	return `import { z } from "zod";

import { type T${pascal}PageKeys, i18nKey } from "@/shared/config";

/** Direct file path, not the ../types barrel — avoids a schema ↔ types cycle */
import { ${enumName} } from "../types/${entityName}-update-form.types";

const msg = i18nKey<T${pascal}PageKeys>();
const F = ${enumName};

/** Separate schema per operation — entity may have create/update/delete schemas */
export const ${schemaName} = z.object({
	[F.FULL_NAME]: z
		.string()
		.trim()
		.min(1, { message: msg("form.errors.fullName.required") }),
	[F.STATUS]: z.string().min(1, { message: msg("form.errors.status.required") })
});
`;
};

const converters = (
	pascal: string,
	_pluralPascal: string,
	methods: ReturnType<typeof converterMethodNames>
) => `import type { IPaginationRequest } from "@/shared/types";

import type {
	I${pascal},
	T${pascal}Backend,
	T${_pluralPascal}Backend,
	T${_pluralPascal}QueryBackend,
	TCreate${pascal}RequestBackend,
	T${pascal}CreateSchema,
	T${_pluralPascal}Page,
	T${pascal}UpdateSchema
} from "../types";

/** Uses T*Backend from ../types — never import generated/backend.types here */
export const ${methods.itemToFrontend} = (data: T${pascal}Backend): I${pascal} => ({
	id: data.id,
	fullName: data.full_name,
	date: data.created_at,
	status: data.status_code
});

/** Backend list wire → unified frontend { data, total } */
export const ${methods.listToFrontend} = (
	response: T${_pluralPascal}Backend
): T${_pluralPascal}Page => ({
	data: response.items.map(${methods.itemToFrontend}),
	total: response.total_count
});

/**
 * Frontend IPaginationRequest → backend query.
 * Field names (elements_on_page, status_code, …) are API-specific — keep them here.
 */
export const ${methods.queryToBackend} = (
	query: IPaginationRequest
): T${_pluralPascal}QueryBackend => ({
	page: query.page,
	elements_on_page: query.limit,
	search: query.search,
	status_code: query.status
});

export const ${methods.createToBackend} = (
	values: T${pascal}CreateSchema
): TCreate${pascal}RequestBackend => ({
	full_name: values.fullName,
	status_code: values.status
});

export const ${methods.updateToBackend} = (
	values: T${pascal}UpdateSchema
): Partial<T${pascal}Backend> => ({
	full_name: values.fullName,
	status_code: values.status
});
`;

const service = (
	pascal: string,
	pluralPascal: string,
	camel: string,
	entityName: string,
	methods: ReturnType<typeof converterMethodNames>
) => `import { baseApi, ENUM_API_TAGS } from "@/shared/api/backend";
import { ${toConstantCase(pascal)}_PATHS } from "@/shared/api/generated/paths/${entityName}.paths";
import type { IPaginationRequest } from "@/shared/types";

import {
	${methods.createToBackend},
	${methods.listToFrontend},
	${methods.queryToBackend},
	${methods.updateToBackend}
} from "../converters";
import type {
	T${pluralPascal}Backend,
	T${pascal}CreateSchema,
	T${pluralPascal}Page,
	T${pascal}UpdateSchema
} from "../types";

const PATHS = ${toConstantCase(pascal)}_PATHS;

/** url/method from generated PATHS + T*Backend from ../types — never import schema names from generated/backend.types */
export const ${camel}Api = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		get${pluralPascal}: builder.query<T${pluralPascal}Page, IPaginationRequest>({
			query: (filters) => ({
				url: PATHS.list${pluralPascal}.url,
				method: PATHS.list${pluralPascal}.method,
				params: ${methods.queryToBackend}(filters)
			}),
			transformResponse: (response: T${pluralPascal}Backend) =>
				${methods.listToFrontend}(response),
			providesTags: [ENUM_API_TAGS.${toConstantCase(pluralPascal)}]
		}),
		create${pascal}: builder.mutation<void, T${pascal}CreateSchema>({
			query: (body) => ({
				url: PATHS.create${pascal}.url,
				method: PATHS.create${pascal}.method,
				body: ${methods.createToBackend}(body)
			}),
			invalidatesTags: [ENUM_API_TAGS.${toConstantCase(pluralPascal)}]
		}),
		update${pascal}: builder.mutation<
			void,
			{ id: string; values: T${pascal}UpdateSchema }
		>({
			query: ({ id, values }) => ({
				// OpenAPI path params look like {id}
				url: PATHS.update${pascal}.url.replace("{id}", id),
				method: PATHS.update${pascal}.method,
				body: ${methods.updateToBackend}(values)
			}),
			invalidatesTags: [ENUM_API_TAGS.${toConstantCase(pluralPascal)}]
		})
	})
});

export const {
	useGet${pluralPascal}Query,
	useCreate${pascal}Mutation,
	useUpdate${pascal}Mutation
} = ${camel}Api;
`;

const mockSeed = (
	pascal: string
) => `import type { T${pascal}Backend } from "../types";

/** Seed in T*Backend shape from ../types — never import OpenAPI backend.types module here */
export const ${toConstantCase(pascal)}_MOCK = [
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
] as T${pascal}Backend[];
`;

const mockStore = (
	pascal: string,
	pluralPascal: string,
	camel: string,
	entityName: string
) => `import type {
	T${pascal}Backend,
	T${pluralPascal}Backend,
	T${pluralPascal}QueryBackend,
	TCreate${pascal}RequestBackend
} from "../types";

import { ${toConstantCase(pascal)}_MOCK } from "./${entityName}.mock";

/**
 * Optional mutable store for mutation scenarios and Vitest isolation.
 * Static seed alone is enough for read-only handlers — use store when you need create/update/delete.
 */
const createStore = () =>
	new Map<string, T${pascal}Backend>(
		${toConstantCase(pascal)}_MOCK.map((item) => [item.id, structuredClone(item)])
	);

let ${camel}Store = createStore();

export const reset${pascal}Store = () => {
	${camel}Store = createStore();
};

export const list${pluralPascal}Backend = (
	query: T${pluralPascal}QueryBackend
): T${pluralPascal}Backend => {
	const all = [...${camel}Store.values()];
	const page = query.page ?? 1;
	const limit = query.elements_on_page ?? 20;
	const start = (page - 1) * limit;

	return {
		items: all.slice(start, start + limit),
		total_count: all.length
	} as T${pluralPascal}Backend;
};

export const create${pascal}Backend = (
	payload: TCreate${pascal}RequestBackend
): T${pascal}Backend => {
	const item = {
		id: String(${camel}Store.size + 1),
		created_at: new Date().toISOString(),
		...payload
	} as T${pascal}Backend;
	${camel}Store.set(item.id, item);
	return item;
};
`;

const handlers = (
	pascal: string,
	pluralPascal: string,
	camel: string,
	entityName: string
) => `import { HttpResponse } from "msw";

import { ${toConstantCase(pascal)}_PATHS } from "@/shared/api/generated/paths/${entityName}.paths";
import { createMockHandler, mockNotFound, mockValidationError } from "@/shared/api/msw/utils";

import { create${pascal}Backend, list${pluralPascal}Backend } from "../mock";
import type { T${pluralPascal}QueryBackend } from "../types";

const PATHS = ${toConstantCase(pascal)}_PATHS;

/**
 * Handlers return T*Backend. RTK Query transformResponse + converters
 * map to IPaginationResponse / domain models — do not short-circuit that layer here.
 * Endpoints (url, method, _types) come from generated PATHS; createMockHandler turns {id} into :id.
 * Do not import generated/backend.types — use ../types aliases.
 */
export const ${camel}Handlers = [
	createMockHandler(PATHS.list${pluralPascal}, ({ query }) => {
			const page = Number(query.get("page") ?? 1);
			const elementsOnPage = Number(query.get("elements_on_page") ?? 20);

			if (!Number.isInteger(page) || page < 1) {
				return mockValidationError(["query", "page"], "Invalid page");
			}

			const backendQuery = {
				page,
				elements_on_page: elementsOnPage,
				search: query.get("search") ?? undefined,
				status_code: query.get("status_code") ?? undefined
			} as T${pluralPascal}QueryBackend;

			return HttpResponse.json(list${pluralPascal}Backend(backendQuery));
	}),
	createMockHandler(PATHS.create${pascal}, ({ body }) => {
			if (!body?.full_name) {
				return mockValidationError(["body", "full_name"], "Field required");
			}

			return HttpResponse.json(create${pascal}Backend(body), { status: 201 });
	}),
	createMockHandler(PATHS.get${pascal}, ({ params }) => {
			const id = String(params.id ?? "");
			const { items } = list${pluralPascal}Backend({
				page: 1,
				elements_on_page: 1000
			} as T${pluralPascal}QueryBackend);
			const item = items.find((entry) => entry.id === id);
			if (!item) return mockNotFound("${pascal} not found");
			return HttpResponse.json(item);
	})
];
`;
