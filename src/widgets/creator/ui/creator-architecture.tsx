import { GitMerge, Layers } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function CreatorArchitecture() {
	const t = await getTranslations("creator");

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<GitMerge className="w-6 h-6 text-primary" />
				<h3 className="text-2xl font-bold tracking-tight">
					{t("architecture.title")}
				</h3>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{t.raw("architecture.items").map((_: any, i: number) => {
					const codeMarkup = (chunks: React.ReactNode) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary border border-primary/10">
							{chunks}
						</code>
					);

					return (
						<div
							key={i}
							className="group relative overflow-hidden rounded-lg border p-4 hover:border-primary/50 transition-colors bg-card shadow-sm flex gap-3 h-full"
						>
							<Layers className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
							<span className="text-sm font-medium leading-relaxed">
								{t.rich(`architecture.items.${i}`, {
									one: codeMarkup,
									two: codeMarkup,
									three: codeMarkup,
									four: codeMarkup
								})}
							</span>
						</div>
					);
				})}
			</div>
		</section>
	);
}
