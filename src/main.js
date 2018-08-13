import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { router } from './router/index';
import { $axios } from './utils/request';
import VueLazyLoad from 'vue-lazyload';
import VueLocalStorage from 'vue-localstorage';

Vue.use(VueRouter);
Vue.use(VueLazyLoad);
Vue.use(VueLocalStorage);
Vue.prototype.$axios = $axios;

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
