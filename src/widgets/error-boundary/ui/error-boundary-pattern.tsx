"use client";

import { Code2Icon, LayoutPanelTopIcon, ShieldAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge, Card, CodeBlock, withErrorBoundary } from "@/shared/ui";

import { ERROR_BOUNDARY_DATA } from "../model/error-boundary.data";

function ErrorBoundaryPatternComponent() {
	// Note: Usually we would have translations for this,
	// but following the user's request for "analogous page"
	// we use hardcoded text or mock translations if applicable.
	// In this snippet I'll use text directly to ensure it works immediately.

	return (
		<section className="space-y-12">
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					03
				</span>
				Error Boundary Pattern
			</h2>

			<div className="grid gap-8">
				<div className="space-y-4">
					<p className="text-muted-foreground max-w-2xl">
						В нашем проекте Error Boundaries используются для
						изоляции ошибок в виджетах и обеспечения
						работоспособности остального приложения при сбоях в
						конкретных компонентах.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Card className="p-4 border-primary/20 bg-primary/5">
							<div className="flex items-center gap-2 text-primary mb-2 font-bold">
								<LayoutPanelTopIcon size={18} />
								Глобальный перехват
							</div>
							<p className="text-sm opacity-80">
								Все приложение обернуто в глобальный Error
								Boundary для предотвращения "белого экрана".
							</p>
						</Card>
						<Card className="p-4 border-primary/20 bg-primary/5">
							<div className="flex items-center gap-2 text-primary mb-2 font-bold">
								<ShieldAlertIcon size={18} />
								Изоляция виджетов
							</div>
							<p className="text-sm opacity-80">
								Каждый виджет обязан экспортироваться через HOC{" "}
								<code className="text-primary">
									withErrorBoundary
								</code>
								.
							</p>
						</Card>
					</div>
				</div>

				<div className="space-y-6">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Code2Icon size={16} className="text-primary" />
							<Badge variant="secondary">
								HOC Pattern (Preferred)
							</Badge>
						</div>
						<CodeBlock
							filename="widgets/my-widget/ui/my-widget.tsx"
							language="typescript"
							code={ERROR_BOUNDARY_DATA.hocUsage}
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Code2Icon size={16} className="text-primary" />
							<Badge variant="secondary">
								Shared Implementation
							</Badge>
						</div>
						<CodeBlock
							filename="shared/ui/error-boundary/error-boundary.tsx"
							language="typescript"
							code={ERROR_BOUNDARY_DATA.sharedImplementation}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export const ErrorBoundaryPattern = withErrorBoundary(
	ErrorBoundaryPatternComponent
);
