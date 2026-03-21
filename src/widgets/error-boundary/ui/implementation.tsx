"use client";

import { Code2Icon, HardDriveIcon, HistoryIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge, Card, CodeBlock } from "@/shared/ui";

import { ERROR_BOUNDARY_DATA } from "../model/error-boundary.data";

export function ErrorBoundaryImplementation() {
	const { t } = useTranslation("error_boundary");

	const sections = [
		{
			title: "Shared Implementation",
			icon: <HardDriveIcon size={16} />,
			filename: "shared/ui/error-boundary/error-boundary.tsx",
			code: ERROR_BOUNDARY_DATA.sharedImplementation,
			badge: "Base Component"
		},
		{
			title: "HOC Pattern",
			icon: <Code2Icon size={16} />,
			filename: "shared/ui/error-boundary/with-error-boundary.tsx",
			code: ERROR_BOUNDARY_DATA.hocUsage,
			badge: "Recommended"
		}
	];

	return (
		<section className="space-y-8">
			<div className="flex items-center gap-3">
				<HistoryIcon size={20} className="text-primary" />
				<h2 className="text-2xl font-bold tracking-tight">
					{t("structure.title")}
				</h2>
			</div>

			<p className="text-muted-foreground">
				{t("structure.description")}
			</p>

			<div className="space-y-12">
				{sections.map((section) => (
					<div key={section.title} className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="text-primary">
									{section.icon}
								</span>
								<h3 className="font-semibold text-lg">
									{section.title}
								</h3>
							</div>
							<Badge variant="secondary">{section.badge}</Badge>
						</div>
						<CodeBlock
							filename={section.filename}
							language="typescript"
							code={section.code}
						/>
					</div>
				))}
			</div>
		</section>
	);
}
