<template>
  <div id="app">
    <!-- <Header title="Fitness Application"/> -->
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
// import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
