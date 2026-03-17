"use client";

import { Github, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import { CREATOR_DATA } from "../model";

export function CreatorConnections() {
	const { t } = useTranslation("creator");

	return (
		<section className="space-y-4">
			<h2 className="text-2xl font-semibold tracking-tight">
				{t("connections.title")}
			</h2>
			<div className="flex items-center gap-3">
				<Button variant="outline" size="sm" asChild className="gap-2">
					<a
						href={CREATOR_DATA.connections.github}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Github size={16} /> {t("connections.github")}
					</a>
				</Button>
				<Button variant="outline" size="sm" asChild className="gap-2">
					<a href={`mailto:${CREATOR_DATA.connections.email}`}>
						<Mail size={16} /> {t("connections.email")}
					</a>
				</Button>
			</div>
		</section>
	);
}
