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
                    <b-button type="is-dark" @click="passes(register)">
                        <span>Register</span>
                    </b-button>
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
    methods: {
        register() {
            let newUser = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:5000/users/register', newUser)
                .then(res => {
                    console.log(res);
                    this.error = '';
                    this.$router.push('/login');
                }, err => {
                    console.log(err.response);
                    this.error = err.response.data.error;
                })
        }
    }
};
</script>

<style>

.register {
    width: 80%;
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

</style>