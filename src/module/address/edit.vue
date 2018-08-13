<template>
    <div>
        <van-cell-group>
            <van-field v-model="value" placeholder="请输入用户名" />
        </van-cell-group>
    </div>
</template>

<script>
import { Field, CellGroup } from 'vant';
import Vue from 'vue';
Vue.use(Field);
Vue.use(CellGroup);
export default {
    data() {
        return {
            areaList: {},
            address: {},
            searchResult: [],
            addressId: 0,
        };
    },
    methods: {
        onSave() {

        },
        onDelete() {

        },
        onChangeDetail(val) {

        },
        loadAddressDetail(addressId) {
            this.$axios.get('/api/address/' + addressId).then((res) => {
                this.address = res.data;
            });
        },
        changArea() {

        },
    },
    mounted() {
        this.$nextTick((res) => {
            if (this.addressId) {
                this.loadAddressDetail(this.addressId);
            }
        });
    },
    created() {
        const query = this.$route.query;
        this.addressId = query.id;
    },
};
</script>

<style lang="less">

</style>
