"use client"

import {
  BookOpen,
  Bot,
  Command,
  Frame,
  PieChart,
  Settings2,
  SquareTerminal
} from "lucide-react"
import * as React from "react"

import { ENUM_ROUTES } from "@/shared/config/routes"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "./shadcn-ui"
import { TeamSwitcher } from "./team-switcher"

// This is real MCP documentation data.
const data = {
  user: {
    name: "MCP Admin",
    email: "admin@mcp-server.dev",
    avatar: "/avatars/mcp.jpg",
  },
  teams: [
    {
      name: "MCP Server",
      logo: Command,
      plan: "v1.0.0",
    },
  ],
  navMain: [
    {
      title: "Technical Intro",
      url: ENUM_ROUTES.MAIN.ROOT,
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: ENUM_ROUTES.MAIN.INTRODUCTION,
        },
        {
          title: "Creator",
          url: ENUM_ROUTES.MAIN.CREATOR,
        },
      ],
    },
    {
      title: "Architecture Rules",
      url: ENUM_ROUTES.MAIN.FSD,
      icon: SquareTerminal,
      items: [
        {
          title: "FSD Layers",
          url: ENUM_ROUTES.MAIN.FSD,
        },
        {
          title: "Import Boundaries",
          url: `${ENUM_ROUTES.MAIN.FSD}#boundaries`,
        },
        {
          title: "Entity Structure",
          url: `${ENUM_ROUTES.MAIN.FSD}#entities-structure`,
        },
        {
          title: "Widget Structure",
          url: `${ENUM_ROUTES.MAIN.FSD}#widgets-structure`,
        },
      ],
    },
    {
      title: "Coding Standards",
      url: ENUM_ROUTES.MAIN.NAMING,
      icon: Bot,
      items: [
        {
          title: "Naming Conventions",
          url: ENUM_ROUTES.MAIN.NAMING,
        },
        {
          title: "Linter Rules",
          url: `${ENUM_ROUTES.MAIN.NAMING}#linter`,
        },
      ],
    },
    {
      title: "Structure & Styles",
      url: ENUM_ROUTES.MAIN.STRUCTURE,
      icon: Settings2,
      items: [
        {
          title: "File Structure",
          url: ENUM_ROUTES.MAIN.STRUCTURE,
        },
        {
          title: "Tailwind & UI",
          url: ENUM_ROUTES.MAIN.STYLES,
        },
      ],
    },
  ],
  projects: [
    {
      name: "API Reference",
      url: ENUM_ROUTES.MAIN.REFERENCE,
      icon: Frame,
    },
    {
      name: "MCP Tools",
      url: `${ENUM_ROUTES.MAIN.REFERENCE}#tools`,
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
