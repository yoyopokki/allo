<script setup lang="ts">
const emit = defineEmits<{
  send: [content: string];
}>();

const message = ref('');

function handleSend() {
  if (message.value.trim()) {
    emit('send', message.value);
    message.value = '';
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
}
</script>

<template>
  <div class="flex items-center gap-3">
    <UTextarea
      v-model="message"
      placeholder="Введите сообщение..."
      :rows="2"
      autoresize
      :maxrows="4"
      class="w-full"
      @keydown="handleKeydown"
    />
    <UButton
      icon="i-heroicons-paper-airplane"
      color="primary"
      variant="ghost"
      size="sm"
      :disabled="!message.trim()"
      @click="handleSend"
    />
  </div>
</template>
