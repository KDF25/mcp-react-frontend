"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail
} from "@/shared/ui";

import { SIDEBAR_CONFIG } from "../model";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { TeamSwitcher } from "./team-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={SIDEBAR_CONFIG.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={SIDEBAR_CONFIG.navMain} />
				<NavProjects projects={SIDEBAR_CONFIG.projects} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
