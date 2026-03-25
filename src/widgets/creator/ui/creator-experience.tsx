import { Briefcase } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function CreatorExperience() {
	const t = await getTranslations("creator");

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<Briefcase className="w-6 h-6 text-primary" />
				<h3 className="text-2xl font-bold tracking-tight">
					{t("experience.title")}
				</h3>
			</div>
			<div className="space-y-3">
				{t.raw("experience.items").map((_: any, i: number) => {
					const codeMarkup = (chunks: React.ReactNode) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary border border-primary/10">
							{chunks}
						</code>
					);

					return (
						<div
							key={i}
							className="flex gap-4 items-start border-b border-border/50 pb-3 last:border-0 last:pb-0"
						>
							<div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
							<p className="text-[15px] text-foreground/90">
								{t.rich(`experience.items.${i}`, {
									one: codeMarkup,
									two: codeMarkup,
									three: codeMarkup,
									four: codeMarkup
								})}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
