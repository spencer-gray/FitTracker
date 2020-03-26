<template>
    <section>
        <b-field label="Username">
            <b-input placeholder="Username" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password" :message="['Password must have at least 8 characters']">
            <b-input placeholder="Password" type="password" maxlength="30"></b-input>
        </b-field>

        <div class="buttons">
            <b-button tag="router-link"
                to="/login"
                type="is-dark">
                Login
            </b-button>
            <router-link to="/register"><p>Not Registered?</p></router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'LoginForm',
    props: {
        users: Array,
        status: Boolean,
    },
    methods: {

    }
};
</script>

<style>

/* div.content {
    margin-top: 100px;
    margin-left: 25px;
    margin-bottom: 50px;

} */

/* .login {
    width: 80%;
} */
</style>