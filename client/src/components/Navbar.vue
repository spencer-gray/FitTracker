

<template>
    <b-navbar type="is-dark" v-bind:spaced="true" v-bind:shadow="true" v-bind:fixed-top="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <p id="navbar-logo">FitTracker</p>
                <!-- <img src="../assets/fittracker_logo.png"> -->
            </b-navbar-item>
        </template>
        <template slot="start" v-if='getLoginState === true'>
            <b-navbar-item 
                tag="router-link" 
                :to="{ path: '/dashboard' }"
            >
                <p id="navbar-item">Dashboard</p>
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/exercises' }">
                <p id="navbar-item">Exercises</p>
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    <p id="navbar-item">About</p>
                </b-navbar-item>
                <b-navbar-item href="#">
                    <p id="navbar-item">Contact</p>
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item v-if='getLoginState === false' tag="div">
                <div class="buttons">
                    <b-button tag="router-link"
                        to="/register"
                        type="is-info">
                        Sign Up
                    </b-button>
                    <b-button tag="router-link"
                        to="/login"
                        type="is-light">
                        Log In
                    </b-button>
                </div>
            </b-navbar-item>
            <b-navbar-item v-if='getLoginState === true' tag="div">
                <div class="buttons">
                    <b-button
                        v-on:click="logout"
                        type="is-info">
                        Logout
                    </b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>

// Will below need when authentication is setup

// import auth from '../auth'
import { mapGetters } from 'vuex';

export default {
    name: "Navbar",
    props: {
        loginState: Boolean
    },
    computed: mapGetters(['getLoginState']),
    methods: {
        logout() {
            this.$store.commit('setLoginState', false);
            localStorage.clear();           // clear token
            this.$router.push('/login');    // redirect to login page
        }
    }
}

</script>

<style scoped lang="scss">
#nav {
    text-align: center;
    background-color: #3700B3;
    padding-bottom: 2rem;
    padding-top: 0;
    a {
        text-decoration: none;
        cursor: pointer;
        font-weight: bold;
        color: #018786;
        &.router-link-exact-active {
            color: #ffffff;
        }
    }
}
#navbar-logo {
    font-size: 25px;
    font-weight: 900;
    // padding: 0 20px;
}
#nav-routes {
    padding-left: 50px;
}
#navbar-item {
    font-size: 18px;
    //font-weight: 300;
}

</style>