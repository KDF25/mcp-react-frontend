export const DASHBOARD_CONTENT = {
    hero: {
        title: "MCP Orchestrator",
        subtitle: "Architectural Integrity Server",
        description: "A specialized protocol layer for enforcing FSD boundaries, semantic standards, and project-specific constraints. Validating code through deterministic rules instead of ephemeral prompts."
    },
    status: [
        { label: "Core Protocol", value: "SSE (v1.0.0)", status: "active" },
        { label: "Architecture", value: "FSD-Strict", status: "enforced" },
        { label: "AI Integration", value: "Gemini / Claude", status: "authorized" },
        { label: "Validation", value: "Locked", status: "stable" }
    ],
    features: [
        {
            title: "Rules Enforcement",
            description: "Zero-tolerance boundary checks and dependency validation.",
            icon: "ShieldCheck",
            link: "/introduction"
        },
        {
            title: "FSD Governance",
            description: "Deep structural analysis of layers and entity boundaries.",
            icon: "Layers",
            link: "/fsd"
        },
        {
            title: "Semantic Naming",
            description: "Enforcing consistent file patterns and variable naming.",
            icon: "Type",
            link: "/naming"
        }
    ],
    infrastructure: [
        { title: "Deterministic Rules", description: "Executable specifications that override prompt drift." },
        { title: "Source of Truth", description: "Centralized configuration for architectural patterns." },
        { title: "Clean Code Protocol", description: "Continuous integrity monitoring for every code modification." }
    ]
};
