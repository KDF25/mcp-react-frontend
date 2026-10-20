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
		/** Backend adapters declare only type aliases, never interfaces. */
		typeKind?: "type";
		typePattern?: string;
	};
	exclusions: {
		/** Hook identifier (function) pattern, e.g. useX. */
		hooks: string;
		nextjs: string[];
		semanticFileSuffixes?: string[];
	};
	/** Hook file name pattern, e.g. use-x.ts. */
	hookFilePattern?: string;
	suffixes?: Record<string, string>;
}

export interface IEslintOverride {
	files: string[];
	disable: string[];
}

export interface ILinterRules {
	noConsole: boolean;
	noAny: boolean;
	strictTyping: boolean;
	noEnums: boolean;
	eslint?: {
		recommendedPlugins?: string[];
		filenameCase?: {
			enabled: boolean;
			rule: string;
			pluginRule?: string;
			cases?: {
				kebabCase: boolean;
				camelCase: boolean;
				pascalCase: boolean;
			};
			ignore?: string[];
			template?: string;
		};
		namingConvention?: {
			enabled: boolean;
			rule: string;
			pluginRule?: string;
			prefixes?: {
				interface: string;
				type: string;
				enum: string;
			};
			overrides?: IEslintOverride[];
			template?: string;
		};
		convertersIsolation?: {
			enabled: boolean;
			rule: string;
			noRestrictedImports?: {
				patterns: string[];
				message: string;
			};
			boundaries?: {
				elements: Array<{
					type: string;
					pattern: string;
					capture?: string[];
				}>;
				allowFrom: Array<{
					from: string;
					allow: string[];
					sameCapture?: string;
				}>;
			};
			template?: string;
		};
		openapiTypesIsolation?: {
			enabled: boolean;
			rule: string;
			noRestrictedImports?: {
				patterns: string[];
				message: string;
			};
			allowIn?: string[];
			forbidPublicApiReexport?: boolean;
			adapterNamingPattern?: string;
			template?: string;
		};
	};
}

export interface IStructureRules {
	model: {
		baseMaxSize: number;
		requiredFiles: string[];
		subfolders: string[];
		filePattern: string;
	};
	entities?: {
		requiredFolders: string[];
		optionalFolders?: string[];
		naming: Record<string, string>;
	};
	converters: {
		suffix: string;
		mandatory: boolean;
		methodNamingPattern?: string;
		methodNamingDescription?: string;
		forbiddenLiteralMethods?: string[];
		allowedConsumers?: string[];
		forbiddenConsumers?: string[];
		forbidPublicReexport?: boolean;
		forbidBackendDtoInUi?: boolean;
		rule?: string;
	};
	pagination?: {
		location: string;
		request: string;
		response: string;
		frontendListShape: { data: string; total: string };
		rule: string;
	};
	zod?: {
		schemaDir: string;
		typesDir: string;
		inferLocation: string;
		allowMultipleSchemasPerEntity: boolean;
		forbidInferInSchemaFiles: boolean;
		/** One pair per operation: [entity]-[op].schema.ts ↔ [entity]-[op]-form.types.ts */
		schemaPattern?: string;
		formTypesPattern?: string;
		/** schema → ../types/<file>-form.types (not the barrel) to avoid cycles */
		schemaImportsFormTypesByDirectPath?: boolean;
		/** types → schema only via `import type` */
		typesImportSchemaTypeOnly?: boolean;
	};
	openapi?: {
		generatedDir: string;
		apiFile: string;
		pathsDir: string;
		adapterFilePattern: string;
		adapterTypePattern: string;
		rawTypesOnlyIn: string[];
		rule: string;
	};
}

export interface IStyleRules {
	/** Recommended utility families — documentation for LLM/review, not enforced by the linter. */
	allowedUtilityPrefixes: string[];
	allowedUtilityPrefixesNote?: string;
	forbiddenColors: string[];
	/** Static colors without a palette scale (text-white, bg-black). */
	forbiddenStaticColors?: string[];
	requiredUtility: string;
}

export interface IPatternMeta {
	location: string;
	requiredFiles: string[];
	locationRequiredFiles?: Record<string, string>;
	/** Rule doc id (see RULE_DOCS); served via get_pattern_doc / rules://docs/{id}. */
	template: string;
	/** Additional rule doc ids relevant to this pattern. */
	relatedDocs?: string[];
	description: string;
	[key: string]: unknown;
}

export interface IPatternRules {
	stateManagement: {
		server: string;
		client: string;
		local: string;
	};
	rtkQuery: IPatternMeta & { segments?: string[] };
	ui: {
		composition: {
			widgets: string[];
		};
		responsibility: {
			entities: string;
			features: string;
		};
	};
	i18n: IPatternMeta;
	converters: IPatternMeta;
	msw: IPatternMeta;
	theme: IPatternMeta;
	styles: IPatternMeta;
	zod: IPatternMeta;
	errorBoundary: IPatternMeta;
	pagination: IPatternMeta;
	openapi: IPatternMeta;
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
