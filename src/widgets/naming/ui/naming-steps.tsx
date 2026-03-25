import { NamingFilePolicy } from "./naming-file-policy";
import { NamingFsdRules } from "./naming-fsd-rules";
import { NamingRelaxations } from "./naming-relaxations";
import { NamingTypingConventions } from "./naming-typing-conventions";

export function NamingSteps() {
	return (
		<div className="flex flex-col gap-6">
			<NamingFilePolicy />
			<NamingTypingConventions />
			<NamingFsdRules />
			<NamingRelaxations />
		</div>
	);
}
