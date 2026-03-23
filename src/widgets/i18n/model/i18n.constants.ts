import { ITreeItemData } from "@/shared/ui";

export const I18N_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: {
		name: "src/",
		children: ["shared-config", "public-locales"]
	},
	"shared-config": {
		name: "shared/config/",
		children: ["i18n-folder"]
	},
	"i18n-folder": {
		name: "i18n/",
		children: [
			"i18n-key",
			"i18n-types",
			"i18n-config",
			"i18n-blocks",
			"i18n-init",
			"i18n-checker",
			"i18n-switching"
		]
	},
	"i18n-key": { name: "i18n-key.ts" },
	"i18n-types": { name: "i18n.types.ts" },
	"i18n-config": { name: "i18n.config.ts" },
	"i18n-blocks": { name: "i18n.blocks.ts" },
	"i18n-init": { name: "i18n.init.ts" },
	"i18n-checker": { name: "i18n.checker.ts" },
	"i18n-switching": { name: "change-language.ts" },
	"public-locales": {
		name: "public/locales/",
		children: ["lang-en", "lang-ru"]
	},
	"lang-en": { name: "en/", children: ["common-en", "booking-en"] },
	"common-en": { name: "common.json" },
	"booking-en": { name: "booking/", children: ["order-en"] },
	"order-en": { name: "order.json" },
	"lang-ru": { name: "ru/", children: ["common-ru", "booking-ru"] },
	"common-ru": { name: "common.json" },
	"booking-ru": { name: "booking/", children: ["order-ru"] },
	"order-ru": { name: "order.json" }
};

export const I18N_CODE_INFRA_KEY = `export const i18nKey =
    <Keys extends string>() =>
    <K extends Keys>(key: K) =>
        key;`;

export const I18N_CODE_INFRA_TYPES = `export type TDotPrefix<T extends string, P extends string> = P extends ""
    ? T
    : \`\${P}.\${T}\`;

export type TNestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & string]: ObjectType[Key] extends object
        ? TDotPrefix<TNestedKeyOf<ObjectType[Key]>, Key>
        : Key;
}[keyof ObjectType & string];`;

export const I18N_CODE_CONFIG_HUB = `import common from "../../../../public/locales/en/common.json";
import header from "../../../../public/locales/en/header.json";

export type TCommon = typeof common;
export type THeader = typeof header;

export type TResources = {
    common: TCommon;
    header: THeader;
};

export const NS = ["common", "header"] as const;`;

export const I18N_CODE_CONFIG_BLOCKS = `export const TRANSLATION_BLOCKS = {
    booking: { folder: "booking", namespaces: ["orders_page"] },
    shared: { folder: "", namespaces: ["header", "common"] }
};

export const getNamespacePath = (lng: string, ns: string): string => {
    // ... логика определения пути к JSON
    return \`/locales/\${lng}/\${ns}.json\`;
};`;

export const I18N_CODE_INIT = `import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NS } from "./i18n.config";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    ns: NS,
    backend: {
        loadPath: (lngs, nss) => getNamespacePath(lngs[0], nss[0])
    }
});
export default i18n;`;

export const I18N_CODE_CHECKER = `import type { TResources } from "./i18n.config";
import common_ru from "../../../../public/locales/ru/common.json";

// Статическая проверка: если в RU нет ключа из EN - будет ошибка
export const RU_TRANSLATION_CHECKER: TResources = {
    common: common_ru,
};`;

export const I18N_CODE_USAGE = `import { useTranslations } from "next-intl";

export const MyComponent = () => {
    const t = useTranslations("common");
    
    return <h1>{t("header.title")}</h1>;
};`;

export const I18N_CODE_TRANS = `
import { useTranslations } from "next-intl";

export const MyComponent = () => {
    const t = useTranslations("common");
    
    return (
        <div>
            <h1>{t("header.title")}</h1>
            {t.rich("description.text", {
								0: (chunks) => <strong>{chunks}</strong/>,
								1: (chunks) => <br>{chunks}</br/>,
							})}
        </div>
    );
};`;

export const I18N_CODE_SWITCHING = `import i18n from "./i18n.init";

export const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
};`;
