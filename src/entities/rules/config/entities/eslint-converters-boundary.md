# ESLint: изоляция converters внутри entity

Конвертеры — **приватный сегмент сущности**. Их нельзя импортировать из pages / widgets / features / UI и из других entities. Единственный потребитель — `entities/<name>/api` через относительный путь `../converters`.

---

## Зачем два механизма

| Механизм | Что ловит |
|---|---|
| `no-restricted-imports` | Любой alias/absolute импорт `@/entities/*/converters` |
| `eslint-plugin-boundaries` + capture | Импорт converters только из **той же** entity `api/`; чужая entity тоже запрещена |

Относительный импорт в service:

```typescript
// src/entities/order/api/order.service.ts — OK
import { mapOrdersToFrontend } from "../converters";
```

```typescript
// src/widgets/orders/ui/orders.tsx — ERROR
import { mapOrdersToFrontend } from "@/entities/order/converters";
```

---

## Минимальный фрагмент (flat config)

См. сниппет в документации Converters → шаг ESLint (`CONVERTERS_CODE_ESLINT`).

Кратко:

1. Выделите элементы `entity-converters` и `entity-api` с `capture: ["entity"]`.
2. В `boundaries/element-types` разрешите `entity-api → entity-converters` только при совпадении capture.
3. Добавьте `no-restricted-imports` patterns на `@/entities/*/converters(**)`.
4. Игнорируйте `*.test.*` / `*.spec.*` в `boundaries/ignore`, если тестам нужен прямой доступ (или мокайте на уровне api).

---

## Связь с MCP

- Rule IDs агента: `converters-forbidden-in-ui`, `backend-dto-forbidden-in-ui`
- ESLint — детерминированный gate в CI; MCP-агент — подсказка в IDE/analyze_project
