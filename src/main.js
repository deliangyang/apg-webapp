import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { router } from './router/index';
import { $axios } from './utils/request';

Vue.use(VueRouter);
Vue.prototype.$axios = $axios;

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
