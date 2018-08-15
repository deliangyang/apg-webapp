<template>
    <div>
        <div class="swiper">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in product.images" :key="index">
                    <img v-lazy="image.src" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="sku-box">
            <van-sku v-model="showBase"
                :sku="sku"
                :goods="product"
                :goods-id="productId"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked">
                <template slot="sku-header-price" slot-scope="props">
                    <div class="van-sku__goods-price">
                    <span class="van-sku__price-symbol">AU$ </span><span class="van-sku__price-num">{{ props.price }}</span>
                    </div>
                </template>
                <!-- 自定义 sku actions -->
                <template slot="sku-actions" slot-scope="props">
                    <div class="van-sku-actions">
                    <van-button bottom-action @click="onPointClicked">积分兑换</van-button>
                    <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
                    <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">买买买</van-button>
                    </div>
                </template>
            </van-sku>
        </div>

        <van-goods-action>
            <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickService" />
            <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickShoppingCart" />
            <van-goods-action-big-btn text="加入购物车" @click="onClickAddToShoppingCart" />
            <van-goods-action-big-btn text="立即购买" @click="onClickPurchase" primary />
        </van-goods-action>
    </div>
</template>

<script>
import { Icon, Swipe, SwipeItem, Row, Col, Sku, Button,
GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn } from 'vant';
export default {
    components: {
        [Icon.name]: Icon,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Row.name]: Row,
        [Button.name]: Button,
        [Col.name]: Col,
        [Sku.name]: Sku,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionBigBtn.name]: GoodsActionBigBtn,
        [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    },
    data() {
        return {
            showBase: false,
            productId: 0,
            active: 1,
            product: {},
            goods: {},
            sku: {
                tree: [
                    {
                        k: '颜色', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '30349', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                            },
                            {
                                id: '1215',
                                name: '蓝色',
                                imgUrl: 'https://img.yzcdn.cn/2.jpg'
                            }
                        ],
                        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    }
                ],
                list: [
                    {
                        id: 2259, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 110 // 当前 sku 组合对应的库存
                    }
                ],
                price: '1.00', // 默认价格（单位元）
                stock_num: 227, // 商品总库存
                collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                messages: [],
                hide_stock: false // 是否隐藏剩余库存
            }
        };
    },
    methods: {
        loadProducts(id) {
            this.$axios.get('/api/products/' + id).then((res) => {
                this.product = res.data;
                this.sku.none_sku = this.product.skus.length > 0;
                this.sku.price = (this.product.amount / 100).toFixed(2);
                this.sku.stock_num = this.product.stock;
                this.goods = {
                    title: this.product.title,
                    picture: this.product.cover,
                };
                this.sku.tree = this.product.skus.map((element) => {
                    return {
                        k: element.title,
                        v: [],
                        k_s: '',
                    };
                });
                this.sku.list = this.product.skus.map((element) => {
                    return {

                    };
                });
            });
        },
        onClickService() {

        },
        onClickShoppingCart() {
            console.log(this.showBase);
            if (this.product.skus.length) {
                //
            } else {
                //
            }
        },
        onClickAddToShoppingCart() {
            this.showBase = true;
        },
        onClickPurchase() {

        },
        onBuyClicked() {

        },
        onAddCartClicked() {

        },
    },
    created() {
        const params = this.$route.params;
        this.productId = params.id;
    },
    mounted() {
        this.$nextTick((res) => {
            if (this.productId > 0) {
                this.loadProducts(this.productId);
            }
        });
    },
};
</script>

<style lang="less">
.swiper {
    img {
        height: 240px;
    }
}
</style>
