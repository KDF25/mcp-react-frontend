import { EntitiesModulesApi } from "./entities-modules-api";
import { EntitiesModulesConverters } from "./entities-modules-converters";
import { EntitiesModulesHandlers } from "./entities-modules-handlers";
import { EntitiesModulesMock } from "./entities-modules-mock";
import { EntitiesModulesSchema } from "./entities-modules-schema";
import { EntitiesModulesSlice } from "./entities-modules-slice";
import { EntitiesModulesTypes } from "./entities-modules-types";
import { EntitiesModulesUi } from "./entities-modules-ui";

export function EntitiesModules() {
	return (
		<div className="flex flex-col gap-6">
			<EntitiesModulesApi />
			<EntitiesModulesConverters />
			<EntitiesModulesHandlers />
			<EntitiesModulesMock />
			<EntitiesModulesSchema />
			<EntitiesModulesSlice />
			<EntitiesModulesUi />
			<EntitiesModulesTypes />
		</div>
	);
}
