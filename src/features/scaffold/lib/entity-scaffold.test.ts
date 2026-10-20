import { describe, expect, it } from "vitest";

import { RulesProvider } from "@/entities/rules/lib/rules-provider";

import {
	converterMethodNames,
	toConstantCase,
	toPascalCase
} from "./entity-naming";
import { scaffoldEntity } from "./entity-scaffold";
import { MSW_UTILS_CODE, PAGINATION_TYPES_CODE } from "./shared-templates";

/** Abstract placeholder used across MCP docs/scaffold examples */
const ENTITY = "entity";

describe("entity naming + converter methods", () => {
	it("builds abstract Entity converter names", () => {
		const methods = converterMethodNames(ENTITY);
		expect(methods.itemToFrontend).toBe("mapEntityToFrontend");
		expect(methods.listToFrontend).toBe("mapEntitiesToFrontend");
		expect(methods.queryToBackend).toBe("mapEntitiesQueryToBackend");
		expect(methods.createToBackend).toBe("mapCreateEntityToBackend");
		expect(methods.itemToFrontend).not.toBe("mapToFrontend");
	});

	it("supports kebab-case entity folder names", () => {
		expect(toPascalCase("user-group")).toBe("UserGroup");
		expect(converterMethodNames("user-group").itemToFrontend).toBe(
			"mapUserGroupToFrontend"
		);
	});

	it("converts multi-word names to CONSTANT_CASE", () => {
		expect(toConstantCase("UserGroup")).toBe("USER_GROUP");
		expect(toConstantCase("UserGroups")).toBe("USER_GROUPS");
		expect(toConstantCase("Entity")).toBe("ENTITY");
	});
});

