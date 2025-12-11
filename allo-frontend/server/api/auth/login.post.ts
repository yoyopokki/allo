export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string }>(event);

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      message: 'Email и пароль обязательны',
    });
  }

  const user = validateCredentials(body.email, body.password);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Неверный email или пароль',
    });
  }

  // Создаем сессию без пароля
  const { password: _, ...sessionUser } = user;
  setUserSession(event, sessionUser);

  return {
    user: sessionUser,
  };
});
