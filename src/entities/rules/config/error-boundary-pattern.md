# Архитектурный паттерн: Изоляция ошибок (Error Boundary)

В рамках нашего проекта мы используем строгую изоляцию сбоев в UI с помощью Error Boundaries. Это позволяет:

- Изолировать виджеты и фичи от падения всего приложения при ошибках в нестабильной логике рендеринга или данных.
- Защитить динамический и lazy-loaded код.
- Создать устойчивую иерархию надежности (Root -> Page -> Feature).

---

## 🛑 Главное правило

**Запрещено** полагаться только на глобальный перехватчик ошибок для всего приложения. Действует правило нескольких уровней защиты. Изолируйте сложные UI-блоки, виджеты и интеграции, чтобы ошибка в одном блоке не ломала всю React-страницу.

---

## 🗂 Файловая структура (Shared UI)

```text
src/shared/ui/error-boundary/
├── error-boundary.tsx      # Базовый класс для перехвата ошибок
├── with-error-boundary.tsx # HOC для оборачивания компонентов
└── index.ts                # Public API
```

---

## Пошаговое руководство

### Шаг 1. Реализация ErrorBoundary

`src/shared/ui/error-boundary/error-boundary.tsx`

Реализуем базовый класс для перехвата ошибок в дереве компонентов. Компонент предоставляет fallback UI с трассировкой стека для удобной отладки.

```tsx
"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorUI error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Шаг 2. Реализация withErrorBoundary (HOC)

`src/shared/ui/error-boundary/with-error-boundary.tsx`

Создаем HOC для удобного оборачивания компонентов, в особенности тех, которые экспортируются из слоев `widgets` и `features`.

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

### Шаг 3. Использование HOC для изоляции фичей

Пример правильной изоляции опасного кода: если в `data.stats` окажется невалидная структура данных, выбросится `TypeError` во время `.map()`. Обертка `withErrorBoundary` спасет всё остальное приложение от краша.

```tsx
import { withErrorBoundary } from "@/shared/ui";

function UserProfileWidget({ userId }: { userId: string }) {
  const { data, isLoading } = useGetUserProfileQuery(userId);

  if (isLoading) return <SkeletonProfile />;
  
  // Потенциально опасная логика
  const formattedStats = data.stats.map(stat => ({
      ...stat,
      value: (stat.raw / stat.total) * 100
  }));

  return (
    <div className="flex flex-col gap-4">
      <UserProfileAvatar user={data.user} />
      <UserProfileStats stats={formattedStats} />
    </div>
  );
}

// Оборачиваем при экспорте для автоматического перехвата ошибок внутри
export const UserProfile = withErrorBoundary(UserProfileWidget, <UserProfileErrorUI />);
```

---

## 🟢 Когда использовать

- **Изоляция падений**: Виджеты, внешние компоненты, сложные UI-блоки, `Lazy-loaded` компоненты и интеграции (чаты, карты).
- **Границы слоев**: Page-level (вся страница целиком) и Feature-level (отдельный блок: корзина, чат, аналитика).
- **Динамический код**: Когда код может быть нестабилен или подключается сторонний модуль.

## 🔴 Когда НЕ использовать

- Для обработки асинхронных ошибок (`fetch`, `setTimeout`).
- Для реализации бизнес-логики.
- Вместо обычных `try/catch` блоков там, где это уместно.
