import { HomeComparison } from "./home-comparison";
import { HomeHero } from "./home-hero";
import { HomeNotMcp } from "./home-not-mcp";
import { HomeOverview } from "./home-overview";
import { HomePhilosophy } from "./home-philosophy";
import { HomeRole } from "./home-role";

export function Home() {
	return (
		<div className="container max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500">
			<HomeHero />
			<HomeOverview />
			<HomeNotMcp />
			<HomeRole />
			<HomeComparison />
			<HomePhilosophy />
		</div>
	);
}
