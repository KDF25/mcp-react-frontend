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

/** Vite — public/locales */
export const I18N_CODE_CONFIG_HUB = `import type common from "../../../../public/locales/en/common.json";
import type header from "../../../../public/locales/en/header.json";
import type { TNestedKeyOf } from "./i18n.types";

export type TCommon = typeof common;
export type THeader = typeof header;

export type TResources = {
	common: TCommon;
	header: THeader;
};

export const NS = ["common", "header"] as const;
export type TCommonKeys = TNestedKeyOf<TCommon>;`;

/** Next.js — messages/ (рекомендуется) или public/locales */
export const I18N_CODE_CONFIG_HUB_NEXT = `import type common from "../../../../messages/en/common.json";
import type header from "../../../../messages/en/header.json";
import type { TNestedKeyOf } from "./i18n.types";

export type TCommon = typeof common;
export type THeader = typeof header;

export type TResources = {
	common: TCommon;
	header: THeader;
};

export const NS = ["common", "header"] as const;
export type TCommonKeys = TNestedKeyOf<TCommon>;`;

export const I18N_CODE_CONFIG_BLOCKS = `export const TRANSLATION_BLOCKS = {
    booking: { folder: "booking", namespaces: ["orders_page"] },
    shared: { folder: "", namespaces: ["header", "common"] }
};

export const getNamespacePath = (lng: string, ns: string): string => {
    // ... логика определения пути к JSON
    return \`/locales/\${lng}/\${ns}.json\`;
};`;

export const I18N_CODE_INIT = `import i18n from "i18next";
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
            // без allowMultiLoading loadPath вызывается на каждую пару язык + namespace
            loadPath: (lngs: string[], nss: string[]) =>
                getNamespacePath(lngs[0], nss[0])
        }
    });
export default i18n;`;

export const I18N_CODE_CHECKER = `import type { TCommonKeys, TResources } from "./i18n.config";
import type { TNestedKeyOf } from "./i18n.types";
import type common_ru from "../../../../public/locales/ru/common.json";

/** Ошибка компиляции, если T не never — в сообщении видны проблемные ключи */
type TAssertNoKeys<T extends never> = T;

// Нет ключа из EN или не совпал тип значения → ошибка
export const RU_TRANSLATION_CHECKER = {
    common: {} as typeof common_ru,
} satisfies TResources;

// satisfies не видит лишние ключи — проверяем обе стороны явно
export type TRuCommonMissingKeys = TAssertNoKeys<
    Exclude<TCommonKeys, TNestedKeyOf<typeof common_ru>>
>;
export type TRuCommonExtraKeys = TAssertNoKeys<
    Exclude<TNestedKeyOf<typeof common_ru>, TCommonKeys>
>;`;

/** Vite SPA — react-i18next */
export const I18N_CODE_USAGE_VITE = `import { useTranslation, Trans } from "react-i18next";

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
};`;

/** Next.js App Router — next-intl */
export const I18N_CODE_USAGE_NEXT = `"use client";

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
};`;

export const I18N_CODE_SWITCHING = `import i18n from "./i18n.init";

export const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
};`;
