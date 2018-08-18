<template>
    <div class="favorite">
        <van-list v-model="loading" :finished="finished" @load="onLoad" v-if="favoriteData.length > 0">
            <div v-for="(item, index) in favoriteData" :key="index" v-if="item.showStatus > 0">
                <van-cell-swipe :right-width="100" :on-close="onClose" :data-index="index">
                    <van-card
                        :title="item.product.title"
                        :desc="item.product.title"
                        :price="item.amount"
                        currency="AU$"
                        :thumb="item.product.cover" />
                    <span slot="right">取消收藏</span>
                </van-cell-swipe>
            </div>
        </van-list>
        <div v-else class="no-data">
            暂无收藏
        </div>
    </div>
</template>

<script>
import { Card, CellSwipe, CellGroup, List, CheckboxGroup, Dialog } from 'vant';
import Vue from 'vue';
Vue.use(Card).use(CellSwipe)
    .use(CellGroup).use(List)
    .use(CheckboxGroup).use(Dialog);
export default {
    data() {
        return {
            favorite: [],
            loading: false,
            finished: true,
            page: 1,
        };
    },
    methods: {
        loadFavorite(params) {
            this.loading = true;
            this.finished = false;
            this.$axios.get('/api/favorite', { params: params }).then((res) => {
                res.data.data.forEach(element => {
                    element.showStatus = 1;
                    this.favorite.push(element);
                });
                this.loading = false;
                this.finished = true;
            });
        },
        removeFavorite(id, index) {
            this.$axios.delete('/api/favorite/' + id).then((res) => {
                this.favorite[index].showStatus = -1;
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
                        message: '确定取消收藏吗？'
                    }).then(() => {
                        this.removeFavorite(this.favorite[index].id, index);
                        instance.close();
                    });
                break;
            }
        },
        onLoad() {
            this.loadFavorite({
                page: ++this.page,
            });
        },
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadFavorite();
        });
    },
    computed: {
        favoriteData: function() {
            return this.favorite.map((element) => {
                return {
                    ...element,
                    amount: (element.product.amount / 100).toFixed(2),
                };
            });
        },
    },
};
</script>

<style lang="less">
.favorite {
    .van-cell-swipe__right {
        background-color: red;
        color: #ffffff;
        line-height: 100px;
        width: 100px;
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
