# Архитектурный паттерн: Создание API (RTK Query Code Splitting)

В рамках Feature-Sliced Design (FSD) и Redux Toolkit Query мы используем строгую архитектуру инъекции эндпоинтов (**Code Splitting**). Это позволяет:
1. Иметь единое состояние кэша для всего приложения: каждый `createApi` — это отдельный кэш, reducer и middleware, а теги (`providesTags` / `invalidatesTags`) работают только внутри одного api.
2. Централизованно обрабатывать глобальные ошибки (истечение сессии при 401) в одном base query.
3. Избежать циклических зависимостей между разными `entities`.

---

## 🛑 Главное правило:
`createApi` вызывается **один раз** — в `shared/api/backend/base.api.ts`.
Все сущности вызывают только `baseApi.injectEndpoints({ ... })`.

**Запрещено** вызывать `createApi` в `entities`, `features`, `widgets` (в том числе отдельный `authApi`).
**Исключение:** внешний сервис с другим `baseUrl` — свой `createApi` в `shared/api/<service>/<service>.api.ts`.

---

## 🗂 Файловая структура API-ядра

```text
src/
├── shared/
│   └── api/backend/
│       ├── tags.config.ts              # Глобальный реестр тегов
│       ├── session-expired.action.ts   # Action истечения сессии (401)
│       ├── base.api.ts                 # Единственный createApi + auth guard
│       └── index.ts                    # Public API слоя
└── entities/
    └── [entity-name]/
        └── api/
            ├── [entity-name].service.ts # baseApi.injectEndpoints
            └── index.ts                 # Public API сервиса
```

---

## Пошаговое руководство по архитектуре API

### Шаг 1. Глобальный реестр тегов (Shared Layer)
`shared/api/backend/tags.config.ts`

Для корректной работы инвалидации `providesTags / invalidatesTags` все возможные теги собираются в централизованный конфиг.

```typescript
export const ENUM_API_TAGS = {
	USER: "User",
	BOOKING_ORDERS: "Booking Orders",
    // и другие теги...
} as const;
```

### Шаг 2. Action истечения сессии (Shared Layer)
`shared/api/backend/session-expired.action.ts`

Action объявлен в shared, поэтому `baseApi` не импортирует ничего из `entities`. Auth slice подписывается на него через `extraReducers`.

```typescript
import { createAction } from "@reduxjs/toolkit";

export const sessionExpired = createAction("api/sessionExpired");

// entities/auth/model/auth.slice.ts
// extraReducers: (builder) => {
// 	builder.addCase(sessionExpired, () => initialState);
// }
```

### Шаг 3. Базовый API с auth guard (Shared Layer)
`shared/api/backend/base.api.ts`

Единственный `createApi` проекта. Base query оборачивает `fetchBaseQuery` и при 401 диспатчит `sessionExpired()`.

```typescript
import {
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

export const baseApi = createApi({
	baseQuery: baseQueryWithAuthGuard,
	reducerPath: "baseApi",
	endpoints: () => ({}),
	tagTypes: Object.values(ENUM_API_TAGS)
});
```

### Шаг 4. Внедрение эндпоинтов (Entities Layer)
`entities/[entity-name]/api/[entity-name].service.ts`

Финальный этап в целевой сущности: импортируем `baseApi` и вызываем `injectEndpoints`. Этот код становится публичным сервисом сущности.

```typescript
import { baseApi, ENUM_API_TAGS } from "@/shared/api/backend";

export const entityApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getEntityList: builder.query<TResponse, TFilters>({
			query: (filters) => ({ url: "/entity/list" }),
			providesTags: [ENUM_API_TAGS.ENTITY_TAG]
		})
	})
});

export const { useGetEntityListQuery } = entityApi;
```
