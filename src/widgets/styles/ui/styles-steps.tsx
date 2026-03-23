import { StylesStepGlobal } from "./styles-step-global";
import { StylesStepRestrictions } from "./styles-step-restrictions";
import { StylesStepTheme } from "./styles-step-theme";
import { StylesStepVariables } from "./styles-step-variables";

export async function StylesSteps() {
	return (
		<div className="space-y-16">
			<StylesStepVariables />
			<StylesStepTheme />
			<StylesStepGlobal />
			<StylesStepRestrictions />
		</div>
	);
}
