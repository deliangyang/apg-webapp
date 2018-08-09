<style lang="less">

</style>

<template>
    <div class="index-box">
       <van-notice-bar
        background="#9767C9"
        color="#ffffff"
        text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        left-icon=" "/>

        <div class="swiper">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in imageUrls" :key="index">
                    <img v-lazy="image" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="search-box">
            <div class="search-item">
                <input type="text" confirm-type="search" placeholder="搜索商品"
                    :focus="search.focus"
                    :value="keywords"/>
            </div>
        </div>

        <div class="category">
            <div class="category-item" v-for="(item, index) in categories" :key="index">
                <div>
                    <img :src="item.image" />
                </div>
                <div>
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>

        <div class="ad-show">
            <div class="ad-left">
                <div>
                    <img src="@/images/1_25.gif" />
                </div>
            </div>
            <div class="ad-right">
                <div>
                    <img src="@/images/1_22.gif" />
                </div>
                <div>
                    <img src="@/images/1_26.gif" />
                </div>
            </div>
        </div>

        <div class="product-list" v-for="(item, index) in productCategoriesData" :key="index">
            <div class="category">
                {{category.name}}
                <image src="@/images/1_22.png" />
            </div>
            <div class="recommend">
                <div class="recommend-item" v-for="(item, index) in recommend[category.id]" :key="index">
                    <div class="image-box">
                        <image :src="item.cover" />
                    </div>
                    <div class="product-title">
                        <text>{{item.title}}</text>
                    </div>
                    <div class="product-amount">
                        <text class="origin-amount">AU${{common.filter(item.amount)}}</text>
                        <text class="vip-amount">AU${{common.vip_amount(item, userType)}}</text>
                        <text class="aud_cny">(约￥{{common.aud_cny(item, userType, audCny)}})</text>
                    </div>
                    <div class="tag-info">
                        <div v-if="item.is_hot" class="hot">畅销</div>
                        <div v-if="item.tag" class="tag">{{item.tag}}</div>
                    </div>
                </div>
            </div>
        </div>
        <button class="chat-service" open-type="contact">进入客服会话</button>
    </div>
</template>

<script>
import { Icon, NoticeBar, Swipe, SwipeItem } from 'vant';
export default {
    components: {
        [NoticeBar.name]: NoticeBar,
        [Icon.name]: Icon,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    data() {
        return {
            current: '/pages/index',
            hot: [],
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
        this.$axios.get('/api/boot').then((res) => {
            this.imageUrls = res.data.swiper;
            this.categories = res.data.categories;
            this.recommend = res.data.recommend;
            this.hot = res.data.hot;
            this.sysNotice = res.data.sysNotice;
            this.sysNoticeInterval = res.data.sysNoticeInterval;
            this.audCny = res.data.audCny;
            this.productCategories = res.data.productCategories;
        }).catch((res) => {
        });
    },

    computed: {
        productCategoriesData: function() {
            return this.productCategories;
        }
    }
};
</script>
