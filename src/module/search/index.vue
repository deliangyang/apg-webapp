<style lang="less">

</style>

<template>
    <div>
        <div class="search-box">
            <van-search placeholder="请输入搜索商品" v-model="keyword" @search="onSearch" />
        </div>
        <div>
            <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad" >
                    <div class="recommend">
                        <van-col span="12" v-for="(item, index) in productsData" :key="index">
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
                </van-list>
            </van-row>
        </div>
    </div>
</template>

<script>
import { Search, Row, Col, List } from 'vant';

export default {
    components: {
        [Search.name]: Search,
        [Row.name]: Row,
        [Col.name]: Col,
        [List.name]: List
    },
    data() {
        return {
            keyword: '',
            products: []
        };
    },
    methods: {
        onSearch(keyword) {
            this.searchProducts({
                keywords: keyword,
                page: 1,
            });
        },
        onCancel() {
            this.keyword = '';
        },
        searchProducts(params) {
            this.$axios.get('/api/search', { params: params }).then((res) => {
                if (params && params.page === 1) {
                    this.products = [];
                }
                res.data.data.forEach(element => {
                    this.products.push(element);
                });
            });
        },
        goToProductDetailPage(id) {
            this.$router.push({
                path: '/product/detail/' + id,
            });
        },
    },
    created() {
        this.keyword = this.$route.query.keyword;
        this.searchProducts({
            keywords: this.keyword,
            page: 1,
        });
    },
    mounted() {

    },
    computed: {
        productsData: function() {
            return this.products.map((element) => {
                return {
                    ...element,
                    amount: (element.amount / 100).toFixed(2),
                    vip_amount: (element.vip_amount / 100).toFixed(2),
                    aud_cny: (element.vip_amount / 100).toFixed(2),
                };
            });
        },
    },
};
</script>
