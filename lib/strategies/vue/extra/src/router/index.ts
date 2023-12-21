import { createRouter, createWebHistory } from 'vue-router';
import { homeRoutes } from './modules/home';
import { checkLogin } from './interceptors/check-login';
import { RouterName } from './enum';
import { loginRoutes } from './modules/login';

export const routes = [...homeRoutes, ...loginRoutes];

export const hideInMenuRoutes = [RouterName.HomeDashboard, RouterName.Login];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      children: routes,
    },
  ],
});

router.beforeEach(checkLogin);

export default router;
