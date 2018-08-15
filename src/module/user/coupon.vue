<template>
    <div class="coupon-container">
        <van-tabs v-model="active">
            <van-tab v-for="(item, index) in tabConfig" :key="index" :title="item.title">
                <div>
                </div>
            </van-tab>
        </van-tabs>

        <div class="coupons">
            <div class="coupon" v-for="(item, index) in couponsData" :key="index">
                <div class="coupon-header">
                    <div class="amount-info">
                        <span class="flag">AU$</span>
                        <span class="amount">{{item.discount}}</span>
                    </div>
                    <div class="amount-fill-up">
                        <div>{{item.coupon.name}}</div>
                        <div>(满${{item.fill_up}}可以使用)</div>
                    </div>
                    <div class="btn-suit-product">
                        <button type="default" plain="true" size="mini">适用商品</button>
                    </div>
                </div>
                <div class="coupon-info">
                    <div>有效期：{{item.coupon.start_at}} ~ {{item.coupon.expire_at}}</div>
                    <div>适用范围：{{item.coupon.description}}</div>
                </div>
            </div>
            <div v-if="coupons.length<=0" class="no-data">
                <span>无优惠券~</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Tab, Tabs, Row, Col, Button } from 'vant';
export default {
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Row.name]: Row,
        [Col.name]: Col,
        [Button.name]: Button,
    },
    data() {
        return {
            active: 0,
            coupons: [],
            nextPage: 1,
            status: 0,
            isHideLoadMore: false,
            tabConfig: [
                {
                    title: '未使用',
                },
                {
                    title: '已使用',
                },
                {
                    title: '已过期',
                },
            ],
        };
    },
    methods: {
        getMyCoupons() {
            this.$axios.get('/api/user/coupon').then((res) => {
                this.coupons = res.data.data;
            });
        },
    },
    created() {
    },
    computed: {
        couponsData: function() {
            return this.coupons.map((element) => {
                return {
                    ...element,
                    fill_up: (element.coupon.fill_up / 100).toFixed(2),
                    discount: (element.coupon.discount / 100).toFixed(2),
                };
            });
        }
    },
    mounted() {
        this.$nextTick((res) => {
            this.getMyCoupons();
        });
    }
};
</script>

<style lang="less">
.coupon-container {
    .coupons {
        .coupon::before {
            content: ' ';
            position: absolute;
            height: 30px;
            width: 15px;
            left: 0;
            top: 55px;
            background-color: #EFEFEF;
            border-radius: 0 15px 15px 0;
        }
        .coupon::after {
            content: ' ';
            position: absolute;
            height: 30px;
            width: 15px;
            right: 0;
            top: 50px;
            background-color: #EFEFEF;
            border-radius: 15px 0 0 15px;
        }
        .coupon {
            position: relative;
            margin-top: 10px;
            padding: 15px 5px 15px 16px;
            background-color: #ffffff;
            .coupon-header {
                display: flex;
                flex-direction: row;
                margin-bottom: 10px;
                .amount-info {
                    width: 36%;
                    text {
                        color: #9961ce;
                        font-size: 17px;
                    }
                    .amount {
                        font-size: 30px;
                    }
                }
                .amount-fill-up {
                    width: 40%;
                    font-size: 15px;
                    color: #000000;
                }
                .btn-suit-product {
                    width: 20%;
                    text-align: right;
                    button {
                        margin-top: 10px;
                        font-size: 10px;
                        color: #9961ce;
                        background-color: #ffffff;
                        border-color: #9961ce;
                    }
                }
            }
            .coupon-info {
                border-top: 1px #AAAAAA dashed;
                padding-top: 12px;
                font-size: 10px;
                color: #666666;
            }
        }
    }
    .non-coupons {
        text-align: center;
        margin-top: 30px;
        font-size: 16px;
        color: #999;
    }
}
</style>