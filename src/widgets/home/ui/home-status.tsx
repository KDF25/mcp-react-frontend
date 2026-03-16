import { Badge, Card, CardContent } from "@/shared/ui";

interface StatusItem {
	label: string;
	value: string;
	status: string;
}

interface HomeStatusProps {
	items: StatusItem[];
}

export function HomeStatus({ items }: HomeStatusProps) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{items.map((item, i) => (
				<Card key={i} className="bg-muted/30 border-none shadow-none">
					<CardContent className="p-4 space-y-1">
						<p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
							{item.label}
						</p>
						<div className="flex items-center justify-between">
							<p className="text-sm font-mono font-bold">
								{item.value}
							</p>
							<Badge className="text-[9px] h-4 uppercase font-black bg-emerald-500/10 text-emerald-500 border-none">
								{item.status}
							</Badge>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
