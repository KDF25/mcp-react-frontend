export const STYLES_CODE_VARIABLES = `@theme {
  /* Breakpoints */
  --breakpoint-xs: 30rem;   /* 480px */
  --breakpoint-sm: 40rem;   /* 640px */
  --breakpoint-md: 48rem;   /* 768px */
  --breakpoint-lg: 64rem;   /* 1024px */
  --breakpoint-xl: 80rem;   /* 1280px */

  /* Font sizes */
  --text-xs: 0.75rem;   /* 12px */
  --text-sm: 0.875rem;  /* 14px */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
}`;

export const STYLES_CODE_THEME = `@custom-variant dark (&:is(.dark *));

:root {
  --background: #f7f7f9;
  --foreground: #1a1a2e;
  --card: #ffffff;
  --card-foreground: #1a1a2e;
  --popover: #ffffff;
  --popover-foreground: #1a1a2e;
  --primary: #36bffa;
  --primary-foreground: #ffffff;
  --secondary: #eef0f6;
  --secondary-foreground: #1a1a2e;
  --muted: #eef0f6;
  --muted-foreground: #6b6f80;
  --accent: #e6f6fe;
  --accent-foreground: #1a1a2e;
  --destructive: #e5484d;
  --destructive-foreground: #ffffff;
  --border: #e2e4ec;
  --input: #e2e4ec;
  --ring: #36bffa;
  --radius: 0.5rem;
  --shadow: 0px 4px 10px 0px hsl(211 30% 25% / 0.12);
}

.dark {
  --background: #0f0f1a;
  --foreground: #e8e9f0;
  --card: #171726;
  --card-foreground: #e8e9f0;
  --popover: #171726;
  --popover-foreground: #e8e9f0;
  --primary: #36bffa;
  --primary-foreground: #0f0f1a;
  --secondary: #23233a;
  --secondary-foreground: #e8e9f0;
  --muted: #23233a;
  --muted-foreground: #9a9cb0;
  --accent: #1d2b3a;
  --accent-foreground: #e8e9f0;
  --destructive: #f2555a;
  --destructive-foreground: #0f0f1a;
  --border: #2a2a40;
  --input: #2a2a40;
  --ring: #36bffa;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --shadow-md: var(--shadow);
}`;

export const STYLES_CODE_GLOBAL = `@import "tailwindcss";
@import "./variables.css";
@import "./theme.css";

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', system-ui, sans-serif;
  }
}`;

export const STYLES_CODE_RESTRICTIONS = `/* ❌ INCORRECT: Hardcoded Tailwind colors (blue-500) and static white */
<div className="bg-blue-500 text-white p-4">
  Bad Example
</div>

/* ✅ CORRECT: Using design tokens */
<div className="bg-primary text-primary-foreground p-4">
  Good Example
</div>

/* ❌ INCORRECT: Arbitrary values */
<div className="p-[17px] bg-[#ff0000]">
  Bad Example
</div>

/* ✅ CORRECT: Using spacing scale */
<div className="p-4 bg-destructive text-destructive-foreground">
  Good Example
</div>`;

export const STYLES_ALLOWED_COLORS = [
	"background",
	"foreground",
	"card",
	"popover",
	"primary",
	"secondary",
	"muted",
	"accent",
	"destructive",
	"border",
	"input",
	"ring"
];

export const STYLES_FORBIDDEN_COLORS = [
	"slate",
	"gray",
	"zinc",
	"neutral",
	"stone",
	"red",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"emerald",
	"teal",
	"cyan",
	"sky",
	"blue",
	"indigo",
	"violet",
	"purple",
	"fuchsia",
	"pink",
	"rose"
];

export const STYLES_COLOR_MAP: Record<string, string> = {
	slate: "#64748b",
	gray: "#6b7280",
	zinc: "#71717a",
	neutral: "#737373",
	stone: "#78716c",
	red: "#ef4444",
	orange: "#f97316",
	amber: "#f59e0b",
	yellow: "#eab308",
	lime: "#84cc16",
	green: "#22c55e",
	emerald: "#10b981",
	teal: "#14b8a6",
	cyan: "#06b6d4",
	sky: "#0ea5e9",
	blue: "#3b82f6",
	indigo: "#6366f1",
	violet: "#8b5cf6",
	purple: "#a855f7",
	fuchsia: "#d946ef",
	pink: "#ec4899",
	rose: "#f43f5e"
};
