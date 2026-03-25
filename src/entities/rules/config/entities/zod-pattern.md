# Архитектурный паттерн: Валидация и типизация (Zod)

В Feature-Sliced Design (FSD), мы используем Zod как детерминированный слой валидации. Это обеспечивает:

- Типобезопасность в рантайме.
- Единый источник истины (типы генерируются из схем).
- Централизованную локализацию ошибок через типизированные ключи.

---

## 🛑 Главное правило

Любая валидация пользовательского ввода (формы) или входящих данных API должна быть описана через Zod-схемы в директории `src/entities/[entity-name]/schema/`.

---

## 🗂 Файловая структура Entity-слоя

```text
src/entities/[entity-name]/
├── schema/          # Схемы валидации
│   ├── [entity-name].schema.ts
│   └── index.ts
├── types/           # Типы данных
│   ├── [entity-name].types.ts
│   └── index.ts
└── index.ts         # Public API
```

---

## Пошаговое руководство

### Шаг 1. Определение схемы (Schema Layer)

`src/entities/[entity-name]/schema/[entity-name].schema.ts`

Используем `i18nKey` для обеспечения строгого соответствия ключей перевода.

```typescript
import { z } from "zod";
import { type TEntityPageKeys, i18nKey } from "@/shared/config";
import { ENUM_FORM_ENTITY } from "../types";

const msg = i18nKey<TEntityPageKeys>();

export const ENTITY_SCHEMA = z.object({
    [ENUM_FORM_ENTITY.DESCRIPTION]: z
        .string()
        .trim()
        .min(1, { message: msg("form.errors.required") })
});
```

### Шаг 2. Вывод типов (Types Layer)

`src/entities/[entity-name]/types/[entity-name].types.ts`

Типы выводятся автоматически из схем с помощью `z.infer`.

```typescript
import { z } from "zod";
import type { ENTITY_SCHEMA } from "../schema";

export const ENUM_FORM_ENTITY = {
    DESCRIPTION: "description",
} as const;

export type TEntitySchema = z.infer<typeof ENTITY_SCHEMA>;
```

---

### Шаг 3. Интеграция с формой (UI Layer)

`src/widgets/[entity-name]/ui/[entity-name].tsx`

Используем `zodResolver` для интеграции с `react-hook-form`.

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TEntitySchema, ENTITY_SCHEMA } from "@/entities/entity-name";

const form = useForm<TEntitySchema>({
    resolver: zodResolver(ENTITY_SCHEMA),
    mode: "onSubmit"
});
```
