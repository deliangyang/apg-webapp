<template>
    
</template>

<script>

export default {
    created() {

    },
    methods: {
        login() {
            this.$axios.get('/api/wx/h5/login').then((res) => {
                this.$localStorage.set('Authorization', res.data.accessToken);
                window.location.href = '/#/user/index';
            }).catch((res) => {
                console.log(JSON.stringify(res));
                return true;
            });
        },
    },
    mounted() {
        this.$nextTick((res) => {
            this.login();
        });
    },
};
</script>

<style lang="less">

</style>
