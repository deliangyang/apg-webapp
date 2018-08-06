<style lang="less">

</style>

<template>
    <div class="header">hello world</div>
</template>

<script>
export default {
    created() {
        console.log(this);
        this.$axios.get('/api/boot').then((res) => {
            console.log(res);
        }).catch((res) => {
            console.log(res);
        });
    }
};
</script>
