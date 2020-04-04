

<template>
    <b-navbar class="navbar" v-bind:spaced="true" v-bind:shadow="true" v-bind:fixed-top="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <p id="navbar-logo">FitTracker</p>
                <!-- <img src="../assets/fittracker_logo.png"> -->
            </b-navbar-item>
        </template>
        <template slot="start" v-if='getLoginState === true'>
            <b-navbar-item 
                tag="router-link" 
                :to="{ path: '/dashboard' }">
                <p id="navbar-item">Dashboard</p>
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/exercises' }">
                <p id="navbar-item">Exercises</p>
            </b-navbar-item>
            <b-navbar-dropdown class="dropdown" label="Workouts">
                <b-navbar-item tag="router-link" :to="{ path: '/add-workout' }">
                    <p id="navbar-item">Create New Workout</p>
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/activity-log' }">
                    <p id="navbar-item">View Activity Log</p>
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item v-if='getLoginState === false' tag="div">
                <div class="buttons">
                    <b-button 
                        class="signUpButton" 
                        tag="router-link"
                        to="/register">
                        Sign Up
                    </b-button>
                    <b-button 
                        class="loginButton"
                        tag="router-link"
                        to="/login">
                        Log In
                    </b-button>
                </div>
            </b-navbar-item>
            <b-navbar-item v-if='getLoginState === true' tag="div">
                <div class="buttons">
                    <b-button
                        class="profileButton"
                        icon-left="user"
                        tag="router-link"
                        to="/profile">
                        Profile
                    </b-button>
                    <b-button
                        class="logoutButton"
                        v-on:click="logout">
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
            this.$store.commit('setUsername', '');
            localStorage.clear();           // clear token
            this.$router.push('/');    // redirect
        },
        profile() {}
    }
}

</script>

<style scoped lang="scss">
#nav {
    text-align: center;
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
.navbar {
    background-color: #30475e;
}

//add button colours here if nessecary

#navbar-logo {
    color: #e7b2a5;
    font-size: 25px;
    font-weight: 900;
    // padding: 0 20px;
}

.signUpButton{
    background-color: #ba6b57;
    color:white;
}

.signUpButton:hover {
    background-color: white;
    color: #30475e;
}

.loginButton{
    background-color: #ba6b57;
    color:white;
}

.loginButton:hover {
    background-color: white;
    color: #30475e;
}

.logoutButton{
    background-color: #ba6b57;
    color:white;
}

.logoutButton:hover {
    background-color: white;
    color: #30475e;
}

.profileButton{
    background-color: #ba6b57;
    color:white;
}

.profileButton:hover {
    background-color: white;
    color: #30475e;
}

#nav-routes {
    padding-left: 50px;
}
#navbar-item {
    font-size: 18px;
    color: #e7b2a5;
    //font-weight: 300;
}

.dropdown {
    color: white;
}

</style>