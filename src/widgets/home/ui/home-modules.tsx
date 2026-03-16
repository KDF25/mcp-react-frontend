import { Activity, Layers, ShieldCheck, Type } from "lucide-react";
import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui";

const ICON_MAP = {
	ShieldCheck: ShieldCheck,
	Layers: Layers,
	Type: Type
};

interface FeatureItem {
	title: string;
	description: string;
	icon: string;
	link: string;
}

interface HomeModulesProps {
	items: FeatureItem[];
}

export function HomeModules({ items }: HomeModulesProps) {
	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<Activity size={20} className="text-primary" />
				<h2 className="text-2xl font-bold tracking-tight">
					Functional Modules
				</h2>
			</div>
			<div className="grid md:grid-cols-3 gap-6">
				{items.map((feature, i) => {
					const Icon =
						ICON_MAP[feature.icon as keyof typeof ICON_MAP] ||
						Activity;
					return (
						<Link href={feature.link} key={i}>
							<Card className="h-full border-primary/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group cursor-pointer overflow-hidden relative">
								<div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
									<Icon size={80} strokeWidth={1} />
								</div>
								<CardHeader>
									<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
										<Icon size={20} />
									</div>
									<CardTitle>{feature.title}</CardTitle>
									<CardDescription className="leading-normal">
										{feature.description}
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
