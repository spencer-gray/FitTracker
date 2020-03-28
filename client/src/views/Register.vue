<template>
    <section>
        <div class="register">
            <div class="error">
                {{ error }}
            </div>
            <b-field label="Username">
                <b-input placeholder="Username" v-model="username" maxlength="30"></b-input>
            </b-field>

            <b-field label="Email">
                <b-input placeholder="Email" v-model="email"></b-input>
            </b-field>

            <b-field label="Password" :message="['Password must have at least 8 characters']">
                <b-input placeholder="Password" v-model="password" type="password" maxlength="30"></b-input>
            </b-field>

            <div class="buttons">
                <b-button type="is-dark" @click="register">
                    Register
                </b-button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            email: '',
            password: '',   // add bcrypt
            error: '',
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

</style>