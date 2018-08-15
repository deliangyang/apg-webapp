<template>
    <div class="integral-box">
        <div class="mime-integral-title">您当前的等级是：</div>
        <div class="image-box">
            <div class="show">
                <img src="@/images/7_03.png" />
                <div>{{currentIntegral.name}}</div>
            </div>
            <div>
                <img src="@/images/7_06.png" />
                <div>{{currentIntegral.name}}</div>
            </div>
            <div>
                <img src="@/images/7_08.png" />
                <div>{{currentIntegral.name}}</div>
            </div>
            <div>
                <img src="@/images/7_10.png" />
                <div>{{currentIntegral.name}}</div>
            </div>
        </div>
        <div class="integral-progress">
            <div class="progress" :style="'width:' + width + '%'"></div>
        </div>
        <div class="integral-description">
            <div>经验值：<span>{{integral}}</span></div>
            <div v-if="nextIntegral.integral">还差{{nextIntegral.integral - integral}}就可以升级成{{nextIntegral.name}}啦，加油哦！</div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            integral: 0,
            nextIntegral: {},
            currentIntegral: {}
        };
    },
    computed: {
        width: function() {
            let integral = 0;
            if (this.nextIntegral.integral) {
                integral = this.nextIntegral.integral - this.currentIntegral.integral;
            } else {
                return 0;
            }
            return Math.ceil(this.integral / integral);
        }
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadUserIntegral();
        });
    },
    methods: {
        loadUserIntegral() {
            this.$axios.get('/api/user/integral').then((res) => {
                this.currentIntegral = res.data.currentIntegral;
                this.nextIntegral = res.data.nextIntegral;
                this.integral = res.data.integral;
            });
        },
    },
};
</script>

<style lang="less">
.integral-box {
    margin: 35px 60px;
    widows: 100%;
    .mime-integral-title {
        font-size: 12px;
        color: #666666;
    }
    .integral-description {
        text-align: left;
        font-size: 10px;
        color: #444444;
    }
    .image-box {
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        width: 25%;
        .show {
            padding: 0 10px 5px 10px;
            font-size: 15px;
            color: #9961ce;
            text-align: center;
            img {
                width: 110px;
                height: 90px;
            }
        }
        &>div {
            padding: 66px 5px 5px 5px;
            font-size: 0;
            img {
                width: 30px;
                height: 24px;
            }
        }
    }
    .integral-progress {
        background-color: #C2C2C2;
        width: 100%;
        height: 4px;
        margin: 25px 0;
        position: relative;
        .progress {
            height: 4px;
            top: 0;
            left: 0;
            background-color: #9961ce;
            position: absolute;
            z-index: 10;
        }
        &:after {
            content: ' ';
            position: absolute;
            width: 10px;
            height: 10px;
            right: -4px;
            top: -3px;
            border-radius: 50%;
            background-color: #e1a400;
        }
    }
}
</style>
