import { getTranslations, setRequestLocale } from "next-intl/server";

import { ENUM_ROUTES } from "@/shared/config";
import { getPageMetadata } from "@/shared/lib";

import { RtkQuery } from "@/widgets/rtk-query";

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "rtk_query" });

	return getPageMetadata({
		locale,
		pathname: ENUM_ROUTES.MAIN.RTK_QUERY,
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

	return <RtkQuery />;
}
