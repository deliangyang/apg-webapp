<template>
    <div class="shopping-cart">
        <div>
            <van-checkbox-group v-model="result" @change="shoppingCartsChanged">
                <div v-for="(shopping, index) in shoppingCartData" :key="index" v-if="shopping.showStatus > 0">
                    <van-cell-swipe :right-width="60" :on-close="onClose" :data-index="index">
                        <van-cell-group>
                            <van-row>
                                <van-col span="2" class="check-box">
                                    <van-checkbox :name="index" :key="index"></van-checkbox>
                                </van-col>
                                <van-col span="22">
                                    <van-card
                                        :title="shopping.product.title"
                                        :desc="shopping.product.title"
                                        :num="shopping.number"
                                        :price="shopping.amount"
                                        currency="AU$"
                                        :thumb="shopping.product.cover" />
                                </van-col>
                            </van-row>
                        </van-cell-group>
                        <span slot="right">删除</span>
                    </van-cell-swipe>
                </div>
            </van-checkbox-group>
        </div>

        <van-submit-bar :price="total" button-text="提交订单" currency="AU$ " @submit="onSubmit">
            <van-checkbox v-model="checkedTotal" @change="choiceAll">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
import { Card, CellSwipe, CellGroup, Row, Col, Checkbox, CheckboxGroup, Dialog, SubmitBar, Toast } from 'vant';
import Vue from 'vue';
Vue.use(Card).use(CellSwipe)
    .use(CellGroup).use(Row)
    .use(Col).use(Checkbox)
    .use(SubmitBar)
    .use(CheckboxGroup).use(Dialog);
export default {
    data() {
        return {
            shoppingCarts: [],
            result: [],
            checkedTotal: false,
            total: 0,
        };
    },
    methods: {
        loadShoppingCart() {
            this.$axios.get('/api/shopping/cart').then((res) => {
                res.data.forEach(element => {
                    element.showStatus = 1;
                });
                this.shoppingCarts = res.data;
            });
        },
        onClose(clickPosition, instance) {
            console.log(clickPosition, instance);
            switch (clickPosition) {
                case 'left':
                case 'cell':
                case 'outside':
                    instance.close();
                    break;
                case 'right':
                    var index = instance.$el.dataset.index;
                    Dialog.confirm({
                        message: '确定删除吗？' + index
                    }).then(() => {
                        instance.close();
                    });
                break;
            }
        },
        onSubmit() {
            var shoppingCartIds = [];
            this.result.forEach((element) => {
                shoppingCartIds.push(this.shoppingCarts[element].id);
            });
            if (shoppingCartIds.length <= 0) {
                Toast('购物车不能为空');
                return false;
            }
            this.$router.push({
                path: '/order/confirm?ids=' + shoppingCartIds.join(','),
            });
        },
        shoppingCartsChanged() {
            this.shoppingCarts.forEach((element) => {
                element.checked = false;
            });
            this.total = 0;
            this.result.forEach((element) => {
                this.shoppingCarts[element].checked = true;
                this.total += this.shoppingCarts[element].amount;
            });

            if (this.result.length === this.shoppingCarts.length && this.result.length > 0) {
                this.checkedTotal = true;
            } else {
                this.checkedTotal = false;
            }
        },
        choiceAll() {
            if (this.checkedTotal) {
                var index = 0;
                this.result = [];
                this.total = 0;
                this.shoppingCarts.forEach((element) => {
                    element.checked = true;
                    this.total += element.amount;
                    this.result.push(index++);
                });
            }
        }
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadShoppingCart();
        });
    },
    computed: {
        shoppingCartData: function() {
            return this.shoppingCarts.map((element) => {
                return {
                    ...element,
                    amount: (element.amount / 100).toFixed(2),
                };
            });
        },
    },
};
</script>

<style lang="less">
.shopping-cart {
    .van-cell-swipe__right {
        background-color: red;
        color: #ffffff;
        line-height: 100px;
        width: 60px;
        text-align: center;
    }
    .check-box {
        line-height: 100px;
        text-align: center;
        background-color: #fafafa;
        .van-checkbox__icon--checked .van-icon {
            background-color: red;
            border-color: red;
        }
    }
}
</style>
