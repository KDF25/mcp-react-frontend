"use client";

import { useTranslation } from "react-i18next";

import { ZodArchitecture } from "./zod-architecture";
import { ZodImportance } from "./zod-importance";
import { ZodPattern } from "./zod-pattern";

export function Zod() {
	const { t } = useTranslation("zod");

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
				<ZodArchitecture />
				<ZodPattern />
				<ZodImportance />
			</div>
		</div>
	);
}
