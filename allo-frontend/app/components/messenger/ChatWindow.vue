<script setup lang="ts">
const messengerStore = useMessengerStore();
const messagesContainer = ref<HTMLDivElement>();

// Прокрутка к последнему сообщению
watch(
  () => messengerStore.currentChat?.messages.length,
  () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  }
);

function handleSendMessage(content: string) {
  messengerStore.sendMessage(content);
}
</script>

<template>
  <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950">
    <!-- Пустое состояние -->
    <div
      v-if="!messengerStore.selectedUser"
      class="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400"
    >
      <div class="text-center">
        <UIcon
          name="i-heroicons-chat-bubble-left-right"
          class="w-16 h-16 mx-auto mb-4 opacity-50"
        />
        <p class="text-lg">Выберите чат для начала общения</p>
      </div>
    </div>

    <!-- Окно чата -->
    <template v-else>
      <!-- Шапка чата -->
      <div
        class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <div class="flex items-center gap-3">
          <UAvatar
            :src="messengerStore.selectedUser.avatar"
            :alt="`${messengerStore.selectedUser.firstName} ${messengerStore.selectedUser.lastName}`"
            size="sm"
          />
          <div>
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ messengerStore.selectedUser.firstName }}
              {{ messengerStore.selectedUser.lastName }}
            </h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{
                messengerStore.selectedUser.isOnline ? 'В сети' : 'Не в сети'
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Сообщения -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto px-6 py-4">
        <MessengerMessageItem
          v-for="message in messengerStore.currentChat?.messages"
          :key="message.id"
          :message="message"
          :is-own="
            message.senderId ===
            (messengerStore.currentUserId || 'current-user')
          "
        />
      </div>

      <!-- Поле ввода -->
      <div
        class="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <MessengerMessageInput @send="handleSendMessage" />
      </div>
    </template>
  </div>
</template>
