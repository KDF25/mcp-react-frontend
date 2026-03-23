import { getTranslations } from "next-intl/server";

import { Badge, Card, CardContent } from "@/shared/ui";

const STATUS_CONFIG = [
	{ key: "core", value: "SSE (v1.0.0)", status: "active" },
	{ key: "architecture", value: "FSD-Strict", status: "enforced" },
	{ key: "ai", value: "Gemini / Claude", status: "authorized" },
	{ key: "validation", value: "Locked", status: "stable" }
];

export async function HomeStatus() {
	const t = await getTranslations("home");
	const labels = t.raw("status") as Record<string, string>;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{STATUS_CONFIG.map((item) => (
				<Card
					key={item.key}
					className="bg-muted/30 border-none shadow-none"
				>
					<CardContent className="p-4 space-y-1">
						<p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
							{labels[item.key]}
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
