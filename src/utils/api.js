import { $axios } from './request';

const initBoot = () => $axios.get('boot');

export default {
  initBoot
};
