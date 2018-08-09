<template>
    <div class="coupon-container">
        <van-tabs v-model="active">
            <van-tab v-for="(item, index) in tabConfig" :key="index" :title="item.title">
                <div>
                </div>
            </van-tab>
        </van-tabs>

        <div class="coupons">
            <div class="coupon" v-for="(coupon, index) in couponsData" :key="index">
                <zan-row>
                    <zan-col col="6">
                        <div class="discount-icon-box">
                            <zan-icon class="discount-icon" type="discount"></zan-icon>
                        </div>
                    </zan-col>
                    <zan-col col="18">
                        <div>
                            <div class="coupon-name">
                                <span>{{item.coupon.name}}</span>
                            </div>
                            <div class="discount">
                                <span class="currency">￥</span>
                                <span>{{item.coupon.discount}}</span>
                            </div>
                            <div class="coupon-valid-time">
                                {{item.coupon.start_at}} 至 {{item.coupon.expire_at}}
                            </div>
                        </div>
                    </zan-col>
                </zan-row>
            </div>
            <div v-if="coupons.length<=0" class="non-coupons">
                <span>无优惠券~</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
export default {
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs
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
            return [];
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
        padding: 10px 20px;
        .coupon {
            padding: 20px;
            margin: 20px 0;
            background-color: #ffffff;
            border-radius: 20px;
            box-shadow: 0 0 20px #ccc;
            .coupon-valid-time {
                font-size: 24px;
                text-align: right;
                color: #666;
            }
            .discount-icon-box {
                text-align: center;
                .discount-icon {
                    margin-top: 24px;
                    font-size: 90px;
                    display: inline-block;
                    color: #FB444B;
                }
            }
            .discount-name {
                font-size: 40px;
                color: #333;
            }
            .discount {
                font-size: 80px;
                color: #FB444B;
                .currency {
                    font-size: 40px;
                }
            }
        }
    }
    .non-coupons {
        text-align: center;
        margin-top: 60px;
        font-size: 32px;
        color: #999;
    }
}
</style>