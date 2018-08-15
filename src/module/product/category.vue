<template>
    <div class="category-box">
        <van-tabs v-model="active" @click="choiceCategory">
            <van-tab v-for="(category, index) in categories" :key="index" :title="category.name">
                <van-list v-if="products.length > 0" v-model="loading" :finished="finished" @load="onLoad" class="category-list">
                    <van-row>
                        <div class="recommend">
                            <van-col span="12" v-for="(item, index) in productsData" :key="index">
                                <div :class="index % 2 === 1 ? 'recommend-item recommend-item-1' : 'recommend-item recommend-item-2'"
                                    v-on:click="goToProductDetailPage(item.id)">
                                    <div class="image-box">
                                        <img :src="item.cover" v-lazy="img"/>
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
                </van-list>
                <div v-else class="no-data">
                    暂无数据
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, List, Row, Col } from 'vant';
import Vue from 'vue';

Vue.use(Tab).use(Tabs).use(List).use(Row).use(Col);
export default {
    data() {
        return {
            categoryId: 0,
            active: 0,
            categories: [],
            loading: false,
            finished: true,
            products: [],
        };
    },
    created() {
        this.categoryId = parseInt(this.$route.params.id);
    },
    methods: {
        loadCategory(pid) {
            pid = pid || 0;
            this.$axios.get('/api/product/category', { params: { pid: pid }}).then((res) => {
                this.categories.push({
                    name: '全部',
                    pid: 0,
                });
                let index = 0;
                res.data.data.forEach((element) => {
                    index++;
                    this.categories.push(element);
                    if (element.id === this.categoryId) {
                        this.active = index;
                    }
                });
            });
        },
        locadProducts(params) {
            this.$axios.get('/api/products', { params: params }).then((res) => {
                if (params && params.page && params.page === 1) {
                    this.products = [];
                }
                res.data.product.data.forEach(element => {
                    this.products.push(element);
                });
            });
        },
        onLoad() {

        },
        choiceCategory(index, title) {
            this.locadProducts({
                page: 1,
                pid: this.categories[index].id,
            });
        },
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadCategory();
            const params = {
                page: 1,
            };
            if (this.categoryId > 0) {
                params['pid'] = this.categoryId;
            }
            this.locadProducts(params);
        });
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

<style lang="less">
.category-box {
    .category-list {
        margin-top: 10px;
    }
}
</style>

