# i18n Pattern Template

Этот паттерн обеспечивает строгую типизацию ключей и автоматическую проверку соответствия переводов.

## Структура папки
`src/shared/config/i18n/`
- `index.ts`
- `i18n.init.ts`
- `i18n.config.ts`
- `i18n.blocks.ts`
- `i18n.types.ts`
- `i18n-key.ts`
- `change-language.ts`
- `i18n.checker.ts`

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
Здесь импортируются английские JSON (как эталон) и формируются типы.
```typescript
import common from "../../../../public/locales/en/common.json";
import type { TNestedKeyOf } from "./i18n.types";

export type TCommon = typeof common;
export type TResources = {
	common: TCommon;
    // ... другие неймспейсы
};

export const NS = ["common"] as const;
export type TNS = (typeof NS)[number];
export type TCommonKeys = TNestedKeyOf<TCommon>;
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
			loadPath: (languages: string[], namespaces: string[]) => 
                getNamespacePath(languages[0], namespaces[0])
		}
	});

export default i18n;
```

### 6. i18n.checker.ts
Статическая проверка: если в RU JSON не хватает ключа, который есть в EN — будет ошибка TS.
```typescript
import common_ru from "../../../../public/locales/ru/common.json";
import type { TResources } from "./i18n.config";

export const RU_TRANSLATION_CHECKER: TResources = {
	common: common_ru
};
```
