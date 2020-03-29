<template>
  <div class="login">
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
//import axios from 'axios';

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data() {
    return {
        username: "",   // same ...
        password: "",
    };
  },
  created() {
      // If user is already authenticated, send back to dashboard
      if (localStorage.getItem('token') != null) {
          this.$router.push('dashboard');
      }
  },
}
</script>

<style scoped lang="scss">

.images {
    width: 50%;
    margin: 2em auto;
    text-align: center;
}

.login {
    width: 80%;
    max-width: 500px;
    margin: 5rem auto;
}
</style>
