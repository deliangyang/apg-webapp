<template>
    <div>
        <van-list v-model="loading" :finished="finished" @load="onLoad" >
        </van-list>
    </div>
</template>

<script>
import { List } from 'vant';
import Vue from 'vue';
Vue.use(List);

export default {
    data() {
        return {
            finished: false,
            loading: false,
        };
    },
    methods: {
        onLoad() {

        },
    },
};
</script>
