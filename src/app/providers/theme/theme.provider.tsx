"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
	type IThemeContextType,
	type TTheme,
	ThemeContext
} from "@/shared/ui/layout/theme-toggle/model";

interface IThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<TTheme>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as TTheme;
		if (savedTheme) {
			setTheme(savedTheme);
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
		}
		setMounted(true);
	}, []);

	const toggleTheme = useCallback((): void => {
		setTheme((prev) => {
			const newTheme: TTheme = prev === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			return newTheme;
		});
	}, []);

	useEffect(() => {
		if (!mounted) return;
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
		localStorage.setItem("theme", theme);
	}, [theme, mounted]);

	const value: IThemeContextType = useMemo(
		() => ({ theme, toggleTheme }),
		[theme, toggleTheme]
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
