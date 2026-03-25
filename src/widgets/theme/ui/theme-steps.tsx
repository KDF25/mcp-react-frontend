import { ThemeStepContext } from "./theme-step-context";
import { ThemeStepHook } from "./theme-step-hook";
import { ThemeStepProvider } from "./theme-step-provider";
import { ThemeStepSetup } from "./theme-step-setup";
import { ThemeStepTypes } from "./theme-step-types";
import { ThemeStepUi } from "./theme-step-ui";

export async function ThemeSteps() {
	return (
		<div className="flex flex-col gap-6">
			<ThemeStepTypes />
			<ThemeStepContext />
			<ThemeStepHook />
			<ThemeStepProvider />
			<ThemeStepSetup />
			<ThemeStepUi />
		</div>
	);
}
