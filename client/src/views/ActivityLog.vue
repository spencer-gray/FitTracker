<template>
  <div class="activity-log">
    <div v-bind:key="item.id" v-for="(item) in paginatedItems">
      <b-collapse class="card" :open="false" animation="slide" aria-id="contentIdForA11y3">
            <div
                slot="trigger" 
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <div class="card-header-title">
                    <div class="date">Date: {{new Date(item.date).toLocaleDateString()}}</div>
                    <div class="total-weight">
                      <b-icon type="is-primary" icon="weight-hanging" size="is-small"/>
                      <p>{{ item.exercises.map(a => a.reps * a.sets * a.weight)
                                        .reduce((a, b) => a + b, 0)}}
                      </p>
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
                    <!-- {{ new Date(item.row.date).toLocaleDateString() }} -->
                    <b-table
                      :data="item.exercises"
                      hoverable
                      selectable
                      @select="selected"
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
                <a class="card-footer-item">Edit</a>
                <a class="card-footer-item">Delete</a>
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
//import AddContact from '@/components/AddContact.vue';
import axios from 'axios';

export default {
  name: 'ActivityLog',
  data() {
    return {
      workouts: [],
      username: '',
      current: 1,
      perPage: 3,
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

.pagination {
  width: 50%;
  margin: 1rem auto;
}

.card-header {
  // background-color: #30475e;
  margin: 2rem 0;
  border-radius: 20px;
}


.card-header-title {
  padding: 2rem 2rem;
  color: #30475e;
}

.total-weight {
  min-width: 75px;
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

</style>
