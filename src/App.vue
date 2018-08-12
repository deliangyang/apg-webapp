<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="currentActive" v-if="showTabbar">
      <van-tabbar-item icon="shop" v-for="(item, index) in icon" :key="index" :url="'/#' + item.url">
        <span>{{item.title}}</span>
        <img slot="icon" slot-scope="props"
          :src="currentActive === index ? item.active : item.normal"/>
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
      showTabbar: false,
      active: 0,
      currentRouter: '/',
      icon: [
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
          url: '',
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
      ]
    };
  },
  created(option) {
    console.log(this.$route.path);
  },
  computed: {
    currentActive: {
      get() {
        var path = this.$route.path;
        if (path === '/user/index') {
          return 4;
        } else if (path === '/shopping/cart') {
          return 3;
        } else if (path === '/found/circle') {
          return 1;
        } else if (path === '/') {
          return 0;
        } else {
          return 0;
        }
      },
      set() {

      }
    },
  },
  showTabbar: function() {
    var path = this.$route.path;
    if (/^\/product\/detai\/\d+/.test(path)) {
      return false;
    } else {
      return true;
    }
  }
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
