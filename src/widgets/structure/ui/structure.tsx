"use client";

import { useTranslation } from "react-i18next";

import { StructureConstraints } from "./structure-constraints";
import { StructureConverters } from "./structure-converters";
import { StructureTree } from "./structure-tree";

export function Structure() {
	const { t } = useTranslation("structure");

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
				<StructureConstraints />
				<StructureConverters />
				<StructureTree />
			</div>
		</div>
	);
}
