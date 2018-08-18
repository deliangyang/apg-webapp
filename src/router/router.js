import HomePage from '@/module/Home.vue';

export const routers = [
  { path: '/', component: HomePage, props: { active: 0 }, meta: { title: '海壳直邮一代神器' }},
  { path: '/search', component: () => import('@/module/search/index.vue'), meta: { title: '搜索' }},
  { path: '/user/coupon', component: () => import('@/module/user/coupon.vue'), meta: { title: '我的优惠券' }},
  { path: '/product/detail/:id', component: () => import('@/module/product/detail.vue'), meta: { title: '商品详情' }},
  { path: '/product/category', component: () => import('@/module/product/category.vue'), meta: { title: '商品分类' }},
  { path: '/product/category/:id', component: () => import('@/module/product/category.vue'), meta: { title: '商品分类' }},
  { path: '/user/integral', component: () => import('@/module/user/integral.vue'), meta: { title: '我的经验' }},
  { path: '/user/conch', component: () => import('@/module/user/conch.vue'), meta: { title: '我的贝壳' }},
  { path: '/address/index', component: () => import('@/module/address/index.vue'), meta: { title: '地址管理' }},
  { path: '/address/edit', component: () => import('@/module/address/edit.vue'), meta: { title: '地址编辑' }},
  { path: '/order/confirm', component: () => import('@/module/order/confirm.vue'), meta: { title: '订单确认' }},
  { path: '/order/index', component: () => import('@/module/order/index.vue'), meta: { title: '我的订单' }},
  { path: '/shopping/cart', component: () => import('@/module/shopping/cart.vue'), meta: { title: '购物车' }},
  { path: '/user/invite', component: () => import('@/module/user/invite.vue'), meta: { title: '邀请码' }},
  { path: '/user/login', component: () => import('@/module/user/login.vue'), meta: { title: '登录' }},
  { path: '/user/index', component: () => import('@/module/user/index.vue'), meta: { title: '个人中心' }},
  { path: '/user/feedback', component: () => import('@/module/user/feedback.vue'), meta: { title: '意见反馈' }},
  { path: '/found/circle', component: () => import('@/module/found/circle.vue'), meta: { title: '海壳圈' }},
  { path: '/service', component: () => import('@/module/common/service.vue'), meta: { title: '客服' }},
  { path: '/user/favorite', component: () => import('@/module/user/favorite.vue'), meta: { title: '我的收藏' }},
];
