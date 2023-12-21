import { RouterName } from '../enum';
export const homeRoutes = [
  {
    path: 'home',
    name: RouterName.Home,
    component: () => import('@/layout/basic-layout.vue'),
    meta: {
      text: '首页',
      requiresAuth: true,
      icon: 'micon-home',
    },
    redirect: '/home/dashboard',
    children: [
      {
        path: 'dashboard',
        name: RouterName.HomeDashboard,
        component: () => import('@/views/home/home-dashboard.vue'),
        meta: {
          text: '仪表盘',
        },
      },
    ],
  },
];
