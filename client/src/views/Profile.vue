<template>
  <div class="wrapper">
    <div class="left">
      <img
        src="https://som.ucdenver.edu/Profiles/Content/images/person-placeholder.jpg"
        alt="defaultuser"
        width
      />
      <h1>{{getUsername}}</h1>
      <b-button 
        class="signUpButton" 
        tag="router-link" 
        to="/">
        Change Profile Pic
        </b-button>
    </div>
    <div class="right">
      <div class="info">
        <h3>Information</h3>
        <div class="info_data">
          <div class="data">
            <h4>Email</h4>
            <p>email@gmail.com</p>
          </div>
          <div class="data">
            <h4>Username</h4>
            <p>{{getUsername}}</p>
          </div>
          <div class="data">
            <h4>Phone?</h4>
            <p>000-000-0000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  created() {
    // User is not authorized, redirect to login page
    if (localStorage.getItem("token") === null) {
      this.$router.push("login");
    }
  },
  computed: mapGetters(["getLoginState", "getUsername"]),
  methods: {},
  props: ["profileId"]
};
</script>

<style scoped lang="scss">
body {
  background-color: #f3f3f3;
}

.wrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 100%;
  height: 80%;
  display: flex;
}

.wrapper .left {
  width: 35%;
  background: linear-gradient(to right, #e7b2a5, #f1935c);
  padding: 30px 25px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  font-family: "Lucida Console", Courier, monospace;
  color: #fff;
}

.wrapper .left img {
  border-radius: 5px;
  margin-bottom: 10px;
}

.wrapper .left h1 {
  margin-bottom: 10px;
}

.wrapper .right {
  width: 65%;
  background: #fff;
  padding: 30px 25px;
}
</style>
