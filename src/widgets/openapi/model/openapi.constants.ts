export const OPENAPI_CODE_GENERATE_TYPES = `/**
 * Генерация TypeScript-типов из OpenAPI-спецификации.
 * npx tsx --env-file=.env scripts/generate-api-types.ts
 */
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { generateApi } from "swagger-typescript-api";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_URL = process.env.VITE_BASE_URL;
const OUTPUT_DIR = join(resolve(__dirname, ".."), "src/shared/api/generated");

const SPEC_URL = API_URL.endsWith("/openapi.json")
	? API_URL
	: \`\${API_URL.replace(/\\/$/, "")}/openapi.json\`;

await generateApi({
	fileName: "Api.ts",
	output: OUTPUT_DIR,
	url: SPEC_URL,
	generateClient: false,
	extractEnums: true,
	extractRequestParams: true,
	extractRequestBody: true
});
`;

export const OPENAPI_CODE_GENERATE_PATHS = `/**
 * Группирует OpenAPI paths по tags → paths/<tag>.paths.ts
 * Каждый entry: { url, method, _types: { body, query, response } }
 * npx tsx --env-file=.env scripts/generate-api-paths.ts
 */
// См. полный скрипт в blogix-admin / MCP openapi-pattern.md
// Итог:
export const ADMIN_PROMOCODE_PATHS = {
	readPromocodes: {
		url: "/adv-admin/promocode/list",
		method: "POST",
		_types: {} as {
			body: ReadPromocodesRequest;
			query: void;
			response: ReadPromocodesResponse;
		}
	} as const
} as const;
`;

export const OPENAPI_CODE_PACKAGE_SCRIPTS = `{
  "scripts": {
    "codegen:types": "tsx --env-file=.env scripts/generate-api-types.ts",
    "codegen:paths": "tsx --env-file=.env scripts/generate-api-paths.ts",
    "codegen": "npm run codegen:types && npm run codegen:paths"
  }
}`;

export const OPENAPI_CODE_ADAPTER = `// entities/promocode/types/promocode-backend.interface.ts
// ЕДИНСТВЕННОЕ место импорта schema из Api.ts
import type {
	CreatePromocodeRequest,
	PromocodeDiscountType,
	PromocodeResponse,
	ReadPromocodesResponse
} from "@/shared/api/generated/Api";
import { ADMIN_PROMOCODE_PATHS } from "@/shared/api/generated/paths/admin-promocode.paths";

export type TPromocodeBackend = PromocodeResponse;
export type TPromocodesBackend = ReadPromocodesResponse;
export type TCreatePromocodeRequestBackend = CreatePromocodeRequest;
export type TSetPromocodeActiveQueryBackend =
	typeof ADMIN_PROMOCODE_PATHS.setPromocodeActive._types.query;

export { PromocodeDiscountType };
export type TPromocodeDiscountTypeBackend = PromocodeDiscountType;
`;

export const OPENAPI_CODE_CONVERTER_OK = `// entities/promocode/converters/promocode.converters.ts — OK
import type { TPromocodeBackend } from "../types";
import { PromocodeDiscountType } from "../types";

export const mapPromocodeToFrontend = (data: TPromocodeBackend) => ({
	id: data.id,
	code: data.code
	// …
});
`;

export const OPENAPI_CODE_CONVERTER_BAD = `// ❌ FORBIDDEN in converters / api / handlers / UI
import type { PromocodeResponse } from "@/shared/api";
import { OrderStatus } from "@/shared/api/generated/Api";
`;

export const OPENAPI_CODE_ESLINT = `// eslint.config.js — fragment
{
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: [
              "**/shared/api/generated/Api",
              "**/shared/api/generated/Api.ts",
              "@/shared/api/generated/Api"
            ],
            message:
              "Raw Api.ts types only in entities/*/types as T*Backend. Use ../types aliases elsewhere."
          }
        ]
      }
    ]
  }
},
{
  files: [
    "src/entities/**/types/**/*.{ts,tsx}",
    "src/shared/api/generated/**/*.{ts,tsx}"
  ],
  rules: { "no-restricted-imports": "off" }
}
`;
