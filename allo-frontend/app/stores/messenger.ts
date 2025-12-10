import { defineStore } from 'pinia';
import type { User, Message, Chat } from '~/types/messenger';

export const useMessengerStore = defineStore('messenger', () => {
  const authStore = useAuthStore();
  const currentUserId = computed(() => authStore.user?.id || 'current-user');
  const selectedUserId = ref<string | null>(null);
  const users = ref<User[]>([]);
  const chats = ref<Map<string, Chat>>(new Map());

  // Геттеры
  const selectedUser = computed(() =>
    users.value.find((u) => u.id === selectedUserId.value)
  );

  const currentChat = computed(() =>
    selectedUserId.value ? chats.value.get(selectedUserId.value) : null
  );

  const sortedUsers = computed(() =>
    [...users.value].sort((a, b) => {
      if (a.lastMessageTime && b.lastMessageTime) {
        return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
      }
      return 0;
    })
  );

  // Действия
  function selectUser(userId: string) {
    selectedUserId.value = userId;
  }

  function sendMessage(content: string) {
    if (!selectedUserId.value || !content.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId.value || 'current-user',
      receiverId: selectedUserId.value,
      content: content.trim(),
      timestamp: new Date(),
      isRead: false,
    };

    const chat = chats.value.get(selectedUserId.value);
    if (chat) {
      chat.messages.push(message);
    } else {
      chats.value.set(selectedUserId.value, {
        userId: selectedUserId.value,
        messages: [message],
      });
    }

    // Обновляем последнее сообщение у пользователя
    const user = users.value.find((u) => u.id === selectedUserId.value);
    if (user) {
      user.lastMessage = content;
      user.lastMessageTime = new Date();
    }
  }

  function loadMockData() {
    users.value = [
      {
        id: '1',
        firstName: 'Анна',
        lastName: 'Иванова',
        isOnline: true,
        lastMessage: 'Привет! Как дела?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: '2',
        firstName: 'Петр',
        lastName: 'Сидоров',
        avatar: 'https://i.pravatar.cc/150?img=12',
        isOnline: false,
        lastMessage: 'Спасибо за помощь!',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: '3',
        firstName: 'Мария',
        lastName: 'Петрова',
        avatar: 'https://i.pravatar.cc/150?img=5',
        isOnline: true,
        lastMessage: 'До встречи завтра',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
      },
    ];

    chats.value.set('1', {
      userId: '1',
      messages: [
        {
          id: '1',
          senderId: '1',
          receiverId: currentUserId.value,
          content: 'Привет! Как дела?',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          isRead: true,
        },
      ],
    });
  }

  return {
    currentUserId,
    selectedUserId,
    users,
    chats,
    selectedUser,
    currentChat,
    sortedUsers,
    selectUser,
    sendMessage,
    loadMockData,
  };
});
