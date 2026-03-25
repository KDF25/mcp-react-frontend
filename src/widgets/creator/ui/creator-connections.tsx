import { getTranslations } from "next-intl/server";

import { CREATOR_CONNECTIONS } from "../model";

export async function CreatorConnections() {
	const t = await getTranslations("creator");

	return (
		<section className="flex flex-col gap-6 justify-between items-start p-6 rounded-lg border bg-card shadow-sm">
			<div className="flex flex-row items-center gap-4 text-sm divide-y justify-between w-full">
				<div className="flex items-center gap-2 text-muted-foreground">
					<div className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 relative">
						<div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
					</div>
					<span className="font-medium text-foreground">
						{t("status.active")}
					</span>
				</div>
				<div className="flex items-center gap-2 sm:pl-4 pt-4 sm:pt-0">
					<span className="text-muted-foreground">
						{t("status.focus_label")}:
					</span>
					<span className="font-medium flex items-center gap-1.5 flex-wrap text-muted-foreground text-sm">
						{t.rich("status.focus_value", {
							one: (chunks) => (
								<code className="bg-primary/5 px-1.5 py-0.5 rounded text-primary border border-primary/10">
									{chunks}
								</code>
							),
							two: (chunks) => (
								<code className="bg-primary/5 px-1.5 py-0.5 rounded text-primary border border-primary/10">
									{chunks}
								</code>
							),
							three: (chunks) => (
								<code className="bg-primary/5 px-1.5 py-0.5 rounded text-primary border border-primary/10">
									{chunks}
								</code>
							)
						})}
					</span>
				</div>
			</div>

			<div className="flex flex-wrap gap-3">
				{CREATOR_CONNECTIONS.map((connection) => {
					const Icon = connection.icon;
					const relProps = connection.isExternal
						? { target: "_blank", rel: "noopener noreferrer" }
						: {};

					return (
						<a
							key={connection.id}
							href={connection.href}
							{...relProps}
							className="inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-muted transition-colors h-10 px-4 py-2 text-sm font-medium gap-2 cursor-pointer"
						>
							<Icon className="w-4 h-4" />
							{t(`actions.${connection.id}`)}
						</a>
					);
				})}
			</div>
		</section>
	);
}
