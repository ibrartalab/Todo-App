import type { AuthLoginPayload, AuthResponse, AuthSignupPayload } from "../features/auth/types";

// Function to handle user login
export async function login(payload: AuthLoginPayload) {
  const {username,password,axiosPrivate} = payload;
  const loginPayload = {
    username,
    password
  }
  const response = await axiosPrivate.post<AuthResponse>("/Auth/login", loginPayload);
  return response;
}
// Function to handle user signup
export async function signUp(payload: AuthSignupPayload) {
  const {axiosPrivate,...data} = payload;
  const response = await axiosPrivate.post<AuthResponse>(
    "/Auth/register",
    data
  );
  return response;
}
