// This file defines the types related to user management in the application.

export interface User{
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    createdAt: string;
}
export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthSignupPayload  {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user:User;
}
