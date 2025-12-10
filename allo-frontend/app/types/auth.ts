export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

