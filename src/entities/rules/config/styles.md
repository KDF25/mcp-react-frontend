# Архитектурный паттерн: Дизайн-токены и Стилизация (Талмуд)

Этот паттерн определяет работу со стилями, переменными и ограничениями Tailwind CSS **v4** в рамках дизайн-системы проекта.

---

## 🛑 Главное правило

**Запрещено** использовать хардкодные значения напрямую в компонентах. Любые стили должны опираться на семантические токены.

---

## 🗂 Файловая структура (Дерево стилей)

Tailwind v4 настраивается в CSS (`@theme`, `@custom-variant`) — `tailwind.config.ts` **не нужен**.

```text
src/shared/styles/
├── globals.css     # Точка входа: @import "tailwindcss" + токены + базовый слой
├── variables.css   # Технические токены @theme (брейкпоинты, шрифты)
└── theme.css       # Цветовые токены :root / .dark + @theme inline
```

---

## Примеры конфигурации

### 1. Переменные (variables.css)

В v4 переменные из пространств имён `--breakpoint-*` и `--text-*` внутри `@theme` сразу порождают утилиты (`xs:`, `text-xs`).

```css
@theme {
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

Каждый разрешённый токен определён для светлой и тёмной темы и смаплен в утилиту через `@theme inline`.

```css
@custom-variant dark (&:is(.dark *));

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
}
```

### 3. Глобальные стили (globals.css)
```css
@import "tailwindcss";
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
}
```

---

## 🏆 Валидация (Best Practices)

### ❌ ПЛОХО: Хардкод и произвольные значения
```tsx
/* ❌ INCORRECT: Hardcoded Tailwind colors (blue-500) and static white */
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
<div className="p-4 bg-destructive text-destructive-foreground">
  Good Example
</div>
```

---

## Цветовые ограничения

**Разрешенные токены:** `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring` (и их пары `*-foreground`).

**Запрещенные семейства:** `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`.

**Запрещенные статические цвета:** `white`, `black` (`text-white`, `bg-black` …) — используйте `*-foreground` / `background`.

---

## Утилиты (`allowedUtilityPrefixes`)

Список семейств утилит, на которые опирается вёрстка: цвета только через токены (`bg-`, `text-`, `border-`, `ring-` …), отступы и размеры — через шкалу Tailwind (`p-4`, `gap-2`, `w-full`), без произвольных значений `[...]`.

Это **рекомендация** для генерации и ревью кода — линтер её не проверяет. Линтер проверяет только запрещённые цвета (`forbiddenColors`, `forbiddenStaticColors`) и использование `cn` для склейки классов.
