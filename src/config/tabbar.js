import homeNormal from '@/images/icon/home_grey.png';
import homeActive from '@/images/icon/1_29.png';
import circleNormal from '@/images/icon/1_37.png';
import circleActive from '@/images/icon/2_11.png';
import service from '@/images/icon/1_32.png';
import shoppingNormal from '@/images/icon/1_34.png';
import shoppingActive from '@/images/icon/3_11.png';
import userNormal from '@/images/icon/1_26.png';
import userActive from '@/images/icon/4_19.png';

export const TabbarConfig = [
    {
      title: '首页',
      normal: homeNormal,
      active: homeActive,
      url: '/',
    },
    {
      title: '海壳圈',
      normal: circleNormal,
      active: circleActive,
      url: '/found/circle',
    },
    {
      title: '客服',
      normal: service,
      active: service,
      url: '/service',
    },
    {
      title: '购物车',
      normal: shoppingNormal,
      active: shoppingActive,
      url: '/shopping/cart',
    },
    {
      title: '个人中心',
      normal: userNormal,
      active: userActive,
      url: '/user/index',
    },
];

