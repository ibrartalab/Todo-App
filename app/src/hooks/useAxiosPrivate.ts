// hooks/useAxiosPrivate.js
import { useEffect } from "react";
import { axiosPrivate } from "../config/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux/reduxHooks";

const useAxiosPrivate = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          navigate("/", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, navigate]);

  return axiosPrivate;
};

export default useAxiosPrivate;
