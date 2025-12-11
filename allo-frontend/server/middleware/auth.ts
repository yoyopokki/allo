export default defineEventHandler((event) => {
  // Проверяем наличие сессии для защищенных маршрутов
  const path = getRequestURL(event).pathname;

  // Публичные маршруты
  const publicPaths = ['/api/auth/login', '/api/auth/session'];

  if (publicPaths.includes(path)) {
    return;
  }

  // Проверяем сессию для /api/auth/logout
  if (path === '/api/auth/logout') {
    const user = getUserSession(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Не авторизован',
      });
    }
  }
});
