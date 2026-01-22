import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { mcpServer } from '@/features/mcp/lib/mcp-server';
import { NextRequest, NextResponse } from 'next/server';

let transport: SSEServerTransport | null = null;

export async function GET(request: NextRequest) {
    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    const transportInstance = new SSEServerTransport('/api/mcp', {
        write: (message: any) => {
            writer.write(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
            return true;
        },
        close: async () => {
            await writer.close();
        }
    } as any);

    transport = transportInstance;

    // Connect the server to this transport
    await mcpServer.connect(transportInstance);

    return new Response(responseStream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
        },
    });
}

export async function POST(request: NextRequest) {
    if (!transport) {
        return NextResponse.json({ error: 'No active SSE connection' }, { status: 400 });
    }

    try {
        const body = await request.json();
        const url = new URL(request.url);

        // Manually trigger transport handling if direct passing fails linting
        // Or cast to satisfy SDK since NextRequest is a subset of what it needs
        await transport.handlePostMessage(
            {
                method: request.method,
                url: url.pathname + url.search,
                headers: Object.fromEntries(request.headers),
                body
            } as any,
            {
                writeHead: (status: number) => { },
                end: () => { }
            } as any
        );

        return new Response(null, { status: 202 });
    } catch (error) {
        console.error('MCP Post Error:', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
