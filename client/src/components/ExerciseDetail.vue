<template>
    <div class='exercise-detail'>
        <div class='header'>
            {{this.exercise.fields.name}}
        </div>
        <div v-if="images.count != 0"  class='exercise-image'>
            <img v-bind:key="image.id" v-for="image in images" :src="image.image" alt="exercise image">
        </div>
        <div class='content'>
            <div class='row'>
                <div class='left'>
                    Description:
                </div>
                <div class='right'>
                    {{stripHtml(this.exercise.fields.description)}}
                </div>
            </div>
            <div class='row'>
                <div class='left'>
                    Category:
                </div>
                <div class='right category'>
                    {{stringifyCategory(this.exercise.fields.category)}}
                </div>
            </div>
            <div class='row'>
                <div class='left'>
                    Muscles:
                </div>
                <div class='right'>
                    <div class='muscles'>
                        <div class='primary'>
                            Primary: {{stringifyMuscles(this.exercise.fields.muscles)}}
                        </div>
                        <div class='secondary'>
                            Secondary: {{stringifyMuscles(this.exercise.fields.secondary_muscle)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

const muscleList = ['Biceps Brachii', 'Anterior Deltoid', 'Serratus Anterior', 'Pectoralis Major',
                    'Triceps Brachii', 'Rectus Abdominis', 'Gastrocnemius', 'Gluteus Maximus',
                    'Trapezius', 'Quadriceps Femoris', 'Biceps Femoris', 'Latissimus Dorsi', 'Brachialis',
                    'Obliquus Externus Abdominis', 'Soleus'];

export default {
    name: 'ExerciseDetail',
    data() {
        return {
            id: this.$route.params.id,  // store route filter
            exercise: {},
            images: [],
            imageState: false,
        }
    },
    created() {
        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        } else {
            // get exercise data from vuex state
            this.exercise = this.$store.getters.getExercise
            axios.get('http://localhost:5000/api/exercise_data/images/' + this.exercise.pk)
                .then((response) => this.images = response.data.results)
                .catch((error) => console.log(error));
        }
    },
    methods: {
        // strip html from input
        stripHtml: function(html){
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        },
        // Convert category to string counterpart
        stringifyCategory(variable) {
            // only one category so this is fine
            if (variable===10) {
                return "Abs"
            } else if (variable===8) {
                return "Arms"
            } else if (variable===12) {
                return "Back"
            } else if (variable===14) {
                return "Calves"
            } else if (variable===11) {
                return "Chest"
            } else if (variable===9) {
                return "Legs"
            } else if (variable===13) {
                return "Shoulders"
            }
      },
      // Convert muscle array to formatted string
      stringifyMuscles(muscles) {
          var musclesString = []
          if (muscles.length===0) {
              return "No muscle recorded"
          }
          else {
              for (var i=0; i<muscles.length;i++) {
                  musclesString.push(muscleList[parseInt(muscles[i])-1])
            }
          }
          return musclesString.join(' - ');
      }
    }
}
</script>

<style lang="scss">

.exercise-detail {
    width: 50%;
    min-width: 340px;
	margin: 2rem auto;
    text-align: center;
    color: #30475e;
    padding: 2rem;
    border-radius: 10px;
	background-color: #F9F9F9;
	box-shadow: 1px 5px 5px 1px darkgray;

    .header {
        font-size: 24px;
        font-weight: 700;
    }

    .exercise-image {
        margin: 2rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        
        img {
            max-width: 200px;
            max-height: 200px;
        }
    }

    .row {
        margin: 2rem 0;
    }

    .left {
        width: 100px;
        padding-right: 10rem;
        padding-bottom: 1rem;
        float: left;
    }

    .right {
        overflow: hidden;
        text-align: left;
        min-width: 200px;
    }

    .category {
        min-width: 50px;
    }
    
    .primary {
        padding-bottom: 1rem;
    }
}
</style>