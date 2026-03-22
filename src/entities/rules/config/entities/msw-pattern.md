# Архитектурный паттерн: Mock Server (MSW)

В рамках Feature-Sliced Design (FSD), мы используем **Mock Service Worker (MSW)** для имитации ответов API на уровне сетевых запросов браузера (Service Worker). Это позволяет:

- Вести разработку фронтенда до готовности бэкенда.
- Тестировать редкие сценарии (ошибки сервера 500, задержки сети, пустые списки).
- Использовать реальные сетевые вызовы в тестах и при разработке, не меняя логику сервисов.

---

## 🛑 Главное правило

**Запрещено** оставлять включенный MSW в коде для production-сборки. Активация моков должна управляться строго через переменные окружения (`.env`) и происходить до рендеринга основного приложения.

---

## 🗂 Файловая структура Mock-слоя

```text
src/
├── app/
│   └── init/
│       └── msw.ts          # Сценарий запуска (условие .env)
├── entities/
│   └── [entity-name]/
│       ├── handlers/       # Логика перехвата URL
│       │   ├── [entity-name].handlers.ts
│       │   └── index.ts
│       └── mock/           # Тестовые данные (Mocks)
│           ├── [entity-name].mock.ts
│           └── index.ts
├── shared/
│   └── api/msw/
│       ├── browser.ts      # Инициализация worker-а
│       └── handlers.ts     # Реестр всех хендлеров проекта
├── .env                    # Настройка флага активации
└── main.tsx                # Точка входа с ожиданием initMsw()
```

---

## Пошаговое руководство по реализации моков

### Шаг 1. Создание моков

`src/entities/[entity-name]/mock/[entity-name].mock.ts`

Определяем массив данных, которые будет возвращать сервер. Используем интерфейсы из папки `types/` для обеспечения строгой типизации.

```typescript
import { type IEntityBackend } from "../types";

export const MOCK_ENTITY_LIST: IEntityBackend[] = [
    {
        id: "1",
        full_name: "John Doe",
        created_at: "2024-03-22",
        status_code: "active"
    }
];
```

### Шаг 2. Описание хендлеров

`src/entities/[entity-name]/handlers/[entity-name].handlers.ts`

Используем библиотеку `msw` для перехвата конкретных URL. Здесь же можно имитировать задержку сети или ошибки сервера через `delay()` и `HttpResponse`.

```typescript
import { http, HttpResponse, delay } from "msw";
import { ENV } from "@/shared/config";
import { MOCK_ENTITY_LIST } from "../mock";

export const entityHandlers = [
    http.get(`${ENV.VITE_API_URL}/entity/list`, async () => {
        await delay(800); // Имитация задержки сети
        return HttpResponse.json({
            data: MOCK_ENTITY_LIST
        });
    }),

    http.post(`${ENV.VITE_API_URL}/entity/update`, async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({ success: true, data: body });
    })
];
```

### Шаг 3. Конфигурация воркера

`src/shared/api/msw/browser.ts`

Создаем экземпляр worker-а, передавая в него список хендлеров. Этот файл является точкой входа MSW для браузерной среды.

```typescript
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
```

### Шаг 4. Глобальный реестр хендлеров

`src/shared/api/msw/handlers.ts`

Собираем хендлеры всех сущностей из разных `entities` в единый массив. Это позволяет централизованно управлять всеми перехватами проекта.

```typescript
import { entityOneHandlers } from "@/entities/entity-one/handlers";
import { entityTwoHandlers } from "@/entities/entity-two/handlers";

export const handlers = [
    ...entityOneHandlers,
    ...entityTwoHandlers,
];
```

### Шаг 5. Сценарий запуска MSW

`src/app/init/msw.ts`

Создаем асинхронную функцию запуска, которая проверяет флаги окружения. Это гарантирует, что MSW не попадет в production-сборку или не запустится без явного указания.

```typescript
import { ENV } from "@/shared/config";

export const initMsw = async () => {
    if (import.meta.env.DEV || ENV.VITE_ENABLE_MSW === "true") {
        const { worker } = await import("@/shared/api/msw/browser");
        return worker.start({ 
            onUnhandledRequest: "bypass" 
        });
    }
    return Promise.resolve();
};
```

### Шаг 6. Подключение в main.tsx

`src/main.tsx`

Дожидаемся завершения инициализации MSW перед тем, как рендерить приложение. Это важно для того, чтобы первые запросы (например, за текущим пользователем) уже были перехвачены.

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initMsw } from "./app/init/msw";
import App from "./app";

const container = document.getElementById("root");

if (container) {
	const root = createRoot(container);

	initMsw().then(() => {
		root.render(
			<StrictMode>
				<App />
			</StrictMode>
		);
	});
}
```

### Шаг 7. Переменные окружения

`.env`

Управление включением моков через локальный файл окружения.

```text
VITE_ENABLE_MSW=true
```
