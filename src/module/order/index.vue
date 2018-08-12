<template>
    <div>
        <van-tabs v-model="active">
            <van-tab v-for="(item, index) in tabConfig" :key="index" :title="item.title">
                <div>
                </div>
            </van-tab>
        </van-tabs>

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
    </div>
</template>

<script>
import { OrderTabList } from '@/config/tabs';
export default {
    data() {
        return {
            tabConfig: OrderTabList,
            active: 0,
            orders: [],
        };
    },
    computed: {
        ordersData: function() {
            return this.orders.map((element) => {
                return {
                    ...element,
                    amount: (element.amount / 100).toFixed(2),
                };
            });
        },
    },
    methods: {
        loadOrders(query) {
            this.$axios.get('/api/orders', { params: query }).then((res) => {
                res.data.data.forEach(element => {
                    this.orders.push(element);
                });
            });
        }
    },
    created() {

    },
    mounted() {
        this.$nextTick((res) => {
            this.loadOrders({});
        });
    },
};
</script>

<style lang="less">

</style>

