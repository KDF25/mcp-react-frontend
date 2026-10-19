# Архитектурный паттерн: Mock Server (MSW)

MSW имитирует сеть на уровне Service Worker / Node. Моки должны повторять **backend-контракт**, чтобы RTK Query + converters работали так же, как с реальным API.

---

## 🛑 Главные правила

1. Не оставляйте MSW в production: флаг `.env` + условие старта.
2. Ответы handlers — **backend DTO**, не frontend-модели и не готовый `{ data, total }`, если service делает `transformResponse` через converters.
3. Используйте общий `createMockHandler` и `ENV.VITE_BASE_URL`.
4. Stateful mock store + `reset*Store` — **опционально** (нужен для мутаций и изоляции тестов). Для read-only достаточно seed-массива.

---

## 🗂 Структура

```text
src/
├── app/init/msw.ts
├── entities/[entity-name]/
│   ├── handlers/[entity-name].handlers.ts
│   └── mock/
│       ├── [entity-name].mock.ts      # seed (backend DTO)
│       └── [entity-name].store.ts     # optional
└── shared/api/msw/
    ├── utils.ts        # createMockHandler, error helpers
    ├── browser.ts
    ├── server.ts       # setupServer for Vitest
    └── handlers.ts     # registry
```

---

## createMockHandler

```typescript
// shared/api/msw/utils.ts
export const createMockHandler = <TBody>(
  endpoint: { url: string; method: "GET" | "POST" | …; _types: { body: TBody } },
  resolver: (args: { body; query; params; request }) => Response
) => /* BASE_URL + delay + JSON parse */;
```

- `MODE === "test"` → delay `0`
- Ошибки: `mockValidationError` (422), `mockNotFound` (404)

---

## Seed (backend DTO)

```typescript
import type { TEntityBackend } from "../types";

export const ENTITY_MOCK: TEntityBackend[] = [
  { id: "1", full_name: "John Doe", created_at: "…", status_code: "active" }
];
```

## Handlers

```typescript
createMockHandler({ url: "/entities", method: "GET", _types: { body: undefined } }, ({ query }) => {
  return HttpResponse.json(listEntitiesBackend({ /* backend query */ }));
});
```

## Registry + browser + server

```typescript
// shared/api/msw/handlers.ts
export const handlers = [...entityOneHandlers, ...entityTwoHandlers];

// browser.ts
export const worker = setupWorker(...handlers);

// server.ts — Vitest
export const server = setupServer(...handlers);
```

## Init

```typescript
if (import.meta.env.DEV && ENV.VITE_ENABLE_MSW === "true") {
  const { worker } = await import("@/shared/api/msw/browser");
  return worker.start({ onUnhandledRequest: "bypass" });
}
```
