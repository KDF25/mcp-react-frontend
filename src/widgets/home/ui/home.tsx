import { Separator } from "@/shared/ui";

import { Docs } from "@/widgets/docs";

import { DocsPolicy } from "./docs-policy";
// import { DocsFeatures } from "@/widgets/docs/ui/docs-features";
// import { DocsMission } from "@/widgets/docs/ui/docs-mission";
// import { DocsPolicy } from "@/widgets/docs/ui/docs-policy";

import { HomeHero } from "./home-hero";
import { HomeInfrastructure } from "./home-infrastructure";
import { HomeModules } from "./home-modules";
import { HomeStatus } from "./home-status";

export function Home() {
	return (
		<>
			<HomeHero />

			<div className="space-y-8">
				<HomeStatus />
				<HomeModules />
			</div>

			<Separator className="bg-primary/5" />
			<HomeInfrastructure />
			<DocsPolicy />
			<Docs />
		</>
	);
}
