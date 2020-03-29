<template>
    <section>
        <div class="container error">
            {{ error }}
        </div>

        <ValidationObserver ref='oberver' v-slot='{ passes }'>
            <ValidationProvider rules="required" name="username" v-slot="{ errors }">
                <b-field
                label="Username"
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
                :type="{ 'is-danger': errors[0]}"
                :message="errors"
                >
                <b-input type="password" v-model="password"></b-input>
                </b-field>
            </ValidationProvider>

            <div class="submit-buttons">
                    <b-button type="is-dark" class="btn" expanded @click="passes(login)">
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
            axios.post('http://localhost:5000/users/login', user)
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
                    //this.error = err.response.data.error
                    this.$buefy.toast.open({
                            duration: 5000,
                            message: 'Invalid login - username/password do not exist!',
                            type: 'is-danger',
                            
                    })
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

<style lang="scss">

.error {
    margin: 2rem auto;
    text-align: center;
}

.submit-buttons {
    margin: 2rem auto;
    text-align: center;
}

.btn {
    margin: 0 0.25rem;
}

</style>