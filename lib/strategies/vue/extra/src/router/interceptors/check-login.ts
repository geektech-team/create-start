import { AUTH_TOKEN } from '@/constants';
import { eventBus } from '@geektech/utils';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const checkLogin = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (to.meta.requiresAuth) {
    // 判断是否已经登录
    if (localStorage.get(AUTH_TOKEN)) {
      next();
    } else {
      eventBus.emit('login-expired');
    }
  } else {
    next();
  }
};
