import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createMcpServer } from '@/features/mcp/lib/mcp-server';
import { NextRequest } from 'next/server';

/**
 * Use Edge Runtime for better SSE/Streaming support on Vercel.
 */
export const runtime = 'edge';

/**
 * Singleton-like transport and server for the life of the edge function instance.
 * Edge functions can be reused across multiple requests.
 */
const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
});

const server = createMcpServer();
let connected = false;

async function getTransport() {
    if (!connected) {
        await server.connect(transport);
        connected = true;
    }
    return transport;
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
    try {
        const t = await getTransport();
        const response = await t.handleRequest(request as unknown as Request);

        // Add CORS headers to the response
        const newHeaders = new Headers(response.headers);
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
        console.error('MCP Error:', error);
        return new Response(JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32603, message: 'Internal error', data: { details: error.message } }
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
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
