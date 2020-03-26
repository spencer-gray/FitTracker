<template>
  <div class="login">
    <!-- <div class="header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Muscular_system.svg/1200px-Muscular_system.svg.png" alt="Muscular system.svg" width="150px">
    </div> -->
    <LoginForm :users="users" :status="status"/>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
//import AddContact from '@/components/AddContact.vue';
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
        password: "",   // add bcrypt
    };
  },
//   created: function() {
//     // need to retrieve users
//     // axios.get('http://localhost:5000/api/exercise_data')
//     //      .then((response) => this.exercises = response.data)
//     //      .catch((error) => console.log(error));
//   },
//   methods: {
    
//   },
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
