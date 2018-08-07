<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon } from 'vant';

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon
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
