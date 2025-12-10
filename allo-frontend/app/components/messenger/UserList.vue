<script setup lang="ts">
const messengerStore = useMessengerStore();

function handleCall(userId: string) {
  console.log('Звонок пользователю:', userId);
  // TODO: Реализовать логику звонка
}
</script>

<template>
  <aside
    class="w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col"
  >
    <!-- Поиск -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-800">
      <UInput
        icon="i-heroicons-magnifying-glass"
        placeholder="Поиск контактов..."
        class="w-full"
      />
    </div>

    <!-- Список пользователей -->
    <div class="flex-1 overflow-y-auto">
      <MessengerUserListItem
        v-for="user in messengerStore.sortedUsers"
        :key="user.id"
        :user="user"
        :is-selected="messengerStore.selectedUserId === user.id"
        @select="messengerStore.selectUser(user.id)"
        @call="handleCall(user.id)"
      />
    </div>
  </aside>
</template>
