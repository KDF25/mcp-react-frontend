# Архитектурный паттерн: Валидация и типизация (Zod)

В Feature-Sliced Design (FSD) Zod — детерминированный слой валидации:

- Типобезопасность в рантайме.
- Единый источник истины: типы форм выводятся через `z.infer`.
- Локализованные ошибки через типизированные ключи `i18nKey`.

---

## 🛑 Главные правила

1. Любая валидация пользовательского ввода описывается Zod-схемами в `src/entities/[entity-name]/schema/`.
2. **`schema/` содержит только runtime-схемы** — запрещено экспортировать `z.infer` / `export type T…Schema` из schema-файлов.
3. **`types/` содержит** `ENUM_FORM_*`, `z.infer` и связанные form-типы.
4. У одной сущности может быть **несколько схем** на операции: create / update / delete / reject и т.д.

---

## 🗂 Файловая структура

```text
src/entities/[entity-name]/
├── schema/
│   ├── [entity-name]-create.schema.ts
│   ├── [entity-name]-update.schema.ts
│   └── index.ts
├── types/
│   ├── [entity-name]-form.types.ts   # ENUM_FORM_* + z.infer
│   ├── [entity-name].interface.ts
│   └── index.ts
└── index.ts
```

---

## Пошаговое руководство

### Шаг 1. Schema (runtime only)

`src/entities/[entity-name]/schema/[entity-name]-create.schema.ts`

```typescript
import { z } from "zod";
import { type TEntityPageKeys, i18nKey } from "@/shared/config";
import { ENUM_FORM_ENTITY_CREATE } from "../types";

const msg = i18nKey<TEntityPageKeys>();
const F = ENUM_FORM_ENTITY_CREATE;

export const ENTITY_CREATE_SCHEMA = z.object({
    [F.DESCRIPTION]: z
        .string()
        .trim()
        .min(1, { message: msg("form.errors.required") })
});
```

### Шаг 2. Types (`z.infer` + form enums)

`src/entities/[entity-name]/types/[entity-name]-form.types.ts`

```typescript
import type { FieldValues } from "react-hook-form";
import { z } from "zod";
import type { ENTITY_CREATE_SCHEMA, ENTITY_UPDATE_SCHEMA } from "../schema";

export const ENUM_FORM_ENTITY_CREATE = {
    DESCRIPTION: "description",
} as const;

export type TEntityCreateSchema = z.infer<typeof ENTITY_CREATE_SCHEMA> & FieldValues;
export type TEntityUpdateSchema = z.infer<typeof ENTITY_UPDATE_SCHEMA> & FieldValues;
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
- Одна «божественная» схема на все CRUD-операции, если поля и refine различаются
- Дублирование form-полей строками вместо `ENUM_FORM_*`
