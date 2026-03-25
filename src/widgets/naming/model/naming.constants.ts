export const NAMING_FILE_POLICY = `// kebab-case и семантические расширения
src/entities/tour/schema/finance-info.schema.ts
src/entities/tour/api/tour.service.ts
src/entities/tour/converters/tour.converters.ts
src/entities/tour/handlers/tour.handlers.ts
src/entities/tour/mock/tour-finance.mock.ts
src/entities/tour/constants/tour-status.config.ts`;

export const NAMING_TYPING_CONVENTIONS = `// Префиксы для типов и интерфейсов
interface IEntity { ... }
type TResponse = { ... }
const ENUM_STATUS = { ... } as const;`;

export const NAMING_FSD_RULES = `// FSD Import Boundaries (Classic)
app      -> [pages, widgets, features, entities, shared]
pages    -> [widgets, features, entities, shared]
widgets  -> [features, entities, shared]
features -> [entities, shared]
entities -> [shared]
shared   -> []`;

export const NAMING_RELAXATIONS = `// Проектные послабления (Relaxations)
// 1. Shared UI (shadcn-ui/custom): любые имена, разрешен any
src/shared/ui/shadcn-ui/Button.tsx

// 2. Декларации (.d.ts): именование не контролируется
src/shared/types/api.d.ts

// 3. Конфиги (*.config.ts): разрешены require и console
tailwind.config.ts`;
