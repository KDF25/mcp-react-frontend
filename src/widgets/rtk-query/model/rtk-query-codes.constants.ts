export const API_CODE_TAGS = `export const ENUM_API_TAGS = {
	USER: "User",
	BOOKING_ORDERS: "Booking Orders",
    // и другие теги...
} as const;`;

export const API_CODE_BASE = `import {
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
	createApi,
	fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { ENV } from "@/shared/config";
import { sessionExpired } from "./session-expired.action";
import { ENUM_API_TAGS } from "./tags.config";

const rawBaseQuery = fetchBaseQuery({
	baseUrl: ENV.VITE_API_URL,
	credentials: "include"
});

/** 401 → sessionExpired(); слой shared не импортирует entities */
const baseQueryWithAuthGuard: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await rawBaseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		api.dispatch(sessionExpired());
	}
	return result;
};

/** Единственный createApi проекта — все entities инжектят сюда */
export const baseApi = createApi({
	baseQuery: baseQueryWithAuthGuard,
	reducerPath: "baseApi",
	endpoints: () => ({}),
	tagTypes: Object.values(ENUM_API_TAGS)
});`;

export const API_CODE_SESSION_EXPIRED = `import { createAction } from "@reduxjs/toolkit";

/** Диспатчится baseApi при 401; auth slice подписывается через extraReducers */
export const sessionExpired = createAction("api/sessionExpired");

// entities/auth/model/auth.slice.ts
// extraReducers: (builder) => {
// 	builder.addCase(sessionExpired, () => initialState);
// }`;

export const API_CODE_INJECT = `import { baseApi, ENUM_API_TAGS } from "@/shared/api/backend";

export const bookingOrderApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getBookingOrders: builder.query<TResponse, TFilters>({
			query: (filters) => ({ url: "/booking/orders" }),
			providesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		})
	})
});`;
