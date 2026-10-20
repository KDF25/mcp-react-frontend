import { RtkQueryStepBase } from "./rtk-query-step-base";
import { RtkQueryStepInject } from "./rtk-query-step-inject";
import { RtkQueryStepSession } from "./rtk-query-step-session";
import { RtkQueryStepTags } from "./rtk-query-step-tags";

export async function RtkQuerySteps() {
	return (
		<div className="flex flex-col gap-6">
			<RtkQueryStepTags />
			<RtkQueryStepSession />
			<RtkQueryStepBase />
			<RtkQueryStepInject />
		</div>
	);
}
