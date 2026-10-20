import { describe, expect, it } from "vitest";

import { RulesProvider } from "@/entities/rules/lib/rules-provider";

import { LinterAgent } from "./linter-agent";

const BACKEND_FILE = "src/entities/order/types/order-backend.interface.ts";
const DOMAIN_FILE = "src/entities/order/types/order.interface.ts";

const ruleIds = async (fileName: string, content: string) =>
	(await new LinterAgent().checkNaming(fileName, content)).map(
		(v) => v.ruleId
	);

describe("LinterAgent backend type naming", () => {
	it("accepts T*Backend type aliases in the adapter file", async () => {
		const ids = await ruleIds(
			BACKEND_FILE,
			"export type TOrderBackend = OrderResponse;\nexport type TOrdersBackend = ReadOrdersResponse;"
		);

		expect(ids).not.toContain("backend-type-naming");
		expect(ids).not.toContain("backend-interface-forbidden");
	});

	it("flags adapter types without the T*Backend shape", async () => {
		const ids = await ruleIds(
			BACKEND_FILE,
			"export type TOrderQuery = ReadOrdersQuery;"
		);

		expect(ids).toContain("backend-type-naming");
	});

	it("forbids interfaces in the adapter file", async () => {
		const ids = await ruleIds(
			BACKEND_FILE,
			"export interface IOrderBackend { id: string }"
		);

		expect(ids).toContain("backend-interface-forbidden");
	});

	it("flags *Backend types declared outside the adapter", async () => {
		expect(
			await ruleIds(
				DOMAIN_FILE,
				"export type TOrderBackend = { id: string };"
			)
		).toContain("backend-type-outside-adapter");
		expect(
			await ruleIds(
				DOMAIN_FILE,
				"export interface IOrderBackend { id: string }"
			)
		).toContain("backend-type-outside-adapter");
	});

	it("does not treat *.interface.ts domain files as backend adapters", async () => {
		const ids = await ruleIds(
			DOMAIN_FILE,
			"export interface IOrder { id: string }\nexport type TOrderStatus = string;"
		);

		expect(ids).not.toContain("backend-interface-forbidden");
		expect(ids).not.toContain("backend-type-naming");
	});

	it("reports one violation per declaration in the adapter file", async () => {
		expect(
			await ruleIds(
				BACKEND_FILE,
				"export interface OrderDto { id: string }"
			)
		).toEqual(["backend-interface-forbidden"]);
		expect(
			await ruleIds(
				BACKEND_FILE,
				"export type OrderQuery = ReadOrdersQuery;"
			)
		).toEqual(["backend-type-naming"]);
	});

	it("ignores type/interface text inside comments and strings", async () => {
		const ids = await ruleIds(
			BACKEND_FILE,
			[
				"/** Legacy: type Foo = Bar; interface Baz {} */",
				"// type OrderQuery = ReadOrdersQuery;",
				"export type TOrderBackend = OrderResponse;",
				'export const HINT = "type Legacy = 1";'
			].join("\n")
		);

		expect(ids).not.toContain("backend-type-naming");
		expect(ids).not.toContain("backend-interface-forbidden");
		expect(ids).not.toContain("type-naming");
	});
});

describe("backend type pattern source", () => {
	it("keeps every copy of the T*Backend pattern in sync", () => {
		const rules = RulesProvider.getRules();
		const expected = rules.naming.backend.typePattern;

		expect(expected).toBe("^T.+Backend$");
		expect(rules.structure.openapi?.adapterTypePattern).toBe(expected);
		expect(
			rules.linter.eslint?.openapiTypesIsolation?.adapterNamingPattern
		).toBe(expected);
		expect(
			(rules.patterns.openapi as { adapter?: { namingPattern?: string } })
				.adapter?.namingPattern
		).toBe(expected);
	});
});
