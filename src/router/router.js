import HomePage from '@/module/Home.vue';

const Bar = { template: '<div>bar</div>' };

export const routers = [
  { path: '/foo', component: HomePage },
  { path: '/bar', component: Bar }
];
