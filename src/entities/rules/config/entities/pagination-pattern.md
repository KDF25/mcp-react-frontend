# Архитектурный паттерн: Пагинация списков

Единый frontend-контракт для list-сценариев. Backend может использовать любые имена полей — они остаются в converters.

---

## 🛑 Главное правило

UI, виджеты таблиц и аргументы RTK Query работают только с:

```typescript
// src/shared/types/pagination.types.ts
export interface IPaginationRequest<T extends string = string> {
  page: number;
  limit: number;
  search?: string;
  status?: T;
}

export interface IPaginationResponse<T> {
  data: T[];
  total: number;
}
```

Запрещено тащить `elements_on_page`, `total_count`, `items`, `promocodes` и т.п. в компоненты.

---

## Конвертеры

```typescript
export const mapEntitiesQueryToBackend = (
  query: IPaginationRequest
): TEntitiesQueryBackend => ({
  page: query.page,
  elements_on_page: query.limit, // имя поля — ответственность API
  search: query.search
});

export const mapEntitiesToFrontend = (
  response: TEntitiesBackend
): IPaginationResponse<IEntity> => ({
  data: response.items.map(mapEntityToFrontend),
  total: response.total_count
});
```

---

## MSW

Если `transformResponse` ожидает backend envelope и вызывает converter — handler **обязан** вернуть backend shape (`items` + `total_count` или аналог API), а не `{ data, total }`.
