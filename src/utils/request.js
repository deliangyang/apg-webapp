import axios from 'axios';
import { HOST, VERSION } from './constant';
import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';

Vue.use(VueLocalStorage);

export const $axios = axios.create({
    baseURL: HOST,
    timeout: 30000,
    headers: {
      'Content-type': 'application/json',
      'app-version': VERSION,
    }
});

$axios.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});

$axios.interceptors.response.use(function(response) {
    console.log(response.data);
    return response;
}, function(error) {
    console.log(error);
    return Promise.reject(error);
});

const authorization = Vue.localStorage.get('Authorization');
if (authorization) {
    $axios.defaults.headers.common['Authorization'] = 'Bearer ' + authorization;
}
$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
