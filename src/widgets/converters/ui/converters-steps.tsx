import { ConvertersStepFilters } from "./converters-step-filters";
import { ConvertersStepRtkQuery } from "./converters-step-rtk-query";
import { ConvertersStepToBackend } from "./converters-step-to-backend";
import { ConvertersStepToFrontend } from "./converters-step-to-frontend";

export function ConvertersSteps() {
	return (
		<div className="space-y-12">
			<ConvertersStepToFrontend />
			<ConvertersStepToBackend />
			<ConvertersStepFilters />
			<ConvertersStepRtkQuery />
		</div>
	);
}
