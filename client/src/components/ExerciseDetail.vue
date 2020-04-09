<template>
    <div class='exercise-detail'>
        <div class='header'>
            {{this.exercise.fields.name}}
            <!-- {{this.exercise.pk}} -->
        </div>
        <div v-if="image != ''"  class='exercise-image'>
            <img :src="this.image" alt="exercise image">
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
                            Primary: {{this.exercise.fields.muscles}}
                        </div>
                        <div class='secondary'>
                            Secondary: {{this.exercise.fields.secondary_muscle}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

// const muscleList = ['Biceps Brachii', 'Anterior Deltoid', 'Serratus Anterior', 'Pectoralis Major',
//                     'Triceps Brachii', 'Rectus Abdominis', 'Gastrocnemius', 'Gluteus Maximus',
//                     'Trapezius', 'Quadriceps Femoris', 'Biceps Femoris', 'Latissimus Dorsi', 'Brachialis',
//                     'Obliquus Externus Abdominis', 'Soleus'];

export default {
    name: 'ExerciseDetail',
    data() {
        return {
            id: this.$route.params.id,  // store route filter
            exercise: {},
            image: '',
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
                .then((response) => this.image = response.data.results[0].image)
                .catch((error) => console.log(error));
        }
    },
    methods: {
        stripHtml: function(html){
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        },
        stringifyCategory(variable) {
            // only one category so this is fine
            //console.log(this.image);
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
      stringifyMuscles(muscles) {
          var musclesString = []
          if (muscles.length===0) {
              return "No category recorded"
          }
          else {
              for (var i=0; i<muscles.length;i++) {
                if (muscles[i] === "5") {
                    musclesString.push("Test");
                } else if (muscles[i] === "6") {
                    musclesString.push("Test");
                }
            }
          }
      }
    }
}
</script>

<style lang="scss">

.exercise-detail {
    width: 50%;
	margin: 2rem auto;
    text-align: center;
    color: #30475e;

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
            max-width: 250px;
            max-height: 250px;
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