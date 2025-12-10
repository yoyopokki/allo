<script setup lang="ts">
import type { Message } from '~/types/messenger';

interface Props {
  message: Message;
  isOwn: boolean;
}

const props = defineProps<Props>();

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(props.message.timestamp);
});
</script>

<template>
  <div class="flex mb-4" :class="isOwn ? 'justify-end' : 'justify-start'">
    <div
      class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl"
      :class="
        isOwn
          ? 'bg-primary-500 text-white rounded-br-sm'
          : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'
      "
    >
      <p class="text-sm break-words">{{ message.content }}</p>
      <p
        class="text-xs mt-1"
        :class="isOwn ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'"
      >
        {{ formattedTime }}
      </p>
    </div>
  </div>
</template>
