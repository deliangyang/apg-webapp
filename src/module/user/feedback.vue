<template>
    <div class="feedback-index">
        <van-cell-group>
            <van-field label="问题" v-model="feedback.title" placeholder="请输入问题" />
            <van-field label="联系方式" v-model="feedback.contact" placeholder="请输入联系方式" />
            <van-field label="内容" v-model="feedback.content" type="textarea" placeholder="请输入内容" />
        </van-cell-group>

        <div class="btn-feedback">
            <van-button type="primary" @click="addFeedbackClick">反馈</van-button>
        </div>
    </div>
</template>

<script>
import { Field, Button, CellGroup } from 'vant';
import Vue from 'vue';
Vue.use(Field).use(Button).use(CellGroup);
export default {
    data() {
        return {
            feedback: {},
        };
    },
    created() {

    },
    methods: {
        addFeedback(feedback) {
            this.$axios.post('/api/feedback', feedback).then((res) => {
                this.$router.push({
                    path: '/user/index',
                });
            });
        },
        addFeedbackClick() {
            this.addFeedback(this.feedback);
        }
    },
    mounted() {
    },
    computed: {

    }
};
</script>

<style lang="less">
.btn-feedback {
    padding: 20px;
    text-align: center;
    .van-button.van-button--primary {
        width: 100%;
    }
}
</style>
