"use client";

import { BookIcon, SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

function I18nArchitectureLinkComponent() {
	const { t } = useTranslation("i18n");

	return (
		<section className="bg-zinc-900 p-12 rounded-[3.5rem] border border-white/5 shadow-inner">
			<div className="space-y-8">
				<h3 className="text-5xl font-black tracking-tighter text-white">
					{t("architecture.title")}
				</h3>
				<div className="grid gap-10 md:grid-cols-2">
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-primary">
							<BookIcon className="size-5" />
							<h4 className="font-bold uppercase tracking-widest text-xs">
								{t("architecture.safety.title")}
							</h4>
						</div>
						<p className="text-sm text-zinc-400 leading-relaxed italic">
							{t("architecture.safety.desc")}
						</p>
					</div>
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-primary">
							<SearchIcon className="size-5" />
							<h4 className="font-bold uppercase tracking-widest text-xs">
								{t("architecture.checker.title")}
							</h4>
						</div>
						<p className="text-sm text-zinc-400 leading-relaxed italic">
							{t("architecture.checker.desc")}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export const I18nArchitectureLink = withErrorBoundary(
	I18nArchitectureLinkComponent
);
