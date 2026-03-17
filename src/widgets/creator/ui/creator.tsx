import { Separator } from "@/shared/ui";

import { CreatorConnections } from "./creator-connections";
import { CreatorHeader } from "./creator-header";
import { CreatorPrinciples } from "./creator-principles";
import { CreatorResponsibility } from "./creator-responsibility";
import { CreatorRole } from "./creator-role";
import { CreatorStatus } from "./creator-status";
import { CreatorTechnical } from "./creator-technical";

export function Creator() {
	return (
		<div className="space-y-12">
			<CreatorHeader />
			<div className="space-y-12">
				<CreatorRole />
				<Separator />
				<CreatorResponsibility />
				<CreatorPrinciples />
				<CreatorTechnical />
				<CreatorConnections />
				<CreatorStatus />
			</div>
		</div>
	);
}
