import type { AxiosInstance } from "axios";

// This file defines the types related to user management in the application.
interface CommonThunkPayload {
  axiosPrivate:AxiosInstance;
}

export interface User{
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    createdAt: string;
}
export interface AuthLoginPayload extends CommonThunkPayload {
  username: string;
  password: string;
}

export interface AuthSignupPayload extends CommonThunkPayload {
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
