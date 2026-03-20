# Детальный разбор системы интернационализации (i18n)

Эта система является "финальной" и обеспечивает строгую типизацию ключей и консистентность переводов. Ниже приведен разбор каждого файла.

---

## 📂 Пространство имен: `src/shared/config/i18n`

### 1. `i18n-key.ts`
*   **Зачем в UI:** Предоставляет функцию-обертку для получения автодополнения ключей в IDE. Она гарантирует, что вы используете ключи только из определенного типа (Namespace).
*   **Зачем в MCP:** Служит маркером архитектурного соответствия. MCP проверяет, что строки в схемах Zod обернуты в `i18nKey`.
*   **Содержимое:**
```typescript
export const i18nKey =
    <Keys extends string>() =>
    <K extends Keys>(key: K) =>
        key;
```

### 2. `i18n.types.ts`
*   **Путь:** `src/shared/config/i18n/i18n.types.ts`
*   **Назначение:** Глубокая типизация ключей (Deep Typing). Позволяет TypeScript понимать вложенные пути через точку (например, `a.b.c`).
*   **Содержимое:**
```typescript
export type TDotPrefix<T extends string, P extends string> = P extends ""
    ? T
    : `${P}.${T}`;

export type TNestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & string]: ObjectType[Key] extends object
        ? TDotPrefix<TNestedKeyOf<ObjectType[Key]>, Key>
        : Key;
}[keyof ObjectType & string];
```

### 3. `i18n.d.ts`
*   **Путь:** `src/shared/types/i18n.d.ts`
*   **Назначение:** Глобальное переопределение типов `i18next`. Связывает вашу `TResources` с внутренней конфигурацией библиотеки, обеспечивая автодополнение ключей в хуке `useTranslation()`.
*   **Содержимое:**
```typescript
import "i18next";
import type { TResources } from "../config";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: TResources;
    }
}
```

### 4. `i18n.config.ts`
*   **Путь:** `src/shared/config/i18n/i18n.config.ts`
*   **Назначение:** Мастер-реестр всех ресурсов. Импортирует английские JSON как мастер-схему, определяет типы для каждого Namespace (`THeader`, `TCommon` и т.д.) и формирует общий тип `TResources`. Содержит массив `NS` (список всех активных пространств имен).

### 4. `i18n.blocks.ts`
*   **Путь:** `src/shared/config/i18n/i18n.blocks.ts`
*   **Назначение:** Организует namespaces в физические папки на диске (`locales/ru/booking/...`). 
*   **Критическая логика (`getNamespacePath`):**
```typescript
export const getNamespacePath = (lng: string, ns: string): string => {
    for (const block of Object.values(TRANSLATION_BLOCKS)) {
        if (block.namespaces.includes(ns)) {
            return block.folder
                ? `/locales/${lng}/${block.folder}/${ns}.json`
                : `/locales/${lng}/${ns}.json`;
        }
    }
    return `/locales/${lng}/${ns}.json`;
};
```

### 5. `i18n.checker.ts`
*   **Путь:** `src/shared/config/i18n/i18n.checker.ts`
*   **Назначение:** Статическая проверка типов консистентности переводов. Гарантирует, что во вторичных языках (RU) присутствуют все ключи из мастер-языка (EN).
*   **Содержимое:**
```typescript
import type { TResources } from "./i18n.config";
import common from "../../../../public/locales/ru/common.json";

export const RU_TRANSLATION_CHECKER: TResources = {
    common: common, // Ошибка TypeScript при несовпадении
    // ...
};
```

### 6. `i18n.init.ts`
*   **Путь:** `src/shared/config/i18n/i18n.init.ts`
*   **Назначение:** Инициализация `i18next` с настройкой детектора языка и динамической загрузкой чанков через `i18n.blocks.ts`.

---

## 📂 Папка: `src/shared/config/languages`

### 1. `languages.types.ts`
*   **Роль:** Определение `ENUM_LANGUAGES` (допустимые коды языков: `ru`, `en`). Используется как фундамент для всех остальных типов.

### 2. `languages.config.ts`
*   **Роль:** Список языков для UI-переключателей (label + value).
