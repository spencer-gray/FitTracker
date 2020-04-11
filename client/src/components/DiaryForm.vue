<template>
    <ValidationObserver ref="oberver" v-slot="{ passes }">
    <div class="modal-card food-form" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Add Food Item</p>
        </header>
        <section class="modal-card-body">
            <div class="food-search">
                <div class='search-field'>
                    <ValidationProvider rules="required" name="exercise" v-slot="{ errors }">
                        <b-field @keyup.enter.native="submitSearch" :type="{ 'is-danger': errors[0]}" grouped>
                            <b-input type="text" v-model="searchQuery" @input="clearList" expanded></b-input>
                            <p class="control">
                                <b-button class="button" @click="submitSearch">Search</b-button>
                            </p>
                        </b-field>
                    </ValidationProvider>
                </div>
            </div>
        <div class="food-list" v-show="searchQuery!=''">
            <div class="food-item" tabindex="0" v-bind:key="food.id" v-for="food in foods" @click="selectItem(food)">
                {{ food.item_name }} -
                {{ food.nutrient_name }}:
                {{ food.nutrient_value }}
                {{ food.serving_qty }}
                {{ food.serving_uom }}
            </div>
        </div>
        </section>
        <footer class="modal-card-foot">
            <div class='footer-buttons'>
                <button class="button" type="button" @click="passes(addItem)">Add</button>
                <button class="button close-button" type="button" @click="$parent.close()">Close</button>
            </div>
        </footer>
    </div>
    </ValidationObserver>
</template>

<script>
import axios from 'axios';
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    name: 'DiaryForm',
    components: {
    ValidationObserver,
    ValidationProvider
  },
    props: {
        // foods: Array,
    },
    data: function() {
        return {
            searchQuery: '',
            foods: [],
            food_item: [],
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
        },
        selectItem(item) {
            this.food_item = item;
        },
        addItem() {
            this.$emit('addItem', this.food_item);
            this.$parent.close();
        },
	}
    
}
</script>

<style lang="scss">

.food-form {
    .food-search {
        margin: 1rem auto;
    }
    .food-list {
        margin: 2rem 0;
    }
    .food-item {
        margin: 0.25rem 1rem;
        padding: 0 1rem;
        border-radius: 3px;
    }
    .food-item:hover, .food-item:focus {
        background-color: #30475e;
        color: white;
        cursor: pointer;
    }
    .button {
        background-color: #30475e;
        color: white;
    }
    .button:hover, .button:focus {
        background-color: #7182b6;
        color: white;
    }
    .close-button {
        background-color: white;
        color: #30475e;
    }
    .modal-card-foot {
        width: 100%;
        // margin: 0 auto;
        .footer-buttons {
            margin: 0 auto;
        }
    }
}
</style>