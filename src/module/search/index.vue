<style lang="less">

</style>

<template>
    <div>
        <div class="search-box">
            <van-search placeholder="请输入搜索商品" v-model="keyword" show-action @search="onSearch" @cancel="onCancel" />
            
            <div class="product-list">
                <div class="product-item" v-for="(product, key) in products" :key="key">
                    <div class="product-info">
                        <div class="product-image">
                            <img :src="item.cover" />
                        </div>
                        <div class="product-info">
                            <div class="product-title">
                                {{item.title}}
                            </div>
                            <div class="product-detail red">
                                <text class="dollar">$</text>
                                <text class="amount">{{common.filter(item.amount/100)}}</text>
                                <text class="sale">已有{{item.sale}}人购买</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Search } from 'vant';

export default {
    components: {
        [Search.name]: Search
    },
    data() {
        return {
            keyword: '',
            products: []
        };
    },
    methods: {
        onSearch() {

        },
        onCancel() {
            this.keyword = '';
        },
    },
    mounted() {

    },
    computed() {

    },
};
</script>
