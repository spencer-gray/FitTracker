<template>
    <section>
        <div class="container error">
            {{ error }}
        </div>

        <ValidationObserver ref='oberver' v-slot='{ passes }'>
            <ValidationProvider rules="required" name="username" v-slot="{ errors }">
                <b-field
                label="Username"
                @keyup.enter.native="login"
                :type="{ 'is-danger': errors[0]}"
                :message="errors"
                >
                <b-input type="username" v-model="username"></b-input>
                </b-field>
            </ValidationProvider>

            <ValidationProvider
                rules="required"
                vid="password"
                name="password"
                v-slot="{ errors }"
            >
                <b-field
                label="Password"
                @keyup.enter.native="login"
                :type="{ 'is-danger': errors[0]}"
                :message="errors"
                >
                <b-input type="password" v-model="password"></b-input>
                </b-field>
            </ValidationProvider>

            <div class="submit-buttons">
                    <b-button class="login-btn" expanded @click="passes(login)">
                        Login
                    </b-button>
                <router-link to="/register"><p>Don't have an account? Sign up</p></router-link>
            </div>
        </ValidationObserver>
    </section>
</template>

<script>
import axios from 'axios';
import '../vee-validate';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'LoginForm',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data() {
        return {
            username: '',
            password: '',   
            error: '',
        };
    },
    methods: {
        login() {
            let user = {
                username: this.username,
                password: this.password
            }
            axios.post('users/login', user)
                .then(res => {
                    // Successful login
                    if (res.status === 200) {
                        this.$store.commit('setLoginState', true);
                        this.$store.commit('setUsername', this.username);
                        this.$buefy.toast.open({
                            message: 'Successful login!',
                            type: 'is-success',
                        })
                        localStorage.setItem('token', res.data.token);
                        this.$router.push('/dashboard');
                    }

                }, err => {
                    console.log(err.response);
                    this.$buefy.toast.open({
                            message: 'Invalid login - username/password do not exist!',
                            type: 'is-danger',
                            
                    })
                })
        }
    },
};
</script>

<style scoped lang="scss">

.error {
    margin: 2rem auto;
    text-align: center;
}

.submit-buttons {
    margin: 2rem auto;
    text-align: center;
}

.submit-buttons p {
    margin: 1rem 0;
    color: #2D3436;
    font-weight: 700;
}

.login-btn {
    background-color: #30475e;
    color: white;
    font-weight: 700;
}

.login-btn:hover, .login-btn:focus {
    background-color: #7182b6;
    color: white;
    font-weight: 700;
}

</style>