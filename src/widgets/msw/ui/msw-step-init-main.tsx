"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { MSW_CODE_MAIN } from "../model";

function MswStepInitMainComponent() {
	const { t } = useTranslation("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="06" className="text-xl mb-2">
				{t("steps.init_main.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="msw"
					i18nKey="steps.init_main.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>
			<CodeBlock
				code={MSW_CODE_MAIN}
				language="typescript"
				filename="main.tsx"
			/>
		</div>
	);
}

export const MswStepInitMain = withErrorBoundary(MswStepInitMainComponent);
