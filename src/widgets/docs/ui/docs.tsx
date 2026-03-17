"use client";

import { DocsFeatures } from "./docs-features";
import { DocsMission } from "./docs-mission";
import { DocsPolicy } from "./docs-policy";

export function Docs() {
	return (
		<main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
			<DocsMission />
			<DocsFeatures />
			<DocsPolicy />
		</main>
	);
}
