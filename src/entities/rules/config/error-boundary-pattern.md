# Error Boundary Pattern

Этот паттерн обеспечивает отказоустойчивость приложения за счет изоляции ошибок в отдельных компонентах и на уровне всего приложения.

## Структура папки

`src/shared/ui/error-boundary/`

- `error-boundary.tsx` — базовый классовый компонент-предохранитель.
- `with-error-boundary.tsx` — HOC для удобной обертки функциональных компонентов.
- `index.ts` — публичный апи модуля (экспорт `ErrorBoundary` и `withErrorBoundary`).

## Основные правила

1. **Глобальный перехват**:
   - Весь корень приложения (`Layout` или основной `App` компонент) ОБЯЗАТЕЛЬНО должен быть обернут в `ErrorBoundary`. Это предотвращает "белый экран" при критических сбоях.

2. **Изоляция виджетов**:
   - Каждый виджет (`widgets/*`) ДОЛЖЕН экспортироваться через `withErrorBoundary`.
   - Виджеты — идеальная граница изоляции, так как они независимы функционально.

3. **Логирование**:
   - Ошибки должны логироваться в консоль в `componentDidCatch`. В будущем здесь должна быть интеграция с системой мониторинга (Sentry).

## Примеры реализации

### 1. ErrorBoundary (shared/ui/error-boundary/error-boundary.tsx)

```tsx
"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props { children?: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 border border-destructive bg-destructive/10 text-destructive">
          <h3>Something went wrong.</h3>
          <details>{this.state.error?.message}</details>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### 2. withErrorBoundary (shared/ui/error-boundary/with-error-boundary.tsx)

```tsx
import React, { ComponentType } from "react";
import { ErrorBoundary } from "./error-boundary";

export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
```
