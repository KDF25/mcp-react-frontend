import { Cpu, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function CreatorAiSystems() {
	const t = await getTranslations("creator");

	return (
		<section className="space-y-6 bg-indigo-500/5 p-6 rounded-xl border border-indigo-500/20">
			<div className="flex items-center gap-3">
				<Cpu className="w-6 h-6 text-indigo-500" />
				<h3 className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
					{t("ai_systems.title")}
				</h3>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{t.raw("ai_systems.items").map((_: any, i: number) => {
					const codeMarkup = (chunks: React.ReactNode) => (
						<code className="bg-indigo-500/10 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
							{chunks}
						</code>
					);

					return (
						<div
							key={i}
							className="flex gap-3 items-start bg-background/50 p-3 rounded-md border border-indigo-500/10"
						>
							<Workflow className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
							<span className="text-sm font-medium">
								{t.rich(`ai_systems.items.${i}`, {
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
