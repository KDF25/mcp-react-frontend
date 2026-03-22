import {
	BookOpen,
	Bot,
	Command,
	Frame,
	PieChart,
	Settings2,
	SquareTerminal
} from "lucide-react";

import { ENUM_ROUTES } from "@/shared/config";

export const SIDEBAR_CONFIG = {
	user: {
		name: "MCP Admin",
		email: "admin@mcp-server.dev",
		avatar: "/avatars/mcp.jpg"
	},
	teams: [
		{
			name: "MCP Server",
			logo: Command,
			plan: "v1.0.0"
		}
	],
	navMain: [
		{
			title: "Technical Intro",
			url: ENUM_ROUTES.MAIN.ROOT,
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: ENUM_ROUTES.MAIN.INTRODUCTION
				},
				{
					title: "Creator",
					url: ENUM_ROUTES.MAIN.CREATOR
				}
			]
		},
		{
			title: "Architecture Rules",
			url: ENUM_ROUTES.MAIN.FSD,
			icon: SquareTerminal,
			items: [
				{
					title: "FSD Layers",
					url: ENUM_ROUTES.MAIN.FSD
				},
				{
					title: "Import Boundaries",
					url: `${ENUM_ROUTES.MAIN.FSD}#boundaries`
				},
				{
					title: "Entity Structure",
					url: `${ENUM_ROUTES.MAIN.FSD}#entities-structure`
				},
				{
					title: "Widget Structure",
					url: `${ENUM_ROUTES.MAIN.FSD}#widgets-structure`
				},
				{
					title: "Memoization Strategy",
					url: ENUM_ROUTES.MAIN.MEMOIZATION
				}
			]
		},
		{
			title: "Coding Standards",
			url: ENUM_ROUTES.MAIN.NAMING,
			icon: Bot,
			items: [
				{
					title: "Naming Conventions",
					url: ENUM_ROUTES.MAIN.NAMING
				},
				{
					title: "Linter Rules",
					url: `${ENUM_ROUTES.MAIN.NAMING}#linter`
				},
				{
					title: "Styling Standards",
					url: ENUM_ROUTES.MAIN.STYLES
				}
			]
		},
		{
			title: "Advanced Patterns",
			url: ENUM_ROUTES.MAIN.I18N,
			icon: Settings2,
			items: [
				{
					title: "I18n Deep Dive",
					url: ENUM_ROUTES.MAIN.I18N
				},
				{
					title: "Zod & Typing",
					url: ENUM_ROUTES.MAIN.ZOD
				},
				{
					title: "Error Boundaries",
					url: ENUM_ROUTES.MAIN.ERROR_BOUNDARY
				},
				{
					title: "Project Structure",
					url: ENUM_ROUTES.MAIN.STRUCTURE
				},
				{
					title: "Shared Utils",
					url: `${ENUM_ROUTES.MAIN.STRUCTURE}#shared-patterns`
				},
				{
					title: "Data Converters",
					url: ENUM_ROUTES.MAIN.CONVERTERS
				},
				{
					title: "Mock Server (MSW)",
					url: ENUM_ROUTES.MAIN.MSW
				}
			]
		}
	],
	projects: [
		{
			name: "API Reference",
			url: ENUM_ROUTES.MAIN.REFERENCE,
			icon: Frame
		},
		{
			name: "MCP Tools",
			url: `${ENUM_ROUTES.MAIN.REFERENCE}#tools`,
			icon: PieChart
		}
	]
};
