"use client";

import { useTranslation } from "react-i18next";

import { StylesDataFetching } from "./styles-data-fetching";
import { StylesRestrictions } from "./styles-restrictions";
import { StylesStateContract } from "./styles-state-contract";

export function Styles() {
	const { t } = useTranslation("styles");

	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					{t("header.title")}
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					{t("header.description")}
				</p>
			</div>
			<div className="space-y-12">
				<StylesRestrictions />
				<StylesStateContract />
				<StylesDataFetching />
			</div>
		</div>
	);
}
