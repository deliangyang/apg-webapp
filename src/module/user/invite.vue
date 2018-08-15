<template>
    <div class="my-invite-code">
        <div class="canvas">
            <canvas id="invite-code-image"></canvas>
        </div>
        <div class="btn-download">
            <van-button plain>下载推荐码</van-button>
        </div>
    </div>
</template>

<script>
import { Button } from 'vant';
import Vue from 'vue';
Vue.use(Button);
export default {
    data() {
        return {
            code: '',
            qrCode: '',
        };
    },
    mounted() {
        this.$nextTick((res) => {
            this.getMyInviteCode();
        });
    },
    methods: {
        getMyInviteCode() {
            this.$axios.get('/api/invite/code/show').then((res) => {
                this.code = res.data;
                this.qrCode = res.data.qr_code;
                this.drawImage();
            }).catch((res) => {
            });
        },
        drawImage() {
           try {
                var canvas = document.getElementById('invite-code-image');
                var context = canvas.getContext('2d');
                console.log(canvas);

                const WIDTH = 160;
                const HEIGHT = 160;
                context.rect(0, 0, 320, 480);
                context.fillStyle = 'white';
                context.fill();
                context.font = '16px';
                var img = new Image();
                img.src = this.qrCode;
                context.drawImage(img, 80, 20, WIDTH, HEIGHT);
                context.font = '16px';
                context.fillStyle = '#666';
                context.fillText('我的推荐码', 60, 260);
                context.font = '24px';
                context.fillStyle = '#9768C9';
                context.fillText(this.code.code, 150, 260);
                context.font = '16px';
                context.fillStyle = '#999999';
                context.fillText('扫描或长按小程序码', 110, 195);
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>

<style lang="less">
.my-invite-code {
    width: 100%;
    .canvas {
        margin: 20px 15px;
        padding: 10px;
        box-shadow: 0 0 15px #cccccc;
        background-color: #ffffff;
        border-radius: 10px;
        text-align: center;
        canvas {
            width: 320px;
            height: 320px;
        }
    }
    .btn-download {
        text-align: center;
        padding: 20px 10px;
        button {
            width: 100%;
            color: #9768C9;
            border-color: #9768C9;
        }
    }
}
</style>