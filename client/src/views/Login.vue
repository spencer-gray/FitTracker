<template>
  <div class="login">
    <LoginForm :users="users" :status="status"/>
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
        users: ["bill", "admin", "spence"],
        status: false,
        username: "",
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
    margin: 5rem auto;
}
</style>
