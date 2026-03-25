import { Separator } from "@/shared/ui";

import { CreatorAiSystems } from "./creator-ai-systems";
import { CreatorArchitecture } from "./creator-architecture";
import { CreatorCompetencies } from "./creator-competencies";
import { CreatorConnections } from "./creator-connections";
import { CreatorExperience } from "./creator-experience";
import { CreatorHero } from "./creator-hero";
import { CreatorSnapshot } from "./creator-snapshot";

export function Creator() {
	return (
		<div className="space-y-10 max-w-5xl">
			<CreatorHero />
			<Separator />
			<CreatorCompetencies />
			<CreatorArchitecture />
			<Separator />
			<CreatorExperience />
			<CreatorAiSystems />
			<CreatorSnapshot />
			<CreatorConnections />
		</div>
	);
}
