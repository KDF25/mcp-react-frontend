# Shared Utils & Hooks Patterns

В слое `shared` собраны утилиты и хуки, которые являются стандартом проекта. Повторная реализация этой логики запрещена.

## Утилиты форматирования

### 1. format-to-dollars.ts
Форматирование чисел в денежный формат USD.
```typescript
export const formatToDollars = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(value);
};
```

### 2. format-date.ts
Стандартизированный вывод дат. Использовать вместе с `date-fns`.

### 3. value-to-label.ts
Преобразование значений Enums в человекочитаемые подписи (labels) для UI.

## Стационарные хуки

Файлы хуков — kebab-case (`use-x.ts`), функция внутри — `useX`. Расширение `.tsx` — только если хук возвращает JSX.

### 1. use-mobile.ts (`useMobile`)
Определение мобильного устройства на основе медиа-запросов.

### 2. use-debounce.ts (`useDebounce`)
Стандартный хук для устранения дребезга при вводе данных.

### 3. use-file-upload.ts (`useFileUpload`)
Сложная логика загрузки файлов с поддержкой прогресса и валидации типов.

## Правила
*   **Запрет на дублирование**: Если вам нужна утилита для форматирования — сначала проверьте `shared/lib/utils`.
*   **Импорты**: Всегда импортируйте через алиасы (`@/shared/lib/utils`, `@/shared/lib/hooks`).
*   **Чистота**: Утилиты должны быть чистыми функциями (Stateless).
