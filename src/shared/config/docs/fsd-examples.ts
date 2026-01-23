export const FSD_EXAMPLES = {
    validImport: `import { useAuthStore } from "@/entities/session"; // OK: feature -> entity
import { Button } from "@/shared/ui";         // OK: feature -> shared`,

    forbiddenViolation: `import { logoutFeature } from "@/features/auth"; // ERROR: entity -> feature (LAYER VIOLATION)`,

    entityTree: `src/entities/invoice/
├── api/             # API сервисы (RTK Query)
├── types/           # Структуры данных
│   ├── index.ts
│   ├── invoice.interface.ts
│   └── invoice.types.ts
├── constants/       # Списки, маппинги, дефолты
├── converters/      # Преобразование данных
├── handlers/        # Бизнес-логика и валидация
├── mock/            # Тестовые данные
├── ui/              # (Опционально) Карточки, элементы списков
└── index.ts         # Public API`,

    widgetTree: `src/widgets/accommodation-edit/
├── model/           # Логика и состояние виджета
│   ├── config/      # Конфигурации форм/колонок
│   ├── schema/      # Схемы валидации (Zod)
│   ├── types/       # Локальные типы
│   └── index.ts
├── ui/              # Внутренние компоненты отображения
│   ├── general-info/
│   └── rooms/
├── accommodation-edit.tsx # Основной компонент
└── index.ts         # Public API`
};
