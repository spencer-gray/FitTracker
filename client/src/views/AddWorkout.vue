<template>
    <ValidationObserver ref='oberver' v-slot='{ passes }'>
    <div class="addworkout">
        <div class="date">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <b-field label="Date" :type=" {'is-danger': errors[0]}">
                    <b-datepicker v-model="date" placeholder="Select a date..." 
                        icon="calendar-day" trap-focus />
                </b-field>
            </ValidationProvider>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th align='center'><strong>Exercise</strong></th>
                    <th align='center'><strong>Reps</strong></th>
                    <th align='center'><strong>Sets</strong></th>
                    <th align='center'><strong>Weight</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="row.id" v-for="(row, index) in rows">

                    <td>
                        <ValidationProvider rules="required" name="exercise" v-slot="{ errors }">
                            <b-field :type="{ 'is-danger': errors[0]}">
                                <b-select placeholder="Exercise" size="is-small" v-model="row.exercise">
                                    <option v-for="exercise in exerciseData" :key="exercise.id">
                                        {{ exercise.fields.name }}
                                    </option>
                                </b-select>
                                <!-- <b-autocomplete v-model="row.exercise" placeholder="e.g. Bench Press"
                                    :keep-first="true" :open-on-focus="true" :data="filteredData"
                                    field="exercise.name" @select="option => selected = option">
                                </b-autocomplete> -->
                            </b-field>
                        </ValidationProvider>
                    </td>
                    <td>
                        <b-field>
                                <b-numberinput :expanded="true" size="is-small" controls-position="compact" controls-rounded 
                                    v-model="row.reps" type='is-dark' min="0" max="1000"/>
                        </b-field>
                    </td>
                    <td>
                        <b-field>
                                <b-numberinput :expanded="true" size="is-small" controls-position="compact" controls-rounded 
                                    v-model="row.sets" type='is-dark' min="0" max="1000"/>
                        </b-field>
                    </td>
                    <td>
                        <b-field>
                                <b-numberinput :expanded="true" size="is-small" controls-position="compact" controls-rounded 
                                    v-model="row.weight" type='is-dark' min="0" max="1000"/>
                        </b-field>
                    </td>
                    <td>
                        <a v-on:click="removeRow(index);" style="cursor: pointer">
                            <!-- <p class="remove-label">Remove</p> -->
                            <b-icon pack="fas" icon="trash" type="is-danger"/>
                        </a>
                    </td>


                </tr>
            </tbody>
        </table>
        <div>
            <div class="submit-buttons">
                <b-button type="is-success" class="btn" @click="addRow">
                    Add Exercise
                </b-button>
                <b-button type="is-dark" class="btn" @click="passes(addWorkout)">
                    Save Workout
                </b-button>
            </div>
        </div>
    </div>
    </ValidationObserver>
 </template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

// pull exercise data
export default {
    name: 'AddWorkout',
    components: {
        ValidationObserver, 
        ValidationProvider
    },
    data() {
        return {
            rows: [],
            exerciseData: [],
            date: new Date()
        };
    },
    created: function() {
        // If user is already authenticated, send back to dashboard
        if (localStorage.getItem('token') === null) {
            this.$router.push('dashboard');
        } else {
            axios.get('http://localhost:5000/api/exercise_data')
                .then((response) => this.exerciseData = response.data)
                .catch((error) => console.log(error));
        }
    },
    computed: mapGetters(['getUsername']),
    methods: {
        addRow: function() {
            this.rows.push({
                exercise: '',
                reps: 0,
                sets: 0,
                weight: 0
            });
        },
        removeRow: function(index) {
            this.rows.splice(index, 1);
        },
        addWorkout() {
            let workout = {
                username: this.$store.getters.getUsername,
                exercises: this.rows,
                date: this.date
            }
            axios.post('http://localhost:5000/workouts/addworkout', workout)
                .then(res => {
                    console.log(res);
                    this.error = '';
                    this.$router.push('/activity-log');
                    this.$buefy.toast.open({
                            message: 'Workout created!',
                            type: 'is-success',
                    })
                }, err => {
                    console.log(err.response);
                    //this.error = err.response.data.error;
                    this.$buefy.toast.open({
                            message: 'Failed to create workout!',
                            type: 'is-danger',
                    })
                })
        }
    }
}
</script>

<style scoped lang="scss">

.addworkout {
    width: 80%;
    margin: 5rem auto;
}

.date {
    width: 50%;
    margin: 3rem auto;
    min-width: 200px;
}

.table { 
    width: 100%;
}

// .table th {
//     // border: none;
// }

.table td {
    text-align: center;
    border: none;
    padding: 1rem 1rem
}

.submit-buttons {
    margin: 2rem auto;
    text-align: center;
    justify-content: space
}
</style>