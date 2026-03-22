# Архитектурный паттерн: Создание API (RTK Query Code Splitting)

В рамках Feature-Sliced Design (FSD) и Redux Toolkit Query, мы используем строгую архитектуру инъекции эндпоинтов (**Code Splitting**). Это позволяет:
1. Иметь единое состояние кэша для всего приложения.
2. Централизованно управлять перехватом глобальных ошибок (сброс сессии при 401).
3. Избежать циклических зависимостей между разными `entities`.

---

## 🛑 Главное правило:
**Запрещено** использовать `createApi` внутри папок конкретных бизнес-сущностей или виджетов!
Разрешено использовать только метод `.injectEndpoints({ ... })` от корневого модуля авторизации.

---

## 🗂 Файловая структура API-ядра

```text
src/
├── shared/
│   └── api/backend/
│       ├── tags.config.ts    # Глобальный реестр тегов
│       ├── base.api.ts       # Базовый инстанс (чистый fetch)
│       └── index.ts          # Public API слоя
├── entities/
│   ├── auth/
│   │   └── api/
│   │       ├── auth-base-query.ts # Middleware (обработка 401)
│   │       ├── auth.api.ts        # Родительский инстанс API
│   │       └── index.ts           # Public API авторизации
│   └── [entity-name]/
│       └── api/
│           ├── [entity-name].service.ts # Внедрение эндпоинтов
│           └── index.ts                 # Public API сервиса
```

---

## Пошаговое руководство по архитектуре API

### Шаг 1. Глобальный реестр тегов (Shared Layer)
`shared/api/backend/tags.config.ts`

Для корректной работы инвалидации `providesTags / invalidatesTags`, все возможные теги собираются в централизованный конфиг.

```typescript
export const ENUM_API_TAGS = {
	USER: "User",
	BOOKING_ORDERS: "Booking Orders",
    // и другие теги...
} as const;
```

### Шаг 2. Базовый API инстанс (Shared Layer)
`shared/api/backend/base.api.ts`

Самый нижний уровень сетевых запросов. Никаких перехватчиков, только чистый `fetchBaseQuery` и регистрация глобальных тегов.

```typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
});
```

### Шаг 3. Перехватчик Авторизации (Entities Layer)
`entities/auth/api/auth-base-query.ts`

Обертка (Middleware) над базовым запросом. Позволяет централизованно обработать потерю сессии (например, ошибку 401) и выполнить `logout()` на всё приложение.

```typescript
import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@/shared/config";
import { logout } from "@/entities/user/slice/user.slice";

export const authBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	const baseQuery = fetchBaseQuery({ baseUrl: ENV.VITE_API_URL, credentials: "include" });
	const result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		api.dispatch(logout());
	}
	return result;
};
```

### Шаг 4. Авторизованный API инстанс (Entities Layer)
`entities/auth/api/auth.api.ts`

Инициализация защищенного API-инстанса (обычно экспортируется из сущности `auth`), использующего кастомный `authBaseQuery`.

```typescript
import { createApi } from "@reduxjs/toolkit/query/react";
import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import { authBaseQuery } from "./auth-base-query";

export const authApi = createApi({
	baseQuery: authBaseQuery,
	reducerPath: "authApi",
	endpoints: () => ({}),
	tagTypes: Object.values(ENUM_API_TAGS)
});
```

### Шаг 5. Внедрение Эндпоинтов (Entities Layer)
`entities/[entity-name]/api/[entity-name].service.ts`

Финальный этап в целевой сущности. Мы импортируем `authApi` и вызываем `injectEndpoints`. Этот код и становится публичным сервисом сущности.

```typescript
import { authApi } from "@/entities/auth/api/auth.api";
import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";

export const entityApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getEntityList: builder.query<TResponse, TFilters>({
			query: (filters) => ({ url: "/entity/list" }),
			providesTags: [ENUM_API_TAGS.ENTITY_TAG]
		})
	})
});

export const { useGetEntityListQuery } = entityApi;
```
