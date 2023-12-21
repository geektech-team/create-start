import { AxiosResponse } from 'axios';

export const catchLoginExpired = (response: AxiosResponse) => {
  const res = response.data;
  if (
    [
      51555, // 登录认证失败 expired
    ].includes(res?.statusCode)
  ) {
    location.href = '/login';
    return Promise.reject(new Error(res.comments || 'Error'));
  }
  return response;
};
