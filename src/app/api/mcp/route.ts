import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createMcpServer } from '@/features/mcp/lib/mcp-server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Streamable HTTP endpoint for MCP.
 * 
 * This is the modern transport that works with:
 * - Antigravity
 * - Claude Desktop (with url config)
 * - Vercel Edge Functions
 * 
 * Each request creates a new server+transport instance (stateless mode).
 */

export async function GET(request: NextRequest) {
    return handleRequest(request);
}

export async function POST(request: NextRequest) {
    return handleRequest(request);
}

export async function DELETE(request: NextRequest) {
    return handleRequest(request);
}

async function handleRequest(request: NextRequest): Promise<Response> {
    try {
        // Create fresh transport and server for each request (serverless-friendly)
        const transport = new WebStandardStreamableHTTPServerTransport({
            enableJsonResponse: true, // Enable JSON responses for compatibility
        });

        const server = createMcpServer();
        await server.connect(transport);

        // Let the transport handle the request
        return await transport.handleRequest(request as unknown as Request);
    } catch (error: any) {
        console.error('MCP Streamable HTTP Error:', error);
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

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, mcp-session-id, Last-Event-ID, mcp-protocol-version',
            'Access-Control-Expose-Headers': 'mcp-session-id, mcp-protocol-version',
        },
    });
}
