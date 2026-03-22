"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { MSW_CODE_CONFIG } from "../model";

function MswStepInitBrowserComponent() {
	const { t } = useTranslation("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.init_browser.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="msw"
					i18nKey="steps.init_browser.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>
			<CodeBlock
				code={MSW_CODE_CONFIG}
				language="typescript"
				filename="shared/api/msw/browser.ts"
			/>
		</div>
	);
}

export const MswStepInitBrowser = withErrorBoundary(
	MswStepInitBrowserComponent
);
