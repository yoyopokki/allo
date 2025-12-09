<template>
  <UForm :state="formState" class="max-w-md flex flex-col gap-4">
    <UFormField label="Email">
      <UInput
        v-model="formState.email"
        icon="i-heroicons-envelope"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Пароль">
      <UInput
        v-model="formState.password"
        type="password"
        icon="i-heroicons-key"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UButton type="submit" size="xl" block @click="onSubmit">Войти</UButton>

    <USeparator type="dashed" label="или" />

    <UButton
      type="button"
      size="xl"
      block
      icon="i-simple-icons-google"
      color="neutral"
      variant="outline"
    >
      Войти через Google
    </UButton>

    <UButton
      type="button"
      size="xl"
      block
      icon="i-simple-icons-telegram"
      color="neutral"
      variant="outline"
    >
      Войти через Telegram
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
const formState = ref({
  email: '',
  password: '',
});

const onSubmit = () => {
  console.log(formState.value.email, formState.value.password);
};
</script>
