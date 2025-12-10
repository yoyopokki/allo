<script setup lang="ts">
import type { User } from '~/types/messenger';

interface Props {
  user: User;
  isSelected: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [];
  call: [];
}>();

const formattedTime = computed(() => {
  if (!props.user.lastMessageTime) return '';
  const now = new Date();
  const diff = now.getTime() - props.user.lastMessageTime.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 60) return `${minutes}м`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}ч`;
  return `${Math.floor(hours / 24)}д`;
});
</script>

<template>
  <div
    class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
    :class="{ 'bg-gray-100 dark:bg-gray-800': isSelected }"
    @click="emit('select')"
  >
    <!-- Аватар с индикатором онлайн -->
    <div class="relative flex-shrink-0">
      <UAvatar
        :src="user.avatar"
        :alt="`${user.firstName} ${user.lastName}`"
        size="md"
      />
      <span
        v-if="user.isOnline"
        class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"
      />
    </div>

    <!-- Информация о пользователе -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
          {{ user.firstName }} {{ user.lastName }}
        </p>
        <span
          v-if="user.lastMessageTime"
          class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2"
        >
          {{ formattedTime }}
        </span>
      </div>
      <p
        v-if="user.lastMessage"
        class="text-sm text-gray-600 dark:text-gray-400 truncate"
      >
        {{ user.lastMessage }}
      </p>
    </div>

    <!-- Кнопка звонка -->
    <UButton
      icon="i-heroicons-phone"
      color="primary"
      variant="ghost"
      size="sm"
      aria-label="Позвонить"
      class="cursor-pointer"
      @click.stop="emit('call')"
    />
  </div>
</template>
