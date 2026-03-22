"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { MSW_CODE_HANDLERS_REGISTRY } from "../model";

function MswStepInitHandlersComponent() {
	const { t } = useTranslation("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="04" className="text-xl mb-2">
				{t("steps.init_handlers.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="msw"
					i18nKey="steps.init_handlers.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>
			<CodeBlock
				code={MSW_CODE_HANDLERS_REGISTRY}
				language="typescript"
				filename="shared/api/msw/handlers.ts"
			/>
		</div>
	);
}

export const MswStepInitHandlers = withErrorBoundary(
	MswStepInitHandlersComponent
);
