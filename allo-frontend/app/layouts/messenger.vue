<script setup lang="ts">
const messengerStore = useMessengerStore();

// Загружаем моковые данные при монтировании
onMounted(() => {
  messengerStore.loadMockData();
});
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Шапка -->
    <MessengerHeader />

    <!-- Основной контент: две колонки -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Левая колонка: список пользователей -->
      <MessengerUserList />

      <!-- Правая колонка: окно чата -->
      <MessengerChatWindow />
    </div>
  </div>
</template>
