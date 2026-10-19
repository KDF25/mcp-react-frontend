export const API_CODE = `import { mainApi } from "@/shared/api";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";
import {
	mapEntitiesQueryToBackend,
	mapEntitiesToFrontend
} from "../converters";
import type { TEntitiesBackend, IEntity } from "../types";

/** Converters run here — hooks return frontend models, not raw DTOs */
export const entityApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getEntities: builder.query<
			IPaginationResponse<IEntity>,
			IPaginationRequest
		>({
			query: (filters) => ({
				url: "/entities",
				params: mapEntitiesQueryToBackend(filters)
			}),
			transformResponse: (response: TEntitiesBackend) =>
				mapEntitiesToFrontend(response),
			providesTags: [ENUM_API_TAGS.ENTITIES]
		})
	})
});`;

export const CONVERTERS_CODE = `export const mapEntityToFrontend = (data: TEntityBackend): IEntity => ({
	id: data.id,
	type: data.type as ENUM_ENTITY_TYPE,
	dateCreated: formatDate(data.date_created),
	client: data.client,
	status: data.status as ENUM_ENTITY_STATUS
});

export const mapEntitiesToFrontend = (
	response: TEntitiesBackend
): IPaginationResponse<IEntity> => ({
	data: response.items.map(mapEntityToFrontend),
	total: response.total_count
});

export const mapEntityToBackend = (
	data: Partial<IEntityDetail>
): Partial<TEntityDetailBackend> => ({
	id: data.id,
	type: data.type,
	date_created: data.dateCreated,
	client: data.client,
	status: data.status
});
`;
export const SCHEMA_CODE = `import { z } from "zod";
import { i18nKey } from "@/shared/config";
import { ENUM_FORM_ENTITY_CREATE } from "../types";

const msg = i18nKey<TEntityKeys>();
const F = ENUM_FORM_ENTITY_CREATE;

/** Runtime only — inferred form types belong in types/ */
export const ENTITY_CREATE_SCHEMA = z.object({
	[F.CLIENT]: z.string().min(1, { message: msg("errors.client.required") }),
	[F.STATUS]: z.enum(["PENDING", "CONFIRMED"]),
	[F.PAX]: z.number().min(1)
});`;

export const SLICE_CODE = `import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEntitySliceState {
	selectedId: string | null;
}

const initialState: IEntitySliceState = {
	selectedId: null
};

export const entitySlice = createSlice({
	name: "entity",
	initialState,
	reducers: {
		setSelectedEntity: (state, action: PayloadAction<string>) => {
			state.selectedId = action.payload;
		}
	}
});`;

export const UI_CODE = `interface IEntityCardProps {
	entity: IEntity;
	onSelect: (id: string) => void;
}

export const EntityCard = ({ entity, onSelect }: IEntityCardProps) => (
	<Card onClick={() => onSelect(entity.id)}>
		<CardHeader>{entity.client}</CardHeader>
		<CardContent>Pax: {entity.pax}</CardContent>
	</Card>
);`;

export const TYPES_CODE = `import type { FieldValues } from "react-hook-form";
import { z } from "zod";
import type { ENTITY_CREATE_SCHEMA } from "../schema";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

export const ENUM_FORM_ENTITY_CREATE = {
	CLIENT: "client",
	STATUS: "status",
	PAX: "pax"
} as const;

export type TEntityCreateSchema = z.infer<typeof ENTITY_CREATE_SCHEMA> &
	FieldValues;

export interface IEntityDates {
	from: string;
	to: string;
}

export interface IEntity {
	id: string;
	type: ENUM_ENTITY_TYPE;
	dateCreated: string;
	client: string;
	pax: number;
	dates: IEntityDates;
	status: ENUM_ENTITY_STATUS;
}

export type TEntitiesPage = IPaginationResponse<IEntity>;
export interface IEntitiesQuery extends IPaginationRequest {}
`;

export const HANDLERS_CODE = `import { HttpResponse } from "msw";
import { createMockHandler } from "@/shared/api/msw/utils";
import { listEntitiesBackend } from "../mock";

/** Backend DTO responses — converters run in RTK transformResponse */
export const entityHandlers = [
	createMockHandler(
		{ url: "/entities", method: "GET", _types: { body: undefined } },
		() => HttpResponse.json(listEntitiesBackend())
	),
	createMockHandler(
		{ url: "/entities/:id", method: "GET", _types: { body: undefined } },
		({ params }) => {
			const { items } = listEntitiesBackend();
			const entity = items.find((e) => e.id === params.id);
			if (!entity) return new HttpResponse(null, { status: 404 });
			return HttpResponse.json(entity);
		}
	)
];`;

export const MOCK_CODE = `import type { TEntityBackend } from "../types";

export const ENTITIES_MOCK: TEntityBackend[] = [
	{
		id: "ENT-001",
		type: "individual",
		date_created: "2024-03-15T12:00:00Z",
		client: "John Doe",
		pax: 2,
		status_code: "CONFIRMED"
	}
];`;
