import { describe, expect, it } from "vitest";

import { RulesProvider } from "@/entities/rules/lib/rules-provider";

import { LinterAgent } from "../linter-agent";

import {
	checkOpenApiTypesBoundary,
	isAllowedRawApiImportPath
} from "./openapi-types-boundary";

describe("openapi types boundary", () => {
	it("allows backend.types.ts only under entities/*/types and generated", () => {
		expect(
			isAllowedRawApiImportPath(
				"src/entities/order/types/order-backend.interface.ts"
			)
		).toBe(true);
		expect(
			isAllowedRawApiImportPath(
				"src/shared/api/generated/paths/x.paths.ts"
			)
		).toBe(true);
		expect(
			isAllowedRawApiImportPath(
				"src/entities/order/converters/order.converters.ts"
			)
		).toBe(false);
		expect(
			isAllowedRawApiImportPath("src/entities/order/api/order.service.ts")
		).toBe(false);
	});

	it("flags direct generated/backend.types import in converters", () => {
		const hits = checkOpenApiTypesBoundary(
			"src/entities/promocode/converters/promocode.converters.ts",
			`import { PromocodeDiscountType } from "@/shared/api/generated/backend.types";`
		);
		expect(hits.map((h) => h.ruleId)).toContain(
			"openapi-raw-types-forbidden-outside-types"
		);
	});

	it("flags relative and .ts-suffixed backend.types imports", () => {
		for (const specifier of [
			"../backend.types",
			"./backend.types",
			"@/shared/api/generated/backend.types.ts"
		]) {
			const hits = checkOpenApiTypesBoundary(
				"src/entities/order/api/order.service.ts",
				`import type { OrderResponse } from "${specifier}";`
			);
			expect(hits.map((h) => h.ruleId)).toContain(
				"openapi-raw-types-forbidden-outside-types"
			);
		}
	});

	it("no longer treats legacy generated/Api as the raw types module", () => {
		const hits = checkOpenApiTypesBoundary(
			"src/entities/order/api/order.service.ts",
			`import type { OrderResponse } from "@/shared/api/generated/Api";`
		);
		expect(hits.map((h) => h.ruleId)).not.toContain(
			"openapi-raw-types-forbidden-outside-types"
		);
	});

	it("flags schema symbols from @/shared/api in api layer", () => {
		const hits = checkOpenApiTypesBoundary(
			"src/entities/order/api/order.service.ts",
			`import type { OrderStatus, PromocodeResponse } from "@/shared/api";`
		);
		expect(hits.map((h) => h.ruleId)).toContain(
			"openapi-prefer-t-backend-alias"
		);
	});

	it("allows infrastructure imports from @/shared/api in api", () => {
		const hits = checkOpenApiTypesBoundary(
			"src/entities/order/api/order.service.ts",
			`import { baseApi, ENUM_API_TAGS } from "@/shared/api";`
		);
		expect(hits).toHaveLength(0);
	});

	it("allows adapter file to import backend.types.ts", () => {
		const hits = checkOpenApiTypesBoundary(
			"src/entities/promocode/types/promocode-backend.interface.ts",
			`import type { PromocodeResponse } from "@/shared/api/generated/backend.types";
export type TPromocodeBackend = PromocodeResponse;`
		);
		expect(hits).toHaveLength(0);
	});
});

describe("LinterAgent + RulesProvider openapi", () => {
	it("LinterAgent reports HIGH for backend.types import in converter", async () => {
		const agent = new LinterAgent();
		const violations = await agent.checkNaming(
			"src/entities/channel/converters/channel.converters.ts",
			`import type { ChannelResponse } from "@/shared/api/generated/backend.types";`
		);
		expect(
			violations.some(
				(v) => v.ruleId === "openapi-raw-types-forbidden-outside-types"
			)
		).toBe(true);
	});

	it("exposes openapi pattern and eslint isolation", () => {
		const openapi = RulesProvider.getPatternRules("openapi") as any;
		const linter = RulesProvider.getRulesByDomain("linter") as any;
		const structure = RulesProvider.getRulesByDomain("structure") as any;

		expect(openapi.adapter.namingPattern).toBe("^T.+Backend$");
		expect(openapi.importBoundary.rawApiTypesForbiddenIn).toContain(
			"src/entities/*/converters/**"
		);
		expect(linter.eslint.openapiTypesIsolation.enabled).toBe(true);
		expect(
			linter.eslint.openapiTypesIsolation.noRestrictedImports.patterns
		).toEqual(
			expect.arrayContaining(["@/shared/api/generated/backend.types"])
		);
		expect(structure.openapi.adapterTypePattern).toBe("^T.+Backend$");
	});
});
