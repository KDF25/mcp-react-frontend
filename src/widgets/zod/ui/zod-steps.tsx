import { ZodStepSchema } from "./zod-step-schema";
import { ZodStepTypes } from "./zod-step-types";
import { ZodStepUsage } from "./zod-step-usage";

export function ZodSteps() {
	return (
		<div className="space-y-12">
			<ZodStepSchema />
			<ZodStepTypes />
			<ZodStepUsage />
		</div>
	);
}
