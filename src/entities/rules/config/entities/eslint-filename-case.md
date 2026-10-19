# ESLint: kebab-case имена файлов (`unicorn/filename-case`)

Цель: единый регистр файлов в FSD-проекте. По умолчанию — **kebab-case**. Семантические суффиксы (`*.service.ts`, `*.converters.ts`) и React-хуки (`useX.ts`) — через `ignore`.

---

## Правило

```javascript
"unicorn/filename-case": [
  "error",
  {
    cases: {
      kebabCase: true,
      camelCase: false,
      pascalCase: false
    },
    ignore: [
      /^use[A-Z][a-zA-Z]*\.(ts|tsx)$/,
      /^[a-z0-9-]+\.(service|api|util|config|types|interface|store|hook|slice|schema|converters|handlers|mock)\.ts$/,
      /^[a-z0-9-]+\.(service|store|api|util|config|hook|slice)\.(types|interface)\.ts$/,
      /^[a-z0-9-]+-backend\.interface\.ts$/,
      /^(page|layout|loading|error|not-found|template|default)\.tsx?$/,
      /^(globals|metadata)\.css$/,
      /^\.[a-z][a-z0-9-]*rc(\.(js|ts|json))?$/,
      /^i18n\.(init|blocks|checker)\.ts$/,
      /^[a-z0-9-]+\.context\.ts$/
    ]
  }
]
```

Плагин: `eslint-plugin-unicorn`.

---

## Примеры

| Файл | OK? |
|---|---|
| `order-card.tsx` | да (kebab) |
| `order.service.ts` | да (ignore: `*.service.ts`) |
| `order.converters.ts` | да |
| `useAuth.ts` | да (hooks) |
| `OrderService.ts` | нет |
| `page.tsx` | да (Next/App Router) |

---

## Связь с MCP

- Naming domain: `fileCase: "kebab-case"`, `suffixes`, `exclusions`
- Docs: `/naming` → ESLint filename-case
- Rule / template: `linter.eslint.filenameCase`
