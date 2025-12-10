<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

function handleLogout() {
  authStore.logout();
  router.push('/');
}
</script>

<template>
  <header
    class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
  >
    <div class="px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
          Мессенджер
        </h1>
        <span
          v-if="authStore.user"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ authStore.user.firstName }} {{ authStore.user.lastName }}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <UButton
          icon="i-heroicons-magnifying-glass"
          color="neutral"
          variant="ghost"
          aria-label="Поиск"
        />
        <UButton
          icon="i-heroicons-cog-6-tooth"
          color="neutral"
          variant="ghost"
          aria-label="Настройки"
        />
        <UButton
          icon="i-heroicons-arrow-right-on-rectangle"
          color="neutral"
          variant="ghost"
          aria-label="Выход"
          @click="handleLogout"
        />
      </div>
    </div>
  </header>
</template>
