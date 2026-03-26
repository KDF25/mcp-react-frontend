import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// @ts-ignore - resolve alias or use relative path
import { createMcpServer } from "../src/features/mcp/lib/mcp-server";

async function main() {
	const server = createMcpServer();
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("[MCP] Server running on stdio");
}

main().catch((error) => {
	console.error("[MCP] Error starting server:", error);
	process.exit(1);
});
