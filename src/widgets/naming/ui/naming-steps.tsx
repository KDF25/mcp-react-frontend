import { NamingEslintFilename } from "./naming-eslint-filename";
import { NamingEslintTypes } from "./naming-eslint-types";
import { NamingFilePolicy } from "./naming-file-policy";
import { NamingFsdRules } from "./naming-fsd-rules";
import { NamingRelaxations } from "./naming-relaxations";
import { NamingTypingConventions } from "./naming-typing-conventions";

export function NamingSteps() {
	return (
		<div className="flex flex-col gap-6">
			<NamingFilePolicy />
			<NamingEslintFilename />
			<NamingTypingConventions />
			<NamingEslintTypes />
			<NamingFsdRules />
			<NamingRelaxations />
		</div>
	);
}
