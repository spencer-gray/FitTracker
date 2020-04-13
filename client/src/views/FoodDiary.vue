<template>
    <div class="food-diary">
        <h2>{{dateFormat(date)}}</h2>
        <b-field>
            <b-button class="prev-btn" icon-left="angle-left" @click="prevDay"/>

            <div class="datepicker">
                <b-datepicker
                    ref="datepicker"
                    v-model="date"
                    :events="calendar_events"
                    indicators="bars"
                    placeholder="Select a date">
                </b-datepicker>
            </div>
            <b-button
                class="calendar-btn"
                @click="$refs.datepicker.toggle()"
                icon-left="calendar"/>

            <b-button class="next-btn" icon-left="angle-right" @click="nextDay"/>
        </b-field>
        <b-progress type="is-info" :value="total_calories" :max="2400" size="is-large" show-value>
            {{ Math.round(total_calories*100)/100 }} / 2400
        </b-progress>
        <div class="breakfast meal">
            <div class="meal-header">Breakfast</div>
                <tbody>
                    <tr v-bind:key="row.id" v-for="(row, index) in bfast_rows">
                        <td>
                            {{ row.food_name }}
                        </td>
                        <td>
                            <p>{{ row.calories }} cal</p>
                        </td>
                        <td>    
                            <select @change="updateRowQuantity($event, row)" selected="selected" :value="row.quantity">
                                <option v-bind:key="n.id" v-for="n in 100" :value="n">{{ n }}</option>
                            </select>  
                        </td>
                        <td>
                        <b-button @click="removeBFastRow(index)" :rounded="true" type="is-danger" size="is-small" icon-left="trash"/>
                        </td>
                    </tr>
                </tbody>
            <b-button class="add-button" @click="openBreakfastModal" size="is-small" icon-left="plus" :rounded="true"/>
        </div>
        <div class="lunch meal">
            <div class="meal-header">Lunch</div>
                <tbody>
                    <tr v-bind:key="row.id" v-for="(row, index) in lunch_rows">
                        <td>
                            {{ row.food_name }}
                        </td>
                        <td>
                            <p>{{ row.calories }} cal</p>
                        </td>
                        <td>
                            <select @change="updateRowQuantity($event, row)" selected="selected" :value="row.quantity">
                                <option v-bind:key="n.id" v-for="n in 100" :value="n">{{ n }}</option>
                            </select>  
                        </td>
                        <td>
                        <b-button @click="removeLunchRow(index)" :rounded="true" type="is-danger" size="is-small" icon-left="trash"/>
                        </td>
                    </tr>
                </tbody>
            <b-button class="add-button" @click="openLunchModal" size="is-small" icon-left="plus" :rounded="true"/>
        </div>
        <div class="dinner meal">
            <div class="meal-header">Dinner</div>
                <tbody>
                    <tr v-bind:key="row.id" v-for="(row, index) in dinner_rows">
                        <td>
                            {{ row.food_name }}
                        </td>
                        <td>
                            <p>{{ row.calories }} cal</p>
                        </td>
                        <td>
                            <select @change="updateRowQuantity($event, row)" selected="selected" :value="row.quantity">
                                <option v-bind:key="n.id" v-for="n in 100" :value="n">{{ n }}</option>
                            </select>  
                        </td>
                        <td>
                            <b-button @click="removeDinnerRow(index)" :rounded="true" type="is-danger" size="is-small" icon-left="trash"/>
                        </td>
                    </tr>
                </tbody>
            <b-button class="add-button" @click="openDinnerModal" size="is-small" icon-left="plus" :rounded="true"/>
        </div>
        <div class="diary-footer">
            <b-button class="save-btn" @click="saveDiary" icon-left="share-square">Save Food Diary</b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DiaryForm from '@/components/DiaryForm.vue';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default {
    name: 'FoodDiary',
    data() {
        return {
            date: new Date(),
            diary_data: [],
            username: '',
            bfast_rows: [],
            lunch_rows: [],
            dinner_rows: [],
            total_calories: 0,
            page_data: [],
            calendar_events: [],
            qty_selection: 1
        }
    },
    created() {
        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        } else {
            // get user data from vuex state
            this.username = this.$store.getters.getUsername;
            
            this.date.setHours(0,0,0,0) // need a constant time of day for backend comparison
            // get diary data for current user
            axios.get('http://localhost:5000/food-diaries?username=' + this.username)
                .then((response) => {
                    this.diary_data = response.data
                    this.loadCurrentDateData();
                    this.filterCalendarData();
                })
                .catch((error) => console.log(error));
        }
    },
    watch: {
        // watch for change on date object and update page data dynamically
        date: function (date) {
            if (date) {
                this.loadCurrentDateData();
            }
        }
    },
    methods: {
        // Open Breakfast Form Model
        openBreakfastModal() {
            this.$buefy.modal.open({
                parent: this,
                component: DiaryForm,
                hasModalCard: true,
                customClass: 'food-form',
                trapFocus: true,
                events: {
                    'addItem': value => {
                        if (value.length != 0) {
                            this.addBFastRow(value);
                        }
                    }
                }
            })
        },
        // Open Lunch Form Model
        openLunchModal() {
            this.$buefy.modal.open({
                parent: this,
                component: DiaryForm,
                hasModalCard: true,
                customClass: 'food-form',
                trapFocus: true,
                events: {
                    'addItem': value => {
                        if (value.length != 0) {
                            this.addLunchRow(value);
                        }
                    }
                }
            })
        },
        // Open Dinner Form Model
        openDinnerModal() {
            this.$buefy.modal.open({
                parent: this,
                component: DiaryForm,
                hasModalCard: true,
                customClass: 'food-form',
                trapFocus: true,
                events: {
                    'addItem': value => {
                        if (value.length != 0) {
                            this.addDinnerRow(value);
                        }
                    }
                }
            })
        },
        // Below are methods to add form data to specified meals
        addBFastRow: function(food) {
            this.total_calories += food.nutrient_value;
            this.bfast_rows.push({
                food_name: food.item_name,
                calories: food.nutrient_value,
                quantity: 1
            });
        },
        addLunchRow(food) {
            this.total_calories += food.nutrient_value;
            this.lunch_rows.push({
                food_name: food.item_name,
                calories: food.nutrient_value,
                quantity: 1
            })
        },
        addDinnerRow(food) {
            this.total_calories += food.nutrient_value;
            this.dinner_rows.push({
                food_name: food.item_name,
                calories: food.nutrient_value,
                quantity: 1
            })
        },
        // Below are methods to remove form data from specified
        removeBFastRow: function(index) {
            this.total_calories -= (this.bfast_rows[index].calories * this.bfast_rows[index].quantity);
            this.bfast_rows.splice(index, 1);
        },
        removeLunchRow: function(index) {
            this.total_calories -= (this.lunch_rows[index].calories * this.lunch_rows[index].quantity);
            this.lunch_rows.splice(index, 1);
        },
        removeDinnerRow: function(index) {
            this.total_calories -= (this.dinner_rows[index].calories * this.dinner_rows[index].quantity);
            this.dinner_rows.splice(index, 1);
        },
        // Store diary data in database
        saveDiary() {
            let curr_diary = {
                username: this.username,
                date: this.date.setHours(0,0,0,0),  // need to set a constant time for backend comparison
                meals: [{
                    breakfast: this.bfast_rows,
                    lunch: this.lunch_rows,
                    dinner: this.dinner_rows
                }]
            }

            // post request handles both update/addition of new diary entries
            axios.post("http://localhost:5000/food-diaries/addOrUpdateDiary", curr_diary).then(
                res => {
                    console.log(res);
                    this.error = "";
                    this.$buefy.toast.open({
                        message: "Food Diary Saved!",
                        type: "is-success"
                    });
                    // get request to retrieve new diary log on successfull post (dynamic page update without reload)
                    axios.get('http://localhost:5000/food-diaries?username=' + this.username)
                        .then((response) => {
                            this.diary_data = response.data
                            this.loadCurrentDateData();
                        })
                        .catch((error) => console.log(error));
                        },
                err => {
                    console.log(err.response);
                    this.$buefy.toast.open({
                        message: "Failed to save",
                        type: "is-danger"
                    });
                }
            );
        },
        // Format Date to long format
        dateFormat(d) {
            var t = new Date(d);
            return monthNames[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear();
        },
        checkCurrentDate() {
            let diary_list = this.diary_data;
            let formatted_date = this.date.toISOString();

            // check for any records on selected data (and current user)
            let daily_record = diary_list.filter(e => e.date === formatted_date);
            if (daily_record.length > 0) {
                //console.log(daily_record);
                return daily_record;
            }
            else {
                //console.log('No entries...');
                return [];
            }
        },
        loadCurrentDateData() {
            let daily_record = this.checkCurrentDate();

            // if user has existing record, pre-fill form fields
            if (daily_record.length != 0) {
                this.page_data = daily_record[0].meals[0];      // just using this for testing atm
                this.bfast_rows = daily_record[0].meals[0].breakfast;
                this.lunch_rows = daily_record[0].meals[0].lunch;
                this.dinner_rows = daily_record[0].meals[0].dinner;
                this.total_calories = this.bfast_rows.map(a => a.calories*a.quantity).reduce((a, b) => a + b, 0) +
                                      this.lunch_rows.map(a => a.calories*a.quantity).reduce((a, b) => a + b, 0) +
                                      this.dinner_rows.map(a => a.calories*a.quantity).reduce((a, b) => a + b, 0);
            } else {
                // No record, clear the pages form fields
                this.page_data = [];
                this.bfast_rows = [];
                this.lunch_rows = [];
                this.dinner_rows = [];
                this.total_calories = 0;
            }
        },
        // format all user date data to populate calendar
        filterCalendarData() {
            let calendarTempData = [];

            for (let i = 0; i < this.diary_data.length; i++) {
                calendarTempData.push({ date: new Date(this.diary_data[i].date), type: 'is-info'});
            }
            this.calendar_events = calendarTempData;
        },
        // go to previous day
        prevDay() {
            let d = new Date(this.date.getTime() - (1*24*60*60*1000));
            this.date = d;
        },
        // go to next day
        nextDay() {
            let d = new Date(this.date.getTime() + (1*24*60*60*1000));
            this.date = d;
        },
        updateRowQuantity(event, row) {
            
            // subtract existing amount
            if (row.quantity) {
                this.total_calories -= row.calories*row.quantity;
            }

            row.quantity = event.target.value;

            // add new amount to total
            this.total_calories += (row.calories*row.quantity);
        }
    }
    
}
</script>

