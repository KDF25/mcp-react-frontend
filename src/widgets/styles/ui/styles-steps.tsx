import { StylesStepGlobal } from "./styles-step-global";
import { StylesStepRestrictions } from "./styles-step-restrictions";
import { StylesStepTheme } from "./styles-step-theme";
import { StylesStepVariables } from "./styles-step-variables";

export async function StylesSteps() {
	return (
		<div className="flex flex-col gap-6">
			<StylesStepVariables />
			<StylesStepTheme />
			<StylesStepGlobal />
			<StylesStepRestrictions />
		</div>
	);
}
