export const THEME_CODE_TYPES = `export type TTheme = "light" | "dark";

export interface IThemeContextType {
    theme: TTheme;
    toggleTheme: () => void;
}`;

export const THEME_CODE_CONTEXT = `import { createContext } from "react";
import { IThemeContextType } from "./theme.types";

export const ThemeContext = createContext<IThemeContextType | undefined>(undefined);`;

export const THEME_CODE_HOOK = `import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};`;

export const THEME_CODE_PROVIDER = `import React, { useCallback, useEffect, useMemo, useState } from "react";
import { type TTheme, ThemeContext } from "@/shared/ui/layout/theme-toggle/model";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<TTheme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme") as TTheme;
        if (saved) setTheme(saved);
        setMounted(true);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => {
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

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};`;

export const THEME_CODE_SETUP = `import React from "react";
import { ThemeProvider } from "./theme.provider";

export const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => (
        <ThemeProvider>
            <Component {...props} />
        </ThemeProvider>
    );
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
