import { SectionTitle, withErrorBoundary } from "@/shared/ui";

import { EntitiesModulesApi } from "./entities-modules-api";
import { EntitiesModulesConverters } from "./entities-modules-converters";
import { EntitiesModulesHandlers } from "./entities-modules-handlers";
import { EntitiesModulesMock } from "./entities-modules-mock";
import { EntitiesModulesSchema } from "./entities-modules-schema";
import { EntitiesModulesSlice } from "./entities-modules-slice";
import { EntitiesModulesTypes } from "./entities-modules-types";
import { EntitiesModulesUi } from "./entities-modules-ui";

function EntitiesModulesComponent() {
	return (
		<section className="space-y-8">
			<SectionTitle badge="03" className="mb-0">
				Детальное описание модулей
			</SectionTitle>

			<div className="grid gap-6">
				<EntitiesModulesApi />
				<EntitiesModulesConverters />
				<EntitiesModulesHandlers />
				<EntitiesModulesMock />
				<EntitiesModulesSchema />
				<EntitiesModulesSlice />
				<EntitiesModulesUi />
				<EntitiesModulesTypes />
			</div>
		</section>
	);
}

export const EntitiesModules = withErrorBoundary(EntitiesModulesComponent);
