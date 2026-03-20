"use client";

import { GitCommit, Layout, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge, Card, CardContent, withErrorBoundary } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

function StylesStateContractComponent() {
	const { t } = useTranslation("styles");
	const stateRules = RulesProvider.getRules().patterns.stateManagement;

	const states = [
		{ title: t("contract.server"), value: stateRules.server },
		{ title: t("contract.client"), value: stateRules.client },
		{ title: t("contract.local"), value: stateRules.local }
	];

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					02
				</span>
				{t("contract.title")}
			</h2>

			<div className="grid sm:grid-cols-3 gap-4">
				{states.map((state, i) => (
					<Card
						key={i}
						className="bg-primary/5 border-none shadow-none"
					>
						<CardContent className="p-4">
							<h4 className="text-[10px] font-bold uppercase text-primary/60 mb-1">
								{state.title}
							</h4>
							<p className="text-sm font-semibold">
								{state.value}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="border-primary/5 bg-primary/5">
				<CardContent className="p-6">
					<div className="grid sm:grid-cols-2 gap-8 items-center">
						<div className="space-y-4">
							<p className="text-muted-foreground leading-relaxed text-sm">
								{t("contract.description")}
							</p>
							<div className="flex gap-2">
								<Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none text-[10px]">
									IMMUTABLE
								</Badge>
								<Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none text-[10px]">
									PREDICTABLE
								</Badge>
							</div>
						</div>

						<div className="flex justify-center sm:justify-end">
							<div className="relative flex items-center gap-4">
								<div className="p-3 bg-background rounded-full border-2 border-primary/20 z-10">
									<Layout
										size={24}
										className="text-primary"
									/>
								</div>
								<div className="w-12 h-0.5 bg-primary/20 relative">
									<GitCommit
										size={16}
										className="absolute -top-[7.5px] left-1/2 -translate-x-1/2 text-primary/40"
									/>
								</div>
								<div className="p-3 bg-background rounded-full border-2 border-emerald-500/20 z-10">
									<ShieldCheck
										size={24}
										className="text-emerald-500"
									/>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}

export const StylesStateContract = withErrorBoundary(
	StylesStateContractComponent
);
