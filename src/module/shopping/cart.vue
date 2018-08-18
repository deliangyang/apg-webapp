<template>
    <div class="shopping-cart">
        <div>
            <van-checkbox-group v-model="result">
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
    </div>
</template>

<script>
import { Card, CellSwipe, CellGroup, Row, Col, Checkbox, CheckboxGroup, Dialog } from 'vant';
import Vue from 'vue';
Vue.use(Card).use(CellSwipe)
    .use(CellGroup).use(Row)
    .use(Col).use(Checkbox)
    .use(CheckboxGroup).use(Dialog);
export default {
    data() {
        return {
            shoppingCarts: [],
            result: [],
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
