import fsdRules from "../config/domains/fsd-rules.json";
import linterRules from "../config/domains/linter-rules.json";
import namingRules from "../config/domains/naming-rules.json";
import structureRules from "../config/domains/structure-rules.json";
import stylesRules from "../config/domains/styles-rules.json";
import convertersPattern from "../config/patterns/converters.json";
import errorBoundaryPattern from "../config/patterns/error-boundary.json";
import i18nPattern from "../config/patterns/i18n.json";
import mswPattern from "../config/patterns/msw.json";
import rtkQueryPattern from "../config/patterns/rtk-query.json";
import stateManagementPattern from "../config/patterns/state-management.json";
import stylesPattern from "../config/patterns/styles.json";
import themePattern from "../config/patterns/theme.json";
import uiPattern from "../config/patterns/ui.json";
import zodPattern from "../config/patterns/zod.json";
import { IProjectRules, TPatternName, TRuleDomain } from "../types/rules.types";

const aggregatedRules: IProjectRules = {
	fsd: fsdRules as any,
	naming: namingRules as any,
	linter: linterRules as any,
	structure: structureRules as any,
	styles: stylesRules as any,
	patterns: {
		stateManagement: stateManagementPattern as any,
		rtkQuery: rtkQueryPattern as any,
		ui: uiPattern as any,
		i18n: i18nPattern as any,
		converters: convertersPattern as any,
		msw: mswPattern as any,
		theme: themePattern as any,
		styles: stylesPattern as any,
		zod: zodPattern as any,
		errorBoundary: errorBoundaryPattern as any
	}
};

export class RulesProvider {
	public static getRules(): IProjectRules {
		return aggregatedRules;
	}

	public static getRulesByDomain(domain: TRuleDomain) {
		return aggregatedRules[domain];
	}

	public static getPatternRules(pattern: TPatternName) {
		return aggregatedRules.patterns[pattern];
	}

	public static getFsdRules() {
		return aggregatedRules.fsd;
	}

	public static getNamingRules() {
		return aggregatedRules.naming;
	}

	public static getLinterRules() {
		return aggregatedRules.linter;
	}
}
