# ESLint: изоляция raw OpenAPI типов (Api.ts)

Цель: schema-типы из codegen не протекают в `api/`, `converters/`, UI.

---

## Рекомендуемая схема

### 1. Убрать публичный реэкспорт Api (предпочтительно)

```typescript
// shared/api/generated/index.ts — только paths
export * from "./paths";
// НЕ: export * from "./Api";
```

### 2. no-restricted-imports (global)

```javascript
"no-restricted-imports": [
  "error",
  {
    patterns: [
      {
        group: [
          "**/shared/api/generated/Api",
          "**/shared/api/generated/Api.ts",
          "@/shared/api/generated/Api"
        ],
        message:
          "Raw Api.ts types are allowed only in entities/*/types (*-backend.interface.ts). Alias them as T*Backend and import from ../types."
      }
    ]
  }
]
```

### 3. Override — разрешить только types (+ generated internals)

```javascript
{
  files: [
    "src/entities/**/types/**/*.{ts,tsx}",
    "src/shared/api/generated/**/*.{ts,tsx}"
  ],
  rules: {
    "no-restricted-imports": "off" // или узкий allowlist только на Api
  }
}
```

### 4. Дополнительно: не импортировать schema-имена из `@/shared/api`

Если barrel всё ещё реэкспортирует Api — добавьте zonal `import/no-restricted-paths` или кастомное правило.  
Практичный путь: убрать реэкспорт + шаг 2–3.

### 5. PATHS остаются доступны

```typescript
// entities/order/api/order.service.ts — OK
import { ADMIN_ORDER_PATHS } from "@/shared/api/generated/paths/admin-order.paths";
```

Не путайте PATHS с schema DTO.

---

## Связь с MCP agent

Rule IDs:
- `openapi-raw-types-forbidden-outside-types`
- `openapi-prefer-t-backend-alias`
