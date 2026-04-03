export const API_CODE = `import { mainApi } from "@/shared/api";

export const entityApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getEntities: builder.query<TResponse, TFilters>({
			query: (filters) => ({ url: "/entities" }),
			providesTags: [ENUM_API_TAGS.ENTITIES]
		})
	})
});`;

export const CONVERTERS_CODE = `export const mapEntityToFrontend = (data: IEntityBackend): IEntity => ({
	id: data.id,
	type: data.type as ENUM_ENTITY_TYPE,
	dateCreated: formatDate(data.date_created),
	client: data.client,
	status: data.status as ENUM_ENTITY_STATUS
});

export const mapEntityToBackend = (data: Partial<IEntityDetail>): 
	Partial<IEntityDetailBackend> => ({
		id: data.id,
		type: data.type,
		date_created: data.dateCreated,
		client: data.client,
		status: data.status
});
`;

export const SCHEMA_CODE = `import { z } from "zod";
import { i18nKey } from "@/shared/config";

const msg = i18nKey<TEntityKeys>();

export const ENTITY_SCHEMA = z.object({
	client: z.string().min(1, { message: msg("errors.client.required") }),
	status: z.enum(["PENDING", "CONFIRMED"]),
	pax: z.number().min(1)
});

export type TEntitySchema = z.infer<typeof ENTITY_SCHEMA>;`;

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

export const TYPES_CODE = `export interface IEntityDates {
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
}`;

export const HANDLERS_CODE = `import { HttpResponse, http } from "msw";
import { ENV } from "@/shared/config";
import { ENTITIES_MOCK } from "../mock";

export const entityHandlers = [
	http.get(\`\${ENV.VITE_API_URL}/entities\`, ({ request }) => {
		const url = new URL(request.url);
		return HttpResponse.json({
			data: [...ENTITIES_MOCK],
			total: ENTITIES_MOCK.length
		});
	}),
	http.get(\`\${ENV.VITE_API_URL}/entities/:id\`, ({ params }) => {
		const entity = ENTITIES_MOCK.find((e) => e.id === params.id);
		if (!entity) return new HttpResponse(null, { status: 404 });
		return HttpResponse.json(entity);
	})
];`;

export const MOCK_CODE = `import type { IEntityDetail } from "../types";

export const ENTITIES_MOCK: IEntityDetail[] = [
	{
		id: "ENT-001",
		type: "individual",
		dateCreated: "2024-03-15T12:00:00Z",
		client: "John Doe",
		pax: 2,
		dates: { from: "2024-04-01", to: "2024-04-10" },
		status: "CONFIRMED",
		// ... full fields
	}
];`;
