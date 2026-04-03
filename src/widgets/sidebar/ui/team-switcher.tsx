"use client";

import Link from "next/link";
import * as React from "react";

import { ENUM_ROUTES } from "@/shared/config/routes";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/ui";

export function TeamSwitcher({
	teams
}: {
	teams: {
		name: string;
		logo: React.ElementType | string;
		plan: string;
	}[];
}) {
	const [activeTeam] = React.useState(teams[0]);

	if (!activeTeam) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Link href={ENUM_ROUTES.MAIN.ROOT} className="w-full">
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<div className="flex size-8 items-center justify-center rounded-md overflow-hidden">
							<img
								src={activeTeam.logo as string}
								alt={activeTeam.name}
								className="size-12 object-contain"
							/>
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">
								{activeTeam.name}
							</span>
							<span className="truncate text-xs">
								{activeTeam.plan}
							</span>
						</div>
					</SidebarMenuButton>
				</Link>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
