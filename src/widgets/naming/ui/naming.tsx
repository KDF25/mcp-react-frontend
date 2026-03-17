"use client";

import { useTranslation } from "react-i18next";

import { NamingFilePolicy } from "./naming-file-policy";
import { NamingLinterRules } from "./naming-linter-rules";
import { NamingSyntaxGuidance } from "./naming-syntax-guidance";

export function Naming() {
	const { t } = useTranslation("naming");

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
				<NamingFilePolicy />
				<NamingLinterRules />
				<NamingSyntaxGuidance />
			</div>
		</div>
	);
}
