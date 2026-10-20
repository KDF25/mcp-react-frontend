# Архитектурный паттерн: OpenAPI codegen + T*Backend

Строгий контракт между сгенерированным OpenAPI и FSD entity.

---

## 🛑 Главное правило

1. `backend.types.ts` — **сырьё codegen**, не доменная модель.
2. Schema-типы из `backend.types.ts` импортируются **только** в `src/entities/<entity>/types/**` (обычно `*-backend.interface.ts`).
3. Там они превращаются в **`T*Backend`** (и при необходимости value re-export enum).
4. `converters/`, `api/`, `handlers/`, `mock/`, UI — используют **только** `T*Backend` / frontend `I*` из `../types`.
5. **Запрещено** импортировать schema из `backend.types.ts` / `@/shared/api` (реэкспорт backend.types) в converters и api.
6. **PATHS** (`*.paths.ts`) — не schema DTO; их можно импортировать в `api/` и `handlers/` (url/method/`_types`).

---

## Pipeline

```text
VITE_BASE_URL/openapi.json
        │
        ├─ codegen:types  → shared/api/generated/backend.types.ts
        └─ codegen:paths  → shared/api/generated/paths/<tag>.paths.ts
                                    │
                                    ▼
              entities/<e>/types/*-backend.interface.ts
                    export type TFooBackend = FooResponse
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
              converters/                     api/*.service.ts
           (T*Backend ↔ I*)              (PATHS + transformResponse)
```

### npm scripts

```json
{
  "codegen:types": "tsx --env-file=.env scripts/generate-api-types.ts",
  "codegen:paths": "tsx --env-file=.env scripts/generate-api-paths.ts",
  "codegen": "npm run codegen:types && npm run codegen:paths"
}
```

---

## Adapter в types (единственная точка входа к backend.types.ts)

```typescript
// entities/promocode/types/promocode-backend.interface.ts
import type {
  CreatePromocodeRequest,
  PromocodeResponse,
  ReadPromocodesResponse
} from "@/shared/api/generated/backend.types";
import { ADMIN_PROMOCODE_PATHS } from "@/shared/api/generated/paths/admin-promocode.paths";

export type TPromocodeBackend = PromocodeResponse;
export type TPromocodesBackend = ReadPromocodesResponse;
export type TCreatePromocodeRequestBackend = CreatePromocodeRequest;
export type TSetPromocodeActiveQueryBackend =
  typeof ADMIN_PROMOCODE_PATHS.setPromocodeActive._types.query;

/** Runtime enum: re-export ONLY from types, not from backend.types in converters */
export { PromocodeDiscountType } from "@/shared/api/generated/backend.types";
export type TPromocodeDiscountTypeBackend = import("@/shared/api/generated/backend.types").PromocodeDiscountType;
```

### converters / api — правильно

```typescript
import type { TPromocodeBackend } from "../types";
import { PromocodeDiscountType } from "../types"; // value через types, не из backend.types
```

`T*Backend` и runtime enum из `types` могут попасть в public barrel сущности — это допустимо. UI их не использует: компоненты работают с frontend `I*` и frontend-enum.

### converters / api — запрещено

```typescript
import type { PromocodeResponse } from "@/shared/api";
import { OrderStatus } from "@/shared/api/generated/backend.types";
```

---

## Public barrel shared/api

**Не** делайте `export * from "./generated/backend.types"` в публичном `@/shared/api`, либо ограничьте ESLint.

Разрешённый публичный surface: `baseApi`, tags, PATHS, utils.  
backend.types.ts — только через явный путь и только из `entities/*/types`.

---

## ESLint

См. `eslint-openapi-types-boundary.md` и docs `/openapi`.
