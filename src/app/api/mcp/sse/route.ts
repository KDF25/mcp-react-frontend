import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { createMcpServer } from '@/features/mcp/lib/mcp-server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Global map to store SSE transports by sessionId.
 * Uses `global` to persist across hot reloads in development.
 * 
 * Note: In Vercel production, this may not persist between cold starts.
 * SSE protocol is primarily for local development/testing via MCP Inspector.
 */
declare global {
    // eslint-disable-next-line no-var
    var mcpSseTransports: Map<string, SSEServerTransport> | undefined;
    // eslint-disable-next-line no-var
    var mcpSseConnected: Set<string> | undefined;
}

const transports = global.mcpSseTransports || (global.mcpSseTransports = new Map<string, SSEServerTransport>());
const connectedSessions = global.mcpSseConnected || (global.mcpSseConnected = new Set<string>());

/**
 * SSE endpoint for MCP (deprecated protocol version 2024-11-05).
 * 
 * This is for backwards compatibility with:
 * - MCP Inspector
 * - Older MCP clients
 * 
 * Use POST /api/mcp/messages?sessionId=... to send messages.
 */
export async function GET(request: NextRequest) {
    try {
        const responseStream = new TransformStream();
        const writer = responseStream.writable.getWriter();
        const encoder = new TextEncoder();

        // Create Node.js-like response mock with all required methods
        const resMock: any = {
            setHeader: () => { },
            writeHead: () => { },
            write: (message: any) => {
                writer.write(encoder.encode(message));
                return true;
            },
            end: () => {
                writer.close();
            },
            on: (event: string, callback: any) => {
                // Handle 'close' event for cleanup
                if (event === 'close') {
                    // In a real implementation, we'd track this for cleanup
                }
            },
            once: () => { },
            removeListener: () => { },
            socket: {
                setKeepAlive: () => { },
                setNoDelay: () => { }
            }
        };

        // Create transport with POST endpoint path
        const transport = new SSEServerTransport('/api/mcp/messages', resMock);

        // Get sessionId from transport
        const sessionId = (transport as any).sessionId as string;

        // Store transport for messages endpoint
        if (sessionId) {
            transports.set(sessionId, transport);

            // Only connect if not already connected for this session
            if (!connectedSessions.has(sessionId)) {
                const server = createMcpServer();
                await server.connect(transport);
                connectedSessions.add(sessionId);
            }
        }

        return new Response(responseStream.readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error: any) {
        console.error('MCP SSE Error:', error);
        return NextResponse.json({
            jsonrpc: '2.0',
            error: {
                code: -32603,
                message: 'Internal SSE error',
                data: { details: error.message }
            },
            id: null
        }, { status: 500 });
    }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Accept',
        },
    });
}
