<template>
  <UForm :state="formState" class="max-w-md flex flex-col gap-4">
    <div class="text-center mb-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Вход в систему
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Демо: user@example.com / password
      </p>
    </div>

    <UFormField label="Email">
      <UInput
        v-model="formState.email"
        icon="i-heroicons-envelope"
        size="xl"
        class="w-full"
        :disabled="isLoading"
      />
    </UFormField>

    <UFormField label="Пароль">
      <UInput
        v-model="formState.password"
        type="password"
        icon="i-heroicons-key"
        size="xl"
        class="w-full"
        :disabled="isLoading"
        @keydown.enter="onSubmit"
      />
    </UFormField>

    <UButton
      type="submit"
      size="xl"
      block
      :loading="isLoading"
      @click="onSubmit"
    >
      Войти
    </UButton>

    <USeparator type="dashed" label="или" />

    <UButton
      type="button"
      size="xl"
      block
      icon="i-simple-icons-google"
      color="neutral"
      variant="outline"
      :disabled="isLoading"
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
      :disabled="isLoading"
    >
      Войти через Telegram
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const formState = ref({
  email: '',
  password: '',
});

const isLoading = ref(false);

const onSubmit = async () => {
  if (!formState.value.email || !formState.value.password) {
    toast.add({
      title: 'Ошибка',
      description: 'Заполните все поля',
      color: 'error',
    });
    return;
  }

  isLoading.value = true;

  try {
    const success = await authStore.login(formState.value);

    if (success) {
      toast.add({
        title: 'Успешно',
        description: 'Вы вошли в систему',
        color: 'success',
      });
      await router.push('/messenger');
    } else {
      toast.add({
        title: 'Ошибка',
        description: 'Неверный email или пароль',
        color: 'error',
      });
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    toast.add({
      title: 'Ошибка',
      description: 'Произошла ошибка при входе',
      color: 'error',
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
