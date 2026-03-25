import {
	BookOpen,
	Bot,
	Command,
	Frame,
	Globe,
	Layers,
	Palette,
	PieChart,
	Settings2,
	Sparkles,
	SquareTerminal,
	Zap
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
			logo: "/logo.png",
			plan: "v1.0.0"
		}
	],
	navMain: [
		{
			title: "Getting Started",
			url: ENUM_ROUTES.MAIN.INTRODUCTION,
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
			title: "Architecture & Structure",
			url: ENUM_ROUTES.MAIN.FSD,
			icon: Layers,
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
					url: ENUM_ROUTES.MAIN.ENTITIES
				},
				{
					title: "Widget Structure",
					url: `${ENUM_ROUTES.MAIN.FSD}#widgets-structure`
				},
				{
					title: "Project Structure",
					url: ENUM_ROUTES.MAIN.STRUCTURE
				},
				{
					title: "Shared Patterns",
					url: `${ENUM_ROUTES.MAIN.STRUCTURE}#shared-patterns`
				}
			]
		},
		{
			title: "API & Data",
			url: ENUM_ROUTES.MAIN.RTK_QUERY,
			icon: Globe,
			items: [
				{
					title: "RTK Query",
					url: ENUM_ROUTES.MAIN.RTK_QUERY
				},
				{
					title: "Mock Server (MSW)",
					url: ENUM_ROUTES.MAIN.MSW
				},
				{
					title: "Data Converters",
					url: ENUM_ROUTES.MAIN.CONVERTERS
				}
			]
		},
		{
			title: "Optimization & Stability",
			url: ENUM_ROUTES.MAIN.MEMOIZATION,
			icon: Zap,
			items: [
				{
					title: "Memoization",
					url: ENUM_ROUTES.MAIN.MEMOIZATION
				},
				{
					title: "Error Boundaries",
					url: ENUM_ROUTES.MAIN.ERROR_BOUNDARY
				}
			]
		},
		{
			title: "Customization & Rules",
			url: ENUM_ROUTES.MAIN.NAMING,
			icon: Settings2,
			items: [
				{
					title: "Naming Conventions",
					url: ENUM_ROUTES.MAIN.NAMING
				},
				{
					title: "Styling Standards",
					url: ENUM_ROUTES.MAIN.STYLES
				},
				{
					title: "Theme",
					url: ENUM_ROUTES.MAIN.THEME
				},
				{
					title: "Zod & Typing",
					url: ENUM_ROUTES.MAIN.ZOD
				},
				{
					title: "Internationalization",
					url: ENUM_ROUTES.MAIN.I18N
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
