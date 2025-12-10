<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950"
  >
    <UCard class="w-full max-w-md">
      <FormLogin />
    </UCard>
  </div>
</template>
