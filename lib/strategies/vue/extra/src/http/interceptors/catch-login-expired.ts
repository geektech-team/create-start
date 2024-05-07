import { AxiosResponse } from 'axios';
import { eventBus } from '@geektech/utils';
import { ErrorCode } from '../error-code';

export const catchLoginExpired = (response: AxiosResponse) => {
  const res = response.data;
  if (
    [
      ErrorCode.LoginExpired, // 登录认证失败 expired
    ].includes(res?.statusCode)
  ) {
    eventBus.emit('login-expired');
    return Promise.reject(new Error(res.comments || 'Error'));
  }
  return response;
};
