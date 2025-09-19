import { axiosInstance } from "../config/axios/axiosInstance";
import type { AuthLoginPayload, AuthResponse, AuthSignupPayload } from "../features/auth/types";


// Function to handle user login
export async function login(payload: AuthLoginPayload) {
  const response = await axiosInstance.post<AuthResponse>("/Auth/login", payload);
  return response;
}
// Function to handle user signup
export async function signUp(payload: AuthSignupPayload) {
  const response = await axiosInstance.post<AuthResponse>(
    "/Auth/register",
    payload
  );
  return response;
}
