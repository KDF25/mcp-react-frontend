import { ArrowRight, Radio } from "lucide-react";
import Link from "next/link";

import { Badge, Button } from "@/shared/ui";

interface HomeHeroProps {
	title: string;
	subtitle: string;
	description: string;
}

export function HomeHero({ title, subtitle, description }: HomeHeroProps) {
	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<Badge
					variant="outline"
					className="text-primary border-primary/20 bg-primary/5 animate-pulse uppercase tracking-wider font-mono text-[10px]"
				>
					<Radio size={12} className="mr-1" /> System Online
				</Badge>
				<h1 className="text-5xl font-black tracking-tighter lg:text-7xl">
					{title.split(" ")[0]}{" "}
					<span className="text-primary italic">
						{title.split(" ")[1]}
					</span>
				</h1>
				<p className="text-2xl font-medium text-muted-foreground tracking-tight">
					{subtitle}
				</p>
			</div>
			<p className="text-xl text-muted-foreground/80 leading-relaxed max-w-3xl">
				{description}
			</p>
			<div className="flex gap-4">
				<Button size="lg" className="gap-2 font-bold" asChild>
					<Link href="/introduction">
						Explore Protocol <ArrowRight size={18} />
					</Link>
				</Button>
				<Button
					size="lg"
					variant="outline"
					className="font-bold"
					asChild
				>
					<Link href="/creator">System Architect</Link>
				</Button>
			</div>
		</section>
	);
}
