import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { IViolation } from "@/shared/types/mcp.types";

import { RULE_DOCS } from "@/entities/rules/config/rule-docs.generated";
import { IRuleDoc } from "@/entities/rules/lib/rule-docs";

import { createMcpServer } from "./mcp-server";

const textOf = (result: unknown): string =>
	(result as { content: Array<{ text: string }> }).content[0]?.text ?? "";

const jsonOf = (result: unknown) => JSON.parse(textOf(result));

describe("mcp server", () => {
	let client: Client;

	beforeEach(async () => {
		const server = createMcpServer();
		const [clientTransport, serverTransport] =
			InMemoryTransport.createLinkedPair();
		client = new Client({ name: "test", version: "1.0.0" });
		await Promise.all([
			server.connect(serverTransport),
			client.connect(clientTransport)
		]);
	});

	afterEach(async () => {
		await client.close();
	});

	describe("analyze_project", () => {
		it("detects FSD layer violations from explicit imports", async () => {
			const report = jsonOf(
				await client.callTool({
					name: "analyze_project",
					arguments: {
						files: [
							{
								path: "src/entities/order/ui/order-card.tsx",
								imports: ["@/widgets/header"]
							}
						]
					}
				})
			);

			expect(
				report.violations.map((v: IViolation) => v.ruleId)
			).toContain("fsd-layer-violation");
			expect(report.notes).toBeUndefined();
		});

		it("extracts imports from codeSnippets", async () => {
			const report = jsonOf(
				await client.callTool({
					name: "analyze_project",
					arguments: {
						files: [],
						codeSnippets: [
							{
								fileName: "src/widgets/orders/ui/orders.tsx",
								content:
									'import { mapOrdersToFrontend } from "@/entities/order/converters";\n'
							}
						]
					}
				})
			);

			const fsdHits = report.violations.filter(
				(v: IViolation) =>
					v.ruleId === "converters-forbidden-in-ui" &&
					v.location.includes("->")
			);
			expect(fsdHits).toHaveLength(1);
			expect(report.summary.analyzedFiles).toBe(1);
		});

		it("still accepts plain path strings and reports skipped FSD checks", async () => {
			const report = jsonOf(
				await client.callTool({
					name: "analyze_project",
					arguments: { files: ["src/entities/order/index.ts"] }
				})
			);

			expect(report.summary.analyzedFiles).toBe(1);
			expect(report.notes?.[0]).toMatch(/FSD import checks skipped/);
		});

		it("counts differently spelled paths of the same file once", async () => {
			const report = jsonOf(
				await client.callTool({
					name: "analyze_project",
					arguments: {
						files: ["./src/widgets/orders/ui/orders.tsx"],
						codeSnippets: [
							{
								fileName:
									"src\\widgets\\orders\\ui\\orders.tsx",
								content:
									'import { mapOrdersToFrontend } from "@/entities/order/converters";\n'
							}
						]
					}
				})
			);

			expect(report.summary.analyzedFiles).toBe(1);
			expect(
				report.violations.filter(
					(v: IViolation) =>
						v.ruleId === "converters-forbidden-in-ui" &&
						v.location.includes("->")
				)
			).toHaveLength(1);
		});
	});

	describe("rule docs", () => {
		it("get_rules returns doc ids instead of file paths", async () => {
			const text = textOf(
				await client.callTool({
					name: "get_rules",
					arguments: { pattern: "styles" }
				})
			);

			expect(JSON.parse(text).template).toBe("styles");
			expect(text).not.toMatch(/\.md"/);
		});

		it("get_rules inlines referenced docs with includeDocs", async () => {
			const { docs } = jsonOf(
				await client.callTool({
					name: "get_rules",
					arguments: { pattern: "rtkQuery", includeDocs: true }
				})
			);

			expect(docs.map((doc: IRuleDoc) => doc.id)).toEqual([
				"api-pattern",
				"rtk-query-pattern",
				"entity-pattern"
			]);
			expect(docs[0].content).toContain("injectEndpoints");
		});

		it("get_pattern_doc returns markdown and lists docs without id", async () => {
			const text = textOf(
				await client.callTool({
					name: "get_pattern_doc",
					arguments: { id: "styles" }
				})
			);
			expect(text).toBe(RULE_DOCS.styles.content);

			const list = jsonOf(
				await client.callTool({
					name: "get_pattern_doc",
					arguments: {}
				})
			);
			expect(list).toHaveLength(Object.keys(RULE_DOCS).length);
		});

		it("exposes docs as resources", async () => {
			const { resources } = await client.listResources();
			expect(resources.map((r) => r.uri).sort()).toEqual(
				Object.keys(RULE_DOCS)
					.map((id) => `rules://docs/${id}`)
					.sort()
			);

			const { contents } = await client.readResource({
				uri: "rules://docs/api-pattern"
			});
			expect(contents[0]).toMatchObject({
				mimeType: "text/markdown",
				text: RULE_DOCS["api-pattern"].content
			});
		});
	});
});
