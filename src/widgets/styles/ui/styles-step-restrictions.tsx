"use client";

import { useTranslation } from "react-i18next";

import { Badge, CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import {
	STYLES_ALLOWED_COLORS,
	STYLES_CODE_RESTRICTIONS,
	STYLES_COLOR_MAP,
	STYLES_FORBIDDEN_COLORS
} from "../model";

function StylesStepRestrictionsComponent() {
	const { t } = useTranslation("styles");

	return (
		<div className="space-y-6 pt-4 border-t border-border/40">
			<div className="space-y-4">
				<SectionTitle
					badge="04"
					className="text-xl mb-2 text-destructive"
				>
					{t("steps.restrictions.title")}
				</SectionTitle>
				<p className="text-muted-foreground border-l-4 border-destructive/50 pl-4 py-1 italic text-sm">
					{t("steps.restrictions.description")}
				</p>
			</div>

			<div className="space-y-6">
				<div className="space-y-3">
					<div className="flex items-center gap-2 text-md font-semibold text-foreground/80">
						<span className="size-2 rounded-full bg-primary" />
						{t("steps.restrictions.allowed_colors")}
					</div>
					<div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
						{STYLES_ALLOWED_COLORS.map((color: string) => (
							<Badge
								key={color}
								variant="outline"
								className="w-full bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20 font-mono text-sm uppercase py-2.5 px-4 flex items-center gap-3 justify-start shrink-0"
							>
								<div
									className="size-3.5 rounded-sm border border-black/10 shrink-0 shadow-sm"
									style={{
										backgroundColor: `var(--${color})`
									}}
								/>
								<span className="truncate">{color}</span>
							</Badge>
						))}
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center gap-2 text-md font-semibold text-foreground/80">
						<span className="size-2 rounded-full bg-destructive" />
						{t("steps.restrictions.forbidden_colors")}
					</div>
					<div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
						{STYLES_FORBIDDEN_COLORS.map((color: string) => (
							<Badge
								key={color}
								variant="outline"
								className="w-full text-sm border-destructive/20 text-destructive/80 bg-destructive/5 py-2.5 px-4 flex items-center gap-3 justify-start shrink-0 font-mono"
							>
								<div
									className="size-3 rounded-full shrink-0 border border-destructive/10"
									style={{
										backgroundColor: STYLES_COLOR_MAP[color]
									}}
								/>
								<span className="truncate">{color}</span>
							</Badge>
						))}
					</div>
				</div>
			</div>

			<CodeBlock
				code={STYLES_CODE_RESTRICTIONS}
				language="tsx"
				filename="Restrictions Example"
			/>
		</div>
	);
}

export const StylesStepRestrictions = withErrorBoundary(
	StylesStepRestrictionsComponent
);
