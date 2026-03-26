export interface IFsdBoundary {
	from: string;
	allow: string[];
}

export interface IFsdRules {
	layers: string[];
	boundaries: IFsdBoundary[];
	rules: {
		"no-cross-layer-imports": boolean;
		"enforce-directory-structure": boolean;
		"no-private-imports": boolean;
		"enforce-barrel-exports": boolean;
	};
}

export interface INamingRules {
	fileCase: "kebab-case";
	prefixes: {
		interface: string;
		type: string;
		enum: string;
	};
	backend: {
		typeSuffix: string;
		fileSuffix: string;
		interfaceExtension: string;
	};
	exclusions: {
		hooks: string;
		nextjs: string[];
	};
}

export interface ILinterRules {
	noConsole: boolean;
	noAny: boolean;
	strictTyping: boolean;
	noEnums: boolean;
}

export interface IStructureRules {
	model: {
		baseMaxSize: number;
		requiredFiles: string[];
		subfolders: string[];
		filePattern: string;
	};
	converters: {
		suffix: string;
		mandatory: boolean;
	};
}

export interface IStyleRules {
	allowedUtilityPrefixes: string[];
	forbiddenColors: string[];
	requiredUtility: string;
}

export interface IPatternRules {
	stateManagement: {
		server: string;
		client: string;
		local: string;
	};
	rtkQuery: {
		location: string;
		requiredFiles: string[];
		locationRequiredFiles: Record<string, string>;
		template: string;
		description: string;
		segments: string[];
	};
	ui: {
		composition: {
			widgets: string[];
		};
		responsibility: {
			entities: string;
			features: string;
		};
	};
	i18n: {
		location: string;
		requiredFiles: string[];
		template: string;
		description: string;
	};
	converters: {
		location: string;
		requiredFiles: string[];
		template: string;
		description: string;
	};
	msw: {
		location: string;
		requiredFiles: string[];
		template: string;
		description: string;
	};
	theme: {
		location: string;
		requiredFiles: string[];
		template: string;
		description: string;
	};
	styles: {
		location: string;
		requiredFiles: string[];
		locationRequiredFiles: Record<string, string>;
		template: string;
		description: string;
	};
	zod: {
		location: string;
		requiredFiles: string[];
		locationRequiredFiles: Record<string, string>;
		template: string;
		description: string;
	};
	errorBoundary: {
		location: string;
		requiredFiles: string[];
		locationRequiredFiles: Record<string, string>;
		template: string;
		description: string;
	};
}

export interface IProjectRules {
	fsd: IFsdRules;
	naming: INamingRules;
	linter: ILinterRules;
	structure: IStructureRules;
	styles: IStyleRules;
	patterns: IPatternRules;
}

export type TRuleDomain = keyof IProjectRules;
export type TPatternName = keyof IPatternRules;
