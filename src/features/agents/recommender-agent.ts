import { IViolation, ENUM_SEVERITY } from '@/shared/types/mcp.types';

export class RecommenderAgent {
    public generateRecommendations(violations: IViolation[]): string[] {
        const recommendations: string[] = [];

        const highSeverityCount = violations.filter(v => v.severity === ENUM_SEVERITY.HIGH || v.severity === ENUM_SEVERITY.CRITICAL).length;

        if (highSeverityCount > 5) {
            recommendations.push('Critical architecture issues detected. Priority: Refactor layer boundaries.');
        }

        if (violations.some(v => v.ruleId === 'interface-naming')) {
            recommendations.push('Consider running an automated codemod to fix interface naming prefixes (I_).');
        }

        return recommendations;
    }
}
