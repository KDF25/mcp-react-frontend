"use client";

import { createContext } from "react";

import { IThemeContextType } from "./theme.types";

export const ThemeContext = createContext<IThemeContextType | undefined>(
	undefined
);
