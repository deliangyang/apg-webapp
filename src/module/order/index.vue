<template>
    <div>
        <van-tabs v-model="active">
            <van-tab v-for="(item, index) in tabConfig" :key="index" :title="item.title">
                <div>
                </div>
            </van-tab>
        </van-tabs>

        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="order-items">
                <div class="order-item" v-for="(order, index) in ordersData" :key="index">
                    <div>{{order.order_no}}</div>
                    <van-card :title="order.title"
                        :desc="order.title"
                        :num="order.number"
                        :price="order.amount"
                        :thumb="order.product.cover"/>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
import { Tabs, Tab, List } from 'vant';
import { OrderTabList } from '@/config/tabs';
import Vue from 'vue';
Vue.use(Tab).use(Tabs).use(List);
export default {
    data() {
        return {
            tabConfig: OrderTabList,
            orders: [],
            loading: false,
            finished: true,
            page: 1,
            status: 'all',
            active: 0,
        };
    },
    created() {
        const status = this.$route.query.status;
        if (status) {
            this.status = status;
        }
    },
    computed: {
        ordersData: function() {
            return this.orders.map((element) => {
                return {
                    ...element,
                    amount: (element.total_amount / 100).toFixed(2),
                };
            });
        },
    },
    methods: {
        loadOrders(params) {
            this.loading = true;
            this.finished = false;
            this.$axios.get('/api/orders', { params: params }).then((res) => {
                if (params && params.page) {
                    this.orders = [];
                }
                res.data.data.forEach(element => {
                    this.orders.push(element);
                });
                this.finished = true;
                this.loading = false;
            });
        },
        onLoad() {
            this.loadOrders({
                page: ++this.page,
                status: this.status,
            });
        },
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadOrders({});
            var index = 0;
            this.tabConfig.forEach((element) => {
                if (element.status === this.status) {
                    this.active = index;
                }
                index++;
            });
        });
    },
};
</script>

<style lang="less">

</style>

