export const NAMING_FILE_POLICY = `// kebab-case и семантические расширения
src/entities/tour/schema/finance-info.schema.ts
src/entities/tour/api/tour.service.ts
src/entities/tour/converters/tour.converters.ts
src/entities/tour/handlers/tour.handlers.ts
src/entities/tour/mock/tour-finance.mock.ts
src/entities/tour/constants/tour-status.config.ts`;

export const NAMING_CODE_ESLINT_FILENAME = `// eslint.config.js — unicorn/filename-case
"unicorn/filename-case": [
  "error",
  {
    cases: {
      kebabCase: true,
      camelCase: false,
      pascalCase: false
    },
    ignore: [
      /^[a-z0-9-]+\\.(service|api|util|config|types|interface|store|hook|slice|schema|converters|handlers|mock)\\.ts$/,
      /^[a-z0-9-]+\\.(service|store|api|util|config|hook|slice)\\.(types|interface)\\.ts$/,
      /^[a-z0-9-]+-backend\\.interface\\.ts$/,
      /^(page|layout|loading|error|not-found|template|default)\\.tsx?$/,
      /^(globals|metadata)\\.css$/,
      /^\\.[a-z][a-z0-9-]*rc(\\.(js|ts|json))?$/,
      /^i18n\\.(init|blocks|checker)\\.ts$/,
      /^[a-z0-9-]+\\.context\\.ts$/
    ]
  }
]
`;

export const NAMING_TYPING_CONVENTIONS = `// Префиксы для типов и интерфейсов
interface IEntity { ... }
type TResponse = { ... }
const ENUM_STATUS = { ... } as const;`;

export const NAMING_CODE_ESLINT_TYPES = `// eslint.config.js — @typescript-eslint/naming-convention
"@typescript-eslint/naming-convention": [
  "error",
  {
    selector: "interface",
    format: ["PascalCase"],
    prefix: ["I"]
  },
  {
    selector: "typeAlias",
    format: ["PascalCase"],
    filter: { regex: "^ENUM_[A-Z]", match: false },
    prefix: ["T"]
  },
  {
    selector: "variable",
    modifiers: ["const", "exported"],
    types: ["string", "number", "boolean"],
    format: ["UPPER_CASE"]
  },
  {
    selector: "function",
    format: ["camelCase", "PascalCase"]
  },
  {
    selector: "variable",
    modifiers: ["const", "exported"],
    filter: { regex: "^use[A-Z]", match: true },
    format: ["camelCase"]
  },
  {
    selector: "function",
    filter: { regex: "^use[A-Z]", match: true },
    format: ["camelCase"]
  }
]
`;

export const NAMING_FSD_RULES = `// FSD Import Boundaries (Classic)
app      -> [pages, widgets, features, entities, shared]
pages    -> [widgets, features, entities, shared]
widgets  -> [features, entities, shared]
features -> [entities, shared]
entities -> [shared]
shared   -> []`;

export const NAMING_RELAXATIONS = `// eslint.config.js — overrides (vendor / generated / configs)
{
  files: [
    "src/shared/ui/shadcn-ui/**/*.{ts,tsx}",
    "src/shared/ui/custom/**/*.tsx"
  ],
  rules: {
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
},
{
  files: ["**/*.d.ts"],
  rules: { "@typescript-eslint/naming-convention": "off" }
},
{
  files: ["**/*.config.{ts,js}", "vite.config.ts", "tailwind.config.ts"],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "no-console": "off"
  }
}
`;
