import defaultRulesJson from "../config/default-rules.json";
import { IProjectRules } from "../types/rules.types";

const defaultRules = defaultRulesJson as unknown as IProjectRules;

export class RulesProvider {
	public static getRules(): IProjectRules {
		return defaultRules;
	}

	public static getFsdRules() {
		return defaultRules.fsd;
	}

	public static getNamingRules() {
		return defaultRules.naming;
	}

	public static getLinterRules() {
		return defaultRules.linter;
	}
}
