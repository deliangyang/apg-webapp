import axios from 'axios';
import { HOST } from './constant';

export const $axios = axios.create({
    baseURL: HOST,
    timeout: 30000,
    headers: {
      'Content-type': 'application/json'
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

$axios.defaults.headers.common['Authorization'] = 'x';
$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
