export const CONVERTERS_CODE_TO_FRONTEND = `import { formatDate } from "@/shared/lib/utils";
import { type IEntityBackend, type IEntity } from "../types";

export const mapEntityToFrontend = (
	data: IEntityBackend
): IEntity => ({
	id: data.id,
	fullName: data.full_name,
	dateCreated: formatDate(data.created_at),
	status: data.status_code
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

export const CONVERTERS_CODE_FILTERS = `import { type IEntityFilters } from "../types";

export const mapEntityFiltersToBackend = (
	filters: IEntityFilters
) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 
        ? filters.status.join(",") 
        : undefined
});`;

export const CONVERTERS_CODE_RTK_QUERY = `import { authApi } from "@/entities/auth/api/auth.api";
import { 
    mapEntityFiltersToBackend, 
    mapEntityPaginatedToFrontend,
    mapEntityToBackend
} from "../converters";

export const entityApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getEntities: builder.query<TResponse, TFilters>({
			query: (filters) => ({
				url: "/entity/list",
				params: mapEntityFiltersToBackend(filters)
			}),
			transformResponse: (response: TResponseBackend) => 
                mapEntityPaginatedToFrontend(response)
		}),
        updateEntity: builder.mutation<void, TEntity>({
			query: (body) => ({
				url: "/entity/update",
				method: "POST",
				body: mapEntityToBackend(body)
			})
		})
	})
});`;
