"use client";

import { usePathname } from "next/navigation";

import { ENUM_ROUTES } from "@/shared/config/routes";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Separator,
	SidebarTrigger
} from "@/shared/ui";

const ROUTE_TITLES: Record<string, string> = {
	[ENUM_ROUTES.MAIN.ROOT]: "The Mission",
	[ENUM_ROUTES.MAIN.INTRODUCTION]: "Introduction",
	[ENUM_ROUTES.MAIN.CREATOR]: "Creator",
	[ENUM_ROUTES.MAIN.FSD]: "Architecture (FSD)",
	[ENUM_ROUTES.MAIN.NAMING]: "Coding Standards",
	[ENUM_ROUTES.MAIN.ZOD]: "Zod & Typing",
	[ENUM_ROUTES.MAIN.I18N]: "I18n Master Guide",
	[ENUM_ROUTES.MAIN.STYLES]: "Styles & Patterns",
	[ENUM_ROUTES.MAIN.STRUCTURE]: "File Structure",
	[ENUM_ROUTES.MAIN.REFERENCE]: "API & Tools"
};

export function DocHeader() {
	const pathname = usePathname();
	const currentPageTitle =
		ROUTE_TITLES[pathname as string] || "Documentation";

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href={ENUM_ROUTES.MAIN.ROOT}>
								Documentation
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
