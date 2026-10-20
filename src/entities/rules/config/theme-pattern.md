# Архитектурный паттерн: Система Темизации (Light/Dark)

Этот паттерн обеспечивает переключение тем (светлая/темная) с поддержкой системных настроек (`prefers-color-scheme`), сохранением выбора в `localStorage` и **без мигания (flicker)** при загрузке.

---

## 🛑 Главное правило
**Запрещено** управлять классами темы (`.light`, `.dark`) напрямую из бизнес-логики или компонентов. Любое взаимодействие с темой должно происходить исключительно через хук `useTheme` и `ThemeProvider`.

**Без мигания:** класс темы ставится на `<html>` **до первой отрисовки** — inline-скриптом (Vite) или библиотекой `next-themes` (Next.js). Выставлять класс в `useEffect` после монтирования нельзя: страница успеет отрисоваться в светлой теме.

---

## Два стека

| Стек | Провайдер | Анти-flicker | `useTheme` |
|---|---|---|---|
| **Vite SPA** | свой `ThemeProvider` (шаги ниже) | inline-скрипт в `index.html` | свой хук из `shared/ui/layout/theme-toggle` |
| **Next.js App Router** | обёртка над `next-themes` | встроен в `next-themes` (+ `suppressHydrationWarning` на `<html>`) | `useTheme` из `next-themes` |

---

## 🗂 Файловая структура

```text
src/
├── app/
│   └── providers/
│       └── theme/
│           ├── theme.provider.tsx # Ядро (Client Component)
│           ├── with-theme.tsx     # HOC: оборачивает компонент в ThemeProvider
│           └── index.ts
├── shared/
│   └── ui/
│       └── layout/
│           └── theme-toggle/
│               ├── model/         # Логика и типы (Vite)
│               │   ├── theme.context.ts
│               │   ├── theme.types.ts
│               │   ├── use-theme.ts
│               │   └── index.ts
│               ├── ui/            # Кнопка переключения
│               │   └── theme-toggle.tsx
│               └── index.ts       # Public API: ThemeContext, useTheme, ThemeToggle, типы
index.html                          # Vite: inline-скрипт темы в <head>
```

---

## Vite SPA — пошаговое руководство

### Шаг 1. Типы и Контекст (Shared Layer)
`src/shared/ui/layout/theme-toggle/model/`

```typescript
// theme.types.ts
export type TTheme = "light" | "dark";

export interface IThemeContextType {
    theme: TTheme;
    toggleTheme: () => void;
}

// theme.context.ts
export const ThemeContext = createContext<IThemeContextType | undefined>(undefined);
```

### Шаг 2. Хук доступа (Shared Layer)
`src/shared/ui/layout/theme-toggle/model/use-theme.ts`

```typescript
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
```

### Шаг 3. Inline-скрипт до первой отрисовки
`index.html` → `<head>`

Скрипт выполняется синхронно до рендера React: берёт сохранённый выбор, иначе системную тему.

```html
<script>
  (function () {
    try {
      var saved = localStorage.getItem("theme");
      var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.add(saved === "light" || saved === "dark" ? saved : system);
    } catch (e) {
      document.documentElement.classList.add("light");
    }
  })();
</script>
```

### Шаг 4. Провайдер (App Layer)
`src/app/providers/theme/theme.provider.tsx`

Начальное состояние читается из класса, который уже выставил скрипт, — поэтому первый рендер совпадает с тем, что видит пользователь. Пока пользователь не выбрал тему явно, провайдер следует за системной.

```tsx
import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { type TTheme, ThemeContext } from "@/shared/ui/layout/theme-toggle";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const getSystemTheme = (): TTheme =>
    window.matchMedia(DARK_QUERY).matches ? "dark" : "light";

/** Класс уже выставлен inline-скриптом до первой отрисовки */
const getInitialTheme = (): TTheme =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<TTheme>(getInitialTheme);

    // Следуем за системной темой, пока нет явного выбора
    useEffect(() => {
        const media = window.matchMedia(DARK_QUERY);
        const onChange = () => {
            if (!localStorage.getItem(STORAGE_KEY)) setTheme(getSystemTheme());
        };
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem(STORAGE_KEY, next);
            return next;
        });
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
```

### Шаг 5. HOC инициализации (App Layer)
`src/app/providers/theme/with-theme.tsx`

Оборачивает корневой компонент в `ThemeProvider`, чтобы подключение темы было одной строкой (`export default withTheme(App)`), а не правкой JSX корня.

```tsx
import type { ComponentType, FC } from "react";
import { ThemeProvider } from "./theme.provider";

export const withTheme = <P extends object>(Component: ComponentType<P>): FC<P> => {
    const WithTheme: FC<P> = (props) => (
        <ThemeProvider>
            <Component {...props} />
        </ThemeProvider>
    );

    WithTheme.displayName = `withTheme(${Component.displayName || Component.name || "Component"})`;

    return WithTheme;
};
```

### Шаг 6. UI Компонент переключения
`src/shared/ui/layout/theme-toggle/ui/theme-toggle.tsx`

```tsx
export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button onClick={toggleTheme}>
            {theme === "light" ? <Moon /> : <Sun />}
        </Button>
    );
};
```

---

## Next.js App Router

`next-themes` сам вставляет скрипт до гидратации, читает `prefers-color-scheme` и хранит выбор в `localStorage` — свой провайдер и inline-скрипт не нужны.

### Провайдер
`src/app/providers/theme/theme.provider.tsx`

```tsx
"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
```

### Корневой layout
`src/app/layout.tsx`

```tsx
import { ThemeProvider } from "@/app/providers/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        // next-themes меняет класс на <html> до гидратации
        <html suppressHydrationWarning>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

### Переключатель
На сервере тема неизвестна, поэтому иконку рендерим после монтирования.

```tsx
"use client";

import { useTheme } from "next-themes";

export const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = mounted && resolvedTheme === "dark";
    return (
        <Button onClick={() => setTheme(isDark ? "light" : "dark")}>
            {isDark ? <Sun /> : <Moon />}
        </Button>
    );
};
```
