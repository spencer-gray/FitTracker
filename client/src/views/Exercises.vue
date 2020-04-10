<template>
  <div class="exercises">
    <div class="images">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Muscular_system.svg/1200px-Muscular_system.svg.png" alt="Muscular system.svg" width="150px">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Muscular_system-back.svg/1200px-Muscular_system-back.svg.png" alt="Muscular system-back.svg" width="150px">
    </div>
    <div class="content">
      <ExerciseListButtons @clickedCat="updateClickedCat"/>
      <ExerciseList :exercises="exercises" :category="category"/>
    </div>
  </div>
</template>

<script>
import ExerciseList from '@/components/ExerciseList.vue';
import ExerciseListButtons from '@/components/ExerciseListButtons.vue';
import axios from 'axios';

export default {
  name: 'Exercises',
  components: {
    ExerciseList, ExerciseListButtons
  },
  data() {
    return {
      exercises: [],
      category: null
    };
  },
  created: function() {
    // User is not authorized, redirect to login page
    if (localStorage.getItem('token') === null) {
        this.$router.push('login');
    } else {
      axios.get('http://localhost:5000/api/exercise_data')
          .then((response) => this.exercises = response.data)
          .catch((error) => console.log(error));
    }
  },
  methods: {
      updateClickedCat(variable) {
          if (variable==="Abs") {
              this.category = 10;
          } else if (variable==="Arms") {
              this.category = 8;
          } else if (variable==="Back") {
              this.category = 12;
          } else if (variable==="Calves") {
              this.category = 14;
          } else if (variable==="Chest") {
              this.category = 11;
          } else if (variable==="Legs") {
              this.category = 9;
          } else if (variable==="Shoulders") {
              this.category = 13;
          }
      }
  },
}
</script>

<style scoped lang="scss">
.exercises {
  width: 80%;
  margin: 2rem auto;
}

.images {
    width: 50%;
    margin: 0.5em auto;
    text-align: center;
}
</style>
