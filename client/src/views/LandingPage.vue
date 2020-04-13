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
        <router-link v-if='getLoginState === false' class="landing-button" to="/register">Register</router-link>
        <router-link v-if='getLoginState === false' class="landing-button" to="/login">Sign in</router-link>
        <router-link v-if='getLoginState === true' class="landing-button" to="/dashboard">Back to Dashboard</router-link>
      </div>
    </div>

    <section class="section section-1">
      <div class="content-block">
        <h2 class="title">Advantages</h2>
        <div class="advantages-content">
          <div class="advantage advantage-1">
            <div class="icon-background">
              <i class="fas fa-user fa-7x icon-landing"></i>
            </div>
            <p class="description">Create and manage your own personal workout routines. Pick the exercises your interested in and set their respective 
                reps, sets, and/or weights.</p>
          </div>
          <div class="advantage advantage-2">
            <div class="icon-background">
              <i class="fas fa-chart-bar fa-7x icon-landing"></i>
            </div>
            <p class="description">Exercises are logged and the major statistics are analyzed to generate real-time diagrams that allow you to track your progress.</p>
          </div>
          <div class="advantage advantage-3">
            <div class="icon-background">
              <i class="fab fa-osi fa-7x icon-landing"></i>
            </div>
            <p class="description">Open source, FitTracker will always be completely free to use and available to everyone.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-2">
      <div class="content-block">
        <h2 class="title">Features</h2>
        <div class="advantages-content">

          <div class="feature">
            <img src="../assets/exercise_list.png" class="feature-img" alt="feature-1"/>
            <p class="description">Extensive exercise database with hundreds of unique exercises. Specify the area your interested in training and a list of
                                  relevant exercises will be generated.</p>
          </div>

          <div class="feature">
            <img src="../assets/activity_log.png" class="feature-img" alt="feature-2"/>
            <p class="description">Provides a complete, detailed history of all logged workouts. Create and manage your own personal workout routines.</p>
          </div>

          <div class="feature">
            <img src="../assets/data_visual.png" class="feature-img" alt="feature-3"/>
            <p class="description">Feature rich dashboard analyzing many aspects of your workouts, and how well you've progressed since joining the application</p>
          </div>

          <div class="feature">
            <img src="../assets/calendar.png" class="feature-img" alt="feature-3"/>
            <p class="description">Provides a quick overview of when you trained, and the targeted muscles. A complete history of your logged workouts
                                  in a clean and easy to read format.</p>
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
  margin: 0 auto;
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

.landing-button{
  margin: 0 1rem;
  background: #30475e;
  color: #ffffff;
  border-radius: 10px;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  text-decoration: none;
  border: 0.5px solid white;
}

.landing-button:hover {
  background-color: #7182b6;
  color: white;
  border-radius: 10px;
}

.section {
  padding: 20px 0;
}

.content-block {
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

.feature {
  margin: 2rem 4rem;
  max-width: 250px;
  min-width: 250px;
}

.description {
  margin: 2rem 0;
}

.section-1 {
  color: #30475e;
  // background-color: black;
}

.icon-background {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: #30475e;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  z-index: -100;
}

.icon-landing {
  z-index: 100;
  color: white;
  
}

.feature-img {
  border-radius: 50%;
  max-width: 15;
  max-height: 15rem;
  border: 5px solid #7182b6;
  // border-style: ridge;
}

.section-2{
  background: #30475e;
  color: white;
}

.section-2 h2 {
  color: white;
}

@media(max-width:960px){
  .container{
    padding-right:3rem;
    padding-left:3rem;
  }
}

</style>
