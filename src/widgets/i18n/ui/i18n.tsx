"use client";

import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

import { I18nArchitectureLink } from "./i18n-architecture-link";
import { I18nDetailedFiles } from "./i18n-detailed-files";
import { I18nStructureTree } from "./i18n-structure-tree";

export function I18n() {
	const { t } = useTranslation("i18n");

	return (
		<>
			<div className="space-y-6">
				<div className="flex items-center gap-2">
					<Badge
						variant="outline"
						className="text-primary px-3 py-1 font-mono text-xs border-primary/30"
					>
						{t("header.shared")}
					</Badge>
					<Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] uppercase font-bold tracking-widest">
						{t("header.master")}
					</Badge>
				</div>
				<h1 className="text-6xl font-black tracking-tight leading-none">
					{t("header.title")}
				</h1>
				<p className="text-2xl text-muted-foreground max-w-4xl font-light">
					{t("header.description")}
				</p>
			</div>

			<div className="grid gap-12 lg:grid-cols-[320px_1fr]">
				<I18nStructureTree />
				<div className="space-y-24">
					<I18nDetailedFiles />
					<I18nArchitectureLink />
				</div>
			</div>
		</>
	);
}
