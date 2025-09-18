/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  login as apiLogin,
  signUp as apiSignup,
} from "../api/authAPI";
import { setCredentials } from "../features/auth/authSlice";
import type { AuthLoginPayload, AuthSignupPayload } from "../features/auth/types";
import { useAppDispatch } from "./redux/reduxHooks";

export function useAuth() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Handle user login
  const login = async (payload: AuthLoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(payload);
      // Add some basic validation
      if(!response.data){
        throw new Error("Invalid response data");
      }else if(response.data.user.userName === "" || response.data.token === ""){
        throw new Error("Username or token is empty");
      }
      // Dispatch credentials to Redux store
      dispatch(
        setCredentials({
          accessToken: response.data.token,
          user: response.data.user.userName,
          userId: response.data.user.id,
        })
      );
      return response;
    } catch (err: unknown) {
      setError("Login failed. Please check your credentials.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Handle user signup
  const signup = async (payload: AuthSignupPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiSignup(payload);
      // Add some basic validation
      if (!response.data) {
        throw new Error("Invalid response data");
      }

      if (!response.data.user.userName || !response.data.token) {
        throw new Error("Missing username or token");
      }

      // // Dispatch credentials to Redux store
      dispatch(
        setCredentials({
          accessToken: response.data.token,
          user: response.data.user.userName,
          userId: response.data.user.id,
        })
      );

      return response;
    } catch (err: unknown) {
      setError("Signup failed. Please check your details.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
    signup,
  };
}