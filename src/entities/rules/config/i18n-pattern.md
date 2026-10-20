# i18n Pattern Template

Этот паттерн обеспечивает строгую типизацию ключей и автоматическую проверку соответствия переводов.

## Структура папки

`src/shared/config/i18n/` — общие файлы для обоих стеков:

- `index.ts`
- `i18n.config.ts`
- `i18n.types.ts`
- `i18n-key.ts`
- `i18n.checker.ts`

Дополнительно по стеку:

| Стек | Обязательные файлы |
|---|---|
| **Vite** (`react-i18next`) | `shared/config/i18n/i18n.init.ts`, `i18n.blocks.ts`, `change-language.ts` |
| **Next.js** (`next-intl`) | `src/i18n/request.ts` (`getRequestConfig`), `src/i18n/routing.ts` |

### Где лежат JSON-переводы

| Стек | Корень файлов |
|---|---|
| **Vite** (`react-i18next`) | `public/locales/[lng]/` — грузятся по HTTP через `i18next-http-backend` |
| **Next.js** (`next-intl`) | `messages/[lng]/` (рекомендуется) или `public/locales/[lng]/` |

На Next оба варианта допустимы, если `request.ts` грузит JSON через `import()` (а не по HTTP). Пути в `i18n.config.ts` и `i18n.checker.ts` должны указывать на тот же корень.

## Содержимое файлов

### 1. i18n-key.ts

Позволяет создавать типизированные хелперы для ключей в конкретных компонентах.

```typescript
export const i18nKey =
	<Keys extends string>() =>
	<K extends Keys>(key: K) =>
		key;
```

### 2. i18n.types.ts

Хелперы для извлечения вложенных ключей.

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

### 3. i18n.config.ts

Импортируются английские JSON (как эталон) через `import type` и формируются типы.

**Vite** — путь к `public/locales`:

```typescript
import type common from "../../../../public/locales/en/common.json";
import type { TNestedKeyOf } from "./i18n.types";

export type TCommon = typeof common;
export type TResources = {
	common: TCommon;
	// ...
};

export const NS = ["common"] as const;
export type TNS = (typeof NS)[number];
export type TCommonKeys = TNestedKeyOf<TCommon>;
```

**Next.js** — путь к `messages`:

```typescript
import type common from "../../../../messages/en/common.json";
import type { TNestedKeyOf } from "./i18n.types";

export type TCommon = typeof common;
export type TResources = {
	common: TCommon;
	// ...
};

export const NS = ["common"] as const;
```

### 4. i18n.blocks.ts

Карта путей для динамической загрузки JSON.

```typescript
interface ITranslationBlock {
	folder: string;
	namespaces: string[];
}

export const TRANSLATION_BLOCKS: Record<string, ITranslationBlock> = {
	shared: {
		folder: "",
		namespaces: ["common"]
	}
};

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

### 5. i18n.init.ts

Инициализация i18next с backend и детекцией.

```typescript
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { getNamespacePath } from "./i18n.blocks";
import { NS } from "./i18n.config";

i18n.use(HttpBackend)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		ns: [...NS],
		defaultNS: NS[0],
		backend: {
			// Без allowMultiLoading (по умолчанию false) backend вызывает loadPath
			// отдельно для каждой пары язык + namespace — в массивах ровно по одному элементу.
			loadPath: (languages: string[], namespaces: string[]) =>
				getNamespacePath(languages[0], namespaces[0])
		}
	});

export default i18n;
```

### 6. i18n.checker.ts

Статическая проверка в обе стороны:

- в RU JSON не хватает ключа, который есть в EN — ошибка TS;
- в RU JSON есть **лишний** ключ, которого нет в EN — тоже ошибка TS.

`satisfies` ловит только отсутствующие ключи и несовпадение типов: `{} as typeof common` — не объектный литерал, поэтому лишние свойства он пропускает. Лишние ключи проверяются отдельно через `TNestedKeyOf`.

```typescript
// Путь к JSON — тот же корень, что в i18n.config.ts:
// Vite:  ../../../../public/locales/ru/common.json
// Next:  ../../../../messages/ru/common.json (или public/locales)
import type common from "../../../../messages/ru/common.json";
import type { TCommonKeys, TResources } from "./i18n.config";
import type { TNestedKeyOf } from "./i18n.types";

/** Ошибка компиляции, если T не never — в сообщении видны проблемные ключи */
type TAssertNoKeys<T extends never> = T;

export const RU_TRANSLATION_CHECKER = {
	common: {} as typeof common
} satisfies TResources;

export type TRuCommonMissingKeys = TAssertNoKeys<
	Exclude<TCommonKeys, TNestedKeyOf<typeof common>>
>;
export type TRuCommonExtraKeys = TAssertNoKeys<
	Exclude<TNestedKeyOf<typeof common>, TCommonKeys>
>;
```

### 7. Использование в UI — два стека

Одинаковые typed namespaces (`TResources` / `NS`), разный UI API.

| Стек | Когда | Библиотека | JSON root | Хуки / rich text |
|---|---|---|---|---|
| **Vite SPA** | Vite + React | `react-i18next` | `public/locales/[lng]` | `useTranslation`, `Trans` |
| **Next.js** | App Router + `[locale]` | `next-intl` | `messages/[lng]` | `useTranslations`, `t.rich` |

#### Vite — react-i18next

```tsx
import { useTranslation, Trans } from "react-i18next";

export const MyComponent = () => {
	const { t } = useTranslation("common");

	return (
		<div>
			<h1>{t("header.title")}</h1>
			<Trans
				ns="common"
				i18nKey="description.text"
				components={[<strong key="0" />, <br key="1" />]}
			/>
		</div>
	);
};
```

#### Next.js — next-intl

```tsx
"use client";

import { useTranslations } from "next-intl";

export const MyComponent = () => {
	const t = useTranslations("common");

	return (
		<div>
			<h1>{t("header.title")}</h1>
			{t.rich("description.text", {
				strong: (chunks) => <strong>{chunks}</strong>,
				br: () => <br />
			})}
		</div>
	);
};
```

### 8. change-language.ts (Vite)

Утилита для смены языка в рантайме (i18next). На Next.js используйте locale routing / next-intl navigation — не `i18next.changeLanguage`.

```typescript
import i18n from "./i18n.init";

export const changeLanguage = (lng: string) => {
	i18n.changeLanguage(lng);
	localStorage.setItem("i18nextLng", lng);
};
```
