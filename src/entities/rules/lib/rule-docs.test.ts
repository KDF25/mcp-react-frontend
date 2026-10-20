import { describe, expect, it } from "vitest";

import { collectRuleDocs } from "../../../../scripts/generate-rule-docs.mjs";
import { RULE_DOCS } from "../config/rule-docs.generated";

import { getRuleDoc, isRuleDocId, listRuleDocs } from "./rule-docs";
import { RulesProvider } from "./rules-provider";

/** Docs that are served on their own and are not referenced from rules JSON. */
const STANDALONE_DOCS = ["shared-patterns"];

const collectReferences = (node: unknown, refs: string[] = []): string[] => {
	if (Array.isArray(node)) {
		node.forEach((item) => collectReferences(item, refs));
	} else if (node && typeof node === "object") {
		for (const [key, value] of Object.entries(node)) {
			if (key === "template" && typeof value === "string")
				refs.push(value);
			else if (key === "relatedDocs" && Array.isArray(value))
				refs.push(...value);
			else collectReferences(value, refs);
		}
	}
	return refs;
};

describe("rule docs", () => {
	const references = collectReferences(RulesProvider.getRules());

	it("resolves every template / relatedDocs reference", () => {
		expect(references.length).toBeGreaterThan(0);
		const missing = references.filter((id) => !isRuleDocId(id));
		expect(missing).toEqual([]);
	});

	it("is in sync with markdown files on disk (run `npm run rules:docs`)", () => {
		expect(JSON.parse(JSON.stringify(RULE_DOCS))).toEqual(
			collectRuleDocs()
		);
	});

	it("has no orphan docs", () => {
		const referenced = new Set([...references, ...STANDALONE_DOCS]);
		const orphans = Object.keys(RULE_DOCS).filter(
			(id) => !referenced.has(id)
		);
		expect(orphans).toEqual([]);
	});

	it("returns doc content and uri", () => {
		const doc = getRuleDoc("styles");
		expect(doc?.uri).toBe("rules://docs/styles");
		expect(doc?.content).toContain("# ");
		expect(getRuleDoc("missing-doc")).toBeUndefined();
		expect(listRuleDocs()).toHaveLength(Object.keys(RULE_DOCS).length);
	});
});
