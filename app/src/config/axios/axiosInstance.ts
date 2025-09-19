import axios, { type AxiosInstance } from "axios";
import { secrets } from "../secrets";

const { BACKEND_URL } = secrets;

// Create an Axios instance for API requests
// This instance can be customized with interceptors, base URL, and headers
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL, // Adjust the base URL as needed
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default axiosPrivate;
// export default axiosInstance;
