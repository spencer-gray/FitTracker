<template>
    <div class="dash-title">
        {{ username }}'s Dashboard
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    data() {
        return {
            username: '',
            email: '',
        }
    },
    created() {
        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        }
    },
    mounted() {
        axios.get('http://localhost:5000/users', { headers: { token: localStorage.getItem('token')}})
            .then(res => {
                this.username = res.data.user.username;
                this.email = res.data.user.email;
            })
    },
    computed: mapGetters(['getLoginState']),
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
