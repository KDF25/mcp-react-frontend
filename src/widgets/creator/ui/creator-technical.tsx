"use client";

import { useTranslation } from "react-i18next";

import { CodeBlock } from "@/shared/ui";

import { CREATOR_DATA } from "../model";

export function CreatorTechnical() {
	const { t } = useTranslation("creator");

	return (
		<section className="space-y-4">
			<h2 className="text-2xl font-semibold tracking-tight">
				{t("technical.title")}
			</h2>
			<CodeBlock
				filename="creator_registry.json"
				language="json"
				code={CREATOR_DATA.technicalContract}
			/>
		</section>
	);
}
