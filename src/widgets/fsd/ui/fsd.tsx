"use client";

import { EntityStructure } from "./entity-structure";
import { GlobalSettings } from "./global-settings";
import { ImportBoundaries } from "./import-boundaries";
import { LayerHierarchy } from "./layer-hierarchy";
import { PracticalExamples } from "./practical-examples";
import { WidgetModelStructure } from "./widget-model-structure";

export function Fsd() {
	return (
		<>
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Feature-Sliced Design Rules
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Установление строгой иерархии слоев и границ зависимостей
					для обеспечения горизонтальной и вертикальной развязки.
				</p>
			</div>
			<div className="space-y-12">
				<LayerHierarchy />
				<ImportBoundaries />
				<EntityStructure />
				<WidgetModelStructure />
				<PracticalExamples />
				<GlobalSettings />
			</div>
		</>
	);
}
