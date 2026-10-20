# Архитектурный паттерн: Валидация и типизация (Zod)

В Feature-Sliced Design (FSD) Zod — детерминированный слой валидации:

- Типобезопасность в рантайме.
- Единый источник истины: типы форм выводятся через `z.infer`.
- Локализованные ошибки через типизированные ключи `i18nKey`.

---

## 🛑 Главные правила

1. Любая валидация пользовательского ввода описывается Zod-схемами в `src/entities/[entity-name]/schema/`.
2. **`schema/` содержит только runtime-схемы** — запрещено экспортировать `z.infer` / `export type T…Schema` из schema-файлов.
3. **`types/` содержит** `ENUM_FORM_*`, `ENUM_FORM_*_TYPE`, `z.infer` и связанные form-типы.
4. **Строго пара файлов на операцию**: `[entity-name]-[op].schema.ts` ↔ `[entity-name]-[op]-form.types.ts` (create / update / delete / reject …). Групповых файлов (`*-forms.schema.ts`, общий `*-form.types.ts`) нет.
5. **Импорты без цикла**:
   - schema импортирует `ENUM_FORM_*` **по прямому пути к файлу**: `from "../types/[entity-name]-[op]-form.types"` — не через barrel `../types`;
   - types импортирует схему **только** через `import type … from "../schema"` (стирается при компиляции).

   В рантайме зависимость односторонняя: `schema → form.types`. Schema не тянет весь barrel `types` (backend-адаптеры, enum и т.д.).

---

## 🗂 Файловая структура

```text
src/entities/[entity-name]/
├── schema/
│   ├── [entity-name]-create.schema.ts
│   ├── [entity-name]-update.schema.ts
│   └── index.ts
├── types/
│   ├── [entity-name]-create-form.types.ts   # ENUM_FORM_*_CREATE + z.infer
│   ├── [entity-name]-update-form.types.ts   # ENUM_FORM_*_UPDATE + z.infer
│   ├── [entity-name].interface.ts
│   └── index.ts
└── index.ts
```

---

## Пошаговое руководство

### Шаг 1. Types (`ENUM_FORM_*` + `z.infer`)

`src/entities/[entity-name]/types/[entity-name]-create-form.types.ts`

```typescript
import type { FieldValues } from "react-hook-form";
import { z } from "zod";

import type { ENTITY_CREATE_SCHEMA } from "../schema";

export const ENUM_FORM_ENTITY_CREATE = {
    DESCRIPTION: "description",
} as const;

export type ENUM_FORM_ENTITY_CREATE_TYPE =
    (typeof ENUM_FORM_ENTITY_CREATE)[keyof typeof ENUM_FORM_ENTITY_CREATE];

export type TEntityCreateSchema = z.infer<typeof ENTITY_CREATE_SCHEMA> &
    FieldValues;
```

### Шаг 2. Schema (runtime only)

`src/entities/[entity-name]/schema/[entity-name]-create.schema.ts`

```typescript
import { z } from "zod";
import { type TEntityPageKeys, i18nKey } from "@/shared/config";

// прямой путь к form.types — не barrel "../types"
import { ENUM_FORM_ENTITY_CREATE } from "../types/entity-create-form.types";

const msg = i18nKey<TEntityPageKeys>();
const F = ENUM_FORM_ENTITY_CREATE;

export const ENTITY_CREATE_SCHEMA = z.object({
    [F.DESCRIPTION]: z
        .string()
        .trim()
        .min(1, { message: msg("form.errors.required") })
});
```

### Шаг 3. Форма

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TEntityCreateSchema, ENTITY_CREATE_SCHEMA } from "@/entities/entity-name";

const form = useForm<TEntityCreateSchema>({
    resolver: zodResolver(ENTITY_CREATE_SCHEMA),
    mode: "onSubmit"
});
```

---

## Антишаблоны

- `export type TEntitySchema = z.infer<…>` внутри `*.schema.ts`
- `import { ENUM_FORM_* } from "../types"` в schema (barrel → риск цикла и лишние зависимости)
- Value-импорт схемы в types (`import { ENTITY_CREATE_SCHEMA } from "../schema"`) вместо `import type`
- Один общий `[entity]-form.types.ts` или `[entity]-forms.schema.ts` на несколько операций
- Одна «божественная» схема на все CRUD-операции, если поля и refine различаются
- Дублирование form-полей строками вместо `ENUM_FORM_*`
