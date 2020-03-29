<template>
    <div class="addworkout">
        <table class="table">
            <thead>
                <tr>
                    <th align='center'><strong>Title</strong></th>
                    <th align='center'><strong>Reps</strong></th>
                    <th align='center'><strong>Sets</strong></th>
                    <th align='center'><strong>Weight</strong></th>
                    <!-- <th></th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="row.id" v-for="(row, index) in rows">

                    <td>
                        <b-field>
                                <b-input size="is-small" v-model="row.exercise"/>
                        </b-field>
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
                <b-button type="is-dark" class="btn">
                    Save Workout
                </b-button>
            </div>
        </div>
    </div>
 </template>

<script>

export default {
    name: 'AddWorkout',
    data() {
        return {
            rows: []
        };
    },
    created() {
        // If user is already authenticated, send back to dashboard
        if (localStorage.getItem('token') === null) {
            this.$router.push('dashboard');
        }
    },
    methods: {
        addRow: function() {
            // var elem = document.createElement('tr');
            this.rows.push({
                exercise: '',
                reps: 0,
                sets: 0,
                weight: 0
            });
        },
        removeRow: function(index) {
            this.rows.splice(index, 1);
        }
    }
}
</script>

<style scoped lang="scss">

.addworkout {
    width: 80%;
    margin: 5rem auto;
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