import { InternalAxiosRequestConfig } from "axios";
import { AUTH_TOKEN } from "./../../constants";

export const addToken = (config: InternalAxiosRequestConfig) => {
  // 此处对请求进行配置
  config.headers["auth-token"] = localStorage.getItem(AUTH_TOKEN) || "";
  return config;
};
