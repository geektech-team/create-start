import { AUTH_TOKEN } from '@/constants';
import { cookie, eventBus } from '@geektech/utils';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const checkLogin = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (to.meta.requiresAuth) {
    // 判断是否已经登录
    if (cookie.get(AUTH_TOKEN)) {
      next();
    } else {
      eventBus.emit('login-expired');
    }
  } else {
    next();
  }
};
