import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { FsdAgent } from '../../agents/fsd-agent';
import { LinterAgent } from '../../agents/linter-agent';
import { RecommenderAgent } from '../../agents/recommender-agent';
import { RulesProvider } from '@/entities/rules/lib/rules-provider';
import { ENUM_REPORT_STATUS, ENUM_SEVERITY } from '@/shared/types/mcp.types';

/**
 * Factory function to create a new MCP Server instance.
 * This is designed for serverless environments where each request
 * should have its own server instance.
 */
export function createMcpServer(): McpServer {
    const server = new McpServer({
        name: 'mcp-react-frontend',
        version: '1.0.0',
    });

    const fsdAgent = new FsdAgent();
    const linterAgent = new LinterAgent();
    const recommenderAgent = new RecommenderAgent();

    // Register Tools using the high-level registerTool method
    server.registerTool(
        'analyze_project',
        {
            description: 'Analyze project files for FSD violations and naming conventions.',
            inputSchema: {
                files: z.array(z.string()).describe('List of file paths to analyze (relative to project root).'),
                codeSnippets: z.array(z.object({
                    fileName: z.string(),
                    content: z.string(),
                })).optional().describe('Optional code snippets for deep linter analysis.'),
            },
        },
        async ({ files, codeSnippets }) => {
            const fsdViolations = await fsdAgent.analyze(files);
            const linterViolations: any[] = [];

            if (codeSnippets) {
                for (const snippet of codeSnippets) {
                    const lints = await linterAgent.checkNaming(snippet.fileName, snippet.content);
                    linterViolations.push(...lints);
                }
            }

            const allViolations = [...fsdViolations, ...linterViolations];
            const recommendations = recommenderAgent.generateRecommendations(allViolations);

            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            status: allViolations.length > 0 ? ENUM_REPORT_STATUS.ERROR : ENUM_REPORT_STATUS.SUCCESS,
                            summary: {
                                totalErrors: allViolations.filter(v => v.severity === ENUM_SEVERITY.HIGH || v.severity === ENUM_SEVERITY.CRITICAL).length,
                                totalWarnings: allViolations.filter(v => v.severity === ENUM_SEVERITY.MEDIUM || v.severity === ENUM_SEVERITY.LOW).length,
                                analyzedFiles: files.length,
                            },
                            violations: allViolations,
                            recommendations,
                        }, null, 2),
                    },
                ],
            };
        }
    );

    server.registerTool(
        'get_rules',
        {
            description: 'Get current FSD and naming project rules.',
            inputSchema: {},
        },
        async () => {
            const rules = RulesProvider.getRules();
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(rules, null, 2),
                    },
                ],
            };
        }
    );

    return server;
}

/**
 * @deprecated Use createMcpServer() factory function instead for serverless compatibility.
 * This singleton is kept for backwards compatibility with SSE transport.
 */
export const mcpServer = createMcpServer();
