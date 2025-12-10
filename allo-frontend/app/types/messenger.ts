export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  userId: string;
  messages: Message[];
}
