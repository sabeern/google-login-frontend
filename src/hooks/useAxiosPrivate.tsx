import { useEffect } from "react";
import useAuth from "./useAuth";
import type { InternalAxiosRequestConfig } from "axios";
import useRefreshtoken from "./useRefreshToken";
import { axiosPrivate } from "../instances/baseUrl";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  server?: string;
}

const useAxiosPrivate = () => {
  const refresh = useRefreshtoken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log("i worked");
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          if (config.server) {
            console.log("hi", config.server);
            config.baseURL = config.server;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  });
  //, [auth, refresh]
  return axiosPrivate;
};

export default useAxiosPrivate;
