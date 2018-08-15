<template>
    <div class="conch-box">
        <div class="user-conch">
            <div class="total-title">我当前的贝壳总数：</div>
            <div class="conch-info">
                <span class="conch">{{ conch }}</span>
                <span class="conch-unit">个</span>
            </div>
            <div class="info">100贝壳=1元澳币</div>
            <div class="info">无门槛使用，可以提现 | <span class="intro">说明</span></div>
        </div>
        <div class="income">
            <div class="income-title">贝壳收支明细</div>
            <div class="income-list">
                <div class="income-item" v-for="(item, index) in conchDetail" :key="index">
                    <div v-if="item.type === 1" class="conch-income">
                        <div class="date">{{item.date}}</div>
                        <div class="remarks">{{item.remarks}}</div>
                        <div class="conch-amount">+{{item.amount}}</div>
                    </div>
                    <div wx:else class="conch-consume">
                        <div class="date">{{item.date}}</div>
                        <div class="remarks">{{item.remarks}}</div>
                        <div class="conch-amount">-{{item.amount}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            conch: 0,
            conchDetail: [],
        };
    },
    methods: {
        loadUserConch() {
            this.$axios.get('/api/user/conch').then((res) => {
                this.conchDetail = res.data;
            });
        },
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadUserConch();
        });
    },
};
</script>

<style lang="less">
.conch-box {
    border-top: 1px solid #EFEFEF;
    background-color: #EFEFEF;
    height: 100%;
}
.user-conch {
    margin-bottom: 20px;
    border-bottom: 1px solid #eeeeee;
    background-color: #ffffff;
    padding: 20px;
    .total-title {
        color: #363636;
        font-size: 16px;
    }
    .conch-info {
        text-align: center;
        margin: 12px 0;
        .conch {
            font-size: 30px;
            color: #9961ce;
        }
        .conch-unit {
            font-size: 16px;
        }
    }
    .info {
        text-align: center;
        color: #5b5b5b;
        font-size: 12px;
        padding: 5px;
        .intro {
            color: #000000;
        }
    }
}
.income {
    height: 100%;
    background-color: #EFEFEF; 
    .income-title {
        padding-left: 10px;
        margin: 12px 20px;
        font-size: 12px;
        border-left: 4px solid #a372d3;
    }
    .income-list {
        padding: 10px 30px;
        border-top: 1px solid #BABABA;
        .income-item {
            .conch-consume,
            .conch-income {
                width: 100%;
                display: flex;
                flex-direction: row;
                font-size: 12px;
                view {
                    height: 16px;
                    line-height: 16px;
                    width: 30%;
                }
                .remarks {
                    width: 40%
                }
                .conch-amount {
                    width: 30%;
                    text-align: right;
                }
            }
            .conch-consume {
                color: #92A280;
            }
            .conch-income {
                color: #CD8A96;
            }
        }
    }
}

</style>
