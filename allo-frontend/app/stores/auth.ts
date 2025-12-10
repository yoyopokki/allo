import { defineStore } from 'pinia';
import type { AuthUser, LoginCredentials } from '~/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  // Вход через серверный API
  async function login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials,
      });

      user.value = response.user;
      return true;
    } catch (error) {
      console.error('Ошибка входа:', error);
      return false;
    }
  }

  // Выход через серверный API
  async function logout() {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Ошибка выхода:', error);
    } finally {
      user.value = null;
    }
  }

  // Получение текущей сессии с сервера
  async function fetchSession() {
    try {
      const response = await useFetch('/api/auth/session', {
        server: true,
        lazy: false,
      });
      user.value = response.data?.value?.user ?? null;
      return true;
    } catch {
      user.value = null;
      return false;
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    fetchSession,
  };
});
