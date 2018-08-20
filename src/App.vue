<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="currentActive">
      <van-tabbar-item v-for="(item, index) in icon" :key="index" :url="'/#' + item.url">
        <span>{{item.title}}</span>
        <img slot="icon" slot-scope="props"
          :src="currentActive === index ? item.active : item.normal"/>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Tabbar, TabbarItem } from 'vant';
import { TabbarConfig } from '@/config/tabbar';
import { wxInit } from '@/utils/share';

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
      icon: TabbarConfig,
    };
  },
  created() {
  },
  methods: {
    share() {
      var params = {
        url: window.location.href,
      };
      this.$axios.post('/api/wx/share', params).then((res) => {
        var data = res.data;
        data.desc = document.title;
        wxInit(data);
      });
    },
  },
  mounted() {
    this.$nextTick((res) => {
      //
    });
    this.share();
  },
  computed: {
    currentActive: {
      get() {
        var path = this.$route.path;
        if (path === '/user/index' || /^\/(user|order)/.test(path)) {
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
