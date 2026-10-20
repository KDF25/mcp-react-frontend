import { describe, expect, it } from "vitest";

import { RULE_DOCS } from "@/entities/rules/config/rule-docs.generated";
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

describe("LinterAgent ad-hoc colors", () => {
	const UI_FILE = "src/widgets/orders/ui/order-card.tsx";

	it("flags palette colors and static white/black utilities", async () => {
		expect(
			await ruleIds(UI_FILE, '<div className="bg-blue-500" />')
		).toContain("no-adhoc-colors");
		expect(
			await ruleIds(UI_FILE, '<div className="p-4 text-white" />')
		).toContain("no-adhoc-colors");
		expect(
			await ruleIds(UI_FILE, '<div className="hover:bg-black/50" />')
		).toContain("no-adhoc-colors");
	});

	it("allows design tokens", async () => {
		expect(
			await ruleIds(
				UI_FILE,
				'<div className="bg-primary text-primary-foreground" />'
			)
		).not.toContain("no-adhoc-colors");
		expect(
			await ruleIds(UI_FILE, 'const label = "white-list";')
		).not.toContain("no-adhoc-colors");
	});

	it("catches important and wrapped static colors", async () => {
		for (const className of [
			"!text-white",
			"hover:!bg-black",
			"text-white!",
			"md:text-white"
		]) {
			expect(
				await ruleIds(UI_FILE, `<div className="${className}" />`)
			).toContain("no-adhoc-colors");
		}
		expect(
			await ruleIds(UI_FILE, "const c = cn(isDark && `p-2 text-white`);")
		).toContain("no-adhoc-colors");
	});

	it("checks stylesheets as raw text (@apply)", async () => {
		for (const fileName of [
			"src/shared/styles/globals.css",
			"src/shared/styles/legacy.scss"
		]) {
			expect(
				await ruleIds(
					fileName,
					"@layer base {\n  body {\n    @apply bg-blue-500;\n  }\n}"
				)
			).toContain("no-adhoc-colors");
			expect(
				await ruleIds(fileName, ".btn {\n  @apply text-white p-4;\n}")
			).toContain("no-adhoc-colors");
			expect(
				await ruleIds(
					fileName,
					"body {\n  @apply bg-background text-foreground;\n}"
				)
			).not.toContain("no-adhoc-colors");
		}
	});

	it("ignores colors mentioned only in comments", async () => {
		const ids = await ruleIds(
			UI_FILE,
			[
				"// do not use text-white or bg-blue-500 here",
				"/* legacy: bg-black */",
				'export const Card = () => <div className="bg-card text-card-foreground" />;'
			].join("\n")
		);

		expect(ids).not.toContain("no-adhoc-colors");
	});
});

describe("pattern examples follow the project's own linter rules", () => {
	it("ErrorBoundary example has I* names, no console and no undefined fallback", async () => {
		const doc = RULE_DOCS["error-boundary-pattern"].content;
		const step = doc.slice(doc.indexOf("### Шаг 1"));
		const from = step.indexOf("```tsx\n") + "```tsx\n".length;
		const code = step.slice(from, step.indexOf("\n```", from));
		const ids = await ruleIds(
			"src/shared/ui/error-boundary/error-boundary.tsx",
			code
		);

		expect(ids).not.toContain("interface-naming");
		expect(ids).not.toContain("no-console");
		expect(code).toContain("const DefaultErrorUI");
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
