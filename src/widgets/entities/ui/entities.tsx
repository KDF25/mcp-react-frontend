import { withErrorBoundary } from "@/shared/ui";

import { EntitiesModules } from "./entities-modules";
import { EntitiesTree } from "./entities-tree";

function EntitiesComponent() {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Предметная область (Entities)
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Сущности — это базовые бизнес-единицы проекта. Данный раздел
					описывает унифицированную структуру любой сущности,
					основанную на строгих архитектурных правилах.
				</p>
			</div>

			<EntitiesTree />
			<EntitiesModules />
		</div>
	);
}

export const Entities = withErrorBoundary(EntitiesComponent);
