export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Проверяем сессию на сервере при первой загрузке
  if (!authStore.user) {
    await authStore.fetchSession();
  }

  // Если не авторизован и пытается попасть на защищенную страницу
  if (!authStore.isAuthenticated && to.path !== '/auth') {
    return navigateTo('/auth');
  }

  // Если авторизован и пытается попасть на страницу входа
  if (authStore.isAuthenticated && ['/auth', '/'].includes(to.path)) {
    return navigateTo('/messenger');
  }
});
