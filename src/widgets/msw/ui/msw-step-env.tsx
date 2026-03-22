"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

function MswStepEnvComponent() {
	const { t } = useTranslation("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="07" className="text-xl mb-2">
				{t("steps.env.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="msw"
					i18nKey="steps.env.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>
			<CodeBlock
				code="VITE_ENABLE_MSW=true"
				language="bash"
				filename=".env"
			/>
		</div>
	);
}

export const MswStepEnv = withErrorBoundary(MswStepEnvComponent);
