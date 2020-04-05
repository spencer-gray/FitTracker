<template>
  <div class="activity-log">
    <div class="add-exercise">
      <b-button class="add-exercise-btn" icon-right="share-square" tag="router-link" :to="{ path: '/add-workout' } ">Add Exercise</b-button>
    </div>
    <div v-bind:key="item.id" v-for="(item) in paginatedItems">
      <b-collapse class="card" :open="false" animation="slide" aria-id="contentIdForA11y3">
            <div
                slot="trigger" 
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <div class="card-header-title">
                  <div class="header-info">
                    <div class="date">{{dateFormat(item.date)}}</div>
                    <div class="total-weight">
                      <b-icon type="is-primary" icon="weight-hanging" size="is-small"/>
                      <p>{{ item.exercises.map(a => a.reps * a.sets * a.weight)
                                        .reduce((a, b) => a + b, 0)}}
                      </p>
                    </div>
                  </div>
                </div>
                <a class="card-header-icon" v-show="props.open">
                    <b-icon type="is-primary" icon='angle-up'>
                    </b-icon>
                </a>
                <a class="card-header-icon" v-show="!props.open">
                    <b-icon type="is-primary" icon='angle-down'>
                    </b-icon>
                </a>


            </div>
            <div class="card-content">
                <div class="content">
                    <b-table
                      :data="item.exercises"
                      hoverable
                      selectable
                      @select="selected"
                      class="detail-table"
                      :striped="true">
                      <template slot-scope="props">
                          <b-table-column field="exercises" label="Exercise" centered>
                              {{ props.row.exercise }}
                          </b-table-column>
                          <b-table-column field="reps" label="Reps" centered>
                              {{ props.row.reps }}
                          </b-table-column>
                          <b-table-column field="sets" label="Sets" centered>
                              {{ props.row.sets }}
                          </b-table-column>
                          <b-table-column field="weight" label="Weight" centered>
                              {{ props.row.weight }}
                          </b-table-column>
                      </template>
                  </b-table>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" @click="updateWorkout(item)">Edit</a>
                <a class="card-footer-item" @click="deleteWorkout(item._id)">Delete</a>
            </footer>
        </b-collapse>
    </div>

    <div class="pagination">
      <b-pagination
        :total="total"
        :current.sync="current"
        :per-page="perPage"
        order="is-centered">
      </b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default {
  name: 'ActivityLog',
  data() {
    return {
      workouts: [],
      username: '',
      current: 1,
      perPage: 5,
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
    }
  },
  computed: {
    paginatedItems() {
      let pageNum = this.current-1;

      return this.workouts.slice(pageNum * this.perPage, (pageNum+1) * this.perPage)
    },
    total() {
      return this.workouts.length;
    },
  },
  watch: {
    sortedItems(workouts) {
      workouts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      return workouts;
    },
  },
  methods: {
    deleteWorkout(id) {
      let workout = {
        id: id,
      };
      //let id = this.id;
      axios.post("http://localhost:5000/workouts/deleteworkout", workout).then(
        res => {
          console.log(res);
          const index = this.workouts.findIndex(workout => workout._id == id) // find workout index
          if (~index) {
            this.workouts.splice(index, 1);
          }
          this.$buefy.toast.open({
            message: "Workout successfully deleted!",
            type: "is-success"
          });
        },
        err => {
          console.log(err.response);
          this.$buefy.toast.open({
            message: "Failed to delete workout!",
            type: "is-danger"
          });
        });
    },
    updateWorkout(workout) {
      this.$store.commit('setWorkout', workout);
      //console.log(workout);
      this.$router.push("/update-workout");
    },
    dateFormat(d) {
      var t = new Date(d);
      return monthNames[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear();
    },
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

.add-exercise {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 2rem;
  text-align: center;
}

.add-exercise-btn {
    background-color: #30475e;
    color:white;
}

.add-exercise-btn:hover {
    background-color: #7182b6;
    color: white;
}

.table tr {
    cursor: pointer;
}

.pagination {
  width: 50%;
  margin: 1rem auto;
}

.card-header {
  margin: 2rem 0;
  border-radius: 20px;
}


.card-header-title {
  padding: 1rem 2rem;
  color: #30475e;
}

.header-info {
  margin: 0 auto;
}

.card-content { 
  margin: -2rem 0 2rem;
  color: #30475e;
}

.detail-table .table {
  color: #30475e;
  background: gold;
}

.total-weight {
  display: flex;
  min-width: 75px;
  justify-content: center;
}

.total-weight span{
  float: left;
  padding-top: 4px;
}
.total-weight p{
  padding-left: 10px;
  float: right;
}

.date {
  padding: 2rem;
}

td {
  color: #30475e;
  font-weight: 800;
}

.card-footer { 
  color: #30475e;
  font-weight: 800;
}

.card-footer-item {
  background-color: #30475e;
  color: white;
}

.card-footer-item:hover {
  background-color: #d1d1d1;
  color: #30475e;
}

.edit-button {
  width: 50%;
  border-right: 1px solid #ffffff;
}

</style>
