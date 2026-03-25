import { Ban, XOctagon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HomeNotMcp() {
	const t = await getTranslations("home");

	return (
		<section className="space-y-4 pt-6">
			<div className="flex items-center gap-3">
				<Ban className="w-6 h-6 text-destructive" />
				<h2 className="text-3xl font-bold tracking-tight text-destructive">
					{t("not_mcp.title")}
				</h2>
			</div>

			<div className="flex flex-col gap-3">
				{t.raw("not_mcp.items").map((item: string, index: number) => (
					<div
						key={index}
						className="flex items-center gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-destructive/90"
					>
						<XOctagon className="w-5 h-5 shrink-0" />
						<span className="font-medium text-sm">{item}</span>
					</div>
				))}
			</div>
		</section>
	);
}
