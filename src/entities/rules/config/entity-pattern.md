# Entity Architecture Pattern

Сущность (Entity) — это фундаментальный блок бизнес-логики. В нашем проекте сущности имеют строгую внутреннюю структуру.

## Файловая структура
```text
src/entities/[entity-name]/
├── api/             # RTK Query сервисы (*.service.ts)
├── types/           # Интерфейсы и типы
│   ├── index.ts     # Экспорт всех типов
│   ├── *.interface.ts # Backend (raw) и Frontend (UI) модели
│   └── *.types.ts    # Enums и вспомогательные типы
├── schema/          # Валидация данных (*.schema.ts)
├── converters/      # Мапперы данных (*.converters.ts)
├── constants/       # Константы и конфигурации
├── ui/              # "Глупые" компоненты отображения
└── index.ts         # Public API сущности
```

## Валидация и Типизация (Zod + i18n)

Мы используем типизированную систему сообщений об ошибках в Zod-схемах.

### Пример: account.schema.ts
```typescript
import { z } from "zod";
import { type TAccountSettingsPageKeys, i18nKey } from "@/shared/config";
import { ENUM_FORM_ACCOUNT } from "../types";

const msg = i18nKey<TAccountSettingsPageKeys>();

export const ACCOUNT_SCHEMA = z.object({
    [ENUM_FORM_ACCOUNT.LOGIN]: z
        .string()
        .min(1, { message: msg("form.personal.fields.login.errors.required") })
        .min(3, { message: msg("form.personal.fields.login.errors.min") }),
    // ...
});
```

### Пример: account.types.ts
```typescript
import type z from "zod";
import type { ACCOUNT_SCHEMA } from "../schema";

export const ENUM_FORM_ACCOUNT = {
    LOGIN: "login",
    // ...
} as const;

export type TAccountSchema = z.infer<typeof ACCOUNT_SCHEMA>;
```

## Данные и Конвертеры (Mapping)

UI никогда не работает с "сырыми" данными от API напрямую. Всегда используется маппинг.

### Пример: tour.converters.ts
```typescript
export const mapTourToFrontend = (data: ITourBackend): ITourCard => ({
    id: data.id,
    title: data.title,
    priceFrom: data.price_from, // snake_case -> camelCase
    // ...
});

export const mapTourToBackend = (data: Partial<ITourCard>): Partial<ITourBackend> => ({
    title: data.title,
    price_from: data.priceFrom,
    // ...
});
```
