# ESLint: префиксы типов (`@typescript-eslint/naming-convention`)

Цель: закрепить конвенцию MCP — `I*` interfaces, `T*` type aliases, `ENUM_*` literal enums, hooks `use*`.

---

## Правило (фрагмент)

```javascript
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
    filter: {
      regex: "^ENUM_[A-Z]",
      match: false
    },
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
```

`ENUM_*` type aliases исключены фильтром — их формат контролирует MCP-агент / `no-enum` (literal object + `ENUM_NAME_TYPE`).

---

## Overrides (vendor / generated)

```javascript
{
  files: [
    "src/shared/ui/shadcn-ui/**/*.{ts,tsx}",
    "src/shared/ui/custom/**/*.{tsx}"
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
```

E2E / Playwright — отдельный flat-config block с Node globals, без FSD boundaries (если есть `e2e/`).

---

## Связь с MCP

- Naming domain: `prefixes.interface/type/enum`, `backend.typePattern`
- Linter agent: `interface-naming`, `type-naming`, `enum-*`
- Backend-адаптеры (`*-backend.interface.ts`): только `type T*Backend = …` — `backend-type-naming`, `backend-interface-forbidden`; `*Backend` вне адаптера — `backend-type-outside-adapter`
- Хуки: файл `use-x.ts` (kebab-case, `unicorn/filename-case`), функция `useX` (camelCase, правила выше)
- Docs: `/naming` → ESLint naming-convention
