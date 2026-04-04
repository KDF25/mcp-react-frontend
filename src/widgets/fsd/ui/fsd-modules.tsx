import { EntityStructure } from "./entity-structure";
import { GlobalSettings } from "./global-settings";
import { ImportBoundaries } from "./import-boundaries";
import { LayerHierarchy } from "./layer-hierarchy";
import { PracticalExamples } from "./practical-examples";
import { WidgetModelStructure } from "./widget-model-structure";

export function FsdModules() {
	return (
		<div className="flex flex-col gap-6">
			<LayerHierarchy />
			<ImportBoundaries />
			<EntityStructure />
			<WidgetModelStructure />
			<PracticalExamples />
			<GlobalSettings />
		</div>
	);
}
