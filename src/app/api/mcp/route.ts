import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createMcpServer } from '@/features/mcp/lib/mcp-server';
import { NextRequest } from 'next/server';

/**
 * Force dynamic rendering to ensure streaming works correctly in Next.js.
 */
export const dynamic = 'force-dynamic';

/**
 * Global persistence for MCP server, transport, and connection state.
 */
const globalForMcp = global as unknown as {
    mcpTransport?: WebStandardStreamableHTTPServerTransport;
    mcpServer?: ReturnType<typeof createMcpServer>;
    mcpConnectPromise?: Promise<void>;
};

// Initialize or reuse the MCP server and transport
const server = globalForMcp.mcpServer ?? createMcpServer();
const transport = globalForMcp.mcpTransport ?? new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
});

// Save to global in development
if (process.env.NODE_ENV !== 'production') {
    globalForMcp.mcpServer = server;
    globalForMcp.mcpTransport = transport;
}

/**
 * Connects the server to the transport with synchronization to prevent race conditions.
 */
async function ensureConnected() {
    // If connection is already in progress or done, wait for it
    if (globalForMcp.mcpConnectPromise) {
        return globalForMcp.mcpConnectPromise;
    }

    // Start connection process
    globalForMcp.mcpConnectPromise = (async () => {
        try {
            await server.connect(transport);
            console.log('[MCP] Server successfully connected to transport');
        } catch (error: any) {
            // If already started, we can ignore this error
            if (error.message?.includes('already started') || error.message?.includes('already connected')) {
                console.log('[MCP] Transport already started, reusing connection');
                return;
            }
            console.error('[MCP] Failed to connect server to transport:', error);
            globalForMcp.mcpConnectPromise = undefined; // Reset to allow retry
            throw error;
        }
    })();

    return globalForMcp.mcpConnectPromise;
}

export async function GET(request: NextRequest) {
    return handle(request);
}

export async function POST(request: NextRequest) {
    return handle(request);
}

export async function DELETE(request: NextRequest) {
    return handle(request);
}

async function handle(request: NextRequest) {
    const sessionId = request.headers.get('mcp-session-id') || 'no-session';

    try {
        // Ensure the server is connected to the transport (synchronized)
        await ensureConnected();

        const headers = new Headers(request.headers);

        console.log(`[MCP][${sessionId}] Request: ${request.method} ${request.url}`);

        if (!headers.get('Accept') || headers.get('Accept') === '*/*') {
            headers.set('Accept', 'application/json, text/event-stream');
        }

        const modifiedRequest = new Request(request.url, {
            method: request.method,
            headers: headers,
            body: request.body,
            // @ts-expect-error - duplex is required for streaming request bodies in Node.js
            duplex: 'half',
        });

        const response = await transport.handleRequest(modifiedRequest);

        console.log(`[MCP][${sessionId}] Response: ${response.status} ${response.statusText}`);

        const newHeaders = new Headers(response.headers);

        // Anti-buffering headers
        newHeaders.set('X-Accel-Buffering', 'no');
        newHeaders.set('Cache-Control', 'no-cache, no-transform');
        newHeaders.set('Connection', 'keep-alive');

        // CORS
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, mcp-session-id, Last-Event-ID, mcp-protocol-version');
        newHeaders.set('Access-Control-Expose-Headers', 'mcp-session-id, mcp-protocol-version');

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        });
    } catch (error: any) {
        console.error(`[MCP][${sessionId}] Internal Error:`, error);
        return new Response(JSON.stringify({
            jsonrpc: '2.0',
            error: {
                code: -32603,
                message: 'Internal MCP Error',
                data: { details: error.message }
            }
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, mcp-session-id, Last-Event-ID, mcp-protocol-version',
            'Access-Control-Expose-Headers': 'mcp-session-id, mcp-protocol-version',
            'Access-Control-Max-Age': '86400',
        },
    });
}
