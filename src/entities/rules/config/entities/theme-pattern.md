# Архитектурный паттерн: Система Темизации (Light/Dark)

Этот паттерн обеспечивает переключение тем (светлая/темная) с поддержкой системных настроек, сохранением выбора в `localStorage` и предотвращением мерцания (flicker) при загрузке.

---

## 🛑 Главное правило
**Запрещено** управлять классами темы (`.light`, `.dark`) напрямую из бизнес-логики или компонентов. Любое взаимодействие с темой должно происходить исключительно через хук `useTheme` и `ThemeProvider`.

---

## 🗂 Файловая структура

```text
src/
├── app/
│   └── providers/
│       └── theme/
│           ├── theme.provider.tsx # Ядро (Client Component)
│           ├── with-theme.tsx     # HOC для инициализации
│           └── index.ts
├── shared/
│   └── ui/
│       └── layout/
│           └── theme-toggle/
│               ├── model/         # Логика и типы
│               │   ├── theme.context.ts
│               │   ├── theme.types.ts
│               │   └── useTheme.tsx
│               └── ui/            # Кнопка переключения
│                   └── theme-toggle.tsx
```

---

## Пошаговое руководство по внедрению

### Шаг 1. Определение типов и Контекста (Shared Layer)
`src/shared/ui/layout/theme-toggle/model/`

Мы создаем контракт для темы и React Context для передачи данных.

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

### Шаг 2. Реализация хука доступа (Shared Layer)
`src/shared/ui/layout/theme-toggle/model/useTheme.tsx`

Хук инкапсулирует проверку на наличие провайдера.

```typescript
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
```

### Шаг 3. Реализация провайдера (App Layer)
`src/app/providers/theme/theme.provider.tsx`

Провайдер управляет состоянием и синхронизирует его с DOM и `localStorage`.

```tsx
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<TTheme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme") as TTheme;
        if (saved) setTheme(saved);
        setMounted(true);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            return next;
        });
    }, []);

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme, mounted]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
```

### Шаг 4. Глобальное подключение (layout.tsx)
`src/app/layout.tsx`

В Next.js App Router мы подключаем тему в корневой Layout.

```tsx
import { ThemeProvider } from "@/app/providers/theme";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Шаг 5. UI Компонент переключения
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
