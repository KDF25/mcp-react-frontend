import { StylesDataFetching } from "./styles-data-fetching";
import { StylesRestrictions } from "./styles-restrictions";
import { StylesStateContract } from "./styles-state-contract";

export function Styles() {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Styling & Global Patterns
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Design system orchestration and architectural state
					management patterns.
				</p>
			</div>
			<div className="space-y-12 pb-12">
				<StylesRestrictions />
				<StylesStateContract />
				<StylesDataFetching />
			</div>
		</div>
	);
}
