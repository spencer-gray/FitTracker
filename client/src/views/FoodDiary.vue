<template>
    <div class="food-diary">
        <!-- <h2>Food Diary</h2> -->
        <h2>{{dateFormat(date)}}</h2>
        <b-field>
            <div class="datepicker">
                <b-datepicker
                    ref="datepicker"
                    v-model="date"
                    placeholder="Select a date">
                </b-datepicker>
            </div>
            <b-button
                class="calendar-btn"
                @click="$refs.datepicker.toggle()"
                icon-left="calendar"/>
        </b-field>
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
                        <b-button @click="removeDinnerRow(index)" :rounded="true" type="is-danger" size="is-small" icon-left="trash"/>
                        </td>
                    </tr>
                </tbody>
            <b-button class="add-button" @click="openDinnerModal" size="is-small" icon-left="plus" :rounded="true"/>
        </div>
        <b-progress type="is-info" :value="total_calories" :max="2400" size="is-large" show-value>
            {{ total_calories }} / 2400
        </b-progress>
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
            curr_diary: [],
            total_calories: 0,
        }
    },
    created() {
        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        } else {
            // get user data from vuex state
            this.username = this.$store.getters.getUsername;
            // get diary data for current user
            axios.get('http://localhost:5000/food-diary/' + this.username)
                .then((response) => this.diary_data = response)
                .catch((error) => console.log(error));

            //console.log(this.diary_data);
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
            });
        },
        addLunchRow(food) {
            this.total_calories += food.nutrient_value;
            this.lunch_rows.push({
                food_name: food.item_name,
                calories: food.nutrient_value
            })
        },
        addDinnerRow(food) {
            this.total_calories += food.nutrient_value;
            this.dinner_rows.push({
                food_name: food.item_name,
                calories: food.nutrient_value
            })
        },
        // Below are methods to remove form data from specified
        removeBFastRow: function(index) {
            this.total_calories -= this.bfast_rows[index].calories;
            this.bfast_rows.splice(index, 1);
        },
        removeLunchRow: function(index) {
            this.total_calories -= this.lunch_rows[index].calories;
            this.lunch_rows.splice(index, 1);
        },
        removeDinnerRow: function(index) {
            this.total_calories -= this.dinner_rows[index].calories;
            this.dinner_rows.splice(index, 1);
        },
        // Store diary data in database
        saveDiary() {
            this.curr_diary = {
                date: this.date,
                breakfast: this.bfast_rows,
                lunch: this.lunch_rows,
                dinner: this.dinner_rows
            }
            console.log(this.curr_diary);
        },
        // Format Date to long format
        dateFormat(d) {
            var t = new Date(d);
            return monthNames[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear();
        },
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
    .calendar-btn, .save-btn {
        margin: 1rem auto;
        background-color: #30475e;
        color: white;
    }
    .calendar-btn:hover, .calendar-btn:focus, .save-btn:hover, .save-btn:focus {
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