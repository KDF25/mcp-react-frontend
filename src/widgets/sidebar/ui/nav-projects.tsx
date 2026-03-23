"use client";

import { type LucideIcon } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/shared/ui";

import { Link, usePathname } from "@/i18n/routing";

export function NavProjects({
	projects
}: {
	projects: {
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}) {
	const pathname = usePathname();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton
							asChild
							isActive={pathname === item.url}
						>
							<Link href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
