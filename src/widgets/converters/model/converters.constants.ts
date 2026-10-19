/**
 * ESLint: converters must not leave the entity.
 * - Alias imports (@/entities/.../converters) are forbidden everywhere.
 * - Relative ../converters from the same entity's api/ remains allowed.
 * - eslint-plugin-boundaries: only entity-api (same capture) may import entity-converters.
 */
export const CONVERTERS_CODE_ESLINT = `import boundaries from "eslint-plugin-boundaries";

export default [
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        {
          type: "entity-converters",
          pattern: "src/entities/*/converters/**",
          capture: ["entity"]
        },
        {
          type: "entity-api",
          pattern: "src/entities/*/api/**",
          capture: ["entity"]
        },
        { type: "pages", pattern: "src/pages/**" },
        { type: "widgets", pattern: "src/widgets/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "shared", pattern: "src/shared/**" }
      ],
      "boundaries/ignore": ["**/*.{test,spec}.{ts,tsx}"]
    },
    rules: {
      // 1) Block public/alias imports of converters (api uses relative ../converters)
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "**/entities/*/converters",
                "**/entities/*/converters/**",
                "@/entities/*/converters",
                "@/entities/*/converters/**"
              ],
              message:
                "Converters are private to the entity. Import only from entities/<name>/api via relative '../converters'. UI must use frontend models from RTK hooks."
            }
          ]
        }
      ],
      // 2) Only same-entity api may depend on converters segment
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: { type: "entity-api", capture: ["entity"] },
              allow: [
                { type: "entity-converters", capture: ["entity"] },
                "entities",
                "shared"
              ]
            },
            {
              from: "entity-converters",
              allow: ["entities", "shared"]
            },
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared"]
            },
            {
              from: "widgets",
              allow: ["features", "entities", "shared"]
            },
            {
              from: "features",
              allow: ["entities", "shared", "features"]
            },
            {
              from: "entities",
              allow: ["entities", "shared"]
            },
            {
              from: "shared",
              allow: ["shared", "entities"]
            }
          ]
        }
      ],
      "boundaries/no-private": "error"
    }
  }
];`;

export const CONVERTERS_CODE_TO_FRONTEND = `import { formatDate } from "@/shared/lib/utils";
import type { IPaginationResponse } from "@/shared/types";
import { type IEntityBackend, type IEntity, type IEntitiesBackend } from "../types";

export const mapEntityToFrontend = (
	data: IEntityBackend
): IEntity => ({
	id: data.id,
	fullName: data.full_name,
	dateCreated: formatDate(data.created_at),
	status: data.status_code
});

/** Backend list envelope → unified { data, total } */
export const mapEntitiesToFrontend = (
	response: IEntitiesBackend
): IPaginationResponse<IEntity> => ({
	data: response.items.map(mapEntityToFrontend),
	total: response.total_count
});`;

export const CONVERTERS_CODE_TO_BACKEND = `import { 
    type IEntityBackend, 
    type IEntity 
} from "../types";

export const mapEntityToBackend = (
	data: Partial<IEntity>
): Partial<IEntityBackend> => ({
	id: data.id,
	full_name: data.fullName,
	created_at: data.dateCreated,
	status_code: data.status
});`;

export const CONVERTERS_CODE_FILTERS = `import type { IPaginationRequest } from "@/shared/types";
import type { IEntitiesQueryBackend } from "../types";

/** IPaginationRequest → API-specific query fields (names stay here) */
export const mapEntitiesQueryToBackend = (
	filters: IPaginationRequest
): IEntitiesQueryBackend => ({
	page: filters.page,
	elements_on_page: filters.limit,
	search: filters.search || undefined,
	status_code: filters.status
});`;

export const CONVERTERS_CODE_RTK_QUERY = `import { authApi } from "@/entities/auth/api/auth.api";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";
import { 
    mapEntitiesQueryToBackend, 
    mapEntitiesToFrontend,
    mapEntityToBackend
} from "../converters";
import type { IEntitiesBackend, IEntity } from "../types";

/** Only place converters are imported — never in pages/widgets/features/ui */
export const entityApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getEntities: builder.query<
			IPaginationResponse<IEntity>,
			IPaginationRequest
		>({
			query: (filters) => ({
				url: "/entity/list",
				params: mapEntitiesQueryToBackend(filters)
			}),
			transformResponse: (response: IEntitiesBackend) => 
                mapEntitiesToFrontend(response)
		}),
        updateEntity: builder.mutation<void, IEntity>({
			query: (body) => ({
				url: "/entity/update",
				method: "POST",
				body: mapEntityToBackend(body)
			})
		})
	})
});`;
