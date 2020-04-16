<template>
    <b-navbar class="navbar" type="is-dark" v-bind:spaced="true" v-bind:shadow="true" v-bind:fixed-top="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <p id="navbar-logo">FitTracker</p>
            </b-navbar-item>
        </template>
        <template slot="start" v-if='getLoginState === true'>
            <b-navbar-item 
                tag="router-link" 
                :to="{ path: '/dashboard' }">
                <p id="navbar-item">Dashboard</p>
            </b-navbar-item>
            <b-navbar-dropdown class="dropdown" label="Exercises">
                <b-navbar-item tag="router-link" :to="{ path: '/exercises' }">
                    <p id="navbar-item">Exercise Database</p>
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/add-workout' }">
                    <p id="navbar-item">Create New Workout</p>
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/activity-log' }">
                    <p id="navbar-item">View Activity Log</p>
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-dropdown class="dropdown" label="Nutrition">
                <b-navbar-item tag="router-link" :to="{ path: '/food-database' }">
                    <p id="navbar-item">Food Database</p>
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/food-diary' }">
                    <p id="navbar-item">Food Diary</p>
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-item tag="router-link" :to="{ path: '/chatroom' }">
                <p id="navbar-item">Live Chat</p>
            </b-navbar-item>
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

#navbar-logo {
    font-size: 25px;
    font-weight: 900;
}

.signUpButton{
    background-color: #30475e;
    color:white;
}

.signUpButton:hover {
    background-color: white;
    color: #30475e;
}

.signUpButton:focus {
    background-color: white;
    color: #30475e;
}

.loginButton{
    background-color: #30475e;
    color:white;
}

.loginButton:hover {
    background-color: white;
    color: #30475e;
}

.loginButton:focus {
    background-color: white;
    color: #30475e;
}

.logoutButton{
    background-color: #30475e;
    color:white;
}

.logoutButton:hover {
    background-color: white;
    color: #30475e;
}

.logoutButton:focus {
    background-color: white;
    color: #30475e;
}

.profileButton{
    background-color: #30475e;
    color:white;
}

.profileButton:hover {
    background-color: white;
    color: #30475e;
}

.profileButton:focus {
    background-color: white;
    color: #30475e;
}

#nav-routes {
    padding-left: 50px;
}
#navbar-item {
    font-size: 18px;
}

.dropdown {
    color: white;
}

</style>