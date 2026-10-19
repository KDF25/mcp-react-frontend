# Архитектурный паттерн: Конвертеры данных (DTO ↔ Domain)

Строгая изоляция backend DTO от frontend domain-моделей:

- UI не зависит от имён полей API.
- snake_case → camelCase и форматирование дат инкапсулированы.
- Пагинация и фильтры мапятся здесь же.

---

## 🛑 Главные правила

1. **Запрещено** использовать сырые DTO в UI.
2. Имена функций: `map{Thing}ToFrontend` / `map{Thing}ToBackend` (например `mapOrdersToFrontend`, `mapCreatePromocodeToBackend`).
3. **Не требуются** литеральные имена `mapToFrontend` / `mapToBackend`.
4. List-сценарии: frontend всегда `{ data, total }` через `IPaginationResponse`; backend envelope — только в converters.
5. **Конвертеры живут только на границе API** — вызываются из `entities/*/api/*.service.ts` (`transformResponse`, `body`/`params`). В pages / widgets / features / `entities/*/ui` их импортировать **запрещено**: в компонент уже приходят frontend-модели.
6. **Backend-типы только как `T*Backend`** из `../types`. Запрещён импорт schema из `generated/Api` в converters (см. OpenAPI pattern).

---

## 🚫 Forbidden in UI

| Запрещено | Почему |
|---|---|
| `import { … } from "../converters"` / `@/entities/x/converters` | Mapping уже выполнен в RTK Query |
| `import { mapOrdersToFrontend } from "@/entities/order"` | Даже через barrel — утечка API-границы |
| Типы `T*Backend` в props/state компонента | UI работает с domain `I*` |
| Повторный `map*` в feature/widget «на всякий случай» | Дублирование и рассинхрон с service |

**Разрешено:** `entities/*/api/**`, сам сегмент `converters/**`, тесты.

**Public API сущности (`index.ts`)** не реэкспортирует `converters` — только `api`, `types` (frontend), `schema`, при необходимости `ui`.

---

## 🔧 ESLint (обязательный gate в CI)

Converters **не должны выходить за пределы entity**. В проекте потребителя настройте:

1. **`no-restricted-imports`** — запрет `@/entities/*/converters(**)` (alias/public path).
2. **`eslint-plugin-boundaries`** — типы `entity-converters` / `entity-api` с `capture: ["entity"]`; импорт converters разрешён только из `api` **той же** сущности.
3. В `api/*.service.ts` импорт только относительный: `from "../converters"`.

Полный сниппет: docs Converters → ESLint / `eslint-converters-boundary.md`.

---

## 🗂 Структура

```text
src/entities/[entity-name]/
├── api/                 # Единственный потребитель converters
│   └── *.service.ts
├── converters/          # Внутренний сегмент (не в public barrel)
│   ├── [entity-name].converters.ts
│   └── index.ts
├── types/
│   ├── [entity-name]-backend.interface.ts   # T*Backend aliases only
│   ├── [entity-name].interface.ts           # I* domain models
│   └── index.ts
src/shared/types/
└── pagination.types.ts
```

---

## Примеры

### RTK Query (единственное правильное место вызова)

```typescript
getEntities: builder.query<IPaginationResponse<IEntity>, IPaginationRequest>({
    query: (filters) => ({
        url: "/entity/list",
        params: mapEntitiesQueryToBackend(filters)
    }),
    transformResponse: (response: TEntitiesBackend) =>
        mapEntitiesToFrontend(response)
})
```

### UI (корректно)

```typescript
// ❌ import { mapEntityToFrontend } from "@/entities/entity/converters";
const { data } = useGetEntitiesQuery(filters);
// data: IPaginationResponse<IEntity> — уже frontend
```
