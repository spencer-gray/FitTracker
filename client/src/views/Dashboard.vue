<template>
    <div class="dashboard">
        <div class="dash-title">
            {{ getUsername.charAt(0).toUpperCase() + getUsername.slice(1) }}'s Dashboard
        </div>
        <div class="dash-content">
            <div class="core-chart-block">
                <div class="chart-btns">
                    <b-button class="chart-btn" ref="initialselection" @click="filterChartData('Bench Press')">Bench Press</b-button>
                    <b-button class="chart-btn" @click="filterChartData('Squats')">Squat</b-button>
                    <b-button class="chart-btn" @click="filterChartData('Deadlifts')">Deadlift</b-button>
                </div>
                <CoreLiftsChart class="chart" v-if="loaded" :chartdata="coreChartData" :options="coreChartOptions"/>
            </div>
            <div class="calendar-block">
                <b-datepicker
                    class="calendar"
                    inline
                    :events="calendar_events"
                    indicators="bars"
                    :focusable="false"
                    >
                </b-datepicker>
            </div>
            <!-- if workout.length == 0 then have a unique display -->
            <div class="recent-activity-block">
                <p class="activity-header"> Recent Workouts</p>
                <div class="activity-item" v-bind:key="item.id" v-for="(item) in activity_items" @click="updateWorkout(item)">
                    {{ dateFormat(item.date) }}
                </div>
            </div>
            <div class="category-chart-block">
                <CategoryChart class="chart" v-if="loaded" :chartdata="categoryChartData" :options="categoryChartOptions"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CoreLiftsChart from '@/components/CoreLiftsChart.vue';
import CategoryChart from '@/components/CategoryChart.vue';
import axios from 'axios';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default {
    name: 'Dashboard',
    components: {
        CoreLiftsChart,
        CategoryChart
    },
    data() {
        return {
            workouts: [],
            loaded: false,
            gradient: null,
            testData: [],
            coreChartData: {},
            coreChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "white"
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "white"
                        }
                    }],
                },
                title: {
                    display: true,
                    text: 'Training Volume (reps x sets x weight)'
                }
            },
            categoryChartData: {},
            categoryChartOptions: {
                legend: {
                    //display: false
                },
                scale: {
                    ticks: {
                        display: false
                    }
                }
            },
            calendar_events: [],
            activity_items: [],
            exerciseList: [],
        }
    },
    created() {
        this.loaded = false;

        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        } else {
            // retrieve general exercise data for radar map comparison (could be refactored by bringing to the backend)
            axios.get('http://localhost:5000/api/exercise_data')
                .then((response) => this.exerciseList = response.data)
                .catch((error) => console.log(error));

            this.username = this.$store.getters.getUsername;
            // retrieve current users workout data
            axios.get('http://localhost:5000/workouts?username=' + this.username)
            .then((response) => {
                this.workouts = response.data;
                // initialize chart data with bench press data
                this.filterChartData('Bench Press');
                this.loaded = true;
                this.$refs.initialselection.$el.focus();
                // format data for calendar component
                this.filterCalendarData();
                this.filterActivityData();
                this.filterCategoryData();
            })
            .catch((error) => console.log(error));
        }
    },
    computed: mapGetters(['getLoginState', 'getUsername']),
    methods: {
        filterChartData(category) {
            let chartTempData = [];
            let labelData = [];
            
            for (let i = 0; i < this.workouts.length; i++) {
                for (let j=0; j < this.workouts[i].exercises.length; j++) {
                    if (this.workouts[i].exercises[j].exercise == category) {
                        chartTempData.push(this.workouts[i].exercises[j].reps * this.workouts[i].exercises[j].sets * this.workouts[i].exercises[j].weight);
                        labelData.push(this.workouts[i].date);
                    }
                }
            }

            labelData.reverse();
            chartTempData.reverse();

            let tempDatasets= [
                    {
                        label: category + ' (lbs)',
                        //backgroundColor: '#30475e',
                        backgroundColor: 'rgba(179,181,198,0.5)',
                        borderColor: '#30475e',
                        data: chartTempData,
                        pointHitRadius: 20,
                        pointRadius: 5,
                        pointBackgroundColor: '#ffffff',
                    }
            ]

            this.coreChartData = { datasets: tempDatasets, labels: labelData }
        },
        // formatting data for calendar component
        filterCalendarData() {
            let calendarTempData = [];

            for (let i = 0; i < this.workouts.length; i++) {
                for (let j=0; j < this.workouts[i].exercises.length; j++) {
                    calendarTempData.push({ date: new Date(this.workouts[i].date), type: 'is-info'});
                }
            }
            this.calendar_events = calendarTempData;
        },
        // formatting data for recent activity component
        filterActivityData() {
            for (let i = 0; i < this.workouts.length; i++) {
                // only store the 7 most recent
                if (i == 7) {
                    break;
                }
                this.activity_items.push(this.workouts[i]);
            }
        },
        // formatting data for category radar map
        filterCategoryData() {
            let categoryTempData = [];
            let categoryList = [];
            let categoryCounts = [];

            for (let i = 0; i < this.workouts.length; i++) {
                for (let j = 0; j < this.workouts[i].exercises.length; j++) {
                    let exercise = this.workouts[i].exercises[j].exercise;
                    let search = this.exerciseList.find(item => item.fields.name === exercise)
                    categoryTempData.push(search);
                }
            }
            let map = categoryTempData.reduce((sums, item) => {
                sums[item.fields.category] = (sums[item.fields.category] || 0) + 1;
                return sums;
            }, {});

            for (var m in map) {
                categoryList.push(this.categoryStringify(m));
                categoryCounts.push(map[m]);
            }

            let tempDatasets= [
                    {
                        label: "Exercise Frequency",
                        //backgroundColor: '#30475e',
                        backgroundColor: "rgba(179,181,198,0.5)",
                        //pointBackgroundColor: '#30475e',
                        borderColor: '#30475e',
                        data: categoryCounts,
                        pointHitRadius: 20,
                        pointRadius: 5,
                        pointBackgroundColor: '#ffffff',
                    }
            ]

            this.categoryChartData = { datasets: tempDatasets, labels: categoryList }
        },
        updateWorkout(workout) {
            this.$store.commit('setWorkout', workout);
            this.$router.push("/update-workout");
        },
        // format date to human readable
        dateFormat(d) {
            var t = new Date(d);
            return monthNames[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear();
        },
        // convert category to string literal
        categoryStringify(variable) {
          if (variable===10) {
              return "Abs";
          } else if (variable==="8") {
              return "Arms";
          } else if (variable==="12") {
              return "Back";
          } else if (variable==="14") {
              return "Calves";
          } else if (variable==="11") {
              return "Chest";
          } else if (variable==="9") {
              return "Legs";
          } else if (variable==="13") {
              return "Shoulders";
          }
      }
    }
}
</script>

