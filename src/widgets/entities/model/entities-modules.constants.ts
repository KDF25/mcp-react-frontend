export const API_CODE = `import { authApi } from "@/entities/auth/api/auth.api";

export const bookingOrderApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getBookingOrders: builder.query<TResponse, TFilters>({
			query: (filters) => ({ url: "/booking/orders" }),
			providesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		})
	})
});`;

export const CONVERTERS_CODE = `export const mapBookingOrderToFrontend = (data: IBookingOrderBackend): IOrder => ({
	orderId: data.order_id,
	orderType: data.order_type as ENUM_ORDER_TYPE_OPTIONS_TYPE,
	dateCreated: formatDate(data.date_created),
	client: data.client,
	status: data.status as ENUM_ORDER_STATUS_TYPE
});

export const mapBookingOrderToBackend = (data: Partial<IOrderDetail>): Partial<IBookingOrderDetailBackend> => ({
	order_id: data.orderId,
	order_type: data.orderType,
	date_created: data.dateCreated,
	client: data.client,
	status: data.status
});`;

export const SCHEMA_CODE = `import { z } from "zod";
import { i18nKey } from "@/shared/config";

const msg = i18nKey<TBookingOrderKeys>();

export const BOOKING_ORDER_SCHEMA = z.object({
	client: z.string().min(1, { message: msg("errors.client.required") }),
	status: z.enum(["PENDING", "CONFIRMED"]),
	pax: z.number().min(1)
});

export type TBookingOrderSchema = z.infer<typeof BOOKING_ORDER_SCHEMA>;`;

export const SLICE_CODE = `import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOrderSliceState {
	selectedOrderId: string | null;
}

const initialState: IOrderSliceState = {
	selectedOrderId: null
};

export const orderSlice = createSlice({
	name: "bookingOrder",
	initialState,
	reducers: {
		setSelectedOrder: (state, action: PayloadAction<string>) => {
			state.selectedOrderId = action.payload;
		}
	}
});`;

export const UI_CODE = `interface IOrderCardProps {
	order: IOrder;
	onSelect: (id: string) => void;
}

export const OrderCard = ({ order, onSelect }: IOrderCardProps) => (
	<Card onClick={() => onSelect(order.orderId)}>
		<CardHeader>{order.client}</CardHeader>
		<CardContent>Pax: {order.pax}</CardContent>
	</Card>
);`;

export const TYPES_CODE = `export interface IOrderDates {
	from: string;
	to: string;
}

export interface IOrder {
	orderId: string;
	orderType: ENUM_ORDER_TYPE_OPTIONS_TYPE;
	dateCreated: string;
	client: string;
	pax: number;
	dates: IOrderDates;
	status: ENUM_ORDER_STATUS_TYPE;
}`;

export const HANDLERS_CODE = `import { HttpResponse, http } from "msw";
import { ENV } from "@/shared/config";
import { BOOKING_ORDERS_MOCK } from "../mock";

export const bookingOrderHandlers = [
	http.get(\`\${ENV.VITE_API_URL}/booking/orders\`, ({ request }) => {
		const url = new URL(request.url);
		return HttpResponse.json({
			data: [...BOOKING_ORDERS_MOCK],
			total: BOOKING_ORDERS_MOCK.length
		});
	}),
	http.get(\`\${ENV.VITE_API_URL}/booking/orders/:id\`, ({ params }) => {
		const order = BOOKING_ORDERS_MOCK.find((o) => o.orderId === params.id);
		if (!order) return new HttpResponse(null, { status: 404 });
		return HttpResponse.json(order);
	})
];`;

export const MOCK_CODE = `import type { IOrderDetail } from "../types";

export const BOOKING_ORDERS_MOCK: IOrderDetail[] = [
	{
		orderId: "ORD-001",
		orderType: "individual",
		dateCreated: "2024-03-15T12:00:00Z",
		client: "John Doe",
		pax: 2,
		dates: { from: "2024-04-01", to: "2024-04-10" },
		status: "CONFIRMED",
		// ... full fields
	}
];`;
