<template>
  <div class="wrapper">
    <div class="left">
      <img src="../assets/person-placeholder.png" alt="defaultuser" width />
      <h1>{{getUsername}}</h1>
    </div>
    <div class="right">
      <div class="info">
        <h2>Personal info</h2>
        <h2>Contact Info</h2>
        <div class="info_data">
          <div class="data">
            <h4>Email</h4>
            <p>{{getEmail}}</p>
            <section>
              <button 
                class="button is-primary is-medium"
                @click="emailModal()">
              Change email...
              </button>
            </section>
          </div>
        </div>
      </div>
      <div class="user">
        <h2>User Data</h2>
        <div class="user_data">
          <div class="data">
            <h4>Username</h4>
            <p>{{getUsername}}</p> 
            <section>
              <button 
                class="button is-primary is-medium"
                @click="userModal()">
              Change user...
              </button>
            </section>           
          </div>
          <div class="data">
            <h4>Password</h4>
            <p>*********</p>
            <section>
              <button 
                class="button is-primary is-medium"
                @click="passwordModal()">
              Change password...
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

const emailForm = {
        props: ['email', 'password'],
        template: `
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Please enter your new email</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="New Email">
                        <b-input
                            type="email"
                            placeholder="email@web.com"
                            required>
                        </b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary">Change</button>
                </footer>
            </div>
        `
};

const userForm = {
        props: ['email', 'password'],
        template: `
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Please enter your new username</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="New Username">
                        <b-input
                            type="username"
                            placeholder="username"
                            required>
                        </b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary">Change</button>
                </footer>
            </div>
        `
};

const passwordForm = {
        props: ['email', 'password'],
        template: `
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Please enter your new password</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="New Password">
                        <b-input
                            type="password"
                            placeholder="*******"
                            required>
                        </b-input>
                    </b-field>
                    <b-field label="Confirm Password">
                        <b-input
                            type="password"
                            placeholder="*******"
                            required>
                        </b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary">Change</button>
                </footer>
            </div>
        `
};

export default {
  name: "Profile",
  data() {
    return {
      isComponentModalActive: false,
      formProps: {
        email: "test@site.com",
        password: "testing"
      }
    };
  },
  created() {
    // User is not authorized, redirect to login page
    if (localStorage.getItem("token") === null) {
      this.$router.push("login");
    }
  },
  computed: mapGetters(["getLoginState", "getUsername", "getEmail"]),

  methods: {
    emailModal() {
                this.$buefy.modal.open({
                    parent: this,
                    component: emailForm,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true
                })
            },
    userModal() {
                this.$buefy.modal.open({
                    parent: this,
                    component: userForm,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true
                })
            },
    passwordModal() {
                this.$buefy.modal.open({
                    parent: this,
                    component: passwordForm,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true
                })
            },
    ...mapMutations(["setUsername"])
  },
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
  width: 20%;
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

.wrapper .right .info,
.wrapper .right .user {
  margin-bottom: 25px;
}

.wrapper .right .info h2,
.wrapper .right .user h2 {
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e0e0e0;
  color: #353c4e;
  text-transform: uppercase;
  letter-spacing: 5px;
}

.wrapper .right .info_data,
.wrapper .right .user_data {
  display: flex;
  justify-content: space-between;
}

.wrapper .right .info_data .data,
.wrapper .right .user_data .data {
  width: 45%;
}

.wrapper .right .info_data .data h4,
.wrapper .right .user_data .data h4 {
  color: #353c4e;
  margin-bottom: 5px;
}

.wrapper .right .info_data .data p,
.wrapper .right .user_data .data p {
  font-size: 13px;
  margin-bottom: 10px;
  color: #919aa3;
}

.button {
  width: 100%;
}
</style>
