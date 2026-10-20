# ESLint: kebab-case имена файлов (`unicorn/filename-case`)

Цель: единый регистр файлов в FSD-проекте. По умолчанию — **kebab-case**, включая React-хуки: файл `use-auth.ts`, функция внутри — `useAuth`. Семантические суффиксы (`*.service.ts`, `*.converters.ts`) — через `ignore`.

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
| `use-auth.ts` | да (хук в kebab; `.tsx` — только если есть JSX) |
| `useAuth.ts` | нет (хуки тоже kebab-case) |
| `OrderService.ts` | нет |
| `page.tsx` | да (Next/App Router) |

---

## Связь с MCP

- Naming domain: `fileCase: "kebab-case"`, `suffixes`, `exclusions`, `hookFilePattern`
- Docs: `/naming` → ESLint filename-case
- Rule / template: `linter.eslint.filenameCase`
