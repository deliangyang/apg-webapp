<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop">
        <span>首页</span>
        <img slot="icon" slot-scope="props"
          :src="active === 0 ? icon[0].active : icon[0].normal"/>
      </van-tabbar-item>
      <van-tabbar-item icon="chat">
        <span>海壳圈</span>
        <img slot="icon" slot-scope="props" 
          :src="active === 1 ? icon[1].active : icon[1].normal"/>
      </van-tabbar-item>
      <van-tabbar-item icon="chat">
        <span>客服</span>
        <img slot="icon" slot-scope="props" 
          :src="active === 2 ? icon[2].active : icon[2].normal"/>
      </van-tabbar-item>
      <van-tabbar-item icon="chat">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" 
          :src="active === 3 ? icon[3].active : icon[3].normal"/>
      </van-tabbar-item>
      <van-tabbar-item icon="chat">
        <span>个人中心</span>
        <img slot="icon" slot-scope="props" 
          :src="active === 4 ? icon[4].active : icon[4].normal"/>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Tabbar, TabbarItem } from 'vant';
import homeNormal from '@/images/icon/home_grey.png';
import homeActive from '@/images/icon/1_29.png';
import circleNormal from '@/images/icon/1_32.png';
import circleActive from '@/images/icon/2_11.png';
import service from '@/images/icon/1_32.png';
import shoppingNormal from '@/images/icon/1_34.png';
import shoppingActive from '@/images/icon/3_11.png';
import userNormal from '@/images/icon/1_26.png';
import userActive from '@/images/icon/4_19.png';

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      active: 0,
      icon: [
        {
          normal: homeNormal,
          active: homeActive
        },
        {
          normal: circleNormal,
          active: circleActive
        },
        {
          normal: service,
          active: service
        },
        {
          normal: shoppingNormal,
          active: shoppingActive
        },
        {
          normal: userNormal,
          active: userActive
        },
      ]
    };
  },
};
</script>

<style lang="less">
body {
  background-color: #f8f8f8;
}

.van-cell__title .van-icon {
  font-size: 18px;
}
@import './styles/common.less';
</style>
