import { ZodStepSchema } from "./zod-step-schema";
import { ZodStepTypes } from "./zod-step-types";
import { ZodStepUsage } from "./zod-step-usage";

export function ZodSteps() {
	return (
		<div className="flex flex-col gap-6">
			<ZodStepSchema />
			<ZodStepTypes />
			<ZodStepUsage />
		</div>
	);
}
