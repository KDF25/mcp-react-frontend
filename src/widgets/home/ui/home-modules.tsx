"use client";

import { Activity, Layers, ShieldCheck, Type } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui";

const ICON_MAP = {
	ShieldCheck: ShieldCheck,
	Layers: Layers,
	Type: Type
};

const MODULES_CONFIG = [
	{ key: "rules", icon: ShieldCheck, link: "/introduction" },
	{ key: "fsd", icon: Layers, link: "/fsd" },
	{ key: "naming", icon: Type, link: "/naming" }
];

export function HomeModules() {
	const { t } = useTranslation("home");
	const features = t("features", {
		returnObjects: true,
		defaultValue: {}
	}) as Record<string, { title: string; description: string }>;

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<Activity size={20} className="text-primary" />
				<h2 className="text-2xl font-bold tracking-tight">
					Functional Modules
				</h2>
			</div>
			<div className="grid md:grid-cols-3 gap-6">
				{MODULES_CONFIG.map((module) => {
					const Icon = module.icon;
					const item = features[module.key];

					return (
						<Link href={module.link} key={module.key}>
							<Card className="h-full border-primary/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group cursor-pointer overflow-hidden relative">
								<div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
									<Icon size={80} strokeWidth={1} />
								</div>
								<CardHeader>
									<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
										<Icon size={20} />
									</div>
									<CardTitle>{item?.title}</CardTitle>
									<CardDescription className="leading-normal">
										{item?.description}
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
