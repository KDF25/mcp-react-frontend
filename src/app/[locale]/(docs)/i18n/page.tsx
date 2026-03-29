import { getTranslations, setRequestLocale } from "next-intl/server";

import { ENUM_ROUTES } from "@/shared/config";
import { getPageMetadata } from "@/shared/lib";

import { I18n } from "@/widgets/i18n";

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "i18n" });

	return getPageMetadata({
		locale,
		pathname: ENUM_ROUTES.MAIN.I18N,
		title: t("seo.title"),
		description: t("seo.description")
	});
}

export default async function Page({
	params
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <I18n />;
}
