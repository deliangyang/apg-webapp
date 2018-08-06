<style lang="postcss">

</style>

<template>
    <div>hello world</div>
</template>

<script>
import api from '@/utils/api';

export default {
    created() {
        api.initBoot().then((res) => {
            console.log(res);
        });
    }
};
</script>
