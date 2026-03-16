"use client";

import { StructureConstraints } from "./structure-constraints";
import { StructureConverters } from "./structure-converters";
import { StructureTree } from "./structure-tree";

export function Structure() {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Project File Structure
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Deterministic organization of modules and folders to
					maintain extreme scalability and zero-config
					discoverability.
				</p>
			</div>
			<div className="space-y-12 pb-12">
				<StructureConstraints />
				<StructureTree />
				<StructureConverters />
			</div>
		</div>
	);
}
