import { InternalAxiosRequestConfig } from 'axios';

export const queryArrayToString = (config: InternalAxiosRequestConfig) => {
  for (const key in config.params) {
    if (Array.isArray(config.params[key])) {
      config.params[key] = config.params[key].join(',');
    }
  }
  return config;
};
