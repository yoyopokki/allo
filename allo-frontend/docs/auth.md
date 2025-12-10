# Система Авторизации

## Описание

Серверная система авторизации с защитой маршрутов и персистентностью сессии через HTTP-only cookies.

## Компоненты

### Серверные API Endpoints

**`POST /api/auth/login`** - вход в систему:
- Принимает email и password
- Проверяет учетные данные
- Создает HTTP-only cookie с сессией
- Возвращает данные пользователя

**`POST /api/auth/logout`** - выход из системы:
- Удаляет cookie с сессией
- Защищен серверным middleware

**`GET /api/auth/session`** - получение текущей сессии:
- Читает cookie и возвращает данные пользователя
- Возвращает 401 если сессия отсутствует

### Серверные Утилиты

`server/utils/auth.ts` - вспомогательные функции:
- `validateCredentials()` - проверка логина/пароля
- `setUserSession()` - создание cookie с сессией
- `getUserSession()` - чтение сессии из cookie
- `clearUserSession()` - удаление cookie

### Store (Pinia)

`useAuthStore` - управляет состоянием авторизации:
- `user` - текущий авторизованный пользователь
- `isAuthenticated` - статус авторизации
- `login(credentials)` - вход через серверный API
- `logout()` - выход через серверный API
- `fetchSession()` - получение сессии с сервера

### Middleware

**Client Middleware** (`app/middleware/auth.ts`):
- Проверяет сессию при навигации
- Неавторизованные пользователи → `/`
- Авторизованные пользователи → `/messenger`
- Автоматическая проверка сессии на сервере

**Server Middleware** (`server/middleware/auth.ts`):
- Защита API endpoints
- Проверка наличия сессии

### Plugin

`app/plugins/auth.client.ts` - восстановление сессии при загрузке приложения

### Компоненты UI

`FormLogin` - форма входа с:
- Полями email и password
- Валидацией
- Состоянием загрузки
- Toast-уведомлениями
- Вход по Enter

## Моковые Пользователи

```typescript
{
  email: 'user@example.com',
  password: 'password',
  firstName: 'Иван',
  lastName: 'Петров',
}

{
  email: 'admin@example.com',
  password: 'admin',
  firstName: 'Админ',
  lastName: 'Админов',
}
```

## Использование

1. При первом заходе отображается форма входа (`/`)
2. Введите email и пароль из списка выше
3. Данные отправляются на сервер (`POST /api/auth/login`)
4. Сервер проверяет учетные данные и создает HTTP-only cookie
5. После успешного входа происходит редирект на `/messenger`
6. Сессия сохраняется в cookie (7 дней)
7. При перезагрузке сессия автоматически восстанавливается с сервера
8. Кнопка выхода в шапке мессенджера удаляет cookie

## Безопасность

- ✅ HTTP-only cookies - защита от XSS атак
- ✅ SameSite=lax - защита от CSRF
- ✅ Secure в production - передача только по HTTPS
- ✅ Серверная валидация всех запросов
- ✅ Пароли не хранятся в ответах API

