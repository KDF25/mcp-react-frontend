import * as React from "react";

import { cn } from "@/shared/lib/utils";

interface ISectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	badge?: React.ReactNode;
	children: React.ReactNode;
}

export function SectionTitle({
	badge,
	children,
	className,
	...props
}: ISectionTitleProps) {
	return (
		<h2
			className={cn(
				"text-2xl font-semibold mb-6 flex items-center gap-3",
				className
			)}
			{...props}
		>
			{badge && (
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					{badge}
				</span>
			)}
			{children}
		</h2>
	);
}
