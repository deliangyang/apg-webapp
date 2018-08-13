<template>
    <div class="user-index">
        <div class="user-box">
            <img src="@/images/user-bg-image.png" alt="">
            <div class="user-info">
                <img :src="user.avatar" alt="">
                <div class="nickname">{{user.nickname}}</div>
            </div>
        </div>

        <div class="orders">
            <van-cell-group>
                <van-cell title="我的订单" is-link value="查看全部订单" url="/#/order/index" />
            </van-cell-group>
            <van-row class="order-status">
                <van-col span="6">
                    <router-link to="/order/index">
                        <van-icon name="pending-payment" />
                        <div>待付款</div>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/order/index">
                        <van-icon name="pending-deliver" />
                        <div>待发货</div>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/order/index">
                        <van-icon name="tosend" />
                        <div>已发货</div>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/order/index">
                        <van-icon name="completed" />
                        <div>已完成</div>
                    </router-link>
                </van-col>
            </van-row>
        </div>

        <div class="user-counter">
            <van-row class="counters">
                <van-col span="6">
                    <router-link to="/user/conch">
                        <div>{{user.conch || 0}}</div>
                        <div>贝壳</div>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/user/coupon">
                        <div>{{user.coupon || 0}}张</div>
                        <div>优惠券</div>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/user/integral">
                        <div>{{user.integral || 0}}</div>
                        <div>经验值</div>
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/user/invite">
                        <img src="@/images/qr_code.png" alt="">
                        <div>推荐码</div>
                    </router-link>
                </van-col>
            </van-row>
        </div>

        <div class="user-attr">
            <van-cell-group>
                <van-cell title="我的优惠券" is-link url="/#/user/coupon"/>
                <van-cell title="我的收藏" is-link url="/#/user/favorite"/>
                <van-cell title="推荐码" is-link url="/#/user/invite"/>
                <van-cell title="意见反馈" is-link url="/#/user/feedback"/>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { Icon, Row, Col, Cell, CellGroup } from 'vant';
import Vue from 'vue';
Vue.use(Icon).use(Row).use(Col).use(Cell).use(CellGroup);
export default {
    data() {
        return {
            user: {},
        };
    },
    created() {

    },
    methods: {
        loadUserInfo() {
            this.$axios.get('/api/user').then((res) => {
                this.user = res.data;
            });
        }
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadUserInfo();
        });
    },
    computed: {

    }
};
</script>

<style lang="less">
.user-index {
    a {
        color: #333;
    }
    .user-box {
        position: relative;
        img {
            width: 100%;
        }
        .user-info {
            width: 100%;
            top: 30px;
            position: absolute;
            text-align: center;
            img {
                height: 80px;
                width: 80px;
                border-radius: 50%;
                box-shadow: 0 0 5px #cccccc;
            }
            .nickname {
                margin-top: 15px;
            }
        }
    }
    .orders {
        .order-status {
            text-align: center;
            background-color: #ffffff;
            padding: 10px 0;
            i.van-icon {
                color: #9768C9;
                font-size: 32px;
            }
        }
    }
    .user-counter {
        margin-top: 5px;
        background-color: #ffffff;
        padding: 10px 0;
        text-align: center;
        .counters {
            img {
                height: 20px;
                width: 20px;
                font-size: 0;
            }
            .van-col {
                div:first-child {
                    height: 24px;
                    line-height: 24px;
                }
            }
        }
    }
    .user-attr {
        margin-top: 5px;
    }
}
</style>
