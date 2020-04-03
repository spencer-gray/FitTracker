<template>
    <div class="dash-title">
        Welcome to FitTracker, {{ getUsername }}!
        <b-carousel>
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero is-medium is-${carousel.color}`">
                    <div class="hero-body has-text-centered">
                        <h1 class="title">{{carousel.text}}</h1>
                    </div>
                </section>
            </b-carousel-item>
        </b-carousel>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'LandingPage',
    created() {
        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        }
    },
    data(){
        return {
            // need to figure out color scheme of app
            // can change texts of slide once features are figured out
            carousels: [
                { text: 'Get fit now!', color: "black" },
                { text: 'Track your workouts...', color: 'black' },
                { text: 'Create your own profile...', color: 'black' },
                { text: 'OTHER FEATURES...', color: 'black' },
                { text: 'OTHER FEATURES...', color: 'black' }
            ]
        }
    },
    computed: mapGetters(['getLoginState', 'getUsername']),
    methods: {

    }
}
</script>

<style scoped lang="scss">

div {
    padding-top: 1rem;
}

.dash-title {
    margin: 1rem auto;
    font-size: 22px;
    font-weight: 700;
    text-align: center;
}
</style>
