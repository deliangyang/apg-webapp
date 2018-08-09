<template>
    <div>
        <van-address-list v-model="chosenAddressId" :list="list" @add="onAddAddress" @edit="onEditAddress"/>
    </div>
</template>

<script>
import { AddressList } from 'vant';

export default {
    components: {
        [AddressList.name]: AddressList,
    },
    data() {
        return {
            list: [],
        };
    },
    methods: {
        onAddAddress() {

        },
        onEditAddress(item, index) {

        },
        loadAddress() {
            this.$axios.get('/api/address').then((res) => {
                this.list = res.data
            });
        }
    },
    computed: {
        chosenAddressId: function() {
            return 0;
        },
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadAddress();
        });
    },
};
</script>

<style lang="less">

</style>
