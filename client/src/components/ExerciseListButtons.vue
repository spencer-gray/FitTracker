<template>
<div id="exerciseButtons">
    <b-button class="category-btn" v-on:click="updateCategory">Abs</b-button>
    <b-button class="category-btn" v-on:click="updateCategory">Arms</b-button>
    <b-button class="category-btn" v-on:click="updateCategory">Back</b-button>
    <b-button class="category-btn" v-on:click="updateCategory">Calves</b-button>
    <b-button class="category-btn" v-on:click="updateCategory">Chest</b-button>
    <b-button class="category-btn" v-on:click="updateCategory">Legs</b-button>
    <b-button class="category-btn" v-on:click="updateCategory">Shoulders</b-button>
</div>    
</template>

<script>

export default {
    //name: 'ExerciseListButtons',
    data() {
        return {
            buttons: [
                { caption: 'Abs', state: false },
                { caption: 'Arms', state: false },
                { caption: 'Back', state: false },
                { caption: 'Calves', state: false },
                { caption: 'Chest', state: false },
                { caption: 'Legs', state: false },
                { caption: 'Shoulders', state: false },
            ]
        }
    },
    methods: {
        updateCategory(e) {
            this.$emit('clickedCat', e.target.innerText);   // update parent
        }
    }
};
</script>

<style scoped lang="scss">
#exerciseButtons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 3em auto;
    width: 50%;
    text-align: center;
}

.category-btn {
    margin: 0.5rem 0.5rem;
    min-width: 100px;
    background-color: #30475e;
    color: white;
    font-weight: 700;
}

.category-btn:hover {
    background-color: #7182b6;
    color: white;
}

.category-btn:focus {
    background-color: #7182b6;
    color: white;
}
</style>