<style scoped lang="scss">

.dashboard {
    width: auto;
    margin: 2rem auto;

    .dash-content {
        width: 80%;
        min-width: 380px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        color: #30475e;
        margin: 2rem auto;
}   

    .core-chart-block {
        flex-basis: 50%;
        min-width: 350px;
        padding: 1rem;
    }

    .chart-btns {
        display: flex;
        justify-content: center;
        padding-bottom: 2rem;
    }

    .chart-btn {
        background-color: #30475e;
        color: white;
        padding: 0 1rem;
        margin: 0 0.25rem;
    }
    .chart-btn:hover, .chart-btn:focus {
        background-color: #7182b6;
    }
    .dash-title {
        margin: 1rem auto;
        font-size: 22px;
        font-weight: 700;
        text-align: center;
    }
    .calendar-block {
        flex-basis: 30%;
        display: flex;
        width: auto;
        align-items: center;
        margin: 2rem;
        padding-top: 4rem;
    }
    .calendar {
        margin: 0 auto;
    }
    .recent-activity-block {
        min-width: 280px;
        flex-basis: 30%;
        margin: 2rem;
        padding: 2rem;
        text-align: center;
        border-radius: 10px;
        background-color: #F9F9F9;
        box-shadow: 1px 5px 5px 1px darkgray;
        color: #30475e;
    }
    .activity-header {
        margin-bottom: 1rem;
        font-size: 18px;
        font-weight: 700;
    }
    .activity-item {
        border-top: 0.25px solid #30475e;
        padding: 7px;
    }
    .activity-item:last-child {
        border-bottom: 0.25px solid #30475e;
    }
    .activity-item:hover {
        background-color: #30475e;
        color: white;
        cursor: pointer;
    }
    .category-chart-block {
        flex-basis: 30%;
        margin: 2rem;
    }

}
</style>
