import { ENUM_SEVERITY, IViolation } from "@/shared/types/mcp.types";

export class RecommenderAgent {
	public generateRecommendations(violations: IViolation[]): string[] {
		const recommendations: string[] = [];

		const highSeverityCount = violations.filter(
			(v) =>
				v.severity === ENUM_SEVERITY.HIGH ||
				v.severity === ENUM_SEVERITY.CRITICAL
		).length;

		if (highSeverityCount > 5) {
			recommendations.push(
				"Critical architecture issues detected. Priority: Refactor layer boundaries."
			);
		}

		if (violations.some((v) => v.ruleId === "interface-naming")) {
			recommendations.push(
				"Consider running an automated codemod to fix interface naming prefixes (I_)."
			);
		}

		if (
			violations.some(
				(v) =>
					v.ruleId === "converters-forbidden-in-ui" ||
					v.ruleId === "backend-dto-forbidden-in-ui"
			)
		) {
			recommendations.push(
				"Keep converters inside entities/*/api (transformResponse / body). UI must only consume frontend domain types from hooks — never map*ToFrontend/Backend or *Backend DTOs in components."
			);
		}

		if (
			violations.some(
				(v) =>
					v.ruleId === "openapi-raw-types-forbidden-outside-types" ||
					v.ruleId === "openapi-prefer-t-backend-alias"
			)
		) {
			recommendations.push(
				"Import backend.types.ts schema types only in entities/*/types as T*Backend aliases. Converters/api/handlers must use those aliases (and PATHS), never raw OpenAPI symbols from @/shared/api."
			);
		}

		return recommendations;
	}
}
