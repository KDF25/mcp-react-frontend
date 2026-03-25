"use client";

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

import { LanguageToggle, ThemeToggle } from "./layout";
import { Link, usePathname } from "@/i18n/routing";

const ROUTE_TITLES: Record<string, string> = {
	[ENUM_ROUTES.MAIN.ROOT]: "Orchestration Core",
	[ENUM_ROUTES.MAIN.CREATOR]: "Creator",
	[ENUM_ROUTES.MAIN.FSD]: "Architecture (FSD)",
	[ENUM_ROUTES.MAIN.NAMING]: "Coding Standards",
	[ENUM_ROUTES.MAIN.ZOD]: "Zod & Typing",
	[ENUM_ROUTES.MAIN.I18N]: "I18n Master Guide",
	[ENUM_ROUTES.MAIN.STYLES]: "Styles & Patterns",
	[ENUM_ROUTES.MAIN.STRUCTURE]: "File Structure",
	[ENUM_ROUTES.MAIN.REFERENCE]: "API & Tools",
	[ENUM_ROUTES.MAIN.CONVERTERS]: "Data Converters",
	[ENUM_ROUTES.MAIN.MSW]: "Mock Server (MSW)",
	[ENUM_ROUTES.MAIN.THEME]: "Theme Master Guide"
};

export function DocHeader() {
	const pathname = usePathname();
	const currentPageTitle =
		ROUTE_TITLES[pathname as string] || "Documentation";

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-4">
			<div className="flex h-16 items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink asChild>
									<Link href={ENUM_ROUTES.MAIN.ROOT}>
										Documentation
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>
									{currentPageTitle}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<LanguageToggle />
				</div>
			</div>
		</header>
	);
}
