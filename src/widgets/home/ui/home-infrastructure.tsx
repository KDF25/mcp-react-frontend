import { Zap } from "lucide-react";

interface InfrastructureItem {
	title: string;
	description: string;
}

interface HomeInfrastructureProps {
	items: InfrastructureItem[];
}

export function HomeInfrastructure({ items }: HomeInfrastructureProps) {
	return (
		<section className="grid md:grid-cols-3 gap-8 pt-4">
			{items.map((item, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center gap-2">
						<Zap size={16} className="text-primary/60" />
						<h3 className="font-bold tracking-tight">
							{item.title}
						</h3>
					</div>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{item.description}
					</p>
				</div>
			))}
		</section>
	);
}
