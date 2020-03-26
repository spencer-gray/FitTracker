

<template>
    <b-navbar type="is-dark" v-bind:spaced="true" v-bind:shadow="true" v-bind:fixed-top="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <p id="navbar-logo">FitTracker</p>
                <!-- <img src="../assets/fittracker_logo.png"> -->
            </b-navbar-item>
        </template>
        <template slot="start" >
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
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
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-info">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>

// Will below need when authentication is setup

// import auth from '../auth'

// export default {
//    name: "Header",
//    data() {
//       return {
//          loggedIn: auth.loggedIn()
//       }
//    },
//    created() {
//       auth.onLoginStatusChanged = loggedIn => {
//         console.log(`onLoginStatusChanged::loggedIn = ${loggedIn}`);
//         this.loggedIn = loggedIn;
//       }
//    },
//    methods: {
//       logout: function() {
//          auth.logout((response) => {
//              console.log(response);
//          });
//       }
//    },
// };
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