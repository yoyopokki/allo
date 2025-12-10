export default defineEventHandler((event) => {
  const user = getUserSession(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Не авторизован',
    });
  }

  return {
    user,
  };
});

