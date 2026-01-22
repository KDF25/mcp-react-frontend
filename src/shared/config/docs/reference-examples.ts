export const REFERENCE_EXAMPLES = {
    inputSchema: `{
  "files": "string[]",       // Target files to analyze
  "deepScan": "boolean"      // Optional: check content
}`,

    claudeConfig: {
        mcpServers: {
            "mcp-react-frontend": {
                command: "npx",
                args: ["-y", "mcp-react-frontend-package"],
                env: {
                    PROJECT_ROOT: "C:/path/to/your/project"
                }
            }
        }
    }
};
