<template>
<div id="exerciseList">
    <div class="content" v-if='category != null'>
        <div v-bind:key="exercise.id" v-for="exercise in exercises" @click="goToDetails(exercise)">
            <div class="item" v-if="exercise.fields.category === category">
                <p>{{ exercise.fields.name }}</p>
            </div>
        </div>
    </div>
</div>    
</template>

<script>
export default {
    name: 'ExerciseList',
    props: {
        exercises: Array,
        category: Number,
    },
    methods: {
        goToDetails(exercise) {
            this.$store.commit('setExercise', exercise);
            this.$router.push("/exercise/" + exercise.fields.name);
        },
        // cleans up html tags from js string while retaining text inside
        stripHtml: function(html){
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        }
    }
};
</script>

<style scoped lang="scss">
#exerciseList {
    width: 80%;
    margin: 0 auto;

    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }

    .item {
        margin: 1rem;
        padding: 1rem;
        border-radius: 2px;
        background-color: #F9F9F9;
        box-shadow: 1px 5px 5px 1px darkgray;
        text-align: center;
        color: #30475e;
        min-width: 180px;
    }

    .item:hover {
        cursor: pointer;
        background-color: #7182b6;
        color: white;
    }
}

</style>