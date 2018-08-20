<template>
    <div class="order-list">
        <van-tabs v-model="active" @click="choiceOrderStatus">
            <van-tab v-for="(item, index) in tabConfig" :key="index" :title="item.title">
            </van-tab>
        </van-tabs>

        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="order-items" v-if="ordersData.length > 0">
                <div class="order-item" v-for="(order, index) in ordersData" :key="index" v-if="order.showStatus > -1">
                    <div class="order-no">{{order.order_no}}</div>
                    <div v-for="(item, idx) in order.items" :key="idx" class="item">
                        <van-card :title="item.title"
                            :desc="item.title"
                            :num="item.number"
                            currency="AU$"
                            :price="item.amount"
                            :thumb="item.product.cover"/>
                    </div>
                    <div class="total-amount">
                        合计：<span>AU$ {{order.total_amount}}</span>
                    </div>
                    <div class="btn-box" v-if="order.status === 1">
                        <van-button size="small" type="danger" plain @click="cancelOrder(index)">取消订单</van-button>
                        <van-button size="small" type="danger" plain @click="payment(index)">立即支付</van-button>
                    </div>
                </div>
            </div>
            <div v-else-if="emptyData" class="no-data">
                暂无数据
            </div>
        </van-list>
    </div>
</template>

<script>
import { Tabs, Tab, List, Card, Button } from 'vant';
import { OrderTabList } from '@/config/tabs';
import Vue from 'vue';
Vue.use(Tab).use(Tabs).use(List).use(Card).use(Button);
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
            emptyData: false,
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
                var items = element.items.map((ele) => {
                    return {
                        ...ele,
                        amount: (ele.amount / 100).toFixed(2),
                    };
                });
                return {
                    ...element,
                    total_amount: (element.total_amount / 100).toFixed(2),
                    items: items,
                };
            });
        },
    },
    methods: {
        loadOrders(params) {
            this.loading = true;
            this.finished = false;
            this.emptyData = false;
            this.$axios.get('/api/orders', { params: params }).then((res) => {
                if (params && params.page) {
                    this.orders = [];
                }
                res.data.data.forEach(element => {
                    element.showStatus = 1;
                    this.orders.push(element);
                });
                this.finished = true;
                this.loading = false;
                if (this.orders.length <= 0) {
                    this.emptyData = true;
                }
            });
        },
        onLoad() {
            this.loadOrders({
                page: ++this.page,
                status: this.status,
            });
        },
        choiceOrderStatus(index) {
            this.status = this.tabConfig[index].status;
            this.loadOrders({
                page: 1,
                status: this.status,
            });
        },
        cancelOrder(index) {
            this.orders[index].showStatus = -1;
            var items = this.orders.filter((element) => {
                return element.showStatus > 0;
            });
            console.log(items);
            if (items.length > 0) {
                this.emptyData = true;
            }
        }
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
.order-list {
    .order-items {
        .order-item {
            .order-no {
                margin-top: 5px;
                padding: 5px;
                background-color: #ffffff;
            }
            .item {
                .van-card {
                    border-bottom: 2px solid #ffffff;
                }
                .van-card::last-child {
                    border-bottom: none;
                }
            }
            .total-amount,
            .btn-box {
                background-color: #ffffff;
                padding: 5px;
            }
            .total-amount {
                text-align: right;
                border-bottom: 1px solid #efefef;
                padding-top: 10px;
                span {
                    color: red;
                }
            }
            .btn-box {
                text-align: right;
            }
        }
    }
}
</style>

