/**
 * Converters/mappers belong only at the entity API boundary.
 * UI surfaces already receive frontend domain models from RTK Query.
 */

const UI_PATH =
	/(?:^|\/)(?:pages|widgets|features)(?:\/|$)|(?:^|\/)entities\/[^/]+\/ui(?:\/|$)|(?:^|\/)shared\/ui(?:\/|$)/;

const ALLOWED_CONVERTER_CONSUMER =
	/(?:^|\/)entities\/[^/]+\/(?:api|converters)(?:\/|$)|(?:\.test|\.spec)\.[tj]sx?$/;

const CONVERTER_MODULE_IMPORT =
	/from\s+["'][^"']*\/converters(?:\/[^"']*)?["']|from\s+["'][^"']*converters["']/;

const MAPPER_NAMED_IMPORT =
	/import\s*{[^}]*\bmap[A-Za-z0-9_]*To(?:Frontend|Backend)\b[^}]*}\s*from\s*["'][^"']+["']/;

const BACKEND_TYPE_IN_UI =
	/\bI[A-Za-z0-9_]+Backend\b|\bT[A-Za-z0-9_]+Backend\b/;

export const isUiSurfacePath = (filePath: string): boolean =>
	UI_PATH.test(filePath.replace(/\\/g, "/"));

export const isAllowedConverterConsumerPath = (filePath: string): boolean =>
	ALLOWED_CONVERTER_CONSUMER.test(filePath.replace(/\\/g, "/"));

export const hasForbiddenConverterImport = (content: string): boolean =>
	CONVERTER_MODULE_IMPORT.test(content) || MAPPER_NAMED_IMPORT.test(content);

export const hasBackendDtoTypeUsage = (content: string): boolean =>
	BACKEND_TYPE_IN_UI.test(content);

export interface IConverterBoundaryHit {
	ruleId: "converters-forbidden-in-ui" | "backend-dto-forbidden-in-ui";
	message: string;
	suggestion: string;
}

/** Returns rule hits when a UI/feature/widget file pulls converters or backend DTOs. */
export const checkConverterUiBoundary = (
	filePath: string,
	content: string
): IConverterBoundaryHit[] => {
	const normalized = filePath.replace(/\\/g, "/");
	if (!isUiSurfacePath(normalized)) return [];
	if (isAllowedConverterConsumerPath(normalized)) return [];

	const hits: IConverterBoundaryHit[] = [];

	if (hasForbiddenConverterImport(content)) {
		hits.push({
			ruleId: "converters-forbidden-in-ui",
			message:
				"Converters/mappers must not be imported in UI (pages, widgets, features, entities/ui). Mapping runs only inside entity API (RTK Query transformResponse / query body).",
			suggestion:
				"Remove converter imports from the component. Consume frontend domain types from the query/mutation hook; keep map*ToFrontend/map*ToBackend in entities/*/api/*.service.ts."
		});
	}

	if (hasBackendDtoTypeUsage(content)) {
		hits.push({
			ruleId: "backend-dto-forbidden-in-ui",
			message:
				"Backend DTO types (*Backend) must not be used in UI. Components already receive frontend domain models after converters in the API layer.",
			suggestion:
				"Use IEntity / TEntitySchema (frontend) props and hook results. Keep T*Backend aliases inside api/, converters/, handlers/, mock/."
		});
	}

	return hits;
};

/** Import-specifier check when only module paths are available (FsdAgent). */
export const isForbiddenConverterImportSpecifier = (
	filePath: string,
	importSpecifier: string
): boolean => {
	const normalized = filePath.replace(/\\/g, "/");
	if (!isUiSurfacePath(normalized)) return false;
	if (isAllowedConverterConsumerPath(normalized)) return false;

	const spec = importSpecifier.replace(/\\/g, "/");
	return (
		/\/converters(?:\/|$)/.test(spec) ||
		spec.endsWith("/converters") ||
		spec.includes(".converters")
	);
};
