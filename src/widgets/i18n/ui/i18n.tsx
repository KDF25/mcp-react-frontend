"use client";

import { Badge } from "@/shared/ui";

import { I18nArchitectureLink } from "./i18n-architecture-link";
import { I18nDetailedFiles } from "./i18n-detailed-files";
import { I18nStructureTree } from "./i18n-structure-tree";

export function I18n() {
	return (
		<>
			<div className="space-y-6">
				<div className="flex items-center gap-2">
					<Badge
						variant="outline"
						className="text-primary px-3 py-1 font-mono text-xs border-primary/30"
					>
						SHARED CONFIG
					</Badge>
					<Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] uppercase font-bold tracking-widest">
						Master Version
					</Badge>
				</div>
				<h1 className="text-6xl font-black tracking-tight leading-none">
					Система i18n
				</h1>
				<p className="text-2xl text-muted-foreground max-w-4xl font-light">
					Исчерпывающее руководство по архитектуре
					интернационализации. Включает 11 файлов конфигурации и
					глобальные определения типов.
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
