import HomePage from '@/module/Home.vue';

const Bar = { template: '<div>bar</div>' };

export const routers = [
  { path: '/', component: HomePage },
  { path: '/bar', component: Bar },
  { path: '/search', component: () => import('@/module/search/index.vue') },
  { path: '/user/coupon', component: () => import('@/module/user/coupon.vue') },
  { path: '/product/detail/:id', component: () => import('@/module/product/detail.vue') },
  { path: '/product/category', component: () => import('@/module/product/category.vue') },
  { path: '/user/integral', component: () => import('@/module/user/integral.vue') },
  { path: '/user/conch', component: () => import('@/module/user/conch.vue') },
  { path: '/address/index', component: () => import('@/module/address/index.vue') },
  { path: '/address/edit', component: () => import('@/module/address/edit.vue') },
  { path: '/order/confirm', component: () => import('@/module/order/confirm.vue') },
  { path: '/order/index', component: () => import('@/module/order/index.vue') },
  { path: '/shopping/cart', component: () => import('@/module/shopping/cart.vue') },
  { path: '/user/invite', component: () => import('@/module/user/invite.vue') },
  { path: '/user/login', component: () => import('@/module/user/login.vue') },
];
