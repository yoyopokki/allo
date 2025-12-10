import type { H3Event } from 'h3';

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

// Моковые пользователи
export const mockUsers = [
  {
    id: 'current-user',
    email: 'user@example.com',
    password: 'password',
    firstName: 'Иван',
    lastName: 'Петров',
  },
  {
    id: 'user-2',
    email: 'admin@example.com',
    password: 'admin',
    firstName: 'Админ',
    lastName: 'Админов',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
];

// Проверка учетных данных
export function validateCredentials(email: string, password: string) {
  return mockUsers.find((u) => u.email === email && u.password === password);
}

// Создание сессии в cookie
export function setUserSession(event: H3Event, user: SessionUser) {
  setCookie(event, 'auth-session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: '/',
  });
}

// Получение сессии из cookie
export function getUserSession(event: H3Event): SessionUser | null {
  const sessionCookie = getCookie(event, 'auth-session');
  if (!sessionCookie) return null;

  try {
    return JSON.parse(sessionCookie);
  } catch {
    return null;
  }
}

// Удаление сессии
export function clearUserSession(event: H3Event) {
  deleteCookie(event, 'auth-session', {
    path: '/',
  });
}

