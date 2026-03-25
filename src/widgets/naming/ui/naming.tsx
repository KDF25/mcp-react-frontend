import { getTranslations } from "next-intl/server";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	PageTitle,
	withErrorBoundary
} from "@/shared/ui";

import { NamingFilePolicy } from "./naming-file-policy";
import { NamingFsdRules } from "./naming-fsd-rules";
import { NamingRelaxations } from "./naming-relaxations";
import { NamingTree } from "./naming-tree";
import { NamingTypingConventions } from "./naming-typing-conventions";

async function NamingComponent() {
	const t = await getTranslations("naming");

	return (
		<div className="space-y-8 max-w-4xl">
			<PageTitle
				description={t("header.description")}
				title={t("header.title")}
			/>

			<Card className="bg-muted/10">
				<CardHeader className="p-4 border-b">
					<CardTitle className="text-xl">{t("card_title")}</CardTitle>
					<CardDescription className="text-sm">
						<span className="font-semibold text-foreground mr-1">
							{t("benefit_label")}
						</span>
						{t("benefit_text")}
					</CardDescription>
				</CardHeader>

				<CardContent className="p-6 space-y-10">
					<NamingTree />

					<div className="grid gap-10">
						<NamingFilePolicy />
						<NamingTypingConventions />
						<NamingFsdRules />
						<NamingRelaxations />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export const Naming = withErrorBoundary(NamingComponent);
