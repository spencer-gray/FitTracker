<template>
    <section>
        <div class="error">
            {{ error }}
        </div>
        <b-field label="Username">
            <b-input placeholder="Username" v-model="username" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password" :message="['Password must have at least 8 characters']">
            <b-input placeholder="Password" v-model="password" type="password" maxlength="30"></b-input>
        </b-field>

        <div class="buttons">
            <b-button type="is-dark" @click="login">
                Login
            </b-button>
            <router-link to="/register"><p>Not Registered?</p></router-link>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: '',   // add bcrypt
            
            error: '',
        };
    },
    methods: {
        login() {
            let user = {
                username: this.username,
                password: this.password
            }
            axios.post('http://localhost:5000/users/login', user)
                .then(res => {
                    // Successful login
                    if (res.status === 200) {
                        this.$store.commit('setLoginState', true);
                        localStorage.setItem('token', res.data.token);
                        this.$router.push('/dashboard');
                    }

                }, err => {
                    console.log(err.response);
                    this.error = err.response.data.error
                })
        }
    },
    // mounted() {
    //     window.addEventListener('keyup', function(event) {
    //         if (event.keyCode === 13) {
    //             this.login();
    //         }
    //     })
    // },
};
</script>

<style>

.error {
    margin: 2rem auto;
    text-align: center;
}

/* div.content {
    margin-top: 100px;
    margin-left: 25px;
    margin-bottom: 50px;

} */

/* .login {
    width: 80%;
} */
</style>