"use client";

import { Box, Code2, Database } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, withErrorBoundary } from "@/shared/ui";

function StructureConvertersComponent() {
	const { t } = useTranslation("structure");

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					02
				</span>
				{t("converters.title")}
			</h2>

			<div className="grid sm:grid-cols-2 gap-6">
				<div className="space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						{t("converters.description")}
					</p>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 p-3 rounded-lg bg-muted border">
							<Database size={16} className="text-primary" />
							<span className="text-xs font-bold">RAW DTO</span>
						</div>
						<div className="h-px w-8 bg-border" />
						<div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
							<Code2 size={16} className="text-primary" />
							<span className="text-xs font-bold">
								LOCAL ENTITY
							</span>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<Card className="bg-card">
						<CardContent className="pt-6 flex flex-col items-center gap-3">
							<Box className="text-primary/40" size={32} />
							<span className="text-[10px] font-black uppercase tracking-widest text-center">
								{t("converters.entity")}
							</span>
						</CardContent>
					</Card>
					<Card className="bg-card">
						<CardContent className="pt-6 flex flex-col items-center gap-3">
							<Code2 className="text-primary/40" size={32} />
							<span className="text-[10px] font-black uppercase tracking-widest text-center">
								{t("converters.dto")}
							</span>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

export const StructureConverters = withErrorBoundary(
	StructureConvertersComponent
);
