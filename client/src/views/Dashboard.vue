<template>
    <div class="dash-title">
        {{ getUsername }}'s Dashboard
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    created() {
        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        }
    },
    computed: mapGetters(['getLoginState', 'getUsername']),
    methods: {

    }
}
</script>

<style scoped lang="scss">

.dash-title {
    margin: 1rem auto;
    font-size: 22px;
    font-weight: 700;
    text-align: center;
}
</style>
