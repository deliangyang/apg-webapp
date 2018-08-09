import HomePage from '@/module/Home.vue';

const Bar = { template: '<div>bar</div>' };

export const routers = [
  { path: '/foo', component: HomePage },
  { path: '/bar', component: Bar },
  { path: '/search', component: () => import('@/module/search/index.vue') },
  { path: '/user/coupon', component: () => import('@/module/user/coupon.vue') },
];
