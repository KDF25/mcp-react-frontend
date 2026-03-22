import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface IPageTitleProps {
	className?: string;
	description?: ReactNode;
	title: ReactNode;
}

export function PageTitle({ className, description, title }: IPageTitleProps) {
	return (
		<div className={cn("space-y-4", className)}>
			<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
				{title}
			</h1>
			{description && (
				<p className="text-xl text-muted-foreground">{description}</p>
			)}
		</div>
	);
}