describe("scaffold output for a multi-word entity", () => {
	const { files, summary } = scaffoldEntity("user-group", "");
	const all = files.map((f) => f.content).join("\n");
	const byEnd = (end: string) =>
		files.find((f) => f.path.endsWith(end))?.content ?? "";

	it("uses CONSTANT_CASE with word separators", () => {
		expect(all).toContain("ENUM_FORM_USER_GROUP_CREATE");
		expect(all).toContain("USER_GROUP_CREATE_SCHEMA");
		expect(all).toContain("USER_GROUP_MOCK");
		expect(all).not.toMatch(/\bUSERGROUPS?_/);
	});

	it("imports kebab-case PATHS and types the list query from _types.query", () => {
		const backend = byEnd("user-group-backend.interface.ts");

		expect(backend).toContain(
			'from "@/shared/api/generated/paths/user-group.paths"'
		);
		expect(backend).toContain("USER_GROUP_PATHS");
		expect(backend).toMatch(/\["_types"\]\["query"\]/);
		expect(backend).not.toContain("._types.body");
	});

	it("does not reference schema symbols that the spec may not have", () => {
		expect(all).not.toContain("DiscountType");
	});

	it("uses registered ENUM_API_TAGS instead of string tags", () => {
		const service = byEnd("user-group.service.ts");

		expect(service).toContain("ENUM_API_TAGS.USER_GROUPS");
		expect(service).not.toMatch(/Tags: \["/);
	});

	it("takes url/method from generated PATHS in api and handlers", () => {
		const service = byEnd("user-group.service.ts");
		const handlers = byEnd("user-group.handlers.ts");
		const pathsImport =
			'import { USER_GROUP_PATHS } from "@/shared/api/generated/paths/user-group.paths";';

		for (const file of [service, handlers]) {
			expect(file).toContain(pathsImport);
			expect(file).not.toMatch(/url: ["`]\//);
		}
		expect(service).toContain("url: PATHS.listUserGroups.url");
		expect(service).toContain("method: PATHS.listUserGroups.method");
		expect(service).toContain(
			'PATHS.updateUserGroup.url.replace("{id}", id)'
		);
		expect(handlers).toContain("createMockHandler(PATHS.createUserGroup");
		expect(handlers).toContain("createMockHandler(PATHS.getUserGroup");
	});

	it("does not claim a successful architecture check", () => {
		expect(summary).not.toContain("SUCCESS");
		expect(summary).toContain("ENUM_API_TAGS");
	});
});

describe("scaffoldEntity — Zod schema vs types", () => {
	it("keeps z.infer out of schema files and inside form types", () => {
		const { files } = scaffoldEntity(ENTITY, "");

		const createSchema = files.find((f) =>
			f.path.endsWith("entity-create.schema.ts")
		);
		const updateSchema = files.find((f) =>
			f.path.endsWith("entity-update.schema.ts")
		);
		const createFormTypes = files.find((f) =>
			f.path.endsWith("entity-create-form.types.ts")
		);
		const updateFormTypes = files.find((f) =>
			f.path.endsWith("entity-update-form.types.ts")
		);

		expect(createSchema?.content).toContain("ENTITY_CREATE_SCHEMA");
		expect(createSchema?.content).not.toMatch(
			/export type T\w+\s*=\s*z\.infer/
		);
		expect(createSchema?.content).not.toMatch(/export type T/);

		expect(updateSchema?.content).toContain("ENTITY_UPDATE_SCHEMA");
		expect(updateSchema?.content).not.toMatch(
			/export type T\w+\s*=\s*z\.infer/
		);

		expect(createFormTypes?.content).toMatch(
			/z\.infer<\s*typeof ENTITY_CREATE_SCHEMA/
		);
		expect(createFormTypes?.content).toContain("ENUM_FORM_ENTITY_CREATE");
		expect(createFormTypes?.content).toContain(
			"ENUM_FORM_ENTITY_CREATE_TYPE"
		);
		expect(updateFormTypes?.content).toMatch(
			/z\.infer<\s*typeof ENTITY_UPDATE_SCHEMA/
		);
		expect(updateFormTypes?.content).toContain(
			"ENUM_FORM_ENTITY_UPDATE_TYPE"
		);
	});

	it("pairs one schema with one form.types file per operation", () => {
		const paths = scaffoldEntity(ENTITY, "").files.map((f) => f.path);

		for (const op of ["create", "update"]) {
			expect(
				paths.some((p) => p.endsWith(`entity-${op}.schema.ts`))
			).toBe(true);
			expect(
				paths.some((p) => p.endsWith(`entity-${op}-form.types.ts`))
			).toBe(true);
		}
		expect(paths.some((p) => p.endsWith("entity-form.types.ts"))).toBe(
			false
		);
	});

	it("avoids a schema ↔ types runtime cycle", () => {
		const { files } = scaffoldEntity(ENTITY, "");
		const byEnd = (end: string) =>
			files.find((f) => f.path.endsWith(end))?.content ?? "";

		for (const op of ["create", "update"]) {
			const schema = byEnd(`entity-${op}.schema.ts`);
			const formTypes = byEnd(`entity-${op}-form.types.ts`);

			expect(schema).toContain(
				`from "../types/entity-${op}-form.types";`
			);
			expect(schema).not.toMatch(/from ["']\.\.\/types["']/);
			expect(formTypes).toMatch(
				/import type \{[^}]+\} from "\.\.\/schema"/
			);
			expect(formTypes).not.toMatch(
				/import \{[^}]+\} from "\.\.\/schema"/
			);
		}
	});
});

describe("scaffoldEntity — pagination converters", () => {
	it("maps list UI to IPaginationResponse and backend query in converters", () => {
		const { files } = scaffoldEntity(ENTITY, "");
		const converters = files.find((f) =>
			f.path.endsWith("entity.converters.ts")
		)?.content;
		const frontendTypes = files.find((f) =>
			f.path.endsWith("entity.interface.ts")
		)?.content;
		const service = files.find((f) =>
			f.path.endsWith("entity.service.ts")
		)?.content;

		expect(PAGINATION_TYPES_CODE).toContain("IPaginationRequest");
		expect(PAGINATION_TYPES_CODE).toContain("IPaginationResponse");

		expect(frontendTypes).toContain("IPaginationResponse<IEntity>");
		expect(frontendTypes).toContain("IPaginationRequest");

		expect(converters).toContain("mapEntitiesToFrontend");
		expect(converters).toContain("mapEntitiesQueryToBackend");
		expect(converters).toContain("elements_on_page: query.limit");
		expect(converters).toContain("data: response.items.map");
		expect(converters).toContain("total: response.total_count");

		expect(service).toContain("transformResponse");
		expect(service).toContain("mapEntitiesToFrontend");
		expect(service).not.toContain("mapToFrontend(");
	});
});

describe("scaffoldEntity — MSW backend contract", () => {
	it("returns backend DTO envelopes from handlers, not { data, total }", () => {
		const { files } = scaffoldEntity(ENTITY, "");
		const handlers = files.find((f) =>
			f.path.endsWith("entity.handlers.ts")
		)?.content;
		const mock = files.find((f) =>
			f.path.endsWith("entity.mock.ts")
		)?.content;
		const store = files.find((f) =>
			f.path.endsWith("entity.store.ts")
		)?.content;

		expect(MSW_UTILS_CODE).toContain("createMockHandler");
		expect(MSW_UTILS_CODE).toContain("VITE_BASE_URL");
		expect(MSW_UTILS_CODE).toContain("toMswPath(endpoint.url)");

		expect(mock).toContain("TEntityBackend");
		expect(mock).toContain("full_name");
		expect(mock).not.toContain("fullName");
		expect(mock).not.toMatch(
			/from ["'][^"']*generated\/backend\.types["']/
		);

		expect(handlers).toContain("createMockHandler");
		expect(handlers).toContain("listEntitiesBackend");
		expect(handlers).toContain("TEntitiesQueryBackend");
		expect(handlers).toContain("createMockHandler(PATHS.listEntities");
		expect(handlers).not.toMatch(/url: ["`]\//);
		expect(handlers).not.toMatch(/data:\s*\[/);
		expect(handlers).not.toContain("total:");
		expect(handlers).toContain("mockValidationError");
		expect(handlers).not.toMatch(
			/from ["'][^"']*generated\/backend\.types["']/
		);

		expect(store).toContain("resetEntityStore");
		expect(store).toContain("total_count");
		expect(store).toContain("items:");
	});

	it("aliases OpenAPI schemas as T*Backend only in types/", () => {
		const { files } = scaffoldEntity(ENTITY, "");
		const backend = files.find((f) =>
			f.path.endsWith("entity-backend.interface.ts")
		)?.content;
		const converters = files.find((f) =>
			f.path.endsWith("entity.converters.ts")
		)?.content;
		const service = files.find((f) =>
			f.path.endsWith("entity.service.ts")
		)?.content;

		expect(backend).toBeDefined();
		expect(backend).toContain("@/shared/api/generated/backend.types");
		expect(backend).toContain("export type TEntityBackend");
		expect(converters).toContain("TEntityBackend");
		expect(converters).not.toMatch(
			/from ["'][^"']*generated\/backend\.types["']/
		);
		expect(service).not.toMatch(
			/from ["'][^"']*generated\/backend\.types["']/
		);
		expect(service).toContain("TEntitiesBackend");
	});

	it("injects endpoints into the single shared baseApi", () => {
		const { files } = scaffoldEntity(ENTITY, "");
		const service = files.find((f) =>
			f.path.endsWith("entity.service.ts")
		)?.content;

		expect(service).toContain(
			'import { baseApi, ENUM_API_TAGS } from "@/shared/api/backend";'
		);
		expect(service).toContain("baseApi.injectEndpoints");
		expect(service).not.toMatch(/\b(mainApi|authApi)\b/);
		expect(service).not.toContain("createApi");
	});
});

describe("RulesProvider consistency", () => {
	it("exposes pagination pattern and updated converter naming", () => {
		const structure = RulesProvider.getRulesByDomain("structure") as any;
		const pagination = RulesProvider.getPatternRules("pagination") as any;
		const zod = RulesProvider.getPatternRules("zod") as any;
		const msw = RulesProvider.getPatternRules("msw") as any;
		const converters = RulesProvider.getPatternRules("converters") as any;

		expect(structure.converters.methodNamingPattern).toBe(
			"^map.+To(Frontend|Backend)$"
		);
		expect(structure.converters.requiredMethods).toBeUndefined();
		expect(structure.converters.forbiddenConsumers).toContain("widgets/**");
		expect(structure.pagination.request).toBe("IPaginationRequest");
		expect(structure.zod.forbidInferInSchemaFiles).toBe(true);

		expect(pagination.requiredExports).toContain("IPaginationResponse");
		expect(zod.rules.forbidZInferInSchemaFiles).toBe(true);
		expect(zod.rules.allowMultipleSchemasPerEntity).toBe(true);
		expect(msw.rules.responseShape).toBe("backend-dto");
		expect(msw.locationRequiredFiles.server).toContain("server.ts");
		expect(msw.locationRequiredFiles.utils).toContain("utils.ts");
		expect(converters.methodNamingPattern).toMatch(/map\.\+To/);
		expect(converters.uiBoundary.forbidConverterImportsInUi).toBe(true);
		expect(converters.eslint.forbiddenImportStyle).toContain("converters");

		const linter = RulesProvider.getRulesByDomain("linter") as any;
		expect(linter.eslint.convertersIsolation.enabled).toBe(true);
		expect(
			linter.eslint.convertersIsolation.noRestrictedImports.patterns
		).toEqual(expect.arrayContaining(["@/entities/*/converters"]));
	});
});
