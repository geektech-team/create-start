import { InternalAxiosRequestConfig } from "axios";
import { AUTH_TOKEN } from "./../../constants";
import { cookie } from "@geektech/utils";

export const addToken = (config: InternalAxiosRequestConfig) => {
  // 此处对请求进行配置
  config.headers["auth-token"] = cookie.get(AUTH_TOKEN) || "";
  return config;
};
