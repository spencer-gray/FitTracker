<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/exercises">Exercises</router-link> |
        <router-link to="/about">About</router-link> |
        <!-- <router-link v-if="!loggedIn" to="/login">Log in</router-link> -->
        <a v-if="loggedIn" v-on:click="logout">Log out</a>
    </div>
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
</style>