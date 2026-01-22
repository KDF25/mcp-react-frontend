/**
 * Степень критичности нарушения
 */
export const ENUM_SEVERITY = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    CRITICAL: 'CRITICAL',
} as const;

export type ENUM_SEVERITY_TYPE = typeof ENUM_SEVERITY[keyof typeof ENUM_SEVERITY];

/**
 * Тип агента-исполнителя
 */
export const ENUM_AGENT_TYPE = {
    FSD_INSPECTOR: 'FSD_INSPECTOR',
    STYLE_ENFORCER: 'STYLE_ENFORCER',
    RECOMMENDER: 'RECOMMENDER',
} as const;

export type ENUM_AGENT_TYPE_TYPE = typeof ENUM_AGENT_TYPE[keyof typeof ENUM_AGENT_TYPE];

/**
 * Индивидуальное нарушение или диагностика
 */
export interface IViolation {
    agent: ENUM_AGENT_TYPE_TYPE;
    ruleId: string;
    severity: ENUM_SEVERITY_TYPE;
    location: string; // Путь к файлу или фрагменту
    message: string;
    suggestion?: string;
    patch?: string; // Возможный патч для исправления
}

/**
 * Итоговый JSON-отчет MCP
 */
export interface IMcpReport {
    status: ENUM_REPORT_STATUS_TYPE;
    timestamp: string;
    summary: {
        totalErrors: number;
        totalWarnings: number;
        analyzedFiles: number;
    };
    violations: IViolation[];
    recommendations: string[];
}

export const ENUM_REPORT_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
} as const;

export type ENUM_REPORT_STATUS_TYPE = typeof ENUM_REPORT_STATUS[keyof typeof ENUM_REPORT_STATUS];


