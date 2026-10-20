import {
	McpServer,
	ResourceTemplate
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { ENUM_REPORT_STATUS, ENUM_SEVERITY } from "@/shared/types/mcp.types";

import {
	RULE_DOC_IDS,
	TRuleDocId,
	getRuleDoc,
	listRuleDocs
} from "@/entities/rules/lib/rule-docs";
import { RulesProvider } from "@/entities/rules/lib/rules-provider";

import { FsdAgent } from "../../agents/fsd-agent";
import { extractImports } from "../../agents/lib/extract-imports";
import { LinterAgent } from "../../agents/linter-agent";
import { RecommenderAgent } from "../../agents/recommender-agent";
import {
	MSW_SERVER_CODE,
	MSW_UTILS_CODE,
	PAGINATION_TYPES_CODE,
	scaffoldEntity
} from "../../scaffold/lib";

const RULE_DOC_MIME_TYPE = "text/markdown";

interface IAnalyzedFile {
	path: string;
	imports: string[];
}

/** `./src\x.ts` and `src/x.ts` must map to the same analyzed file. */
const normalizeFilePath = (filePath: string): string =>
	filePath.replace(/\\/g, "/").replace(/^(?:\.\/|\/)+/, "");

/** Collects every rule doc id referenced by a rules subtree (`template`, `relatedDocs`). */
const collectDocIds = (node: unknown, ids = new Set<string>()): Set<string> => {
	if (Array.isArray(node)) {
		node.forEach((item) => collectDocIds(item, ids));
	} else if (node && typeof node === "object") {
		for (const [key, value] of Object.entries(node)) {
			if (key === "template" && typeof value === "string") ids.add(value);
			else if (key === "relatedDocs" && Array.isArray(value))
				value.forEach((id) => typeof id === "string" && ids.add(id));
			else collectDocIds(value, ids);
		}
	}
	return ids;
};

const jsonText = (value: unknown) => ({
	content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }]
});

/**
 * Factory function to create a new MCP Server instance.
 * This is designed for serverless environments where each request
 * should have its own server instance.
 */
