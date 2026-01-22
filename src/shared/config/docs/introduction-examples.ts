export const INTRODUCTION_EXAMPLES = {
    whatIsMCP: "Model Context Protocol (MCP) in this codebase is a specialized server-side orchestration layer designed to define and enforce architectural contracts, coding standards, and project-specific constraints for Large Language Models. It serves as the authoritative source of truth, ensuring that any modifications or extensions to the system remain compliant with the established FSD architecture and semantic guidelines.",

    whatIsNOT: [
        "MCP is NOT a User Interface or an assistant layer",
        "MCP is NOT a tool for making autonomous design decisions",
        "MCP is NOT a library for general-purpose utility functions",
        "MCP is NOT a replacement for build-time compilation or type checking",
        "MCP is NOT a suggestion engine for 'convenient' development"
    ],

    rewriteRole: [
        {
            step: "Analysis",
            description: "The LLM queries the MCP server to obtain the current architectural state, including FSD layer boundaries and naming conventions."
        },
        {
            step: "Contract Verification",
            description: "Before applying changes, the LLM validates the proposed module structure against the 'analyze_project' tool rules."
        },
        {
            step: "Constraint Enforcement",
            description: "MCP restricts the usage of forbidden patterns (e.g., direct cross-layer imports or non-semantic Tailwind classes)."
        },
        {
            step: "Final Validation",
            description: "The server provides a definitive 'Pass/Fail' status for the updated module, locking the changes into the project standard."
        }
    ],

    vsPrompts: "Unlike static prompts or workflow rules, which are easily ignored or misinterpreted by LLMs over time, MCP provides a hard-wired, tool-based validation bridge. It moves knowledge from the ephemeral context of a prompt into a deterministic, executable specification that the model must interact with via structured API calls.",

    philosophy: [
        { title: "Determinism", description: "Rules must produce identical validation results regardless of the LLM used." },
        { title: "Explicit Rules", description: "No implicit assumptions; every constraint is defined in the configuration layer." },
        { title: "Zero Magic", description: "Transparent validation logic without hidden heuristics or AI-driven 'guesses'." },
        { title: "Validation over Generation", description: "The server's primary function is to restrict and verify, not to generate ad-hoc code." }
    ]
};
