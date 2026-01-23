import { NextRequest, NextResponse } from 'next/server';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

/**
 * Access the global transport map from SSE endpoint.
 */
declare global {
    // eslint-disable-next-line no-var
    var mcpSseTransports: Map<string, SSEServerTransport> | undefined;
}

const transports = global.mcpSseTransports || new Map<string, SSEServerTransport>();

/**
 * Messages endpoint for SSE protocol (deprecated protocol version 2024-11-05).
 * 
 * Receives POST requests with JSON-RPC messages and forwards them
 * to the SSE transport established via GET /api/mcp/sse.
 */
export async function POST(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const sessionId = url.searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json({
                jsonrpc: '2.0',
                error: {
                    code: -32600,
                    message: 'Missing sessionId parameter'
                },
                id: null
            }, { status: 400 });
        }

        const transport = transports.get(sessionId);
        if (!transport) {
            return NextResponse.json({
                jsonrpc: '2.0',
                error: {
                    code: -32600,
                    message: 'No active SSE connection for this session',
                    data: {
                        sessionId,
                        hint: 'Make sure to establish SSE connection first via GET /api/mcp/sse',
                        availableSessions: Array.from(transports.keys())
                    }
                },
                id: null
            }, { status: 400 });
        }

        const body = await request.json();

        // Create mock response for handlePostMessage
        const resMock: any = {
            writeHead: () => { },
            end: () => { }
        };

        await transport.handlePostMessage(
            {
                method: request.method,
                url: url.pathname + url.search,
                headers: Object.fromEntries(request.headers),
                body
            } as any,
            resMock
        );

        return new Response(null, { status: 202 });
    } catch (error: any) {
        console.error('MCP Messages Error:', error);
        return NextResponse.json({
            jsonrpc: '2.0',
            error: {
                code: -32603,
                message: 'Internal server error',
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
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
