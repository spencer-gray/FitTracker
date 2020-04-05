<template>
  <!-- if user exists, then output this page -->
  <div v-if="getUsername === ''">
    <b-carousel>
      <b-carousel-item v-for="(carousel, i) in VisitorCarousels" :key="i">
        <section :class="`hero is-small`">
          <div class="container hero-body has-text-centered">
            <span class="image">
              <img :src="`${carousel.image}`" />
            </span>
            <h1 class="center title" style="color:white;">{{carousel.text}}</h1>
          </div>
        </section>
      </b-carousel-item>
    </b-carousel>
    <div class="dash-title">
      Please
      <a href="http://localhost:8080/#/register">sign up</a>
      or
      <a href="http://localhost:8080/#/login">log in</a>
      to take advantage of this great tracker!
    </div>
  </div>
  <!-- if user does not exists, then output this page -->
  <div v-else-if="getUsername !== ''">
    <b-carousel>
      <b-carousel-item v-for="(carousel, i) in UserCarousels" :key="i">
        <section :class="`hero is-small`">
          <div class="container hero-body has-text-centered">
            <span class="image">
              <img :src="`${carousel.image}`" />
            </span>
            <h1 class="center title" style="color:white;">{{carousel.text}}</h1>
          </div>
        </section>
      </b-carousel-item>
    </b-carousel>
    <div class="dash-title">Enjoy, {{ getUsername }}!</div>
    <div class="wrapper dash-title">
      <div class="box1" v-on:click="dashboard">
        Analyze Dashboard...
        <div>Checkout graphs, analytics, ...</div>
      </div>
      <div class="box2" v-on:click="excercises">
        Browse Excercises...
        <div>Choose from all different body parts!</div>
      </div>
      <div class="box3" v-on:click="track">
        Track all your workouts...
        <div>Take advantage of a huge selection of all our excercises...</div>
      </div>
      <div class="box4" v-on:click="saved">
        View your saved workouts...
        <div>Never forget what you did the day before!</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LandingPage",
  data() {
    return {
      progress: true,
      progressType: "is-primary",
      // need to figure out color scheme of app
      // can change texts of slide once features are figured out
      VisitorCarousels: [
        {
          text: "Welcome to FitTracker!",
          image: `https://source.unsplash.com/WvDYdXDzkhs`
        },
        {
          text: "Create your own profile...",
          image: `https://source.unsplash.com/DBhIAuHyjPM`
        },
        {
          text: "Track your workouts...",
          image: `https://source.unsplash.com/H6wTktsFxik`
        },
        {
          text: "OTHER FEATURES...",
          image: `https://source.unsplash.com/zGerGuIC3RA`
        }
      ],
      UserCarousels: [
        {
          text: "Welcome to FitTracker!",
          image: `https://source.unsplash.com/zGerGuIC3RA`
        },
        {
          text: "Check out your dashboard...",
          image: `https://source.unsplash.com/WvDYdXDzkhs`
        },
        {
          text: "Start tracking your workouts..",
          image: `https://source.unsplash.com/H6wTktsFxik`
        },
        {
          text: "OTHER FEATURES...",
          image: `https://source.unsplash.com/DBhIAuHyjPM`
        }
      ]
    };
  },
  computed: mapGetters(["getLoginState", "getUsername"]),
  methods: {
    dashboard() {
      this.$router.push("/dashboard");
    },
    excercises() {
      this.$router.push("/exercises");
    },
    track() {
      this.$router.push("/add-workout");
    },
    saved() {
      this.$router.push("/activity-log");
    },
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 500px;
  width: 100%;
  overflow: hidden;
  // position: relative;
  // text-align: center;
  color: white;
}

.center {
  //add shadow against light coloured background
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dash-title {
  padding-top: 0rem;
  margin: 1rem auto;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
}

.box1 {
  margin-left: 5%;
  margin-right: 5%;
  background-color: #e7b2a5;
  color: white;
  border-radius: 20px;
}

.box1:hover {
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
  background-color: #30475e;
  cursor: pointer;
}

.box2 {
  margin-top: 1%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: #f1935c;
  color: white;
  border-radius: 20px;
}

.box2:hover {
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
  background-color: #30475e;
  cursor: pointer;
}

.box3 {
  margin-top: 1%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: #ba6b57;
  color: white;
  border-radius: 20px;
}

.box3:hover {
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
  background-color: #30475e;
  cursor: pointer;
}

.box4 {
  margin-top: 1%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: #30475e;
  color: white;
  border-radius: 20px;
}

.box4:hover {
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
  background-color: #30475e;
  cursor: pointer;
}
</style>