<style lang="scss">

.food-diary {
    width: 50%;
    min-width: 340px;
	margin: 2rem auto;
    text-align: center;
    color: #30475e;
    padding: 2rem;
    border-radius: 10px;
	background-color: #F9F9F9;
	box-shadow: 1px 5px 5px 1px darkgray;
    h2 {
        font-size: 22px;
        font-weight: 700;
    }
    .input {
        display: none;
    }
    .meal {
        width: 80%;
        margin: 2rem auto;
        text-align: left;
    }
    .meal-header {
        font-size: 20px;
    }
    td {
        padding: 10px;
    }
    .next-btn, .prev-btn {
        background-color: #30475e;
        color: white;
    }
    .calendar-btn, .save-btn {
        margin: 1rem auto;
        background-color: #30475e;
        color: white;
    }
    .calendar-btn:hover, .calendar-btn:focus, .save-btn:hover, .save-btn:focus, .next-btn:hover, .prev-btn:hover {
        background-color: #7182b6;
        color: white;
    }
    .add-button {
        margin: 1rem auto;
        background-color: green;
        color: white;
    }
    .add-button:hover, .add-button:focus {
        background-color: darkgreen;
        color: white;
    }
    svg {
        color: white;
    }

    .dropdown-item {
        svg {
            color: #30475e;
        }
    }
    .progress-bar {
        background-color: green;
    }

}
</style>