"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { MSW_CODE_INIT } from "../model";

function MswStepInitAppComponent() {
	const { t } = useTranslation("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("steps.init_app.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="msw"
					i18nKey="steps.init_app.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>
			<CodeBlock
				code={MSW_CODE_INIT}
				language="typescript"
				filename="app/init/msw.ts"
			/>
		</div>
	);
}

export const MswStepInitApp = withErrorBoundary(MswStepInitAppComponent);
