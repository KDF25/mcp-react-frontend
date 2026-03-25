import { getTranslations } from "next-intl/server";

export async function CreatorSnapshot() {
	const t = await getTranslations("creator");

	return (
		<section className="space-y-4 pt-4">
			<h4 className="text-xl font-semibold tracking-tight">
				{t("snapshot.title")}
			</h4>
			<div className="rounded-md bg-muted/50 p-6 border font-mono text-sm overflow-x-auto relative">
				<div className="absolute top-2 right-2 flex gap-1.5">
					<div className="w-3 h-3 rounded-full bg-red-400/80" />
					<div className="w-3 h-3 rounded-full bg-amber-400/80" />
					<div className="w-3 h-3 rounded-full bg-green-400/80" />
				</div>
				<pre className="text-primary/90 mt-2">
					{`{
  "frontend": ["React", "Next.js", "TypeScript", "React Router"],
  "ui": ["Tailwind", "SCSS", "shadcn/ui", "Motion"],
  "architecture": ["FSD", "Feature Isolation", "Role-based UI"],
  "state": ["Redux Toolkit", "RTK Query"],
  "data_layer": ["REST API", "Caching", "Invalidation"],
  "realtime": ["WebSockets (Centrifugo)"],
  "backend_exp": ["Node.js", "NestJS"],
  "automation": ["Playwright", "Node.js Services", "Python Scripts"],
  "ai_systems": ["LLM Integration", "RAG", "Voice Agents"],
  "integrations": ["EDO", "E-Signature"],
  "focus": "Scalable Frontend Architecture with Real-time and AI Integration"
}`}
				</pre>
			</div>
		</section>
	);
}
