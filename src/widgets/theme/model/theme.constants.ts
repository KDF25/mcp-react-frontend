export const THEME_CODE_TYPES = `export type TTheme = "light" | "dark";

export interface IThemeContextType {
    theme: TTheme;
    toggleTheme: () => void;
}`;

export const THEME_CODE_CONTEXT = `import { createContext } from "react";
import { IThemeContextType } from "./theme.types";

export const ThemeContext = createContext<IThemeContextType | undefined>(undefined);`;

export const THEME_CODE_HOOK = `import { useContext } from "react";
import { ThemeContext } from "./theme.context";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};`;

/** Vite: выполняется в <head> до рендера React — без мигания темы */
export const THEME_CODE_SCRIPT = `<script>
  (function () {
    try {
      var saved = localStorage.getItem("theme");
      var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.add(saved === "light" || saved === "dark" ? saved : system);
    } catch (e) {
      document.documentElement.classList.add("light");
    }
  })();
</script>`;

export const THEME_CODE_PROVIDER = `import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
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

// Next.js: вместо своего провайдера — next-themes
// (attribute="class", defaultTheme="system", enableSystem, <html suppressHydrationWarning>)`;

export const THEME_CODE_SETUP = `import type { ComponentType, FC } from "react";
import { ThemeProvider } from "./theme.provider";

/** Подключение темы одной строкой: export default withTheme(App) */
export const withTheme = <P extends object>(Component: ComponentType<P>): FC<P> => {
    const WithTheme: FC<P> = (props) => (
        <ThemeProvider>
            <Component {...props} />
        </ThemeProvider>
    );

    WithTheme.displayName = \`withTheme(\${Component.displayName || Component.name || "Component"})\`;

    return WithTheme;
};`;

export const THEME_CODE_UI = `import { Moon, Sun } from "lucide-react";
import { Button } from "@/shared/ui";
import { useTheme } from "../model";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} variant="outline" size="sm">
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </Button>
    );
};`;
