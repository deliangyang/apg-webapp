<template>
    <div>
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            :address-info="address"
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            areaList,
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
        }
    },
    mounted() {
        this.$nextTick((res) => {
            if (this.addressId) {
                this.loadAddressDetail(this.addressId);
            }
        })
    },
    created() {
        let query = this.$router.query
        this.addressId = query.id
    }

}
</script>

<style lang="less">

</style>
