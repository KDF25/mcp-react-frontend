/**
 * Raw OpenAPI / Api.ts schema types may only be imported in:
 * - src/shared/api/generated (and nested)
 * - src/entities/<entity>/types (adapter T*Backend files)
 *
 * Everywhere else (api, converters, handlers, mock, UI) must use T*Backend from ../types.
 */

const NORMALIZE = (p: string) => p.replace(/\\/g, "/");

const ALLOWED_RAW_API_IMPORT =
	/(?:^|\/)shared\/api\/generated(?:\/|$)|(?:^|\/)entities\/[^/]+\/types(?:\/|$)/;

const RAW_API_MODULE =
	/from\s+["'][^"']*shared\/api\/generated\/Api["']|from\s+["'][^"']*\/generated\/Api["']|from\s+["']\.\.\/Api["']|from\s+["']\.\/Api["']/;

/**
 * Named imports from @/shared/api that look like OpenAPI schema symbols
 * (Request/Response/…), not infrastructure (baseApi, PATHS, ENUM_*).
 */
const SHARED_API_SCHEMA_IMPORT =
	/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["']@\/shared\/api["']/;

const INFRA_SYMBOL =
	/^(baseApi|mainApi|authApi|ENUM_[A-Z0-9_]+|[A-Z0-9_]+_PATHS|getApiErrorDetail|downloadBlob|rtkError.*)$/;

const SCHEMA_SYMBOL =
	/^(?!I|T|ENUM_)[A-Z][A-Za-z0-9]*(Request|Response|Type|Status|View|Params|Body|Query|Schema)?$/;

export const isAllowedRawApiImportPath = (filePath: string): boolean =>
	ALLOWED_RAW_API_IMPORT.test(NORMALIZE(filePath));

export const hasDirectGeneratedApiImport = (content: string): boolean =>
	RAW_API_MODULE.test(content);

export const hasLeakedSharedApiSchemaImport = (content: string): boolean => {
	const match = SHARED_API_SCHEMA_IMPORT.exec(content);
	if (!match) return false;

	const names = match[1]
		.split(",")
		.map((part) =>
			part
				.trim()
				.replace(/^type\s+/, "")
				.replace(/\s+as\s+\w+$/, "")
		)
		.filter(Boolean);

	return names.some(
		(name) => !INFRA_SYMBOL.test(name) && SCHEMA_SYMBOL.test(name)
	);
};

export interface IOpenApiBoundaryHit {
	ruleId:
		| "openapi-raw-types-forbidden-outside-types"
		| "openapi-prefer-t-backend-alias";
	message: string;
	suggestion: string;
}

export const checkOpenApiTypesBoundary = (
	filePath: string,
	content: string
): IOpenApiBoundaryHit[] => {
	const normalized = NORMALIZE(filePath);
	if (isAllowedRawApiImportPath(normalized)) return [];
	if (/\.(test|spec)\.[tj]sx?$/.test(normalized)) return [];

	const hits: IOpenApiBoundaryHit[] = [];

	if (hasDirectGeneratedApiImport(content)) {
		hits.push({
			ruleId: "openapi-raw-types-forbidden-outside-types",
			message:
				"Raw OpenAPI types from generated/Api.ts must not be imported outside entities/*/types (and generated itself).",
			suggestion:
				"Create/extend *-backend.interface.ts with export type TFooBackend = FooResponse and import TFooBackend from ../types."
		});
	}

	if (hasLeakedSharedApiSchemaImport(content)) {
		hits.push({
			ruleId: "openapi-prefer-t-backend-alias",
			message:
				"OpenAPI schema symbols imported from @/shared/api. Domain code must use T*Backend aliases from entities/*/types.",
			suggestion:
				"Move the Api.ts import into entities/<entity>/types/*-backend.interface.ts, export T*Backend (and re-export enums from types if needed)."
		});
	}

	return hits;
};
