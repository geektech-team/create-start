import { RouteLocationNormalized } from 'vue-router';
import { RouterName } from '../enum';
export const loginRoutes = [
  {
    path: 'login',
    name: RouterName.Login,
    component: () => import('@/views/login/login-view.vue'),
    meta: {
      text: '登录',
    },
    props: (to: RouteLocationNormalized) => {
      return {
        redirect: to.query.redirect,
      };
    },
  },
];
