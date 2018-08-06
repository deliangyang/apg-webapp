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
  return response;
}, function(error) {
  return Promise.reject(error);
});
