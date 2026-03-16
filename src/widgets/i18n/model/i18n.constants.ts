import { DetailedFile, Item } from "./i18n.types";

export const I18N_STRUCTURE_ITEMS: Record<string, Item> = {
	root: { name: "src", children: ["shared"] },
	shared: { name: "shared", children: ["config", "global_types"] },
	config: { name: "config", children: ["i18n", "languages"] },
	i18n: {
		name: "i18n",
		children: [
			"checker",
			"init",
			"key",
			"types",
			"config_f",
			"blocks",
			"change_l",
			"index_i"
		]
	},
	checker: { name: "i18n.checker.ts" },
	init: { name: "i18n.init.ts" },
	key: { name: "i18n-key.ts" },
	types: { name: "i18n.types.ts" },
	config_f: { name: "i18n.config.ts" },
	blocks: { name: "i18n.blocks.ts" },
	change_l: { name: "change-language.ts" },
	index_i: { name: "index.ts" },
	languages: {
		name: "languages",
		children: ["l_types", "l_config", "index_l"]
	},
	l_types: { name: "languages.types.ts" },
	l_config: { name: "languages.config.ts" },
	index_l: { name: "index.ts" },
	global_types: { name: "types", children: ["i18n_d"] },
	i18n_d: { name: "i18n.d.ts" }
};

export const DETAILED_FILES: DetailedFile[] = [
	{
		title: "i18n-key.ts",
		description:
			"Легковесная обертка для типизации строковых ключей. Это identity function, которая в рантайме ничего не делает, но в IDE обеспечивает автодополнение и проверку существования ключа для конкретного Namespace.",
		code: `export const i18nKey =
    <Keys extends string>() =>
    <K extends Keys>(key: K) =>
        key;`
	},
	{
		title: "i18n.types.ts",
		description:
			"Содержит 'магию' TypeScript для работы с вложенными JSON-объектами. Тип TNestedKeyOf рекурсивно обходит структуру файлов переводов и генерирует список ключей через точку (например, 'errors.validation.required').",
		code: `export type TDotPrefix<T extends string, P extends string> = P extends ""
    ? T
    : \`\${P}.\${T}\`;

export type TNestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & string]: ObjectType[Key] extends object
        ? TDotPrefix<TNestedKeyOf<ObjectType[Key]>, Key>
        : Key;
}[keyof ObjectType & string];`
	},
	{
		title: "i18n.d.ts",
		description:
			"Глобальное переопределение типов библиотеки i18next. Связывает внутреннюю систему типов проекта с механизмом i18next, делая стандартный хук useTranslation() полностью типизированным.",
		code: `import "i18next";
import type { TResources } from "../config";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: TResources;
    }
}`
	},
	{
		title: "i18n.config.ts",
		description:
			"Главный хаб типизации. Импортирует английские JSON-файлы как мастер-схему. На их основе создаются типы для каждого Namespace (TCommon, THeader и т.д.) и формируется общий тип TResources.",
		code: `import common from "../../../../public/locales/en/common.json";
import header from "../../../../public/locales/en/header.json";

export type TCommon = typeof common;
export type THeader = typeof header;

export type TResources = {
    common: TCommon;
    header: THeader;
};

export const NS = ["common", "header"] as const;`
	},
	{
		title: "i18n.blocks.ts",
		description:
			"Файл конфигурации физического расположения файлов. Он группирует namespaces в подпапки (booking, finance) и содержит функцию getNamespacePath для динамической подгрузки чанков.",
		code: `export const TRANSLATION_BLOCKS = {
    booking: { folder: "booking", namespaces: ["orders_page"] },
    shared: { folder: "", namespaces: ["header", "common"] }
};

export const getNamespacePath = (lng: string, ns: string): string => {
    for (const block of Object.values(TRANSLATION_BLOCKS)) {
        if (block.namespaces.includes(ns)) {
            return block.folder
                ? \`/locales/\${lng}/\${block.folder}/\${ns}.json\`
                : \`/locales/\${lng}/\${ns}.json\`;
        }
    }
    return \`/locales/\${lng}/\${ns}.json\`;
};`
	},
	{
		title: "i18n.checker.ts",
		description:
			"Статический тест консистентности. Массив RU_TRANSLATION_CHECKER принудительно типизируется через TResources. Если в русской версии пропущено поле — возникнет ошибка компиляции.",
		code: `import type { TResources } from "./i18n.config";
import common_ru from "../../../../public/locales/ru/common.json";

export const RU_TRANSLATION_CHECKER: TResources = {
    common: common_ru, // Ошибка если ключи не совпадают с английскими
};`
	},
	{
		title: "i18n.init.ts",
		description:
			"Инициализация библиотеки i18next. Настраивает плагины, устанавливает fallback язык и связывает NS и getNamespacePath в единую конфигурацию.",
		code: `import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NS } from "./i18n.config";
import { getNamespacePath } from "./i18n.blocks";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    ns: NS,
    backend: {
        loadPath: (lngs, nss) => getNamespacePath(lngs[0], nss[0])
    }
});
export default i18n;`
	},
	{
		title: "change-language.ts",
		description:
			"Утилита для переключения языка в рантайме. Меняет состояние i18next и синхронизирует выбор пользователя в localStorage.",
		code: `import { default as i18n } from "./i18n.init";

export const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
};`
	},
	{
		title: "languages.types.ts",
		description:
			"Определяет ENUM_LANGUAGES — константу со списком всех поддерживаемых кодов языков (en, ru). Единственный источник правды для локалей.",
		code: `export const ENUM_LANGUAGES = {
    EN: "en",
    RU: "ru"
} as const;`
	},
	{
		title: "languages.config.ts",
		description:
			"Метаданные языков для UI (labels, иконки). Используется в компонентах переключателей языка.",
		code: `import { ENUM_LANGUAGES } from "./languages.types";

export const LANGUAGES_LIST = [
    { value: ENUM_LANGUAGES.EN, label: "En" },
    { value: ENUM_LANGUAGES.RU, label: "Ru" }
];`
	},
	{
		title: "index.ts",
		description:
			"Public API папок конфигураций. Собирает функции и типы воедино для удобного импорта другими слоями приложения.",
		code: `export * from "./change-language";
export * from "./i18n-key";
export { default as i18n } from "./i18n.init";`
	}
];
