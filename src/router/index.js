import Vue from 'vue';
import VueRouter from 'vue-router';
import { routers } from './router';
import { utils } from '@/utils/index';

Vue.use(VueRouter);

const RouterConfig = {
  routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  console.log(to);
  utils.title(to.meta.title);
  next();
});

router.afterEach(element => {

});