export function createMcpServer(): McpServer {
	const server = new McpServer({
		name: "mcp-react-frontend",
		version: "1.0.0"
	});

	const fsdAgent = new FsdAgent();
	const linterAgent = new LinterAgent();
	const recommenderAgent = new RecommenderAgent();

	// Register Tools using the high-level registerTool method
	server.registerTool(
		"analyze_project",
		{
			description:
				"Analyze project files for FSD violations and naming conventions.",
			inputSchema: {
				files: z
					.array(
						z.union([
							z.string(),
							z.object({
								path: z.string(),
								imports: z.array(z.string()).optional()
							})
						])
					)
					.describe(
						"Files to analyze (relative to project root): a path string or { path, imports }. FSD layer / private-import checks need imports — pass them here or provide codeSnippets (imports are then extracted automatically)."
					),
				codeSnippets: z
					.array(
						z.object({
							fileName: z.string(),
							content: z.string()
						})
					)
					.optional()
					.describe(
						"Optional code snippets for deep linter analysis."
					)
			}
		},
		async ({ files, codeSnippets }) => {
			const analyzedFiles = new Map<string, IAnalyzedFile>();

			for (const file of files) {
				const item = typeof file === "string" ? { path: file } : file;
				const path = normalizeFilePath(item.path);
				analyzedFiles.set(path, {
					path,
					imports: item.imports ?? []
				});
			}

			for (const snippet of codeSnippets ?? []) {
				const path = normalizeFilePath(snippet.fileName);
				const existing = analyzedFiles.get(path);
				if (existing && existing.imports.length > 0) continue;
				analyzedFiles.set(path, {
					path,
					imports: extractImports(snippet.fileName, snippet.content)
				});
			}

			const fsdViolations = await fsdAgent.analyze([
				...analyzedFiles.values()
			]);
			const linterViolations: any[] = [];

			const notes: string[] = [];
			if (
				![...analyzedFiles.values()].some(
					(file) => file.imports.length > 0
				)
			) {
				notes.push(
					"FSD import checks skipped: no imports found. Pass { path, imports } in files or provide codeSnippets."
				);
			}

			if (codeSnippets) {
				for (const snippet of codeSnippets) {
					const lints = await linterAgent.checkNaming(
						snippet.fileName,
						snippet.content
					);
					linterViolations.push(...lints);
				}
			}

			const allViolations = [...fsdViolations, ...linterViolations];
			const recommendations =
				recommenderAgent.generateRecommendations(allViolations);

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(
							{
								status:
									allViolations.length > 0
										? ENUM_REPORT_STATUS.ERROR
										: ENUM_REPORT_STATUS.SUCCESS,
								summary: {
									totalErrors: allViolations.filter(
										(v) =>
											v.severity === ENUM_SEVERITY.HIGH ||
											v.severity ===
												ENUM_SEVERITY.CRITICAL
									).length,
									totalWarnings: allViolations.filter(
										(v) =>
											v.severity ===
												ENUM_SEVERITY.MEDIUM ||
											v.severity === ENUM_SEVERITY.LOW
									).length,
									analyzedFiles: analyzedFiles.size
								},
								violations: allViolations,
								recommendations,
								...(notes.length > 0 ? { notes } : {})
							},
							null,
							2
						)
					}
				]
			};
		}
	);

	server.registerTool(
		"get_rules",
		{
			description:
				"Get project rules (fsd, naming, linter, structure, styles, patterns). Fields `template` / `relatedDocs` are rule doc ids — read them via get_pattern_doc or resource rules://docs/{id}, or pass includeDocs: true to inline them.",
			inputSchema: {
				domain: z
					.enum([
						"fsd",
						"naming",
						"linter",
						"structure",
						"styles",
						"patterns"
					])
					.optional()
					.describe("Optional domain filter"),
				pattern: z
					.enum([
						"stateManagement",
						"rtkQuery",
						"ui",
						"i18n",
						"converters",
						"msw",
						"theme",
						"styles",
						"zod",
						"errorBoundary",
						"pagination",
						"openapi"
					])
					.optional()
					.describe("Optional pattern name inside 'patterns' domain"),
				includeDocs: z
					.boolean()
					.optional()
					.describe(
						"Inline markdown of every referenced rule doc (template / relatedDocs) as `docs`."
					)
			}
		},
		async ({ domain, pattern, includeDocs }) => {
			const rules = pattern
				? RulesProvider.getPatternRules(pattern)
				: domain
					? RulesProvider.getRulesByDomain(domain)
					: RulesProvider.getRules();

			if (!includeDocs) return jsonText(rules);

			const docs = [...collectDocIds(rules)]
				.map((id) => getRuleDoc(id))
				.filter((doc) => doc !== undefined);

			return jsonText({ rules, docs });
		}
	);

	server.registerTool(
		"get_pattern_doc",
		{
			description:
				"Get a rule/pattern markdown doc (examples, prohibitions, anti-patterns) by id, as referenced in get_rules `template` / `relatedDocs`. Without id returns the list of available docs.",
			inputSchema: {
				id: z
					.enum(RULE_DOC_IDS as [TRuleDocId, ...TRuleDocId[]])
					.optional()
					.describe("Rule doc id, e.g. 'converters-pattern'")
			}
		},
		async ({ id }) => {
			if (!id) return jsonText(listRuleDocs());

			const doc = getRuleDoc(id);
			return {
				content: [{ type: "text", text: doc?.content ?? "" }]
			};
		}
	);

	server.registerResource(
		"rule-doc",
		new ResourceTemplate("rules://docs/{id}", {
			list: async () => ({
				resources: listRuleDocs().map((doc) => ({
					uri: doc.uri,
					name: doc.id,
					title: doc.title,
					mimeType: RULE_DOC_MIME_TYPE
				}))
			})
		}),
		{
			title: "Rule docs",
			description:
				"Markdown docs for project rules and patterns (referenced by get_rules template / relatedDocs).",
			mimeType: RULE_DOC_MIME_TYPE
		},
		async (uri, { id }) => {
			const doc = getRuleDoc(Array.isArray(id) ? id[0] : id);
			if (!doc) throw new Error(`Unknown rule doc: ${uri.href}`);

			return {
				contents: [
					{
						uri: uri.href,
						mimeType: RULE_DOC_MIME_TYPE,
						text: doc.content
					}
				]
			};
		}
	);

	server.registerTool(
		"scaffold_entity",
		{
			description:
				"Generate a standardized FSD entity structure with API, types, schema, and converters.",
			inputSchema: {
				name: z
					.string()
					.describe('The name of the entity (e.g., "tour").'),
				path: z
					.string()
					.describe(
						"The target directory path (relative to src/entities)."
					)
			}
		},
		async ({ name, path }) => {
			const result = scaffoldEntity(name, path);

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(
							{
								summary: result.summary,
								entityPath: result.entityPath,
								sharedPrerequisites: {
									"src/shared/types/pagination.types.ts":
										PAGINATION_TYPES_CODE,
									"src/shared/api/msw/utils.ts":
										MSW_UTILS_CODE,
									"src/shared/api/msw/server.ts":
										MSW_SERVER_CODE
								},
								files: result.files
							},
							null,
							2
						)
					}
				]
			};
		}
	);

	return server;
}

/**
 * @deprecated Use createMcpServer() factory function instead for serverless compatibility.
 * This singleton is kept for backwards compatibility with SSE transport.
 */
export const mcpServer = createMcpServer();
