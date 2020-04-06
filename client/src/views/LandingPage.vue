<template class='landing-page'>
  <div>
    <div class="v-header container2">
      <div class="fullscreen-video-wrap">
        <video ref="videoRef" type="video/mp4" autoplay muted loop="">
      </video>
      </div>
      <div class="header-overlay"></div>
      <div class="header-content text-md-center">
        <h1>Welcome to FitTracker!</h1>
        <p>Track your exercises, and analyze your results. Your feature-rich fitness application!</p>
        <router-link v-if='getLoginState === false' class="btn" to="/register">Register</router-link>
        <router-link v-if='getLoginState === false' class="btn" to="/login">Sign in</router-link>
        <router-link v-if='getLoginState === true' class="btn" to="/dashboard">Back to Dashboard</router-link>
      </div>
    </div>

    <section class="section section-1">
      <div class="advantages">
        <h2 class="title">Advantages</h2>
        <div class="advantages-content">
          <div class="advantage advantage-1">
            <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png" alt="advantage-1"/>
            <p class="description">Create and manage your own personal workout routines. Pick the exercises your interested in and set their respective 
                reputations, sets, and/or weights. You can also modify and delete any unwanted workouts.</p>
          </div>
          <div class="advantage advantage-2">
            <img src="https://cdn.pixabay.com/photo/2015/08/26/18/20/info-908889_960_720.png" alt="advantage-2"/>
            <p class="description">Exercises are logged and the major statistics are analyzed to generate real-time diagrams that allow you to track your progress.</p>
          </div>
          <div class="advantage advantage-3">
            <img src="https://cdn.pixabay.com/photo/2017/01/27/14/26/money-2013198_960_720.png" alt="advantage-2"/>
            <p class="description">Open source, FitTracker will always be completely free to use and available to everyone.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LandingPage",
  props: {
    sources: {
      type: Array,
      required: true
    },
    img: {
      type: String
    }
  },
  
  data () {
    return {
      videoRatio: null
    }
  },
  computed: mapGetters(['getLoginState']),
  mounted: function() {
    this.$refs.videoRef.src = require('../assets/coverr-workout-with-dumbbells-1566567205456.mp4');
    this.$refs.videoRef.play();
  }
  
}
</script>

<style lang="scss">

*{
  box-sizing: border-box;
}

// look into overflow issue
// body{
//   margin: 0;
//   font-size: 1rem;
//   font-weight: normal;
//   line-height: 1.5;
//   color: #333;
//   overflow-x: hidden;
//   overflow-y: hidden;
// }

.v-header{
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
}

.container2{
  max-width: 960px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: auto;
  text-align: center;
}

.fullscreen-video-wrap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.fullscreen-video-wrap video{
  min-height: 100vh;
  min-width: 100vw;
}

.header-overlay{
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
  background: rgba(52, 72, 92, 0.7);;
  opacity: 0.85;
}

.header-content{
  z-index: 2;
}

.header-content h1{
  font-size: 50px;
  margin-bottom: 0;
}

.header-content p{
  font-size: 1.5rem;
  display: block;
  padding-bottom: 2rem;
}

.btn{
  background: #30475e;
  color: #ffffff;
  border-radius: 10px;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  text-decoration: none;
  border: 0.5px solid white;
}

.btn:hover {
  background-color: #7182b6;
  color: white;
  border-radius: 10px;
}

.section {
  padding: 20px 0;
}

.advantages {
  margin: 2rem;
  text-align: center;
}

.advantages-content {
  margin: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.advantage {
  margin: 2rem;
  max-width: 250px;
  min-width: 250px;
}

.description {
  margin: 2rem 0;
}

.section-1 {
  color: #30475e;
}

.section-1 i {
  width: 100px;
  height: 100px;
}

img {
  border-radius: 20%;
  max-width: 15rem;
  max-height: 15rem;
}

.section-2{
  background: #333;
  color: #fff;
}

@media(max-width:960px){
  .container{
    padding-right:3rem;
    padding-left:3rem;
  }
}

</style>
