# Архитектурный паттерн: Дизайн-токены и Стилизация (Талмуд)

Этот паттерн определяет работу со стилями, переменными и ограничениями Tailwind CSS в рамках дизайн-системы проекта.

---

## 🛑 Главное правило

**Запрещено** использовать хардкодные значения напрямую в компонентах. Любые стили должны опираться на семантические токены.

---

## 🗂 Файловая структура (Дерево стилей)

В соответствии с заложенной архитектурой, стили организованы следующим образом:

```text
root/
└── src/shared/styles/
    ├── global.css      # Основные импорты и базовые слои
    ├── variables.css   # Технические переменные (брейкпоинты, шрифты)
    └── theme.css       # Дизайн-токены (цвета, тени, радиусы)
└── tailwind.config.ts  # Конфигурация Tailwind
```

---

## Примеры конфигурации

### 1. Переменные (variables.css)
```css
:root {
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
}
```

### 2. Тема (theme.css)
```css
:root {
  --background: #f7f7f9;
  --foreground: #1a1a2e;
  --primary: #36bffa;
  --radius: 0.5rem;
  --shadow: 0px 4px 10px 0px hsl(211 30% 25% / 0.12);
}

.dark {
  --background: #0f0f1a;
  --foreground: #e8e9f0;
  --primary: #36bffa;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --radius-lg: var(--radius);
  --shadow-md: var(--shadow);
}
```

### 3. Глобальные стили (global.css)
```css
@import "tailwindcss";
@import "./theme.css";
@import "./variables.css";

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', system-ui, sans-serif;
  }
}
```

### 4. Конфигурация (tailwind.config.ts)
```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "var(--breakpoint-xs)",
				sm: "var(--breakpoint-sm)",
			},
			fontSize: {
				xs: "var(--text-xs)",
				sm: "var(--text-sm)",
			},
			colors: {
				background: 'var(--background)',
				primary: 'var(--primary)',
			}
		}
	}
};
```

---

## 🏆 Валидация (Best Practices)

### ❌ ПЛОХО: Хардкод и произвольные значения
```tsx
/* ❌ INCORRECT: Hardcoded Tailwind colors */
<div className="bg-blue-500 text-white p-4">
  Bad Example
</div>

/* ❌ INCORRECT: Arbitrary values */
<div className="p-[17px] bg-[#ff0000]">
  Bad Example
</div>
```

### ✅ ХОРОШО: Семантические токены
```tsx
/* ✅ CORRECT: Using design tokens */
<div className="bg-primary text-primary-foreground p-4">
  Good Example
</div>

/* ✅ CORRECT: Using spacing scale */
<div className="p-4 bg-destructive">
  Good Example
</div>
```

---

## Цветовые ограничения

**Разрешенные токены:** `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`.

**Запрещенные семейства:** `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`.
