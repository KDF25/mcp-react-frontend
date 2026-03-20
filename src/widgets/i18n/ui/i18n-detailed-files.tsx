"use client";

import { Code2Icon, FolderIcon, InfoIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge, Card, CodeBlock } from "@/shared/ui";
import { withErrorBoundary } from "@/shared/ui";

function I18nDetailedFilesComponent() {
	const { t } = useTranslation("i18n");

	const files = t("detailed_files.items", {
		returnObjects: true,
		defaultValue: {}
	}) as Record<string, { title: string; desc: string; code: string }>;

	return (
		<div className="space-y-24">
			{Object.entries(files).map(([key, data], idx) => (
				<section key={key} className="space-y-8 scroll-mt-24">
					<div className="space-y-6 border-l-4 border-primary pl-8">
						<div className="space-y-1">
							<div className="flex items-center gap-3">
								<Badge className="bg-primary text-white font-mono rounded-none px-2">
									{idx + 1}
								</Badge>
								<h3 className="text-4xl font-black tracking-tighter uppercase">
									{data.title}
								</h3>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
								<FolderIcon className="size-2.5" /> shared/
								{data.title.includes("d.ts")
									? "types"
									: data.title.includes("languages")
										? "config/languages"
										: "config/i18n"}
								/{data.title}
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-2 text-primary">
								<InfoIcon className="size-5" />
								<h4 className="font-bold text-lg tracking-tight">
									{t("detailed_files.purpose")}
								</h4>
							</div>
							<p className="text-lg text-foreground/80 leading-relaxed font-normal">
								{data.desc}
							</p>
						</div>
					</div>

					<Card className="border-none shadow-2xl bg-zinc-950/90 overflow-hidden ring-1 ring-white/10">
						<div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Code2Icon className="size-3 text-primary" />
								<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
									{t("detailed_files.source_label")}
								</span>
							</div>
							<Badge
								variant="outline"
								className="text-[9px] border-zinc-800 text-zinc-500 uppercase"
							>
								{data.title.endsWith(".d.ts")
									? t("detailed_files.types.definition")
									: t("detailed_files.types.typescript")}
							</Badge>
						</div>
						<CodeBlock
							filename={data.title}
							language="typescript"
							code={data.code}
						/>
					</Card>
				</section>
			))}
		</div>
	);
}

export const I18nDetailedFiles = withErrorBoundary(I18nDetailedFilesComponent);
