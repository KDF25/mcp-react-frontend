import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { NextRequest } from "next/server";

import { createMcpServer } from "@/features/mcp/lib/mcp-server";

/**
 * Force dynamic rendering to ensure streaming works correctly in Next.js.
 */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	return handle(request);
}

export async function POST(request: NextRequest) {
	return handle(request);
}

export async function DELETE(request: NextRequest) {
	return handle(request);
}

/**
 * Stateless per-request handler.
 * Each request creates a fresh server + transport pair,
 * which is the correct pattern for Streamable HTTP with enableJsonResponse.
 */
async function handle(request: NextRequest) {
	try {
		const server = createMcpServer();
		const transport = new WebStandardStreamableHTTPServerTransport({
			enableJsonResponse: true
		});

		await server.connect(transport);

		const headers = new Headers(request.headers);

		if (!headers.get("Accept") || headers.get("Accept") === "*/*") {
			headers.set("Accept", "application/json, text/event-stream");
		}

		const modifiedRequest = new Request(request.url, {
			method: request.method,
			headers: headers,
			body: request.body,
			// @ts-expect-error - duplex is required for streaming request bodies in Node.js
			duplex: "half"
		});

		const response = await transport.handleRequest(modifiedRequest);

		const newHeaders = new Headers(response.headers);

		// Anti-buffering headers
		newHeaders.set("X-Accel-Buffering", "no");
		newHeaders.set("Cache-Control", "no-cache, no-transform");
		newHeaders.set("Connection", "keep-alive");

		// CORS
		newHeaders.set("Access-Control-Allow-Origin", "*");
		newHeaders.set(
			"Access-Control-Allow-Methods",
			"GET, POST, DELETE, OPTIONS"
		);
		newHeaders.set(
			"Access-Control-Allow-Headers",
			"Content-Type, mcp-session-id, Last-Event-ID, mcp-protocol-version"
		);
		newHeaders.set(
			"Access-Control-Expose-Headers",
			"mcp-session-id, mcp-protocol-version"
		);

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders
		});
	} catch (error: any) {
		console.error(`[MCP] Internal Error:`, error);
		return new Response(
			JSON.stringify({
				jsonrpc: "2.0",
				error: {
					code: -32603,
					message: "Internal MCP Error",
					data: { details: error.message }
				}
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
			}
		);
	}
}

export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
			"Access-Control-Allow-Headers":
				"Content-Type, mcp-session-id, Last-Event-ID, mcp-protocol-version",
			"Access-Control-Expose-Headers":
				"mcp-session-id, mcp-protocol-version",
			"Access-Control-Max-Age": "86400"
		}
	});
}
