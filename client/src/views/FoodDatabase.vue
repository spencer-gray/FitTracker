<template>
    <div class="food-db">
        <h2>Food Database</h2>
        <div class="food-search">
            <b-field @keyup.enter.native="submitSearch">
                <b-input type="text" v-model="searchQuery" @input="clearList"></b-input>
                <p class="control">
                    <b-button class="button" @click="submitSearch">Search</b-button>
                </p>
            </b-field>
        </div>
        <div class="food-list" v-show="searchQuery!=''">
            <div class="food-item" v-bind:key="food.id" v-for="food in foods">
                {{ food.item_name }} -
                {{ food.nutrient_name }}:
                {{ food.nutrient_value }}
                {{ food.serving_qty }}
                {{ food.serving_uom }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'FoodDatabase',
	data: function() {
		return {
            foods: [],
            searchQuery: ''
        }
    },
    created: function() {
        // User is not authorized, redirect to login page
        if (localStorage.getItem('token') === null) {
            this.$router.push('login');
        }
    },
    methods: {
        // using nutritionix api search query to filter data
        submitSearch() {
            axios.get(`https://api.nutritionix.com/v2/search?q=${this.searchQuery}&limit=50&offset=0&search_type=grocery&appId=3c7b4647&appKey=7fa4af33a46dc73311f978a27ad8822b`)
                .then((response) => {
                    this.foods = response.data.results;
                    this.foodsExist = true;
                }).catch((error) => console.log(error));
        },
        // empty foods array on input update
        clearList() {
            this.foods = [];
        }
	}
}

</script>

<style lang="scss">

.food-db {
    width: 80%;
    margin: 2rem auto;
    min-width: 350px;
    color: #30475e;
    text-align: center;
    h2 {
        margin: 2rem 0;
        font-size: 22px;
        font-weight: 700;
    }
    button {
        background-color: #30475e;
        color: white;
    }
    button:hover, button:focus {
        background-color: #7182b6;
        color: white;
    }
    .field-has-addons {
        padding-left: 10px;
        margin: 0 auto;
        padding: 0;
        margin: 0;
    }
    .food-search {
        width: 300px;
        margin: 0 auto;
    }
    .food-list {
        width: 80%;
        margin: 2rem auto;
    }
    .food-item {
        margin: 1rem 0;
        padding: 0.25rem;
        border-radius: 5px;
        background-color: #F9F9F9;
        box-shadow: 1px 5px 5px 1px darkgray;
        font-size: 14px;
    }
    .food-item:hover {
        background-color: #7182b6;
        color: white;
    }
    .label {
        color: #30475e;
    }
}

</style>