<template>
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
</template>

<script setup lang="ts">
import type { User } from '~/types/messenger';

defineProps<{
  user: User;
}>();
</script>
