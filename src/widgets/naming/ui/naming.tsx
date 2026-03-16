import { NamingFilePolicy } from "./naming-file-policy";
import { NamingLinterRules } from "./naming-linter-rules";
import { NamingSyntaxGuidance } from "./naming-syntax-guidance";

export function Naming() {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Naming & Style Standards
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Строгие семантические соглашения, предназначенные для
					устранения двусмысленности и технического долга через
					статический анализ.
				</p>
			</div>
			<div className="space-y-12">
				<NamingFilePolicy />
				<NamingLinterRules />
				<NamingSyntaxGuidance />
			</div>
		</div>
	);
}
