<template>
    
</template>

<script>
export default {
    created() {

    },
    methods: {
        login() {
            this.$axios.post('/api/wx/h5/login').then((res) => {
                this.$localStorage.set('Authorization', res.data.accessToken);
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
