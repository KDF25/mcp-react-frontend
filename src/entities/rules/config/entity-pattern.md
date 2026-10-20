# Entity Architecture Pattern

Сущность (Entity) — это фундаментальный блок бизнес-логики. В нашем проекте сущности имеют строгую внутреннюю структуру.

## Файловая структура
```text
src/entities/[entity-name]/
├── api/             # RTK Query сервисы (*.service.ts) → baseApi.injectEndpoints
├── types/           # Интерфейсы и типы
│   ├── index.ts                         # Экспорт всех типов (включая T*Backend)
│   ├── [entity-name]-backend.interface.ts # Только type T*Backend = <schema из backend.types>
│   ├── [entity-name].interface.ts       # I* frontend (domain) модели
│   ├── [entity-name]-[op]-form.types.ts # ENUM_FORM_* + z.infer (пара к schema)
│   └── *.types.ts                       # Enums и вспомогательные типы
├── schema/          # Валидация данных ([entity-name]-[op].schema.ts)
├── converters/      # Мапперы данных DTO <-> Domain (*.converters.ts)
├── hooks/           # Хуки сущности (use-x.ts, функция useX)
├── slice/           # Локальный стейт Redux/Zustand (*.slice.ts)
├── ui/              # "Глупые" компоненты отображения
└── index.ts         # Public API сущности
```

## Валидация и Типизация (Zod + i18n)

Правила и примеры — в паттерне **zod-pattern** (`get_pattern_doc { id: "zod-pattern" }`):
пара файлов на операцию (`[entity]-[op].schema.ts` ↔ `[entity]-[op]-form.types.ts`), schema импортирует `ENUM_FORM_*` по прямому пути к файлу, types импортирует schema только через `import type`.

## Данные и Конвертеры (Mapping)

UI никогда не работает с "сырыми" данными от API напрямую. Всегда используется маппинг.

### Пример: tour.converters.ts
```typescript
export const mapTourToFrontend = (data: TTourBackend): ITourCard => ({
    id: data.id,
    title: data.title,
    priceFrom: data.price_from, // snake_case -> camelCase
    // ...
});

export const mapTourToBackend = (data: Partial<ITourCard>): Partial<TTourBackend> => ({
    title: data.title,
    price_from: data.priceFrom,
    // ...
});
```
