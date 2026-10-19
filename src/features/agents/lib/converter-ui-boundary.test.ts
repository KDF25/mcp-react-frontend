import { describe, expect, it } from "vitest";

import { FsdAgent } from "../fsd-agent";
import { LinterAgent } from "../linter-agent";

import {
	checkConverterUiBoundary,
	isForbiddenConverterImportSpecifier
} from "./converter-ui-boundary";

describe("converter UI boundary", () => {
	it("flags converter imports and Backend DTOs in widgets/features", () => {
		const hits = checkConverterUiBoundary(
			"src/widgets/orders/ui/orders.tsx",
			`
import { mapOrdersToFrontend } from "@/entities/order/converters";
import type { IOrderBackend } from "@/entities/order";
`
		);

		expect(hits.map((h) => h.ruleId)).toEqual(
			expect.arrayContaining([
				"converters-forbidden-in-ui",
				"backend-dto-forbidden-in-ui"
			])
		);
	});

	it("allows converters inside entity api services", () => {
		const hits = checkConverterUiBoundary(
			"src/entities/order/api/order.service.ts",
			`
import { mapOrdersToFrontend } from "../converters";
import type { IOrderBackend } from "../types";
`
		);
		expect(hits).toHaveLength(0);
	});

	it("detects forbidden import specifiers for FsdAgent", () => {
		expect(
			isForbiddenConverterImportSpecifier(
				"src/features/order/reject-order/ui/reject-order.tsx",
				"@/entities/order/converters"
			)
		).toBe(true);

		expect(
			isForbiddenConverterImportSpecifier(
				"src/entities/order/api/order.service.ts",
				"../converters"
			)
		).toBe(false);
	});
});

describe("agents enforce converter UI boundary", () => {
	it("LinterAgent reports HIGH violation for UI converter import", async () => {
		const agent = new LinterAgent();
		const violations = await agent.checkNaming(
			"src/pages/orders/ui/orders-page.tsx",
			`import { mapOrdersToFrontend } from "@/entities/order/converters";`
		);

		expect(
			violations.some((v) => v.ruleId === "converters-forbidden-in-ui")
		).toBe(true);
	});

	it("FsdAgent reports forbidden converters import path", async () => {
		const agent = new FsdAgent();
		const violations = await agent.analyze([
			{
				path: "src/widgets/promocodes/ui/promocodes.tsx",
				imports: ["@/entities/promocode/converters"]
			}
		]);

		expect(
			violations.some((v) => v.ruleId === "converters-forbidden-in-ui")
		).toBe(true);
	});
});

describe("scaffold public API", () => {
	it("does not re-export converters from entity index", async () => {
		const { scaffoldEntity } =
			await import("@/features/scaffold/lib/entity-scaffold");
		const { files } = scaffoldEntity("deal", "crm");
		const index = files.find((f) => f.path.endsWith("deal/index.ts"));
		expect(index?.content).not.toContain('export * from "./converters"');
		expect(index?.content).toContain('export * from "./api"');
	});
});
