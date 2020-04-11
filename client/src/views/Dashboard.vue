<template>
    <div class="dashboard">
        <div class="dash-title">
            {{ getUsername.charAt(0).toUpperCase() + getUsername.slice(1) }}'s Dashboard
        </div>
        <div class="dash-content">
            <div class="chart-block">
                <div class="chart-btns">
                    <b-button class="chart-btn" ref="initialselection" @click="filterChartData('Bench Press')">Bench Press</b-button>
                    <b-button class="chart-btn" @click="filterChartData('Squats')">Squat</b-button>
                    <b-button class="chart-btn" @click="filterChartData('Deadlifts')">Deadlift</b-button>
                </div>
                <Chart class="chart" v-if="loaded" :chartdata="chartData" :options="chartOptions"/>
                <!-- v-bind="chartData"  -->
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
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Chart from '@/components/Chart.vue';
import axios from 'axios';

export default {
    name: 'Dashboard',
    components: {
        Chart
    },
    data() {
        return {
            workouts: [],
            loaded: false,
            gradient: null,
            testData: [],
            chartData: {},
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                }
            },
            calendar_events: []
        }
    },
    created() {
        this.loaded = false;

        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        } else {
            this.username = this.$store.getters.getUsername;
            axios.get('http://localhost:5000/workouts?username=' + this.username)
            .then((response) => {
                this.workouts = response.data;
                // initialize chart data with bench press data
                this.filterChartData('Bench Press');
                this.loaded = true;
                this.$refs.initialselection.$el.focus();
                // format data for calendar component
                this.filterCalendarData();
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
                        label: category,
                        backgroundColor: 'transparent',
                        pointBackgroundColor: '#30475e',
                        borderColor: '#30475e',
                        data: chartTempData,
                    }
            ]

            this.chartData = { datasets: tempDatasets, labels: labelData }
        },
        filterCalendarData() {
            let calendarTempData = [];

            for (let i = 0; i < this.workouts.length; i++) {
                for (let j=0; j < this.workouts[i].exercises.length; j++) {
                    calendarTempData.push({ date: new Date(this.workouts[i].date), type: 'is-info'});
                }
            }
            //console.log(calendarTempData);
            this.calendar_events = calendarTempData;
        }
    }
}
</script>

<style scoped lang="scss">

.dashboard {
    .dash-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: #30475e;
    margin: 2rem 0;
    // margin: 2rem 0;
}

    .chart-block {
        width: 50%;
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
        display: flex;
        width: auto;
        align-items: center;
        margin: 2rem;
        padding-top: 4rem;
    }
    .calendar {
        margin: 0 auto;
    }

}
</style>
