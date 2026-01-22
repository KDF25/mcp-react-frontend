import { NextResponse } from 'next/server';
import { FsdAgent } from '@/features/agents/fsd-agent';
import { LinterAgent } from '@/features/agents/linter-agent';
import { RecommenderAgent } from '@/features/agents/recommender-agent';
import { IMcpReport, ENUM_SEVERITY, ENUM_REPORT_STATUS } from '@/shared/types/mcp.types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { files, projectRoot } = body;

        const fsdAgent = new FsdAgent();
        const linterAgent = new LinterAgent();
        const recommenderAgent = new RecommenderAgent();

        let allViolations = [];

        // В реальном приложении мы бы читали файлы с диска через projectRoot
        // Для примера проверяем переданные фрагменты кода или просто список файлов
        const fsdViolations = await fsdAgent.analyze(files || []);
        allViolations.push(...fsdViolations);

        // Добавляем проверку линтера для каждого файла (условно)
        if (body.codeSnippets) {
            for (const snippet of body.codeSnippets) {
                const lints = await linterAgent.checkNaming(snippet.fileName, snippet.content);
                allViolations.push(...lints);
            }
        }

        const recommendations = recommenderAgent.generateRecommendations(allViolations);

        const report: IMcpReport = {
            status: allViolations.length > 0 ? ENUM_REPORT_STATUS.ERROR : ENUM_REPORT_STATUS.SUCCESS,
            timestamp: new Date().toISOString(),
            summary: {
                totalErrors: allViolations.filter(v => v.severity === ENUM_SEVERITY.HIGH || v.severity === ENUM_SEVERITY.CRITICAL).length,
                totalWarnings: allViolations.filter(v => v.severity === ENUM_SEVERITY.MEDIUM || v.severity === ENUM_SEVERITY.LOW).length,
                analyzedFiles: files?.length || 0,
            },
            violations: allViolations,
            recommendations,
        };

        return NextResponse.json(report);
    } catch (error) {
        return NextResponse.json({ status: ENUM_REPORT_STATUS.ERROR, message: 'Internal Server Error' }, { status: 500 });
    }
}
