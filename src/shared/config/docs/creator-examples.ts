export const CREATOR_EXAMPLES = {
  profile: {
    role: "Damir Karimov serves as the Lead Architect and Author of the MCP Orchestration Layer. In this capacity, he defines the project’s technical boundaries, establishes the semantic contracts for the LLM-to-codebase interaction, and maintains the authoritative rule-set for the system’s evolution.",
    responsibility: [
      "Architectural Governance: Defining and enforcing Feature-Sliced Design (FSD) boundaries.",
      "Protocol Integrity: Maintaining the deterministic nature of MCP tool responses.",
      "Quality Assurance: Optimizing code quality and performance through strict static analysis.",
      "Scalability: Designing modular structures that prevent technical debt accumulation."
    ],
    engineeringPrinciples: [
      { title: "Architectural Integrity", description: "Strict adherence to FSD for modular and maintainable system structure." },
      { title: "Performance Optimization", description: "Delivering high-performance interfaces and robust backend APIs with zero bloat." },
      { title: "Engineering Precision", description: "Combining pixel-perfect UI with robust, type-safe architectural patterns." },
      { title: "Contractual Determinism", description: "Every rule is a conscious engineering choice designed to eliminate ambiguity." }
    ],
    techStack: {
      frontend: ["React", "Next.js", "Redux", "TypeScript"],
      backend: ["Node.js", "Express", "NestJS", "FastAPI"],
      db: ["PostgreSQL", "MongoDB", "SQLite"]
    },
    philosophy: "Engineering precision combined with product thinking: building systems that are technically robust while delivering high-performance user experiences.",
    connections: {
      github: "https://github.com/KDF25",
      email: "karimov.damir.faridovich@gmail.com"
    },
    status: "SYSTEM_ONLINE"
  },

  technicalContract: `{
  "contract": "Creator_Registry_v1",
  "architect": "Damir Karimov",
  "focus": "FSD_Infrastructure_Orchestration",
  "intent": "Maintain_Technical_Integrity_Through_Explicit_Rules"
}`
};
