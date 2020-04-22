<template>
    
    <section>
        <div class="register">
            <div class="error">
                {{ error }}
            </div>

            <ValidationObserver ref='oberver' v-slot='{ passes }'>

                <ValidationProvider rules="required" name="username" v-slot="{ errors, valid }">
                    <b-field
                    label="Username"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                    >
                    <b-input type="username" v-model="username"></b-input>
                    </b-field>
                </ValidationProvider>
                <ValidationProvider rules="required|email" name="email" v-slot="{ errors, valid }">
                    <b-field
                    label="Email"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                    >
                    <b-input type="email" v-model="email"></b-input>
                    </b-field>
                </ValidationProvider>

                <ValidationProvider
                    rules="required"
                    vid="password"
                    name="password"
                    v-slot="{ errors, valid }"
                >
                    <b-field
                    label="Password"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                    >
                    <b-input type="password" v-model="password"></b-input>
                    </b-field>
                </ValidationProvider>

                <ValidationProvider
                    rules="required|confirmed:password"
                    name="password confirmation"
                    v-slot="{ errors, valid }"
                >
                    <b-field
                    label="Confirm Password"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                    >
                    <b-input type="password" v-model="confirmation"></b-input>
                    </b-field>
                </ValidationProvider>

                <div class="submit-buttons">
                    <b-button expanded class="register-btn" @click="passes(register)">
                        <span>Register</span>
                    </b-button>
                    <router-link to="/login"><p>Already have an account? Sign in</p></router-link>
                </div>
            </ValidationObserver>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import '../vee-validate';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'Register',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: '',
            confirmation: ''
        };
    },
    created() {
        // If user is already authenticated, send back to dashboard
        if (localStorage.getItem('token') != null) {
        this.$router.push('dashboard');
        }
    },
    methods: {
        register() {
            let newUser = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            axios.post('users/register', newUser)
                .then(res => {
                    console.log(res);
                    this.error = '';
                    this.$router.push('/login');
                    this.$buefy.toast.open({
                            message: 'Successful Registration!',
                            type: 'is-success',
                    })
                }, err => {
                    console.log(err.response);
                    //this.error = err.response.data.error;
                    this.$buefy.toast.open({
                            message: 'Invalid registration - username/email already taken!',
                            type: 'is-danger',
                    })
                })
        }
    }
};
</script>

<style scoped lang="scss">

.register {
    width: 80%;
    max-width: 500px;
    margin: 5rem auto;
}

.error {
    margin: 5rem auto;
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

.register-btn {
    background-color: #30475e;
    color: white;
    font-weight: 700;
}

.register-btn:hover, .register-btn:focus {
    background-color: #7182b6;
    color: white;
    font-weight: 700;
}

</style>