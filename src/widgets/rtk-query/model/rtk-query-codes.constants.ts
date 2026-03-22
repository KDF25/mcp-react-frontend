export const API_CODE_TAGS = `export const ENUM_API_TAGS = {
	USER: "User",
	BOOKING_ORDERS: "Booking Orders",
    // и другие теги...
} as const;`;

export const API_CODE_BASE = `import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@/shared/config";
import { ENUM_API_TAGS } from "./tags.config";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: ENV.VITE_API_URL,
		credentials: "include"
	}),
	reducerPath: "baseApi",
	endpoints: () => ({}),
	tagTypes: Object.values(ENUM_API_TAGS)
});`;

export const API_CODE_AUTH_QUERY = `import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@/shared/config";
import { logout } from "@/entities/user/slice/user.slice";

export const authBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	const baseQuery = fetchBaseQuery({ baseUrl: ENV.VITE_API_URL, credentials: "include" });
	const result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		api.dispatch(logout());
	}
	return result;
};`;

export const API_CODE_AUTH_API = `import { createApi } from "@reduxjs/toolkit/query/react";
import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import { authBaseQuery } from "./auth-base-query";

export const authApi = createApi({
	baseQuery: authBaseQuery,
	reducerPath: "authApi",
	endpoints: () => ({}),
	tagTypes: Object.values(ENUM_API_TAGS)
});`;

export const API_CODE_INJECT = `import { authApi } from "@/entities/auth/api/auth.api";

export const bookingOrderApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getBookingOrders: builder.query<TResponse, TFilters>({
			query: (filters) => ({ url: "/booking/orders" }),
			providesTags: [ENUM_API_TAGS.BOOKING_ORDERS]
		})
	})
});`;
