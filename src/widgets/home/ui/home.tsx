import { DASHBOARD_CONTENT } from "@/shared/config";
import { Separator } from "@/shared/ui";

// import { DocsFeatures } from "@/widgets/docs/ui/docs-features";
// import { DocsMission } from "@/widgets/docs/ui/docs-mission";
// import { DocsPolicy } from "@/widgets/docs/ui/docs-policy";

import { HomeHero } from "./home-hero";
import { HomeInfrastructure } from "./home-infrastructure";
import { HomeModules } from "./home-modules";
import { HomeStatus } from "./home-status";

export function Home() {
	const { hero, status, features, infrastructure } = DASHBOARD_CONTENT;

	return (
		<>
			<HomeHero
				title={hero.title}
				subtitle={hero.subtitle}
				description={hero.description}
			/>

			<div className="space-y-8">
				<HomeStatus items={status} />
				<HomeModules items={features} />
			</div>
			{/* <div className="space-y-8">
				<DocsMission />
				<DocsFeatures />
				<DocsPolicy />
			</div> */}

			<Separator className="bg-primary/5" />
			<HomeInfrastructure items={infrastructure} />
		</>
	);
}
