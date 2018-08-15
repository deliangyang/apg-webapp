<style lang="less">

</style>

<template>
    <div class="index-box">
       <van-notice-bar
        background="#9767C9"
        color="#ffffff"
        text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        :left-icon="volumeIcon"/>

        <div class="swiper">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in imageUrls" :key="index">
                    <img v-lazy="image" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="search-box">
            <van-search placeholder="请输入搜索商品" v-model="value" @search="onSearch"/>
        </div>

        <div class="category">
            <van-row>
                <van-col span="6" class="category-item" v-for="(item, index) in categories" :key="index">
                    <div class="category-image">
                        <img :src="item.image"/>
                    </div>
                    <div class="category-title">{{item.title}}</div>
                </van-col>
            </van-row>
        </div>

        <div class="ad-show">
            <van-row>
                <van-col span="10">
                    <div class="left">
                        <img src="@/images/1_25.gif" />
                    </div>
                </van-col>
                <van-col span="14">
                    <div class="right-top">
                        <img src="@/images/1_22.gif" />
                    </div>
                    <div class="right-bottom">
                        <img src="@/images/1_26.gif" />
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="product-list" v-for="(category, index) in productCategories" :key="index">
            <div class="category">
                <router-link :to="'/product/category/' + category.id">
                    {{category.name}}
                </router-link>
                <img src="@/images/1_22.png" />
            </div>
            <van-row>
                <div class="recommend">
                    <van-col span="12" v-for="(item, index) in recommend[category.id]" :key="index">
                        <div :class="index % 2 === 1 ? 'recommend-item recommend-item-1' : 'recommend-item recommend-item-2'"
                            v-on:click="goToProductDetailPage(item.id)">
                            <div class="image-box">
                                <img :src="item.cover" />
                            </div>
                            <div class="product-title">{{item.title}}</div>
                            <div class="product-amount">
                                <span class="origin-amount">AU$ {{item.amount}}</span>
                                <span class="vip-amount">AU$ {{item.vip_amount}}</span>
                                <span class="aud_cny">(约￥ {{item.aud_cny}})</span>
                            </div>
                            <div class="tag-info">
                                <div v-if="item.is_hot" class="hot">畅销</div>
                                <div v-if="item.tag" class="tag">{{item.tag}}</div>
                            </div>
                        </div>
                    </van-col>
                </div>
            </van-row>
        </div>
    </div>
</template>

<script>
import { Icon, NoticeBar, Swipe, SwipeItem, Search, Row, Col } from 'vant';
import volumeIcon from '@/images/volume.png';
export default {
    components: {
        [NoticeBar.name]: NoticeBar,
        [Icon.name]: Icon,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Search.name]: Search,
        [Row.name]: Row,
        [Col.name]: Col,
    },
    data() {
        return {
            current: '/pages/index',
            hot: [],
            volumeIcon: volumeIcon,
            value: '',
            audCny: 5.0032,
            userType: 0,
            imageUrls: [],
            categories: [],
            category: [],
            recommend: [],
            sysNotice: [],
            indicatorDots: true,
            sysNoticeInterval: 5000,
            autoplay: true,
            interval: 5000,
            duration: 1000,
            imageHeight: 'auto',
            keywords: '',
            search: {
                title: '',
                placeholder: '请输入想要搜索的商品',
                focus: false,
                value: ''
            },
            productCategories: []
        };
    },

    created() {
    },

    mounted() {
        this.$nextTick((res) => {
            this.$axios.get('/api/boot').then((res) => {
                this.imageUrls = res.data.swiper;
                this.categories = res.data.categories;
                this.hot = res.data.hot;
                this.sysNotice = res.data.sysNotice;
                this.sysNoticeInterval = res.data.sysNoticeInterval;
                this.audCny = res.data.audCny;
                this.productCategories = res.data.productCategories;
                this.recommend = {};
                for (var item in res.data.recommend) {
                    this.recommend[item] = res.data.recommend[item].map(element => {
                        return {
                            ...element,
                            amount: (element.amount / 100).toFixed(2),
                            vip_amount: (element.vip_amount / 100).toFixed(2),
                            aud_cny: (element.vip_amount / 100).toFixed(2),
                        };
                    });
                }
            }).catch((res) => {
            });
        });
    },
    methods: {
        goToProductDetailPage(id) {
            console.log(id);
            this.$router.push({
                path: '/product/detail/' + id,
            });
        },
        onSearch(keyword) {
            this.$router.push({
                path: '/search?keyword=' + keyword,
            });
        },
    },
    computed: {
        //
    }
};
</script>
