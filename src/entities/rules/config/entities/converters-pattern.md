# Архитектурный паттерн: Конвертеры данных (DTO <-> Domain)

В рамках Feature-Sliced Design (FSD), мы используем строгую изоляцию бэкенд-моделей (DTO) от фронтенд-моделей (Domain Models). Это позволяет:
- Защитить UI от изменений в API бэкенда.
- Проводить семантическое переименование полей (snake_case -> camelCase).
- Инкапсулировать сложную логику трансформации (форматирование дат, объединение полей).
- Типизировать фильтры запросов отдельно от стейта UI.

---

## 🛑 Главное правило:
**Запрещено** использовать сырые данные от сервера (DTO) напрямую в UI-компонентах. Любые данные, приходящие через RTK Query или отправляемые на сервер, должны проходить через слой конвертации в `src/entities/[entity-name]/converters/`.

---

## 🗂 Файловая структура Entity-слоя

```text
src/entities/[entity-name]/
├── api/             # RTK Query сервисы
├── converters/      # Мапперы данных
│   ├── [entity-name].converters.ts
│   └── index.ts
├── types/           # Контракты данных
│   ├── [entity-name].backend.interface.ts # Слой DTO (Raw API)
│   ├── [entity-name].interface.ts         # Слой UI (Domain)
│   └── index.ts
└── index.ts         # Public API сущности
```

---

## Пошаговое руководство по созданию конвертеров

### Шаг 1. Определение типов (Types Layer)
`src/entities/[entity-name]/types/`

Мы четко разделяем то, что приходит с бэкенда, и то, с чем работает фронтенд.

```typescript
// [entity-name].backend.interface.ts
export interface IEntityBackend {
    id: string;
    full_name: string;
    created_at: string;
    status_code: string;
}

// [entity-name].interface.ts
export interface IEntity {
    id: string;
    fullName: string;
    date: string;
    status: string;
}
```

### Шаг 2. Реализация мапперов (Converters Layer)
`src/entities/[entity-name]/converters/[entity-name].converters.ts`

Реализуем чистые функции трансформации.

```typescript
import { formatDate } from "@/shared/lib/utils";
import { type IEntityBackend, type IEntity } from "../types";

export const mapEntityToFrontend = (data: IEntityBackend): IEntity => ({
    id: data.id,
    fullName: data.full_name,
    date: formatDate(data.created_at),
    status: data.status_code
});

export const mapEntityToBackend = (data: Partial<IEntity>): Partial<IEntityBackend> => ({
    id: data.id,
    full_name: data.fullName,
    created_at: data.date,
    status_code: data.status
});
```

---

### Шаг 3. Интеграция с RTK Query (API Layer)
`src/entities/[entity-name]/api/[entity-name].service.ts`

Используем конвертер в методе `transformResponse` или при подготовке `body/params`.

```typescript
import { authApi } from "@/entities/auth/api/auth.api";
import { 
    mapEntityFiltersToBackend, 
    mapEntityToFrontend 
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
        })
    })
});
```

---

### Шаг 4. Мутации и маппинг в Body (Front to Back)
`src/entities/[entity-name]/api/[entity-name].service.ts`

При отправке данных на сервер мы используем маппинг из фронтенд-модели в DTO бэкенда.

```typescript
import { authApi } from "@/entities/auth/api/auth.api";
import { mapEntityToBackend } from "../converters";

export const entityApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        updateEntity: builder.mutation<void, IEntity>({
            query: (body) => ({
                url: "/entity/update",
                method: "POST",
                body: mapEntityToBackend(body)
            })
        })
    })
});
```
