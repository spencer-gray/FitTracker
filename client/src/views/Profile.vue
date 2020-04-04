<template>
  <div class="dash-title"> Profile </div>
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
.dash-title {
  margin: 1rem auto;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
}
</style>
