import { describe, expect, it } from "vitest";

import { RULE_DOCS } from "@/entities/rules/config/rule-docs.generated";

import { ERROR_BOUNDARY_IMPLEMENTATION } from "./error-boundary.constants";

/** First ```tsx block after the given heading in a rule doc. */
const codeBlockAfter = (doc: string, heading: string) => {
	const step = doc.slice(doc.indexOf(heading));
	const from = step.indexOf("```tsx\n") + "```tsx\n".length;
	return step.slice(from, step.indexOf("\n```", from));
};

describe("error-boundary docs widget", () => {
	it("shows the same ErrorBoundary implementation as the rule doc", () => {
		const code = codeBlockAfter(
			RULE_DOCS["error-boundary-pattern"].content,
			"### Шаг 1"
		);

		expect(ERROR_BOUNDARY_IMPLEMENTATION).toBe(code);
	});
});
