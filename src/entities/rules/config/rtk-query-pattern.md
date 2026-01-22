# RTK Query Data Fetching Pattern

Этот паттерн обеспечивает единообразную обработку состояний загрузки, ошибок и семантичное именование данных при использовании RTK Query.

## Основные правила

1.  **Семантическое переименование**: При деструктуризации результата хука `useQuery` всегда переименовывайте `data`, `isLoading` и `isError` для соответствия контексту страницы/виджета (например, `accountData`, `isAccountLoading`).
2.  **Обработка ошибок**: Используйте `useEffect` для вывода уведомлений (toast) при возникновении ошибок загрузки.
3.  **Локализация ошибок**: Ключи для ошибок должны браться из интернализации (i18n).

## Шаблон кода

```tsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast"; // или ваша библиотека уведомлений

// 1. Деструктуризация с переименованием
const {
    data: accountData,
    isLoading: isAccountLoading,
    isError: isAccountError
} = useGetAccountQuery();

const [updateAccount, { isLoading: isUpdating }] =
    useUpdateAccountMutation();

const { t } = useTranslation();

// 2. Обработка ошибок загрузки через useEffect
useEffect(() => {
    if (isAccountError) {
        toast.error(t("form.toasts.load.error"));
    }
}, [isAccountError, t]);
```

## Преимущества
- **Читаемость**: Понятно, какие именно данные загружаются, если на странице несколько запросов.
- **Консистентность**: Ошибки всегда обрабатываются одинаковым способом.
- **UX**: Пользователь сразу получает обратную связь при сбое сети или сервера.
