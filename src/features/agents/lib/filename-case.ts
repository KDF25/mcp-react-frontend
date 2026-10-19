import { RulesProvider } from "@/entities/rules/lib/rules-provider";

export interface IFilenameCaseHit {
	ruleId: string;
	message: string;
	suggestion: string;
}

const KEBAB_FILE = /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z][a-z0-9]*)+$/;

/**
 * Lightweight mirror of unicorn/filename-case for analyze_project.
 * Semantic suffixes / hooks are allowlisted via linter.eslint.filenameCase.ignore.
 */
export function checkFilenameCase(filePath: string): IFilenameCaseHit[] {
	const rules = RulesProvider.getRules();
	const filenameCase = rules.linter?.eslint?.filenameCase;
	if (!filenameCase?.enabled) return [];

	const base = filePath.split(/[/\\]/).pop() ?? filePath;
	if (!base || base === "." || base === "..") return [];

	for (const pattern of filenameCase.ignore ?? []) {
		try {
			if (new RegExp(pattern).test(base)) return [];
		} catch {
			// skip invalid regex from rules JSON
		}
	}

	if (KEBAB_FILE.test(base)) return [];

	return [
		{
			ruleId: "filename-case",
			message: `File "${base}" must use kebab-case (or an allowed semantic suffix / hook name).`,
			suggestion:
				"Rename to kebab-case (e.g. order-card.tsx) or use a semantic suffix (order.service.ts)."
		}
	];
}
