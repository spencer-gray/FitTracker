<template>
  <div class="activity-log">
    <!-- Maybe use the buefy table to display an activity log? 
         Will need pagination -->
    <b-table
        :data="workouts"
        :paginated="true"
        :per-page="5"
        :pagination-simple="false"
        hoverable
        selectable
        @select="selected"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">
        <template slot-scope="props">
            <b-table-column field="date" label="Date" centered>
                {{ new Date(props.row.date).toLocaleDateString() }}
            </b-table-column>
            <b-table-column field="exercises" label="Exercises" centered>
                {{ props.row.exercises.map(a => a.exercise).join(', ') }}
            </b-table-column>
            <b-table-column field="totalweight" label="Total Weight" centered>
                {{ props.row.exercises.map(a => a.reps * a.sets * a.weight)
                                      .reduce((a, b) => a + b, 0) }}
            </b-table-column>
        </template>
    </b-table>
    <!-- <tr v-bind:key="workout.id" v-for="workout in workouts">
        <template v-if="workout.username === username">
            <p>{{ workout.date }}</p>
            <p>{{ workout.exercises }}</p>
        </template>
    </tr> -->
  </div>
</template>

<script>
//import AddContact from '@/components/AddContact.vue';
import axios from 'axios';

export default {
  name: 'ActivityLog',
  data() {
    return {
      workouts: [],
      username: '',
    //   selected: Object
    };
  },
  created: function() {
    // User is not authorized, redirect to login page
    if (localStorage.getItem('token') === null) {
        this.$router.push('login');
    } else {
        this.username = this.$store.getters.getUsername;
        axios.get('http://localhost:5000/workouts?username=' + this.username)
          .then((response) => this.workouts = response.data)
          .catch((error) => console.log(error));
        // go throught workouts and remove any that do not match current username
    }
  },
  methods: {
      selected() {
          console.log('row has been clicked...');
      }
  }
}
</script>

<style scoped lang="scss">
.activity-log {
    width: 80%;
    margin: 5rem auto;
}

.table tr {
    cursor: pointer;
}
</style>
