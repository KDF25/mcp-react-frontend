import { Code2Icon, FolderIcon, InfoIcon } from "lucide-react";

import { Badge, Card, CodeBlock } from "@/shared/ui";

import { DETAILED_FILES } from "../model";

export function I18nDetailedFiles() {
	return (
		<div className="space-y-24">
			{DETAILED_FILES.map((file, idx) => (
				<section key={file.title} className="space-y-8 scroll-mt-24">
					<div className="space-y-6 border-l-4 border-primary pl-8">
						<div className="space-y-1">
							<div className="flex items-center gap-3">
								<Badge className="bg-primary text-white font-mono rounded-none px-2">
									{idx + 1}
								</Badge>
								<h3 className="text-4xl font-black tracking-tighter uppercase">
									{file.title}
								</h3>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
								<FolderIcon className="size-2.5" /> shared/
								{file.title.includes("d.ts")
									? "types"
									: file.title.includes("languages")
										? "config/languages"
										: "config/i18n"}
								/{file.title}
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-2 text-primary">
								<InfoIcon className="size-5" />
								<h4 className="font-bold text-lg tracking-tight">
									Назначение файла
								</h4>
							</div>
							<p className="text-lg text-foreground/80 leading-relaxed font-normal">
								{file.description}
							</p>
						</div>
					</div>

					<Card className="border-none shadow-2xl bg-zinc-950/90 overflow-hidden ring-1 ring-white/10">
						<div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Code2Icon className="size-3 text-primary" />
								<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
									Source Implementation
								</span>
							</div>
							<Badge
								variant="outline"
								className="text-[9px] border-zinc-800 text-zinc-500 uppercase"
							>
								{file.title.endsWith(".d.ts")
									? "definition"
									: "typescript"}
							</Badge>
						</div>
						<CodeBlock
							filename={file.title}
							language="typescript"
							code={file.code}
						/>
					</Card>
				</section>
			))}
		</div>
	);
}
